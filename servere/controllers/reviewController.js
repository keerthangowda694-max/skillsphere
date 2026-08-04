const asyncHandler = require("express-async-handler");

const Review = require("../models/Review");
const Reputation = require("../models/Reputation");
const Payment = require("../models/Payment");

// =======================================
// Submit Review
// =======================================

const submitReview = asyncHandler(async (req, res) => {

    const { paymentId } = req.params;

    const {

        overallRating,
        communication,
        quality,
        deadline,
        professionalism,
        review,

    } = req.body;

    // Find payment
    const payment = await Payment.findById(paymentId);

    if (!payment) {

        return res.status(404).json({

            success: false,
            message: "Payment not found",

        });

    }

    // Only client can review

    if (payment.client.toString() !== req.user._id.toString()) {

        return res.status(403).json({

            success: false,
            message: "You are not allowed to review this project",

        });

    }

    // Payment must be released

    if (payment.status !== "Released") {

        return res.status(400).json({

            success: false,
            message: "Review allowed only after payment release",

        });

    }

    // Only one review

    const alreadyReviewed = await Review.findOne({

        payment: payment._id,

    });

    if (alreadyReviewed) {

        return res.status(400).json({

            success: false,
            message: "You already reviewed this project",

        });

    }

    // Save Review

    const newReview = await Review.create({

        client: payment.client,

        freelancer: payment.freelancer,

        project: payment.project,

        payment: payment._id,

        overallRating,

        communication,

        quality,

        deadline,

        professionalism,

        review,

        isVerified: true,

    });

    // Update Reputation

    let reputation = await Reputation.findOne({

        freelancer: payment.freelancer,

    });

    if (!reputation) {

        reputation = await Reputation.create({

            freelancer: payment.freelancer,

        });

    }

    const reviews = await Review.find({

        freelancer: payment.freelancer,

    });

    const total = reviews.length;

    reputation.totalReviews = total;

    reputation.verifiedReviews = total;

    reputation.averageRating =
        reviews.reduce((sum, r) => sum + r.overallRating, 0) / total;

    reputation.communicationScore =
        reviews.reduce((sum, r) => sum + r.communication, 0) / total;

    reputation.qualityScore =
        reviews.reduce((sum, r) => sum + r.quality, 0) / total;

    reputation.deadlineScore =
        reviews.reduce((sum, r) => sum + r.deadline, 0) / total;

    reputation.professionalismScore =
        reviews.reduce((sum, r) => sum + r.professionalism, 0) / total;

    reputation.reputationScore =
        reputation.averageRating * 20;

    await reputation.save();

    res.status(201).json({

        success: true,

        message: "Review submitted successfully",

        review: newReview,

        reputation,

    });

});
// =======================================
// Get Freelancer Reviews
// =======================================

const getFreelancerReviews = asyncHandler(async (req, res) => {

    const reviews = await Review.find({

        freelancer: req.params.freelancerId,

    })
    .populate("client", "fullName")
    .sort({ createdAt: -1 });

    res.json({

        success: true,

        total: reviews.length,

        reviews,

    });

});

// =======================================
// Get Freelancer Reputation
// =======================================

const getFreelancerReputation = asyncHandler(async (req, res) => {

    const reputation = await Reputation.findOne({

        freelancer: req.params.freelancerId,

    });

    if (!reputation) {

        return res.status(404).json({

            success: false,

            message: "Reputation not found",

        });

    }

    res.json({

        success: true,

        reputation,

    });

});

// =======================================
// Review Analytics
// =======================================

const getReviewAnalytics = asyncHandler(async (req, res) => {

    const reviews = await Review.find({

        freelancer: req.params.freelancerId,

    });

    const analytics = {

        totalReviews: reviews.length,

        fiveStar: reviews.filter(r => r.overallRating === 5).length,

        fourStar: reviews.filter(r => r.overallRating === 4).length,

        threeStar: reviews.filter(r => r.overallRating === 3).length,

        twoStar: reviews.filter(r => r.overallRating === 2).length,

        oneStar: reviews.filter(r => r.overallRating === 1).length,

        verifiedReviews: reviews.filter(r => r.isVerified).length,

        suspiciousReviews: reviews.filter(r => r.isSuspicious).length,

    };

    res.json({

        success: true,

        analytics,

    });

});
module.exports = {

    submitReview,
    getFreelancerReviews,
    getFreelancerReputation,
    getReviewAnalytics,

};