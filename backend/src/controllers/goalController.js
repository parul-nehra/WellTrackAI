const prisma = require("../db/prisma.js");

const createGoal = async (req, res) => {
    const { title, category, target } = req.body;
    const userId = req.user.userId;

    if (!title || !category || !target) {
        return res.status(400).json({ message: "Title, category, and target are required" });
    }

    try {
        const goal = await prisma.goal.create({
            data: {
                title,
                category,
                target: parseInt(target),
                userId,
            },
        });
        res.status(201).json(goal);
    } catch (error) {
        console.error("Error creating goal:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getGoals = async (req, res) => {
    const userId = req.user.userId;

    // Optional pagination parameters
    const page = req.query.page ? parseInt(req.query.page) : null;
    const limit = req.query.limit ? parseInt(req.query.limit) : null;

    // Optional search parameter
    const search = req.query.search || "";

    // Optional filtering parameters
    const { status, category } = req.query;

    try {
        // Build where clause
        const whereClause = {
            userId,
            ...(search && {
                title: {
                    contains: search,
                    mode: 'insensitive'
                }
            }),
            ...(status && { status }),
            ...(category && { category })
        };

        // Build query options
        const queryOptions = {
            where: whereClause,
            orderBy: { createdAt: "desc" },
        };

        // Add pagination only if both page and limit are provided
        if (page && limit) {
            queryOptions.skip = (page - 1) * limit;
            queryOptions.take = limit;
        }

        const goals = await prisma.goal.findMany(queryOptions);

        // If pagination is requested, return with metadata
        if (page && limit) {
            const total = await prisma.goal.count({ where: whereClause });
            return res.status(200).json({
                data: goals,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit)
                }
            });
        }

        // Otherwise return simple array (backward compatible)
        res.status(200).json(goals);
    } catch (error) {
        console.error("Error fetching goals:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const updateGoal = async (req, res) => {
    const { id } = req.params;
    const { current } = req.body;
    const userId = req.user.userId;

    try {
        const goal = await prisma.goal.findFirst({
            where: { id: parseInt(id), userId }
        });

        if (!goal) {
            return res.status(404).json({ message: "Goal not found" });
        }

        const newCurrent = current !== undefined ? parseInt(current) : goal.current;
        let newStatus = goal.status;

        if (newCurrent >= goal.target) {
            newStatus = "Completed";
        } else if (newCurrent > 0) {
            newStatus = "In Progress";
        } else {
            newStatus = "Not Started";
        }

        const updated = await prisma.goal.update({
            where: { id: parseInt(id) },
            data: {
                current: newCurrent,
                status: newStatus
            },
        });
        res.status(200).json(updated);
    } catch (error) {
        console.error("Error updating goal:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const deleteGoal = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        const goal = await prisma.goal.findFirst({
            where: { id: parseInt(id), userId }
        });

        if (!goal) {
            return res.status(404).json({ message: "Goal not found" });
        }

        await prisma.goal.delete({
            where: { id: parseInt(id) }
        });
        res.status(200).json({ message: "Goal deleted successfully" });
    } catch (error) {
        console.error("Error deleting goal:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { createGoal, getGoals, updateGoal, deleteGoal };
