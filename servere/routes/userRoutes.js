const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const upload = require("../middleware/profileUpload");

const {
    getProfile,
    updateProfile,
    uploadProfilePhoto
} = require("../controllers/userController");



// Get profile
router.get(
    "/profile",
    protect,
    getProfile
);



// Update profile details
router.put(
    "/profile",
    protect,
    updateProfile
);



// Upload profile photo
router.post(
    "/profile/photo",
    protect,
    upload.single("photo"),
    uploadProfilePhoto
);



module.exports = router;