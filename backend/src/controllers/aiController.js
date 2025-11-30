const prisma = require("../db/prisma.js");

const getAISuggestions = async (req, res) => {
    const userId = req.user.userId;

    try {
        // Fetch last 7 days of user data
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const [activities, healthMetrics, goals, user] = await Promise.all([
            prisma.activity.findMany({
                where: { userId, date: { gte: sevenDaysAgo } },
                orderBy: { date: "desc" },
                select: { name: true, duration: true, calories: true, date: true }
            }),
            prisma.healthMetric.findMany({
                where: { userId, date: { gte: sevenDaysAgo } },
                orderBy: { date: "desc" },
                select: { type: true, value: true, date: true }
            }),
            prisma.goal.findMany({
                where: { userId },
                orderBy: { createdAt: "desc" },
                select: { title: true, category: true, target: true, current: true, status: true }
            }),
            prisma.users.findUnique({
                where: { id: userId },
                select: { name: true }
            })
        ]);

        // Build prompt for Gemini
        const prompt = `You are a health and wellness coach. Analyze the following user data and provide 3-5 personalized, actionable, and encouraging suggestions to help them improve their health habits.

User: ${user?.name || 'User'}

Activities (Last 7 days):
${activities.length > 0 ? activities.map(a => `- ${a.name}: ${a.duration} minutes, ${a.calories || 0} calories on ${new Date(a.date).toLocaleDateString()}`).join('\n') : 'No activities logged'}

Health Metrics (Last 7 days):
${healthMetrics.length > 0 ? healthMetrics.map(h => `- ${h.type}: ${h.value} on ${new Date(h.date).toLocaleDateString()}`).join('\n') : 'No health metrics logged'}

Goals:
${goals.length > 0 ? goals.map(g => `- ${g.title} (${g.category}): ${g.current}/${g.target} - ${g.status}`).join('\n') : 'No goals set'}

Provide specific, actionable suggestions based on their data. Keep suggestions concise, positive, and motivating. Format as a numbered list.`;

        // Call Gemini API
        const geminiApiKey = process.env.GEMINI_API_KEY;

        if (!geminiApiKey) {
            return res.status(500).json({
                message: "Gemini API key not configured",
                suggestion: "Please add GEMINI_API_KEY to your .env file"
            });
        }

        const geminiResponse = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            }
        );

        if (!geminiResponse.ok) {
            const errorData = await geminiResponse.json();
            console.error("Gemini API Error:", errorData);
            return res.status(500).json({
                message: "Failed to generate AI suggestions",
                error: errorData.error?.message || "Unknown error"
            });
        }

        const data = await geminiResponse.json();
        const suggestion = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!suggestion) {
            return res.status(500).json({
                message: "No suggestion generated",
                error: "Invalid response from AI"
            });
        }

        res.status(200).json({
            suggestion,
            dataAnalyzed: {
                activitiesCount: activities.length,
                healthMetricsCount: healthMetrics.length,
                goalsCount: goals.length
            }
        });
    } catch (error) {
        console.error("Error generating AI suggestions:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { getAISuggestions };
