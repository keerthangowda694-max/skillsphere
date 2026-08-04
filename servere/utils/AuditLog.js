const AuditLog = require("../models/AuditLog");

const createAuditLog = async ({
    admin,
    action,
    targetType,
    targetId,
    description,
    ipAddress,
}) => {

    await AuditLog.create({

        admin,

        action,

        targetType,

        targetId,

        description,

        ipAddress,

    });

};

module.exports = createAuditLog;