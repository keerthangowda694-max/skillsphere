const express = require("express");
const router = express.Router();

const {
    submitWork,
    getMySubmissions,
    approveWork,
    requestChanges,
} = require("../controllers/workController");

const {
    protect,
    freelancerOnly,
    clientOnly,
} = require("../middleware/authMiddleware");

const upload = require("../middleware/projectUpload");


// =====================================
// Freelancer Submit Work
// =====================================
// POST /api/work/submit/:projectId

router.post(
    "/submit/:projectId",
    protect,
    freelancerOnly,
    upload.array("files", 5),
    submitWork
);


// =====================================
// Freelancer View Submitted Works
// =====================================
// GET /api/work/my

router.get(
    "/my",
    protect,
    freelancerOnly,
    getMySubmissions
);

router.put(
    "/client/work/:id/approve",
    protect,
    clientOnly,
    approveWork
    );
    
    
    router.put(
    "/client/work/:id/request-changes",
    protect,
    clientOnly,
    requestChanges
    );

module.exports = router;