const express = require("express");
const router = express.Router();

const {
    protect,
    clientOnly,
    freelancerOnly,
} = require("../middleware/authMiddleware");

const {
    sendInvitation,
    getClientInvitations,
    getFreelancerInvitations,
    respondInvitation,
    acceptInvitation,
    rejectInvitation,
    getInvitationSummary,
} = require("../controllers/invitationController");

// ================================
// Client sends invitation
// ================================
router.post(
    "/send",
    protect,
    clientOnly,
    sendInvitation
);

// ================================
// Client views all invitations
// ================================
router.get(
    "/client",
    protect,
    clientOnly,
    getClientInvitations
);

// ================================
// Freelancer views invitations
// ================================
router.get(
    "/freelancer",
    protect,
    freelancerOnly,
    getFreelancerInvitations
);

// ================================
// Freelancer accepts/rejects invitation
// ================================
router.put(
    "/:id/respond",
    protect,
    freelancerOnly,
    respondInvitation
);


router.put(
    "/:invitationId/accept",
    protect,
    freelancerOnly,
    acceptInvitation
);

router.put(
    "/:invitationId/reject",
    protect,
    freelancerOnly,
    rejectInvitation
);
router.get(
    "/summary",
    protect,
    freelancerOnly,
    getInvitationSummary
);
module.exports = router;