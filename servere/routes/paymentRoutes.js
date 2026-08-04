const express = require("express");

const router = express.Router();


const {
    protect,
    clientOnly
} = require("../middleware/authMiddleware");


const {

    createPaymentOrder,

    verifyPayment,

    releasePayment,

    refundPayment,

    getClientPayments

} = require("../controllers/paymentController");




// ======================================
// Create Razorpay Order
// ======================================

router.post(

    "/create",

    protect,

    clientOnly,

    createPaymentOrder

);




// ======================================
// Verify Payment
// ======================================

router.post(

    "/verify",

    protect,

    verifyPayment

);




// ======================================
// Get Client Payments
// ======================================

router.get(

    "/client",

    protect,

    clientOnly,

    getClientPayments

);




// ======================================
// Release Payment
// ======================================

router.put(

    "/release/:paymentId",

    protect,

    clientOnly,

    releasePayment

);




// ======================================
// Refund Payment
// ======================================

router.put(

    "/refund/:paymentId",

    protect,

    clientOnly,

    refundPayment

);



module.exports = router;