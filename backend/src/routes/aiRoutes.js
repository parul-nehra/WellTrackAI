const { Router } = require("express");
const { getAISuggestions } = require("../controllers/aiController.js");
const { authenticateUser } = require("../middleware/authMiddleware.js");

const router = Router();

router.use(authenticateUser);

router.get("/suggestions", getAISuggestions);

module.exports = router;
