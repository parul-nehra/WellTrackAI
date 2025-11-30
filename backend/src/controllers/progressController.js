const prisma = require("../db/prisma.js");

// Get overall progress statistics
const getProgressStats = async (req, res) => {
    const userId = req.user.userId;

    try {
        // Total activities count
        const totalActivities = await prisma.activity.count({
            where: { userId }
        });

        // Goals achieved count
        const goalsAchieved = await prisma.goal.count({
            where: {
                userId,
                status: "Completed"
            }
        });

        // Calculate current streak
        const activities = await prisma.activity.findMany({
            where: { userId },
            orderBy: { date: 'desc' },
            select: { date: true }
        });

        let currentStreak = 0;
        if (activities.length > 0) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const activityDates = new Set();
            activities.forEach(activity => {
                const actDate = new Date(activity.date);
                actDate.setHours(0, 0, 0, 0);
                activityDates.add(actDate.getTime());
            });

            let checkDate = new Date(today);
            while (activityDates.has(checkDate.getTime())) {
                currentStreak++;
                checkDate.setDate(checkDate.getDate() - 1);
            }
        }

        res.status(200).json({
            totalActivities,
            goalsAchieved,
            currentStreak
        });
    } catch (error) {
        console.error("Error fetching progress stats:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get weekly consistency data
const getWeeklyConsistency = async (req, res) => {
    const userId = req.user.userId;
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    weekAgo.setHours(0, 0, 0, 0);

    try {
        // Get activities for steps calculation
        const activities = await prisma.activity.findMany({
            where: {
                userId,
                date: { gte: weekAgo }
            }
        });

        // Calculate steps (assuming activities with "walk", "run", or "steps" in name)
        const stepActivities = activities.filter(a =>
            a.name.toLowerCase().includes('walk') ||
            a.name.toLowerCase().includes('run') ||
            a.name.toLowerCase().includes('step')
        );
        const totalSteps = stepActivities.reduce((sum, act) => sum + (act.duration * 100), 0); // Estimate steps
        const stepsGoal = 70000;
        const stepsPercentage = Math.min(100, Math.round((totalSteps / stepsGoal) * 100));

        // Get health metrics for water and sleep
        const healthMetrics = await prisma.healthMetric.findMany({
            where: {
                userId,
                date: { gte: weekAgo }
            }
        });

        // Calculate water intake
        const waterMetrics = healthMetrics.filter(m => m.type === 'Water');
        const totalWater = waterMetrics.reduce((sum, m) => sum + parseFloat(m.value || 0), 0);
        const waterGoal = 56; // 8 glasses per day * 7 days
        const waterPercentage = Math.min(100, Math.round((totalWater / waterGoal) * 100));

        // Calculate sleep duration
        const sleepMetrics = healthMetrics.filter(m => m.type === 'Sleep');
        const totalSleep = sleepMetrics.reduce((sum, m) => sum + parseFloat(m.value || 0), 0);
        const sleepGoal = 56; // 8 hours per day * 7 days
        const sleepPercentage = Math.min(100, Math.round((totalSleep / sleepGoal) * 100));

        res.status(200).json({
            steps: {
                current: totalSteps,
                goal: stepsGoal,
                percentage: stepsPercentage
            },
            water: {
                current: Math.round(totalWater),
                goal: waterGoal,
                percentage: waterPercentage
            },
            sleep: {
                current: Math.round(totalSleep),
                goal: sleepGoal,
                percentage: sleepPercentage
            }
        });
    } catch (error) {
        console.error("Error fetching weekly consistency:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get achievements/badges
const getAchievements = async (req, res) => {
    const userId = req.user.userId;

    try {
        // Get user's activities and metrics to determine unlocked achievements
        const activities = await prisma.activity.findMany({
            where: { userId }
        });

        const healthMetrics = await prisma.healthMetric.findMany({
            where: { userId }
        });

        // Define achievements with unlock logic
        const achievements = [
            {
                name: 'Early Bird',
                description: 'Completed 5 morning workouts',
                icon: '🌅',
                unlocked: activities.length >= 5
            },
            {
                name: 'Hydration Hero',
                description: 'Hit water goal for 7 days',
                icon: '💧',
                unlocked: healthMetrics.filter(m => m.type === 'Water' && parseFloat(m.value) >= 8).length >= 7
            },
            {
                name: 'Zen Master',
                description: 'Meditated for 10 hours total',
                icon: '🧘',
                unlocked: activities.filter(a => a.name.toLowerCase().includes('meditat')).reduce((sum, a) => sum + a.duration, 0) >= 600
            },
            {
                name: 'Marathoner',
                description: 'Walked 50,000 steps in a week',
                icon: '🏃',
                unlocked: activities.filter(a =>
                    a.name.toLowerCase().includes('walk') ||
                    a.name.toLowerCase().includes('run')
                ).length >= 10
            }
        ];

        res.status(200).json(achievements);
    } catch (error) {
        console.error("Error fetching achievements:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get streak calendar (last 30 days)
const getStreakCalendar = async (req, res) => {
    const userId = req.user.userId;
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    try {
        const activities = await prisma.activity.findMany({
            where: {
                userId,
                date: { gte: thirtyDaysAgo }
            },
            select: { date: true }
        });

        // Create a set of dates with activities
        const activityDates = new Set();
        activities.forEach(activity => {
            const actDate = new Date(activity.date);
            actDate.setHours(0, 0, 0, 0);
            activityDates.add(actDate.getTime());
        });

        // Generate last 30 days calendar
        const calendar = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 29; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            calendar.push({
                date: date.toISOString(),
                day: date.getDate(),
                hasActivity: activityDates.has(date.getTime())
            });
        }

        res.status(200).json(calendar);
    } catch (error) {
        console.error("Error fetching streak calendar:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getProgressStats,
    getWeeklyConsistency,
    getAchievements,
    getStreakCalendar
};
