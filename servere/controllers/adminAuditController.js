const asyncHandler = require("express-async-handler");

const AuditLog = require("../models/AuditLog");

// ======================================
// Get All Audit Logs
// ======================================

const getAuditLogs = asyncHandler(async (req, res) => {

    const logs = await AuditLog.find()

        .populate("admin", "fullName email role")

        .sort({ createdAt: -1 });

    res.status(200).json({

        success: true,

        total: logs.length,

        logs,

    });

});

// ======================================
// Get Single Audit Log
// ======================================

const getAuditLogById = asyncHandler(async (req, res) => {

    const log = await AuditLog.findById(req.params.id)

        .populate("admin", "fullName email role");

    if (!log) {

        return res.status(404).json({

            success: false,

            message: "Audit log not found",

        });

    }

    res.status(200).json({

        success: true,

        log,

    });

});

// ======================================
// Get Logs By Admin
// ======================================

const getLogsByAdmin = asyncHandler(async (req, res) => {

    const logs = await AuditLog.find({

        admin: req.params.adminId,

    })

    .populate("admin", "fullName email")

    .sort({ createdAt: -1 });

    res.status(200).json({

        success: true,

        total: logs.length,

        logs,

    });

});

// ======================================
// Delete Audit Log (Optional)
// ======================================

const deleteAuditLog = asyncHandler(async (req, res) => {

    const log = await AuditLog.findById(req.params.id);

    if (!log) {

        return res.status(404).json({

            success: false,

            message: "Audit log not found",

        });

    }

    await log.deleteOne();

    res.status(200).json({

        success: true,

        message: "Audit log deleted successfully",

    });

});

module.exports = {

    getAuditLogs,

    getAuditLogById,

    getLogsByAdmin,

    deleteAuditLog,

};