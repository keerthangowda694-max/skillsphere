const express = require("express");
const router = express.Router();

const {
    protect,
    freelancerOnly,
} = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

const upload = require("../middleware/uploadMiddleware");

const {
    freelancerDashboard,
    getProfile,
    updateProfile,
    uploadResume,
    requestVerification,
} = require("../controllers/freelancerController");

// =============================
// Dashboard
// =============================
router.get(
    "/dashboard",
    protect,
    authorizeRoles("freelancer"),
    freelancerDashboard
);

// =============================
// Profile
// =============================
router.get(
    "/profile",
    protect,
    freelancerOnly,
    getProfile
);

router.put(
    "/profile",
    protect,
    freelancerOnly,
    updateProfile
);

// =============================
// Upload Resume
// =============================
router.post(
    "/upload-resume",
    protect,
    freelancerOnly,
    upload.single("resume"),
    uploadResume
);

// =============================
// Request Verification
// =============================
router.post(
    "/request-verification",
    protect,
    freelancerOnly,
    requestVerification
);

module.exports = router;