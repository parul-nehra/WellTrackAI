const prisma = require("../db/prisma.js");

const getLeaderboard = async (req, res) => {
    // Optional pagination parameters
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;

    // Optional sorting parameters
    const sortBy = req.query.sortBy || 'score'; // score, goals, activities, achievements
    const order = req.query.order || 'desc'; // asc, desc

    try {
        // Fetch all users with their related data
        const users = await prisma.users.findMany({
            select: {
                id: true,
                name: true,
                goals: {
                    where: { status: 'Completed' },
                    select: { id: true }
                },
                activities: {
                    select: { duration: true }
                },
                achievements: {
                    where: { unlocked: true },
                    select: { id: true }
                }
            }
        });

        // Calculate scores and stats for each user
        const leaderboardData = users.map(user => {
            const goalsCompleted = user.goals.length;
            const totalActivities = user.activities.length;
            const totalActivityDuration = user.activities.reduce((sum, act) => sum + act.duration, 0);
            const achievementCount = user.achievements.length;

            // Score calculation: goals * 10 + activities * 2 + achievements * 15
            const score = (goalsCompleted * 10) + (totalActivities * 2) + (achievementCount * 15);

            return {
                userId: user.id,
                name: user.name,
                score,
                goalsCompleted,
                totalActivities,
                totalActivityDuration,
                achievementCount
            };
        });

        // Sort based on sortBy parameter
        leaderboardData.sort((a, b) => {
            let compareValue = 0;
            switch (sortBy) {
                case 'goals':
                    compareValue = a.goalsCompleted - b.goalsCompleted;
                    break;
                case 'activities':
                    compareValue = a.totalActivityDuration - b.totalActivityDuration;
                    break;
                case 'achievements':
                    compareValue = a.achievementCount - b.achievementCount;
                    break;
                case 'score':
                default:
                    compareValue = a.score - b.score;
                    break;
            }
            return order === 'asc' ? compareValue : -compareValue;
        });

        // Add rank to each user
        leaderboardData.forEach((user, index) => {
            user.rank = index + 1;
        });

        // Apply pagination
        const total = leaderboardData.length;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedData = leaderboardData.slice(startIndex, endIndex);

        res.status(200).json({
            data: paginatedData,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getLeaderboard };
