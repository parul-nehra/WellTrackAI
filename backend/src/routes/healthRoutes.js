const { Router } = require("express");
const { createHealthMetric, getHealthMetrics, getTodayMetrics } = require("../controllers/healthController.js");
const { authenticateUser } = require("../middleware/authMiddleware.js");

const router = Router();

router.use(authenticateUser);

router.post("/", createHealthMetric);
router.get("/", getHealthMetrics);
router.get("/today", getTodayMetrics);

module.exports = router;
