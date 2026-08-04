const express = require("express");

const router = express.Router();

const {

    getAllPayments,
    getPaymentStats,
    fraudDashboard,

} = require("../controllers/adminPaymentController");

const {

    protect,

    adminOnly,

} = require("../middleware/authMiddleware");

router.get(

    "/payments",

    protect,

    adminOnly,

    getAllPayments

);

router.get(

    "/payments/statistics",

    protect,

    adminOnly,

    getPaymentStats

);

router.get(

    "/fraud",

    protect,

    adminOnly,

    fraudDashboard

);

module.exports = router;