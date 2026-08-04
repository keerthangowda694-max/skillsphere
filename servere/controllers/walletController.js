const asyncHandler = require("express-async-handler");

const Wallet = require("../models/Wallet");
const Transaction = require("../models/Transaction");
const Notification = require("../models/Notification");


// ======================================
// Get Freelancer Wallet
// ======================================

const getWallet = asyncHandler(async (req, res) => {


    let wallet = await Wallet.findOne({

        user: req.user._id

    });



    if (!wallet) {


        wallet = await Wallet.create({

            user: req.user._id,

            availableBalance: 0,

            lockedBalance: 0,

            lifetimeEarnings: 0,

            totalWithdrawn: 0

        });


    }



    res.status(200).json({

        success:true,

        wallet

    });


});





// ======================================
// Get Freelancer Withdrawal History
// ======================================

const getTransactions = asyncHandler(async(req,res)=>{


    const transactions = await Transaction.find({

        user:req.user._id,

        type:"Withdrawal"

    })
    .sort({

        createdAt:-1

    });



    res.status(200).json({

        success:true,

        total:transactions.length,

        transactions

    });


});







// ======================================
// Withdraw Money
// ======================================

const withdrawMoney = asyncHandler(async(req,res)=>{


    const amount = Number(req.body.amount);



    if(!amount || amount <= 0){

        return res.status(400).json({

            success:false,

            message:"Enter valid amount"

        });

    }



    const wallet = await Wallet.findOne({

        user:req.user._id

    });




    if(!wallet){


        return res.status(404).json({

            success:false,

            message:"Wallet not found"

        });


    }




    // Minimum withdrawal

    if(amount < 100){


        return res.status(400).json({

            success:false,

            message:"Minimum withdrawal amount is ₹100"

        });


    }




    // Balance check

    if(amount > wallet.availableBalance){


        return res.status(400).json({

            success:false,

            message:"Insufficient wallet balance"

        });


    }





    // Update wallet


    wallet.availableBalance =
        wallet.availableBalance - amount;



    wallet.totalWithdrawn =
        wallet.totalWithdrawn + amount;



    await wallet.save();







    // Create withdrawal history


    const transaction = await Transaction.create({

        user:req.user._id,

        amount:amount,

        type:"Withdrawal",

        status:"Completed",

        description:
        "Freelancer withdrawal processed"

    });







    // Notification


    await Notification.create({

        recipient:req.user._id,

        title:"Withdrawal Successful",

        message:
        `₹${amount} has been withdrawn from your wallet.`,

        type:"payment"

    });







    res.status(200).json({

        success:true,

        message:"Withdrawal successful",

        wallet,

        transaction

    });



});







module.exports = {


    getWallet,

    getTransactions,

    withdrawMoney


};