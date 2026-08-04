const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
{
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    freelancer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },

    milestone: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Milestone",
        default: null,
    },
    

    amount: {
        type: Number,
        required: true,
    },
    platformFee: {
        type: Number,
        default: 0,
    },
    
    freelancerAmount: {
        type: Number,
        default: 0,
    },
    
    platformFeePercentage: {
        type: Number,
        default: 10,
    },

    currency: {
        type: String,
        default: "INR",
    },

    status: {
        type: String,
        enum: [
            "Pending",
            "Escrow",
            "Released",
            "Refunded",
            "Cancelled",
        ],
        default: "Pending",
    },

    razorpayOrderId: {
        type: String,
        default: "",
    },

    razorpayPaymentId: {
        type: String,
        default: "",
    },

    razorpaySignature: {
        type: String,
        default: "",
    },

    paidAt: {
        type: Date,
        default: null,
    },

    releasedAt: {
        type: Date,
        default: null,
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("Payment", paymentSchema);