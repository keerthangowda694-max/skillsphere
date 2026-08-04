const asyncHandler = require("express-async-handler");

const Payment = require("../models/Payment");

const Review = require("../models/Review");

const Transaction = require("../models/Transaction");

// ======================================
// Get All Payments
// ======================================

const getAllPayments = asyncHandler(async (req, res) => {

    const payments = await Payment.find()

        .populate("client", "fullName email")

        .populate("freelancer", "fullName email")

        .populate("project", "title")

        .sort({ createdAt: -1 });

    res.json({

        success: true,

        total: payments.length,

        payments,

    });

});

// ======================================
// Payment Statistics
// ======================================

const getPaymentStats = asyncHandler(async (req, res) => {

    const totalPayments = await Payment.countDocuments();

    const escrow = await Payment.countDocuments({

        status: "Escrow",

    });

    const released = await Payment.countDocuments({

        status: "Released",

    });

    const refunded = await Payment.countDocuments({

        status: "Refunded",

    });

    const revenue = await Payment.aggregate([

        {

            $match: {

                status: "Released",

            },

        },

        {

            $group: {

                _id: null,

                total: {

                    $sum: "$amount",

                },

            },

        },

    ]);

    res.json({

        success: true,

        statistics: {

            totalPayments,

            escrow,

            released,

            refunded,

            totalRevenue:

                revenue.length ? revenue[0].total : 0,

        },

    });

});

// ======================================
// Fraud Dashboard
// ======================================

const fraudDashboard = asyncHandler(async (req, res) => {

    const suspiciousReviews = await Review.find({

        isSuspicious: true,

    })

    .populate("client", "fullName")

    .populate("freelancer", "fullName");

    const highWithdrawals = await Transaction.find({

        type: "Withdrawal",

        amount: {

            $gte: 100000,

        },

    }).populate("user", "fullName email");

    res.json({

        success: true,

        suspiciousReviews,

        highWithdrawals,

    });

});

module.exports = {

    getAllPayments,
    getPaymentStats,
    fraudDashboard,

};