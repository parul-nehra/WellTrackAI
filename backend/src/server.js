const app = require("./app.js");
const activityRoutes = require("./routes/activityRoutes.js");

const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 8000;

app.use("/api/activities", activityRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});