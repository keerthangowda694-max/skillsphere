const express = require("express");

const router = express.Router();

const {
    protect,
} = require("../middleware/authMiddleware");

const {

    getMyNotifications,

    markNotificationRead,

    markAllNotificationsRead,

    deleteNotification,

} = require("../controllers/notificationController");

// ======================================
// Get All Notifications
// ======================================
router.get(
    "/",
    protect,
    getMyNotifications
);

// ======================================
// Mark Single Notification Read
// ======================================
router.put(
    "/read/:id",
    protect,
    markNotificationRead
);

// ======================================
// Mark All Notifications Read
// ======================================
router.put(
    "/read-all",
    protect,
    markAllNotificationsRead
);

// ======================================
// Delete Notification
// ======================================
router.delete(
    "/:id",
    protect,
    deleteNotification
);

module.exports = router;