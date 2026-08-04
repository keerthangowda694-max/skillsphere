const express = require("express");

const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");

const {
    getDashboard,
} = require("../controllers/adminDashboardController");

router.get(
    "/",
    protect,
    adminOnly,
    getDashboard
);

module.exports = router;