const express = require("express");

const router = express.Router();

const {
    openDispute,
    getMyDisputes,
    respondToDispute,
    getAllDisputes,
    resolveDispute,
} = require("../controllers/disputeController");

const {
    protect,
    adminOnly,
} = require("../middleware/authMiddleware");

// ======================================
// Client
// ======================================

// Open a new dispute
router.post(
    "/",
    protect,
    openDispute
);

// ======================================
// Client / Freelancer
// ======================================

// Get my disputes
router.get(
    "/my",
    protect,
    getMyDisputes
);

// Freelancer response
router.put(
    "/respond/:disputeId",
    protect,
    respondToDispute
);

// ======================================
// Admin
// ======================================

// View all disputes
router.get(
    "/all",
    protect,
    adminOnly,
    getAllDisputes
);

// Resolve dispute
router.put(
    "/resolve/:disputeId",
    protect,
    adminOnly,
    resolveDispute
);

module.exports = router;