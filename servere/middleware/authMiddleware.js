const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// =====================================
// Protect Route
// =====================================
const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password");

            return next();
        } catch (error) {
            res.status(401);
            throw new Error("Not Authorized, Invalid Token");
        }
    }

    res.status(401);
    throw new Error("Not Authorized, No Token");
});

// =====================================
// Admin Only
// =====================================
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        return next();
    }

    res.status(403);
    throw new Error("Access denied. Admin only.");
};

// =====================================
// Freelancer Only
// =====================================
const freelancerOnly = (req, res, next) => {
    if (req.user && req.user.role === "freelancer") {
        return next();
    }

    res.status(403);
    throw new Error("Access denied. Freelancer only.");
};

// =====================================
// Client Only
// =====================================
const clientOnly = (req, res, next) => {
    if (req.user && req.user.role === "client") {
        return next();
    }

    res.status(403);
    throw new Error("Access denied. Client only.");
};


module.exports = {
    protect,
    adminOnly,
    freelancerOnly,
    clientOnly,

};