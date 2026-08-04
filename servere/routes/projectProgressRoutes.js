const express = require("express");

const router = express.Router();

const {
    addProgress,
    updateProgress,
    getProjectProgress,
    approveProgress,
    requestChanges,
} = require("../controllers/projectProgressController");

const {
    protect,
    clientOnly,
    freelancerOnly,
} = require("../middleware/authMiddleware");

// ======================================
// Freelancer
// ======================================

// Add Progress
router.post(
    "/",
    protect,
    freelancerOnly,
    addProgress
);

// Update Progress
router.put(
    "/:id",
    protect,
    freelancerOnly,
    updateProgress
);

// ======================================
// Client & Freelancer
// ======================================

// Get Project Timeline
router.get(
    "/project/:projectId",
    protect,
    getProjectProgress
);

// ======================================
// Client
// ======================================

// Approve Progress
router.put(
    "/approve/:id",
    protect,
    clientOnly,
    approveProgress
);

// Request Changes
router.put(
    "/request-changes/:id",
    protect,
    clientOnly,
    requestChanges
);

module.exports = router;