const prisma = require("../db/prisma.js");

const createActivity = async (req, res) => {
    const { name, duration, calories, date } = req.body;
    const userId = req.user.userId;

    if (!name || !duration) {
        return res.status(400).json({ message: "Name and duration are required" });
    }

    try {
        const activity = await prisma.activity.create({
            data: {
                name,
                duration: parseInt(duration),
                calories: calories ? parseInt(calories) : null,
                date: date ? new Date(date) : new Date(),
                userId,
            },
        });
        res.status(201).json(activity);
    } catch (error) {
        console.error("Error creating activity:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getActivities = async (req, res) => {
    const userId = req.user.userId;

    // Optional pagination parameters
    const page = req.query.page ? parseInt(req.query.page) : null;
    const limit = req.query.limit ? parseInt(req.query.limit) : null;

    // Optional search parameter
    const search = req.query.search || "";

    // Optional date filtering
    const { startDate, endDate } = req.query;

    try {
        // Build where clause
        const whereClause = {
            userId,
            ...(search && {
                name: {
                    contains: search,
                    mode: 'insensitive'
                }
            }),
            ...(startDate && endDate && {
                date: {
                    gte: new Date(startDate),
                    lte: new Date(endDate)
                }
            })
        };

        // Build query options
        const queryOptions = {
            where: whereClause,
            orderBy: { date: "desc" },
        };

        // Add pagination only if both page and limit are provided
        if (page && limit) {
            queryOptions.skip = (page - 1) * limit;
            queryOptions.take = limit;
        }

        const activities = await prisma.activity.findMany(queryOptions);

        // If pagination is requested, return with metadata
        if (page && limit) {
            const total = await prisma.activity.count({ where: whereClause });
            return res.status(200).json({
                data: activities,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit)
                }
            });
        }

        // Otherwise return simple array (backward compatible)
        res.status(200).json(activities);
    } catch (error) {
        console.error("Error fetching activities:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getDashboardStats = async (req, res) => {
    const userId = req.user.userId;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
        const activities = await prisma.activity.findMany({
            where: {
                userId,
                date: {
                    gte: today
                }
            },
        });

        const totalDuration = activities.reduce((sum, act) => sum + act.duration, 0);
        const totalCalories = activities.reduce((sum, act) => sum + (act.calories || 0), 0);

        res.status(200).json({
            duration: totalDuration,
            calories: totalCalories,
            count: activities.length
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { createActivity, getActivities, getDashboardStats };
