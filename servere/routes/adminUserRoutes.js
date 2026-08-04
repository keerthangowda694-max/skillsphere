const express = require("express");

const router = express.Router();

const {

    getAllUsers,

    searchUsers,

    toggleSuspendUser,

    getUserDetails,

    verifyFreelancer,

    unverifyFreelancer,

} = require("../controllers/adminUserController");

const {

    protect,

    adminOnly,

} = require("../middleware/authMiddleware");

// Get all users
router.get(
    "/users",
    protect,
    adminOnly,
    getAllUsers
);

// Search users
router.get(
    "/users/search",
    protect,
    adminOnly,
    searchUsers
);

// User details
router.get(
    "/users/:userId",
    protect,
    adminOnly,
    getUserDetails
);

// Suspend / Activate
router.put(
    "/users/:userId/suspend",
    protect,
    adminOnly,
    toggleSuspendUser
);

// Verify freelancer
router.put(
    "/freelancers/:userId/verify",
    protect,
    adminOnly,
    verifyFreelancer
);

// Remove verification
router.put(
    "/freelancers/:userId/unverify",
    protect,
    adminOnly,
    unverifyFreelancer
);

module.exports = router;