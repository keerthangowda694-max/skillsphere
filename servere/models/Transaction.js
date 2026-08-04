const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(

{

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
    },

    amount: {
        type: Number,
        required: true,
    },

    type: {
        type: String,
        enum: [
            "Credit",
            "Debit",
            "Escrow",
            "Release",
            "Withdrawal",
            "Refund",
            "Commission",
        ],
        required: true,
    },

    status: {
        type: String,
        enum: [
            "Pending",
            "Completed",
            "Failed",
        ],
        default: "Completed",
    },

    description: {
        type: String,
        default: "",
    },

},

{
    timestamps: true,
}

);

module.exports = mongoose.model(
    "Transaction",
    transactionSchema
);