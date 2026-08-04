const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
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

    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
        required: true,
    },

    overallRating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },

    communication: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },

    quality: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },

    deadline: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },

    professionalism: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },

    review: {
        type: String,
        required: true,
        trim: true,
    },

    isVerified: {
        type: Boolean,
        default: true,
    },

    fraudScore: {
        type: Number,
        default: 0,
    },

    isSuspicious: {
        type: Boolean,
        default: false,
    },

    sentiment: {
        type: String,
        enum: [
            "Positive",
            "Neutral",
            "Negative",
        ],
        default: "Positive",
    }

},
{
    timestamps: true,
});

module.exports = mongoose.model(
    "Review",
    reviewSchema
);