const express = require("express");
const router = express.Router();

const {
    protect,
    adminOnly,
} = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

const {
    adminDashboard,
    getPendingVerifications,
    verifyFreelancer,
    getPlatformStatistics,
} = require("../controllers/adminController");

// Dashboard
router.get(
    "/",
    protect,
    authorizeRoles("admin"),
    adminDashboard
);

// View Pending Requests
router.get(
    "/pending-verifications",
    protect,
    authorizeRoles("admin"),
    getPendingVerifications
);

// Approve / Reject
router.put(
    "/verify-freelancer/:id",
    protect,
    authorizeRoles("admin"),
    verifyFreelancer
);

router.get(
    "/platform-statistics",
    getPlatformStatistics
);

module.exports = router;