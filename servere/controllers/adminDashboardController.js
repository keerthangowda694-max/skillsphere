const asyncHandler = require("express-async-handler");

const User = require("../models/User");
const Project = require("../models/Project");
const Payment = require("../models/Payment");
const Review = require("../models/Review");

const getDashboard = asyncHandler(async (req, res) => {

    const totalUsers = await User.countDocuments();

    const totalFreelancers = await User.countDocuments({
        role: "freelancer",
    });

    const totalClients = await User.countDocuments({
        role: "client",
    });

    const verifiedFreelancers = await User.countDocuments({
        role: "freelancer",
        isFreelancerVerified: true,
    });

    const totalProjects = await Project.countDocuments();

    const activeProjects = await Project.countDocuments({
        status: "In Progress",
    });

    const completedProjects = await Project.countDocuments({
        status: "Completed",
    });

    const totalPayments = await Payment.countDocuments();

    const escrowPayments = await Payment.countDocuments({
        status: "Escrow",
    });

    const releasedPayments = await Payment.countDocuments({
        status: "Released",
    });

    const refundedPayments = await Payment.countDocuments({
        status: "Refunded",
    });

    const paymentStats = await Payment.aggregate([
        {
            $match: {
                status: "Released",
            },
        },
        {
            $group: {
                _id: null,

                totalPaymentVolume: {
                    $sum: "$amount",
                },

                totalPlatformRevenue: {
                    $sum: "$platformFee",
                },

                totalFreelancerPayout: {
                    $sum: "$freelancerAmount",
                },
            },
        },
    ]);

    const paymentSummary =
        paymentStats.length > 0
            ? paymentStats[0]
            : {
                  totalPaymentVolume: 0,
                  totalPlatformRevenue: 0,
                  totalFreelancerPayout: 0,
              };

    const totalReviews = await Review.countDocuments();

    const avgRating = await Review.aggregate([
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
        avgRating.length > 0
            ? Number(avgRating[0].averageRating.toFixed(1))
            : 0;

    const successRate =
        totalProjects === 0
            ? 0
            : Number(((completedProjects / totalProjects) * 100).toFixed(2));

    res.json({

        success: true,

        analytics: {

            totalUsers,

            totalFreelancers,

            totalClients,

            verifiedFreelancers,

            totalProjects,

            activeProjects,

            completedProjects,

            totalPayments,

            escrowPayments,

            releasedPayments,

            refundedPayments,

            totalPaymentVolume:
                paymentSummary.totalPaymentVolume,

            platformRevenue:
                paymentSummary.totalPlatformRevenue,

            freelancerPayout:
                paymentSummary.totalFreelancerPayout,

            totalReviews,

            averageRating,

            successRate,

        },

    });

});

module.exports = {

    getDashboard,

};