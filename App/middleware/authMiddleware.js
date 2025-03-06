const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
    console.log("Auth Middleware Triggered");
    console.log("Headers:", req.headers);  // Log headers to check if the token is received

    const token = req.header('Authorization');

    if (!token) {
        console.log("No Token Provided");
        return res.status(401).json({ message: "Access Denied" });
    }

    try {
        const verified = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = verified;
        console.log("User Verified:", req.user);
        next();
    } catch (error) {
        console.log("Invalid Token:", error.message);
        res.status(400).json({ message: "Invalid Token" });
    }
};

