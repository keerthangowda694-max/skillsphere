const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
{
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },

    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    ],

    lastMessage: {
        type: String,
        default: "",
    },

    lastMessageAt: {
        type: Date,
        default: Date.now,
    },

    isActive: {
        type: Boolean,
        default: true,
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model(
    "Conversation",
    conversationSchema
);