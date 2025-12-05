const { getLeaderboard } = require("../controllers/leaderboardController.js");
const express = require("express");
const { authenticateUser } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.use(authenticateUser);

router.get("/", getLeaderboard);

module.exports = router;
