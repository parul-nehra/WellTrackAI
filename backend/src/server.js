const app = require("./app.js");
const activityRoutes = require("./routes/activityRoutes.js");
const healthRoutes = require("./routes/healthRoutes.js");
const goalRoutes = require("./routes/goalRoutes.js");
const profileRoutes = require("./routes/profileRoutes.js");
const debugRoutes = require("./routes/debugRoutes.js");

const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 8000;

app.use("/api/activities", activityRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/debug", debugRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});