const mongoose = require("mongoose");

const disputeSchema = new mongoose.Schema(

{

    project:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"Project",

        required:true,

    },

    payment:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"Payment",

        required:true,

    },

    client:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"User",

        required:true,

    },

    freelancer:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"User",

        required:true,

    },

    reason:{

        type:String,

        required:true,

    },

    description:{

        type:String,

        required:true,

    },

    evidence:[

        {

            type:String,

        }

    ],

    freelancerResponse:{

        type:String,

        default:"",

    },

    status:{

        type:String,

        enum:[

            "Pending",

            "Under Review",

            "Resolved",

            "Rejected"

        ],

        default:"Pending",

    },

    resolution:{

        type:String,

        enum:[

            "Refund Client",

            "Release Freelancer",

            "Partial Refund",

            "None"

        ],

        default:"None",

    },

    resolvedBy:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"User",

    },

    resolvedAt:Date,

},

{

    timestamps:true,

}

);

module.exports=mongoose.model(
    "Dispute",
    disputeSchema
);