const express = require("express");

const router = express.Router();

const {
    protect,
    clientOnly,
    freelancerOnly,
} = require("../middleware/authMiddleware");

const {

    createMilestone,

    updateMilestone,

    deleteMilestone,

    completeMilestone,

    getProjectMilestones,

    getProjectProgress,

} = require("../controllers/milestoneController");

router.post(
    "/:projectId",
    protect,
    clientOnly,
    createMilestone
);

router.put(
    "/:id",
    protect,
    clientOnly,
    updateMilestone
);

router.delete(
    "/:id",
    protect,
    clientOnly,
    deleteMilestone
);

router.put(
    "/:id/complete",
    protect,
    freelancerOnly,
    completeMilestone
);
router.get(
    "/project/:projectId",
    protect,
    getProjectMilestones
);

router.get(
    "/progress/:projectId",
    protect,
    getProjectProgress
);

module.exports = router;