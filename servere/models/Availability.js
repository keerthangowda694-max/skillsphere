const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({

    freelancer:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"User",

        required:true,

        unique:true,

    },

    status:{

        type:String,

        enum:[
            "Available",
            "Busy",
            "On Leave"
        ],

        default:"Available",

    },

    workingDays:[{

        type:String,

        enum:[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ]

    }],

    startTime:{

        type:String,

        default:"09:00",

    },

    endTime:{

        type:String,

        default:"18:00",

    },

    timezone:{

        type:String,

        default:"Asia/Kolkata",

    },

    vacationMode:{

        type:Boolean,

        default:false,

    }

},
{
    timestamps:true
});

module.exports=mongoose.model(
    "Availability",
    availabilitySchema
);