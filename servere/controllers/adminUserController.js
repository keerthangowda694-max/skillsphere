const asyncHandler = require("express-async-handler");

const User = require("../models/User");

// ======================================
// Get All Users
// ======================================

const getAllUsers = asyncHandler(async (req, res) => {

    const users = await User.find()
        .select("-password")
        .sort({ createdAt: -1 });

    res.json({

        success: true,

        total: users.length,

        users,

    });

});

// ======================================
// Search Users
// ======================================

const searchUsers = asyncHandler(async (req, res) => {

    const keyword = req.query.keyword || "";

    const users = await User.find({

        $or: [

            { fullName: { $regex: keyword, $options: "i" } },

            { email: { $regex: keyword, $options: "i" } },

        ],

    }).select("-password");

    res.json({

        success: true,

        total: users.length,

        users,

    });

});

// ======================================
// Suspend / Activate User
// ======================================

const toggleSuspendUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.userId);

    if (!user) {

        return res.status(404).json({

            success: false,

            message: "User not found",

        });

    }

    user.isSuspended = !user.isSuspended;

    await user.save();

    res.json({

        success: true,

        message: user.isSuspended
            ? "User suspended successfully"
            : "User activated successfully",

        user,

    });

});

// ======================================
// Get User Details
// ======================================

const getUserDetails = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.userId)
        .select("-password");

    if (!user) {

        return res.status(404).json({

            success: false,

            message: "User not found",

        });

    }

    res.json({

        success: true,

        user,

    });

});
// ======================================
// Verify Freelancer
// ======================================

const verifyFreelancer = asyncHandler(async (req, res) => {

    const freelancer = await User.findById(req.params.userId);

    if (!freelancer) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    if (freelancer.role !== "freelancer") {
        return res.status(400).json({
            success: false,
            message: "Only freelancers can be verified",
        });
    }

    freelancer.isVerifiedFreelancer = true;

    await freelancer.save();

    res.json({

        success: true,

        message: "Freelancer verified successfully",

        freelancer,

    });

});

// ======================================
// Remove Freelancer Verification
// ======================================

const unverifyFreelancer = asyncHandler(async (req, res) => {

    const freelancer = await User.findById(req.params.userId);

    if (!freelancer) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    freelancer.isVerifiedFreelancer = false;

    await freelancer.save();

    res.json({

        success: true,

        message: "Freelancer verification removed",

        freelancer,

    });

});

module.exports = {

    getAllUsers,

    searchUsers,

    toggleSuspendUser,

    getUserDetails,

    verifyFreelancer,
    
    unverifyFreelancer,

};