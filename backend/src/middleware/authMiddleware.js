const { verifyTokens } = require("../Utils/token.js");

const authenticateUser = (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Authentication required" });
    }

    const decoded = verifyTokens(token);
    if (!decoded) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = decoded;
    next();
};

module.exports = { authenticateUser };
