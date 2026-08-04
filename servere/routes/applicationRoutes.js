const express = require("express");

const router = express.Router();

const {
    protect,
    freelancerOnly,
    clientOnly,
} = require("../middleware/authMiddleware");

const {

    applyToProject,
    getMyApplications,
    getProjectApplications,
    updateApplicationStatus,
    hireFreelancer,
    withdrawApplication,
    trackApplication,
    submitProposal,
    getClientApplications,
} = require("../controllers/applicationController");

router.post(
    "/apply",
    protect,
    freelancerOnly,
    applyToProject,
    
);

router.get(
    "/my",
    protect,
    freelancerOnly,
    getMyApplications
);

router.get(
    "/project/:projectId",
    protect,
    clientOnly,
    getProjectApplications
);

router.put(
    "/:id/status",
    protect,
    clientOnly,
    updateApplicationStatus
);

router.put(
    "/hire/:id",
    protect,
    clientOnly,
    hireFreelancer
);

router.delete(
    "/:id",
    protect,
    freelancerOnly,
    withdrawApplication
);

router.get(
    "/track/:id",
    protect,
    trackApplication
);

router.put(
    "/proposal/:id",
    protect,
    freelancerOnly,
    submitProposal
);

router.get(
    "/client",
    protect,
    clientOnly,
    getClientApplications
);

module.exports = router;