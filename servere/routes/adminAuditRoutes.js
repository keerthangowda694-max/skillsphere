const express = require("express");

const router = express.Router();

const {

    getAuditLogs,

    getAuditLogById,

    getLogsByAdmin,

    deleteAuditLog,

} = require("../controllers/adminAuditController");

const {

    protect,

    adminOnly,

} = require("../middleware/authMiddleware");

// ======================================
// Get All Audit Logs
// ======================================

router.get(

    "/audit",

    protect,

    adminOnly,

    getAuditLogs

);

// ======================================
// Get Audit Log By ID
// ======================================

router.get(

    "/audit/:id",

    protect,

    adminOnly,

    getAuditLogById

);

// ======================================
// Get Logs By Admin
// ======================================

router.get(

    "/audit/admin/:adminId",

    protect,

    adminOnly,

    getLogsByAdmin

);

// ======================================
// Delete Audit Log
// ======================================

router.delete(

    "/audit/:id",

    protect,

    adminOnly,

    deleteAuditLog

);

module.exports = router;