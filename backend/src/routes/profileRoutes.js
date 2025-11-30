const { Router } = require("express");
const { getProfile, updateProfile, changePassword, deleteAccount } = require("../controllers/profileController.js");
const { authenticateUser } = require("../middleware/authMiddleware.js");

const router = Router();

router.use(authenticateUser);

router.get("/", getProfile);
router.put("/", updateProfile);
router.put("/password", changePassword);
router.delete("/", deleteAccount);

module.exports = router;
