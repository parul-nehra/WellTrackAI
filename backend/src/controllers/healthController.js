const prisma = require("../db/prisma.js");

const createHealthMetric = async (req, res) => {
  const { type, value, date } = req.body;
  const userId = req.user.userId;

  if (!type || !value) {
    return res.status(400).json({ message: "Type and value are required" });
  }

  try {
    const metricDate = date ? new Date(date) : new Date();
    const startOfDay = new Date(metricDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(metricDate);
    endOfDay.setHours(23, 59, 59, 999);

    const existing = await prisma.healthMetric.findFirst({
      where: {
        userId,
        type,
        date: {
          gte: startOfDay,
          lte: endOfDay
        }
      }
    });

    let metric;
    if (existing) {
      metric = await prisma.healthMetric.update({
        where: { id: existing.id },
        data: { value: String(value) }
      });
    } else {
      metric = await prisma.healthMetric.create({
        data: {
          type,
          value: String(value),
          date: metricDate,
          userId,
        },
      });
    }
    res.status(201).json(metric);
  } catch (error) {
    console.error("Error creating health metric:", error);
    console.error("Error details:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getHealthMetrics = async (req, res) => {
  const userId = req.user.userId;

  // Optional pagination parameters
  const page = req.query.page ? parseInt(req.query.page) : null;
  const limit = req.query.limit ? parseInt(req.query.limit) : null;

  // Optional type filtering
  const { type } = req.query;

  try {
    // Build where clause
    const whereClause = {
      userId,
      ...(type && { type })
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

    const metrics = await prisma.healthMetric.findMany(queryOptions);

    // If pagination is requested, return with metadata
    if (page && limit) {
      const total = await prisma.healthMetric.count({ where: whereClause });
      return res.status(200).json({
        data: metrics,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      });
    }

    // Otherwise return simple array (backward compatible)
    res.status(200).json(metrics);
  } catch (error) {
    console.error("Error fetching health metrics:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getTodayMetrics = async (req, res) => {
  const userId = req.user.userId;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const metrics = await prisma.healthMetric.findMany({
      where: {
        userId,
        date: {
          gte: today
        }
      },
    });

    // Group by type
    const grouped = {
      water: metrics.find(m => m.type === 'Water')?.value || '0',
      sleep: metrics.find(m => m.type === 'Sleep')?.value || '0',
      mood: metrics.find(m => m.type === 'Mood')?.value || 'Not Set'
    };

    res.status(200).json(grouped);
  } catch (error) {
    console.error("Error fetching today's metrics:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createHealthMetric, getHealthMetrics, getTodayMetrics };
