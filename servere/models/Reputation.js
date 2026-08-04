const mongoose = require("mongoose");

const reputationSchema = new mongoose.Schema(
{
    freelancer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },

    averageRating: {
        type: Number,
        default: 0,
    },

    reputationScore: {
        type: Number,
        default: 0,
    },

    totalReviews: {
        type: Number,
        default: 0,
    },

    verifiedReviews: {
        type: Number,
        default: 0,
    },

    completionRate: {
        type: Number,
        default: 100,
    },

    onTimeRate: {
        type: Number,
        default: 100,
    },

    repeatClients: {
        type: Number,
        default: 0,
    },

    communicationScore: {
        type: Number,
        default: 0,
    },

    qualityScore: {
        type: Number,
        default: 0,
    },

    deadlineScore: {
        type: Number,
        default: 0,
    },

    professionalismScore: {
        type: Number,
        default: 0,
    },

    positiveReviews: {
        type: Number,
        default: 0,
    },

    neutralReviews: {
        type: Number,
        default: 0,
    },

    negativeReviews: {
        type: Number,
        default: 0,
    }

},
{
    timestamps: true,
});

module.exports = mongoose.model(
    "Reputation",
    reputationSchema
);