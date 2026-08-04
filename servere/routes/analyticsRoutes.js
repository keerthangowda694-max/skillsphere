const express = require("express");

const router = express.Router();

const {
    freelancerDashboard,
    monthlyRevenue,
    reviewAnalytics,
    projectAnalytics,
    profileAnalytics,
} = require("../controllers/analyticsController");

const {
    protect,
    freelancerOnly,
} = require("../middleware/authMiddleware");

// ======================================
// Freelancer Dashboard
// ======================================

// Dashboard Overview
router.get(
    "/freelancer/dashboard",
    protect,
    freelancerOnly,
    freelancerDashboard
);

// Monthly Revenue Chart
router.get(
    "/freelancer/revenue",
    protect,
    freelancerOnly,
    monthlyRevenue
);

// Review Analytics
router.get(
    "/freelancer/reviews",
    protect,
    freelancerOnly,
    reviewAnalytics
);

// Project Analytics
router.get(
    "/freelancer/projects",
    protect,
    freelancerOnly,
    projectAnalytics
);

// Profile Analytics
router.get(
    "/freelancer/profile",
    protect,
    freelancerOnly,
    profileAnalytics
);

module.exports = router;