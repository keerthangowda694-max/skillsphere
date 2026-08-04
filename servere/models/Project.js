const mongoose = require("mongoose");


const projectSchema = new mongoose.Schema(

{

    client: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

    },


    freelancer: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        default: null,

    },



    title: {

        type: String,

        required: true,

        trim: true,

    },



    description: {

        type: String,

        required: true,

    },



    category: {

        type: String,

        required: true,

    },



    requiredSkills: [

        {

            type: String,

        }

    ],




    budget: {

        min: {

            type: Number,

            required:true,

        },


        max: {

            type:Number,

            required:true,

        }

    },




    experienceRequired: {

        type:String,

        default:"Beginner",

    },




    deadline: {

        type:Date,

    },





    // Project documents

    attachments:[

        {

            public_id:{

                type:String,

                required:true,

            },


            fileName:{

                type:String,

                required:true,

            },


            url:{

                type:String,

                required:true,

            },


            uploadedBy:{

                type:mongoose.Schema.Types.ObjectId,

                ref:"User",

            },


            uploadedAt:{

                type:Date,

                default:Date.now,

            }

        }

    ],




    status:{
        type:String,
        enum:[
            "Open",
            "Assigned",
            "In Progress",
            "Completed",
            "Cancelled"
        ],
        default:"Open"
    },
    progress: {
        type: Number,
        default: 0
    },
    

    completedAt:{
        type:Date
    },

    



    milestones:[

        {

            type:mongoose.Schema.Types.ObjectId,

            ref:"Milestone"

        }

    ],





    approvalStatus:{


        type:String,


        enum:[

            "Pending",

            "Approved",

            "Rejected"

        ],


        default:"Pending"


    },





    approvedBy:{


        type:mongoose.Schema.Types.ObjectId,

        ref:"User"


    },





    approvedAt:{


        type:Date


    },





    rejectionReason:{


        type:String,

        default:""


    },

    budget:{
        type:Number,
        required:true
    }




},



{

timestamps:true

}


);



module.exports = mongoose.model(
"Project",
projectSchema
);