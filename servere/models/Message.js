const mongoose = require("mongoose");


const messageSchema = new mongoose.Schema(
{
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        required: true,
    },

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    message: {
        type: String,
        trim: true,
        default: "",
    },

    attachment: {
        type: String,
        default: "",
    },

    attachment: {

        url: {
            type: String,
            default: "",
        },
    
        public_id: {
            type: String,
            default: "",
        },
    
        fileName: {
            type: String,
            default: "",
        },
    
        fileType: {
            type: String,
            default: "",
        },
    
        fileSize: {
            type: Number,
            default: 0,
        },
    
    },

    readBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],

    isEdited: {
        type: Boolean,
        default: false,
    },

    isDeleted: {
        type: Boolean,
        default: false,
    },
    readBy: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            readAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    
    isDelivered: {
        type: Boolean,
        default: false,
    },

},
{
    timestamps: true,
});

module.exports = mongoose.model(
    "Message",
    messageSchema
);