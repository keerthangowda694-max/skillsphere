const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Project = require("../models/Project");
const Payment = require("../models/Payment");
const Review = require("../models/Review");

const adminDashboard = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome Admin",
        user: req.user
    });
});

const verifyFreelancer = asyncHandler(async (req, res) => {

    const { status, remark } = req.body;

    const freelancer = await User.findById(req.params.id);

    if (!freelancer) {
        return res.status(404).json({
            success: false,
            message: "Freelancer not found",
        });
    }

    freelancer.verificationStatus = status;
    freelancer.verificationRemark = remark;

    freelancer.isProfessionalVerified =
        status === "Approved";

    await freelancer.save();

    res.status(200).json({
        success: true,
        message: "Verification updated successfully",
        freelancer,
    });
});

const getPendingVerifications = asyncHandler(async (req, res) => {

    const freelancers = await User.find({
        verificationStatus: "Pending",
        role: "freelancer",
    }).select("-password");

    res.status(200).json({
        success: true,
        total: freelancers.length,
        freelancers,
    });

});

const getPlatformStatistics = asyncHandler(async (req, res) => {

    const totalUsers = await User.countDocuments();

    const totalFreelancers = await User.countDocuments({
        role: "freelancer",
    });

    const verifiedFreelancers = await User.countDocuments({
        role: "freelancer",
        isFreelancerVerified: true,
    });

    const totalProjects = await Project.countDocuments();

    const completedProjects = await Project.countDocuments({
        status: "Completed",
    });

    const projectSuccessRate =
        totalProjects > 0
            ? Number(((completedProjects / totalProjects) * 100).toFixed(1))
            : 0;

    const avgReview = await Review.aggregate([
        {
            $group: {
                _id: null,
                averageRating: {
                    $avg: "$overallRating",
                },
            },
        },
    ]);

    const averageRating =
        avgReview.length > 0
            ? Number(avgReview[0].averageRating.toFixed(1))
            : 0;

    res.status(200).json({
        success: true,
        statistics: {
            totalUsers,
            totalProjects,
            verifiedFreelancers,
            averageRating,
            projectSuccessRate,
        },
    });

});


module.exports = {
    adminDashboard,
    verifyFreelancer,
    getPendingVerifications,
    getPlatformStatistics,
};