const mongoose = require("mongoose");

const workSubmissionSchema = new mongoose.Schema(
{
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },

    freelancer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    files: [
        {
            filename: String,
            url: String
        }
    ],

    status: {
        type: String,
        enum:[
            "Pending Review",
            "Approved",
            "Changes Requested"
        ],
        default:"Pending Review"
    },

    submittedAt:{
        type:Date,
        default:Date.now
    },

    reviewedAt:{
        type:Date
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "WorkSubmission",
    workSubmissionSchema
);