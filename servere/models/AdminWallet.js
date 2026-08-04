const mongoose = require("mongoose");


const adminWalletSchema = new mongoose.Schema({

    balance:{
        type:Number,
        default:0
    },

    totalEarned:{
        type:Number,
        default:0
    },

    withdrawn:{
        type:Number,
        default:0
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "AdminWallet",
    adminWalletSchema
);