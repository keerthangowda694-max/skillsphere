const mongoose = require("mongoose");

const projectProgressSchema = new mongoose.Schema(

{

    project:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"Project",

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

    title:{

        type:String,

        required:true,

        trim:true,

    },

    description:{

        type:String,

        default:"",

    },

    percentage:{

        type:Number,

        min:0,

        max:100,

        required:true,

    },

    status:{

        type:String,

        enum:[

            "Not Started",

            "In Progress",

            "Review",

            "Completed"

        ],

        default:"In Progress",

    },

    attachments:[

        {

            type:String,

        }

    ],

    evidence:[

        {

            type:String,

        }

    ],

    isApproved:{

        type:Boolean,

        default:false,

    },

    approvedAt:{

        type:Date,

    },

    feedback:{

        type:String,

        default:"",

    }

},

{

    timestamps:true,

}

);

module.exports = mongoose.model(

    "ProjectProgress",

    projectProgressSchema

);