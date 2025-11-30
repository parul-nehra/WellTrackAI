const { Router } = require("express");
const {
    getProgressStats,
    getWeeklyConsistency,
    getAchievements,
    getStreakCalendar
} = require("../controllers/progressController.js");
const { authenticateUser } = require("../middleware/authMiddleware.js");

const router = Router();

router.use(authenticateUser);

router.get("/stats", getProgressStats);
router.get("/weekly", getWeeklyConsistency);
router.get("/achievements", getAchievements);
router.get("/streak", getStreakCalendar);

module.exports = router;
