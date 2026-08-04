const express = require("express");

const router = express.Router();

const {
    updateAvailability,
    getMyAvailability,
    getFreelancerAvailability,
    checkAvailability,
} = require("../controllers/availabilityController");

const { protect } = require("../middleware/authMiddleware");

// ======================================
// Freelancer
// ======================================

// Create / Update Availability
router.put(
    "/",
    protect,
    updateAvailability
);

// Get Logged-in Freelancer Availability
router.get(
    "/me",
    protect,
    getMyAvailability
);

// ======================================
// Client
// ======================================

// View Freelancer Availability
router.get(
    "/:freelancerId",
    protect,
    getFreelancerAvailability
);

// Check if Freelancer is Available
router.get(
    "/check/:freelancerId",
    protect,
    checkAvailability
);

module.exports = router;