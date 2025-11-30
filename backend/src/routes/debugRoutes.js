const { Router } = require("express");
const router = Router();

router.get("/cookies", (req, res) => {
    console.log("Debug Cookies:", req.cookies);
    res.json({
        cookies: req.cookies,
        headers: req.headers,
        env: process.env.NODE_ENV,
        protocol: req.protocol,
        secure: req.secure
    });
});

module.exports = router;
