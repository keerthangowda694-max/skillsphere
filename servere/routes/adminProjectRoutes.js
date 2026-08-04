const express = require("express");

const router = express.Router();

const {
    getPendingProjects,
    approveProject,
    rejectProject,
} = require("../controllers/adminProjectController");

const {
    protect,
    adminOnly,
} = require("../middleware/authMiddleware");

router.get(
    "/projects/pending",
    protect,
    adminOnly,
    getPendingProjects
);

router.put(
    "/projects/:projectId/approve",
    protect,
    adminOnly,
    approveProject
);

router.put(
    "/projects/:projectId/reject",
    protect,
    adminOnly,
    rejectProject
);

module.exports = router;