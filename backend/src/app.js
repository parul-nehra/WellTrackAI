const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRouts.js")
const profileRoutes = require("./routes/profileRoutes.js")
const progressRoutes = require("./routes/progressRoutes.js")
const activityRoutes = require("./routes/activityRoutes.js")
const goalRoutes = require("./routes/goalRoutes.js")
const healthRoutes = require("./routes/healthRoutes.js")
const aiRoutes = require("./routes/aiRoutes.js")

const app = express();

const allowedOrigins = ['http://localhost:3000', 'https://well-track-ai.vercel.app'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(cookieParser());

// Basic GET route
app.get('/', (req, res) => {
  res.json({ message: 'WellTrackAI Backend API is running!', status: 'OK' });
});

app.use("/api/auth/", authRoutes)
app.use("/api/profile", profileRoutes)
app.use("/api/progress", progressRoutes)
app.use("/api/activities", activityRoutes)
app.use("/api/goals", goalRoutes)
app.use("/api/health", healthRoutes)
app.use("/api/ai", aiRoutes)

module.exports = app;