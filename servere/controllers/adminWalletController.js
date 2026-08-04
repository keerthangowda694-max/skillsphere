const asyncHandler = require("express-async-handler");

const Payment = require("../models/Payment");
const AdminWallet = require("../models/AdminWallet");



// ======================================
// Get Admin Wallet
// ======================================

const getAdminWallet = asyncHandler(async(req,res)=>{


// Calculate total platform earnings

const result = await Payment.aggregate([

    {
        $match:{
            status:"Released"
        }
    },

    {
        $group:{

            _id:null,

            totalEarned:{
                $sum:"$platformFee"
            }

        }

    }

]);



const totalEarned = 
result.length > 0
?
result[0].totalEarned
:
0;




let wallet = await AdminWallet.findOne();



if(!wallet){

wallet = await AdminWallet.create({

    balance: totalEarned,

    totalEarned: totalEarned,

    withdrawn:0

});

}
else{


wallet.balance = totalEarned - wallet.withdrawn;

wallet.totalEarned = totalEarned;


await wallet.save();


}




res.json({

success:true,

wallet

});



});









// ======================================
// Withdraw Platform Fee
// ======================================

const withdrawPlatformFee = asyncHandler(async(req,res)=>{


const {
amount
}=req.body;



const wallet = await AdminWallet.findOne();



if(!wallet){

return res.status(404).json({

success:false,

message:"Wallet not found"

});

}




if(amount > wallet.balance){


return res.status(400).json({

success:false,

message:"Insufficient balance"

});


}





wallet.balance -= Number(amount);


wallet.withdrawn += Number(amount);



await wallet.save();



res.json({

success:true,

message:"Platform fee withdrawn successfully",

wallet


});



});





module.exports={

getAdminWallet,

withdrawPlatformFee

};