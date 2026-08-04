const asyncHandler = require("express-async-handler");
const crypto = require("crypto");

const razorpay = require("../config/razorpay");

const Payment = require("../models/Payment");
const Project = require("../models/Project");
const Wallet = require("../models/Wallet");
const Transaction = require("../models/Transaction");
const Notification = require("../models/Notification");
const { getIO } = require("../socket/socketInstance");
// ======================================
// Create Payment Order
// ======================================

const createPaymentOrder = asyncHandler(async (req, res) => {

    const {

        projectId,

        amount,

    } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {

        return res.status(404).json({

            success:false,

            message:"Project not found",

        });

    }

    const options = {

        amount: amount * 100,

        currency: "INR",

        receipt: `receipt_${Date.now()}`,

    };

    const order = await razorpay.orders.create(options);

    if (!project.freelancer) {
        return res.status(400).json({
            success: false,
            message: "No freelancer has been assigned to this project yet.",
        });
    }

    const platformFeePercentage = 10;

const platformFee = Number(
    (amount * platformFeePercentage / 100).toFixed(2)
);

const freelancerAmount = Number(
    (amount - platformFee).toFixed(2)
);
    
const payment = await Payment.create({

    client: req.user._id,

    freelancer: project.freelancer,

    project: projectId,

    amount,

    platformFee,

    freelancerAmount,

    platformFeePercentage,

    status: "Pending",

    razorpayOrderId: order.id,

});

    res.status(201).json({

        success:true,

        order,

        payment,

    });

});

// ======================================
// Verify Payment
// ======================================

const verifyPayment = asyncHandler(async (req, res) => {

    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
    } = req.body;

    const generatedSignature = crypto
        .createHmac(
            "sha256",
            process.env.RAZORPAY_KEY_SECRET
        )
        .update(
            razorpay_order_id + "|" + razorpay_payment_id
        )
        .digest("hex");

    if (generatedSignature !== razorpay_signature) {

        return res.status(400).json({

            success: false,

            message: "Payment verification failed",

        });

    }

    const payment = await Payment.findOne({

        razorpayOrderId: razorpay_order_id,

    });

    if (!payment) {

        return res.status(404).json({

            success: false,

            message: "Payment not found",

        });

    }

    if (payment.status === "Escrow" || payment.status === "Released") {

        return res.status(400).json({

            success: false,

            message: "Payment already verified",

        });

    }

    payment.status = "Escrow";

    const AdminWallet = require("../models/AdminWallet");


let adminWallet = await AdminWallet.findOne();


if(!adminWallet){

    adminWallet = await AdminWallet.create({

        balance:0,
        totalEarned:0,
        withdrawn:0

    });

}



adminWallet.balance += payment.platformFee;

adminWallet.totalEarned += payment.platformFee;


await adminWallet.save();

    payment.razorpayPaymentId = razorpay_payment_id;

    payment.razorpaySignature = razorpay_signature;

    payment.paidAt = new Date();

    await payment.save();

    await Notification.create({

        recipient: payment.freelancer,
    
        title: "Payment Received",
    
        message: `A payment of ₹${payment.amount} has been placed in escrow.`,
    
        type: "payment",
    
    });
    
    const io = getIO();

io?.to(payment.freelancer.toString()).emit("newNotification", {
    
        title: "Payment Received",
    
        message: `A payment of ₹${payment.amount} has been placed in escrow.`,
    
    });


    // ================= Wallet =================

    let wallet = await Wallet.findOne({

        user: payment.freelancer,

    });

    if (!wallet) {

        wallet = await Wallet.create({

            user: payment.freelancer,
            

        });

    }

    wallet.lockedBalance += payment.freelancerAmount;

    await wallet.save();
    


    // ================= Transaction =================

    const transaction = await Transaction.create({

        user: payment.freelancer,

        payment: payment._id,

        amount: payment.freelancerAmount,

        type: "Escrow",

        status: "Completed",

        description: "Payment placed into escrow",

    });

    res.status(200).json({

        success: true,

        message: "Payment verified successfully",

        payment,

        wallet,

        transaction,

    });

});


const releasePayment = asyncHandler(async (req, res) => {

    const { paymentId } = req.params;


    const payment = await Payment.findById(paymentId);


    if (!payment) {

        return res.status(404).json({

            success: false,

            message: "Payment not found",

        });

    }



    // Payment must be in escrow

    if (payment.status !== "Escrow") {

        return res.status(400).json({

            success: false,

            message: `Payment cannot be released. Current status: ${payment.status}`,

        });

    }



    const wallet = await Wallet.findOne({

        user: payment.freelancer,

    });



    if (!wallet) {

        return res.status(404).json({

            success: false,

            message: "Freelancer wallet not found",

        });

    }



    // ==============================
    // Move Escrow Money
    // ==============================


    wallet.lockedBalance -= payment.freelancerAmount;


    if(wallet.lockedBalance < 0){

        wallet.lockedBalance = 0;

    }


    wallet.availableBalance += payment.freelancerAmount;


    wallet.lifetimeEarnings += payment.freelancerAmount;



    await wallet.save();





    // ==============================
    // Update Payment
    // ==============================


    payment.status = "Released";

    payment.releasedAt = new Date();


    await payment.save();






    // ==============================
    // Notification
    // ==============================


    await Notification.create({

        recipient: payment.freelancer,

        title: "Payment Released",

        message: `₹${payment.freelancerAmount} has been released to your wallet.`,

        type: "payment",

    });



    const io = getIO();


    io?.to(
        payment.freelancer.toString()
    )
    .emit(
        "newNotification",
        {

            title: "Payment Released",

            message:
            `₹${payment.freelancerAmount} has been released to your wallet.`

        }
    );







    // ==============================
    // Complete Project
    // ==============================


    const project = await Project.findById(
        payment.project
    );


    if(project){

        project.status = "Completed";

        await project.save();

    }







    // ==============================
    // Transaction
    // ==============================


    const transaction = await Transaction.create({

        user: payment.freelancer,

        payment: payment._id,

        amount: payment.freelancerAmount,

        type: "Release",

        status: "Completed",

        description:
        "Escrow released to freelancer",

    });







    res.status(200).json({

        success:true,

        message:"Payment released successfully",

        payment,

        wallet,

        transaction,

    });



});
const refundPayment = asyncHandler(async (req, res) => {

    const { paymentId } = req.params;

    const payment = await Payment.findById(paymentId);

    if (!payment) {
        return res.status(404).json({
            success: false,
            message: "Payment not found",
        });
    }

    // Refund allowed only while in escrow
    if (payment.status !== "Escrow") {
        return res.status(400).json({
            success: false,
            message: "Only escrow payments can be refunded.",
        });
    }

    // Find freelancer wallet
    const wallet = await Wallet.findOne({
        user: payment.freelancer,
    });

    if (!wallet) {
        return res.status(404).json({
            success: false,
            message: "Freelancer wallet not found",
        });
    }

    // Remove money from escrow
    wallet.lockedBalance -= payment.freelancerAmount;

    if (wallet.lockedBalance < 0) {
        wallet.lockedBalance = 0;
    }

    await wallet.save();

    // Update payment
    payment.status = "Refunded";

    await payment.save();

    // Create refund transaction
    const transaction = await Transaction.create({

        user: payment.freelancer,

        payment: payment._id,

        amount: payment.freelancerAmount,

        type: "Refund",

        status: "Completed",

        description: "Payment refunded to client",

    });

    res.status(200).json({

        success: true,

        message: "Refund processed successfully",

        payment,

        wallet,

        transaction,

    });
    await Notification.create({

        recipient: payment.client,
    
        title: "Refund Processed",
    
        message: `Your refund of ₹${payment.amount} has been processed.`,
    
        type: "payment",
    
    });
    
    const io = getIO();

    io?.to(payment.client.toString()).emit(... {
    
        title: "Refund Processed",
    
        message: `Your refund of ₹${payment.amount} has been processed.`,
    
    });

    await Notification.create({

        recipient: payment.freelancer,
    
        title: "Payment Refunded",
    
        message: `A payment of ₹${payment.amount} has been refunded to the client.`,
    
        type: "payment",
    
    });
    
    io?.to(payment.freelancer.toString()).emit("newNotification", {
    
        title: "Payment Refunded",
    
        message: `A payment of ₹${payment.amount} has been refunded to the client.`,
    
    });

});

// ======================================
// Get Logged In Client Payments
// ======================================
const getClientPayments = asyncHandler(async (req, res) => {

    const payments = await Payment.find({
        client: req.user._id
    })
    .populate("project",    "title description budget")
    .populate("freelancer", "fullName profileImage")
    .sort({
        createdAt: -1
    });


    res.status(200).json({

        success: true,

        payments

    });

});
module.exports={

    createPaymentOrder,

    verifyPayment,

    releasePayment,
    
    refundPayment,

    getClientPayments,


};