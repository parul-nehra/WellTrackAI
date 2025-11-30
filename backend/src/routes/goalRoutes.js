const { Router } = require("express");
const { createGoal, getGoals, updateGoal, deleteGoal } = require("../controllers/goalController.js");
const { authenticateUser } = require("../middleware/authMiddleware.js");

const router = Router();

router.use(authenticateUser);

router.post("/", createGoal);
router.get("/", getGoals);
router.put("/:id", updateGoal);
router.delete("/:id", deleteGoal);

module.exports = router;
