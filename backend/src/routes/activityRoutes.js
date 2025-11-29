const { Router } = require("express");
const { createActivity, getActivities, getDashboardStats } = require("../controllers/activityController.js");
const { authenticateUser } = require("../middleware/authMiddleware.js");

const router = Router();

router.use(authenticateUser);

router.post("/", createActivity);
router.get("/", getActivities);
router.get("/stats", getDashboardStats);

module.exports = router;
