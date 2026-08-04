const asyncHandler = require("express-async-handler");
const User = require("../models/User");


// Dashboard
const freelancerDashboard = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome Freelancer",
        user: req.user,
    });
});

// ===============================
// Get Freelancer Profile
// ===============================
const getProfile = asyncHandler(async (req, res) => {

    const freelancer = await User.findById(req.user._id).select("-password");

    res.status(200).json({
        success: true,
        freelancer,
    });

});

// ===============================
// Update Freelancer Profile
// ===============================
const updateProfile = asyncHandler(async (req, res) => {

    const freelancer = await User.findById(req.user._id);

    if (!freelancer) {
        return res.status(404).json({
            success: false,
            message: "Freelancer not found",
        });
    }

    freelancer.fullName =
        req.body.fullName || freelancer.fullName;

    freelancer.skills =
        req.body.skills || freelancer.skills;

    freelancer.experience =
        req.body.experience ?? freelancer.experience;

    freelancer.availability =
        req.body.availability || freelancer.availability;

    freelancer.hourlyRate =
        req.body.hourlyRate ?? freelancer.hourlyRate;

    freelancer.milestoneRate =
        req.body.milestoneRate ?? freelancer.milestoneRate;

    freelancer.profileImage =
        req.body.profileImage || freelancer.profileImage;

    await freelancer.save();

    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        freelancer,
    });

});

const uploadResume = asyncHandler(async (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "Please upload a PDF resume",
        });
    }

    const freelancer = await User.findById(req.user._id);

    freelancer.resume = req.file.path;

    await freelancer.save();

    res.status(200).json({
        success: true,
        message: "Resume uploaded successfully",
        resume: freelancer.resume,
    });

});

const requestVerification = asyncHandler(async (req, res) => {

    const freelancer = await User.findById(req.user._id);

    if (!freelancer) {
        return res.status(404).json({
            success: false,
            message: "Freelancer not found",
        });
    }
    if (freelancer.verificationStatus === "Pending") {
        return res.status(400).json({
            success: false,
            message: "Verification request already submitted.",
        });
    }

    freelancer.verificationStatus = "Pending";

    await freelancer.save();

    res.status(200).json({
        success: true,
        message: "Verification request submitted successfully.",
    });

});

module.exports = {
    freelancerDashboard,
    getProfile,
    updateProfile,
    uploadResume,
    requestVerification,
};