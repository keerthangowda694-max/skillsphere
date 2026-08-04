const asyncHandler = require("express-async-handler");
const Notification = require("../models/Notification");

// ======================================
// Get My Notifications
// ======================================
const getMyNotifications = asyncHandler(async (req, res) => {

    const notifications = await Notification.find({
        recipient: req.user._id,
    })
        .populate("sender", "fullName email")
        .sort({ createdAt: -1 });

    res.json({
        success: true,
        total: notifications.length,
        notifications,
    });

});
// ======================================
// Mark Notification Read
// ======================================
const markNotificationRead = asyncHandler(async (req, res) => {

    const notification = await Notification.findById(req.params.id);

    if (!notification) {
        return res.status(404).json({
            success: false,
            message: "Notification not found",
        });
    }

    if (notification.recipient.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            success: false,
            message: "Access denied",
        });
    }

    notification.isRead = true;

    await notification.save();

    res.json({
        success: true,
        message: "Notification marked as read",
        notification,
    });

});
// ======================================
// Mark All Notifications Read
// ======================================
const markAllNotificationsRead = asyncHandler(async (req, res) => {

    await Notification.updateMany(
        {
            recipient: req.user._id,
            isRead: false,
        },
        {
            isRead: true,
        }
    );

    res.json({
        success: true,
        message: "All notifications marked as read",
    });

});
// ======================================
// Delete Notification
// ======================================
const deleteNotification = asyncHandler(async (req, res) => {

    const notification = await Notification.findById(req.params.id);

    if (!notification) {
        return res.status(404).json({
            success: false,
            message: "Notification not found",
        });
    }

    if (notification.recipient.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            success: false,
            message: "Access denied",
        });
    }

    await notification.deleteOne();

    res.json({
        success: true,
        message: "Notification deleted",
    });

});
module.exports = {

    getMyNotifications,

    markNotificationRead,

    markAllNotificationsRead,

    deleteNotification,

};