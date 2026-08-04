const asyncHandler = require("express-async-handler");

const Dispute = require("../models/Dispute");
const Payment = require("../models/Payment");
const Notification = require("../models/Notification");

// ======================================
// Open Dispute
// ======================================

const openDispute = asyncHandler(async (req, res) => {

    const {
        paymentId,
        reason,
        description,
        evidence,
    } = req.body;

    const payment = await Payment.findById(paymentId);

    if (!payment) {

        return res.status(404).json({

            success: false,

            message: "Payment not found",

        });

    }

    if (payment.client.toString() !== req.user._id.toString()) {

        return res.status(403).json({

            success: false,

            message: "Only the client can open a dispute",

        });

    }

    const existing = await Dispute.findOne({

        payment: paymentId,

    });

    if (existing) {

        return res.status(400).json({

            success: false,

            message: "Dispute already exists for this payment",

        });

    }

    const dispute = await Dispute.create({

        payment: payment._id,

        project: payment.project,

        client: payment.client,

        freelancer: payment.freelancer,

        reason,

        description,

        evidence,

    });

    await Notification.create({

        recipient: payment.freelancer,

        title: "New Dispute Opened",

        message: "A client has opened a dispute for one of your projects.",

        type: "dispute",

    });

    if (req.io) {

        req.io.to(payment.freelancer.toString()).emit(

            "newNotification",

            {

                title: "New Dispute Opened",

                message: "A client has opened a dispute for one of your projects.",

                type: "dispute",

            }

        );

    }

    res.status(201).json({

        success: true,

        message: "Dispute opened successfully",

        dispute,

    });

});


// ======================================
// Get My Disputes
// ======================================

const getMyDisputes = asyncHandler(async (req, res) => {

    const disputes = await Dispute.find({

        $or: [

            { client: req.user._id },

            { freelancer: req.user._id },

        ],

    })
    .populate("payment")
    .populate("project")
    .sort({

        createdAt: -1,

    });

    res.json({

        success: true,

        total: disputes.length,

        disputes,

    });

});


// ======================================
// Freelancer Respond
// ======================================

const respondToDispute = asyncHandler(async (req, res) => {

    const { disputeId } = req.params;

    const { response } = req.body;

    const dispute = await Dispute.findById(disputeId);

    if (!dispute) {

        return res.status(404).json({

            success: false,

            message: "Dispute not found",

        });

    }

    if (dispute.freelancer.toString() !== req.user._id.toString()) {

        return res.status(403).json({

            success: false,

            message: "Not authorized",

        });

    }

    dispute.freelancerResponse = response;

    dispute.status = "Under Review";

    await dispute.save();

    await Notification.create({

        recipient: dispute.client,

        title: "Dispute Updated",

        message: "The freelancer has responded to your dispute.",

        type: "dispute",

    });

    if (req.io) {

        req.io.to(dispute.client.toString()).emit(

            "newNotification",

            {

                title: "Dispute Updated",

                message: "The freelancer has responded to your dispute.",

                type: "dispute",

            }

        );

    }

    res.json({

        success: true,

        message: "Response submitted successfully",

        dispute,

    });

});
// ======================================
// Get All Disputes (Admin)
// ======================================

const getAllDisputes = asyncHandler(async (req, res) => {

    const disputes = await Dispute.find()

        .populate("client", "fullName email")

        .populate("freelancer", "fullName email")

        .populate("project", "title")

        .populate("payment")

        .sort({ createdAt: -1 });

    res.status(200).json({

        success: true,

        total: disputes.length,

        disputes,

    });

});

// ======================================
// Resolve Dispute (Admin)
// ======================================

const resolveDispute = asyncHandler(async (req, res) => {

    const { disputeId } = req.params;

    const { resolution } = req.body;

    const dispute = await Dispute.findById(disputeId);

    if (!dispute) {

        return res.status(404).json({

            success: false,

            message: "Dispute not found",

        });

    }

    if (dispute.status === "Resolved") {

        return res.status(400).json({

            success: false,

            message: "Dispute already resolved",

        });

    }

    const payment = await Payment.findById(dispute.payment);

    if (!payment) {

        return res.status(404).json({

            success: false,

            message: "Payment not found",

        });

    }

    // ======================================
    // Refund Client
    // ======================================

    if (resolution === "Refund Client") {

        payment.status = "Refunded";

        await payment.save();

    }

    // ======================================
    // Release Payment
    // ======================================

    if (resolution === "Release Freelancer") {

        payment.status = "Released";

        payment.releasedAt = new Date();

        await payment.save();

    }

    dispute.status = "Resolved";

    dispute.resolution = resolution;

    dispute.resolvedBy = req.user._id;

    dispute.resolvedAt = new Date();

    await dispute.save();

    // Notify Client

    await Notification.create({

        recipient: dispute.client,

        title: "Dispute Resolved",

        message: `Your dispute has been resolved. Decision: ${resolution}`,

        type: "dispute",

    });

    // Notify Freelancer

    await Notification.create({

        recipient: dispute.freelancer,

        title: "Dispute Resolved",

        message: `The dispute has been resolved. Decision: ${resolution}`,

        type: "dispute",

    });

    if (req.io) {

        req.io.to(dispute.client.toString()).emit("newNotification", {

            title: "Dispute Resolved",

            message: `Decision: ${resolution}`,

            type: "dispute",

        });

        req.io.to(dispute.freelancer.toString()).emit("newNotification", {

            title: "Dispute Resolved",

            message: `Decision: ${resolution}`,

            type: "dispute",

        });

    }

    res.status(200).json({

        success: true,

        message: "Dispute resolved successfully",

        dispute,

        payment,

    });

});

module.exports = {

    openDispute,

    getMyDisputes,

    respondToDispute,

    getAllDisputes,

    resolveDispute,

};