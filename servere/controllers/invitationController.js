const asyncHandler = require("express-async-handler");

const Invitation = require("../models/Invitation");
const Project = require("../models/Project");
const User = require("../models/User");

const Notification = require("../models/Notification");

// ======================================
// Send Invitation
// ======================================
const sendInvitation = asyncHandler(async (req, res) => {

    const { projectId, freelancerId, message } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
        return res.status(404).json({
            success: false,
            message: "Project not found",
        });
    }

    const freelancer = await User.findById(freelancerId);

    if (!freelancer || freelancer.role !== "freelancer") {
        return res.status(404).json({
            success: false,
            message: "Freelancer not found",
        });
    }

    const alreadyInvited = await Invitation.findOne({
        project: projectId,
        freelancer: freelancerId,
    });

    if (alreadyInvited) {
        return res.status(400).json({
            success: false,
            message: "Freelancer already invited",
        });
    }

    const invitation = await Invitation.create({

        project: projectId,

        client: req.user._id,

        freelancer: freelancerId,

        message,

    });

    res.status(201).json({

        success: true,

        message: "Invitation sent successfully",

        invitation,

    });

});

// ======================================
// Client Invitations
// ======================================
const getClientInvitations = asyncHandler(async (req, res) => {

    const invitations = await Invitation.find({
        client: req.user._id,
    })
        .populate("project", "title")
        .populate("freelancer", "fullName email");

    res.json({

        success: true,

        total: invitations.length,

        invitations,

    });

});

// ======================================
// Freelancer Invitations
// ======================================
const getFreelancerInvitations = asyncHandler(async (req, res) => {

    const invitations = await Invitation.find({
        freelancer: req.user._id,
    })
        .populate("project", "title budget")
        .populate("client", "fullName email");

    res.json({

        success: true,

        total: invitations.length,

        invitations,

    });

});

// ======================================
// Respond Invitation
// ======================================
const respondInvitation = asyncHandler(async (req, res) => {

    const { status } = req.body;

    const invitation = await Invitation.findById(req.params.id);

    if (!invitation) {

        return res.status(404).json({

            success: false,

            message: "Invitation not found",

        });

    }

    if (invitation.freelancer.toString() !== req.user._id.toString()) {

        return res.status(403).json({

            success: false,

            message: "Access denied",

        });

    }

    invitation.status = status;

    await invitation.save();

    res.json({

        success: true,

        message: "Invitation updated",

        invitation,

    });

});




// ======================================
// Accept Invitation
// ======================================

const acceptInvitation = asyncHandler(async (req, res) => {

    const { invitationId } = req.params;

    const invitation = await Invitation.findById(invitationId);

    if (!invitation) {
        return res.status(404).json({
            success: false,
            message: "Invitation not found",
        });
    }

    if (invitation.freelancer.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            success: false,
            message: "Not authorized",
        });
    }

    if (invitation.status !== "Pending") {
        return res.status(400).json({
            success: false,
            message: "Invitation already processed",
        });
    }

    invitation.status = "Accepted";

    await invitation.save();

    const project = await Project.findById(invitation.project);

    if (project) {

        project.freelancer = invitation.freelancer;

        project.status = "In Progress";

        await project.save();

    }

    // Notification for Freelancer
    await Notification.create({

        recipient: invitation.freelancer,

        title: "Proposal Accepted",

        message: `Congratulations! Your proposal for "${project.title}" has been accepted.`,

        type: "invitation",

    });

    // Notification for Client
    await Notification.create({

        recipient: invitation.client,

        title: "Invitation Accepted",

        message: `${req.user.fullName} accepted your invitation for "${project.title}".`,

        type: "invitation",

    });

    // Real-time notifications (if Socket.IO is available)
    if (req.io) {

        req.io.to(invitation.freelancer.toString()).emit("newNotification", {

            title: "Proposal Accepted",

            message: `Congratulations! Your proposal for "${project.title}" has been accepted.`,

            type: "invitation",

        });

        req.io.to(invitation.client.toString()).emit("newNotification", {

            title: "Invitation Accepted",

            message: `${req.user.fullName} accepted your invitation for "${project.title}".`,

            type: "invitation",

        });

    }

    res.status(200).json({

        success: true,

        message: "Invitation accepted successfully",

        invitation,

        project,

    });

});


// ======================================
// Reject Invitation
// ======================================

const rejectInvitation = asyncHandler(async (req, res) => {

    const { invitationId } = req.params;

    const invitation = await Invitation.findById(invitationId);

    if (!invitation) {
        return res.status(404).json({
            success: false,
            message: "Invitation not found",
        });
    }

    if (invitation.freelancer.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            success: false,
            message: "Not authorized",
        });
    }

    invitation.status = "Rejected";

    await invitation.save();

    await Notification.create({

        recipient: invitation.client,

        title: "Invitation Rejected",

        message: `${req.user.fullName} rejected your invitation.`,

        type: "invitation",

    });

    if (req.io) {

        req.io.to(invitation.client.toString()).emit("newNotification", {

            title: "Invitation Rejected",

            message: `${req.user.fullName} rejected your invitation.`,

            type: "invitation",

        });

    }

    res.status(200).json({

        success: true,

        message: "Invitation rejected successfully",

        invitation,

    });

});
const getInvitationSummary = asyncHandler(async (req, res) => {
    

    const invitations = await Invitation.find({
        freelancer: req.user._id,
    })
        .populate("project", "title")
        .populate("client", "fullName")
        .populate("freelancer", "fullName");

   

    const pending = invitations.filter(
        (i) => i.status === "Pending"
    ).length;

    const accepted = invitations.filter(
        (i) => i.status === "Accepted"
    ).length;

    const rejected = invitations.filter(
        (i) => i.status === "Rejected"
    ).length;

    res.status(200).json({
        success: true,
        summary: {
            pending,
            accepted,
            rejected,
            total: invitations.length,
        },
        invitations, // Remove this after debugging
    });
});


module.exports = {

    sendInvitation,

    getClientInvitations,

    getFreelancerInvitations,

    respondInvitation,

    
    acceptInvitation,

    rejectInvitation,

    getInvitationSummary,


};