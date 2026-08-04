const asyncHandler = require("express-async-handler");

const Application = require("../models/Application");
const Project = require("../models/Project");
const Conversation = require("../models/Conversation")

// =====================================
// Apply to Project
// =====================================
const applyToProject = asyncHandler(async (req, res) => {

    const {
        projectId,
        proposal,
        bidAmount,
        estimatedDays,
    } = req.body;
    

    // Check Project
    const project = await Project.findById(projectId);

    if (!project) {
        return res.status(404).json({
            success: false,
            message: "Project not found",
        });
    }

    // Only Open projects
    if (project.status !== "Open") {
        return res.status(400).json({
            success: false,
            message: "Project is not accepting applications",
        });
    }

    // Prevent Duplicate Application
    const alreadyApplied = await Application.findOne({
        project: projectId,
        freelancer: req.user._id,
    });

    if (alreadyApplied) {
        return res.status(400).json({
            success: false,
            message: "You have already applied for this project",
        });
    }

    // Create Application
    const application = await Application.create({

        project: projectId,

        freelancer: req.user._id,

        proposal,

        bidAmount,

        estimatedDays,

    });

    res.status(201).json({

        success: true,

        message: "Application submitted successfully",

        application,

    });

});
const getMyApplications = asyncHandler(async (req, res) => {

    const applications = await Application.find({
        freelancer: req.user._id,
    })
        .populate("project", "title budget deadline status")
        .sort({ createdAt: -1 });

    res.json({
        success: true,
        total: applications.length,
        applications,
    });

});

const getProjectApplications = asyncHandler(async (req, res) => {

    const applications = await Application.find({
        project: req.params.projectId,
    }).populate("freelancer", "-password");

    res.json({
        success: true,
        total: applications.length,
        applications,
    });

});

const updateApplicationStatus = asyncHandler(async (req, res) => {

    const { status } = req.body;

    const application = await Application.findById(req.params.id);

    if (!application) {
        return res.status(404).json({
            success: false,
            message: "Application not found",
        });
    }

    application.status = status;

    await application.save();

    res.json({
        success: true,
        message: "Status updated",
        application,
    });

});



const hireFreelancer = asyncHandler(async (req, res) => {

    const application = await Application.findById(req.params.id);

    if (!application) {
        return res.status(404).json({
            success: false,
            message: "Application not found",
        });
    }

    // Prevent hiring twice
    if (application.status === "Hired") {
        return res.status(400).json({
            success: false,
            message: "Freelancer already hired",
        });
    }

    // Update application
    application.status = "Hired";
    await application.save();

    // Find project
    const project = await Project.findById(application.project);

    if (!project) {
        return res.status(404).json({
            success: false,
            message: "Project not found",
        });
    }

    // Assign freelancer
    project.freelancer = application.freelancer;
    project.status = "In Progress";

    await project.save({ validateBeforeSave: false });

    // =====================================
    // CREATE CONVERSATION AUTOMATICALLY
    // =====================================

    let conversation = await Conversation.findOne({
        project: project._id,
        participants: {
            $all: [project.client, project.freelancer]
        }
    });

    if (!conversation) {

        conversation = await Conversation.create({

            project: project._id,

            participants: [
                project.client,
                project.freelancer
            ],

            lastMessage: "Conversation started",

            lastMessageAt: new Date(),

            isActive: true

        });

    }

    res.status(200).json({

        success: true,

        message: "Freelancer hired successfully",

        project,

        conversation

    });

});


const withdrawApplication = asyncHandler(async (req, res) => {

    const application = await Application.findById(req.params.id);

    if (!application) {
        return res.status(404).json({
            success: false,
            message: "Application not found",
        });
    }

    if (application.freelancer.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            success: false,
            message: "Access denied",
        });
    }

    await application.deleteOne();

    res.json({
        success: true,
        message: "Application withdrawn",
    });

});

const trackApplication = asyncHandler(async (req, res) => {

    const application = await Application.findById(req.params.id)
        .populate("project")
        .populate("freelancer", "fullName email");

    if (!application) {
        return res.status(404).json({
            success: false,
            message: "Application not found",
        });
    }

    res.json({
        success: true,
        application,
    });

});

const submitProposal = asyncHandler(async (req, res) => {

    const {
        proposal,
        bidAmount,
        estimatedDays,
    } = req.body;

    const application = await Application.findById(req.params.id);

    if (!application) {
        return res.status(404).json({
            success: false,
            message: "Application not found",
        });
    }

    // Only application owner can update
    if (application.freelancer.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            success: false,
            message: "Access denied",
        });
    }

    // Proposal can't be changed after hiring
    if (
        application.status === "Accepted" ||
        application.status === "Hired"
    ) {
        return res.status(400).json({
            success: false,
            message: "Proposal can no longer be updated",
        });
    }

    application.proposal =
        proposal || application.proposal;

    application.bidAmount =
        bidAmount ?? application.bidAmount;

    application.estimatedDays =
        estimatedDays ?? application.estimatedDays;

    await application.save();

    res.status(200).json({
        success: true,
        message: "Proposal submitted successfully",
        application,
    });

});
const getClientApplications = asyncHandler(async (req, res) => {

    const projects = await Project.find({
        client: req.user._id,
    }).select("_id");

    const projectIds = projects.map(project => project._id);

    const applications = await Application.find({
        project: { $in: projectIds },
    })
    .populate(
        "freelancer",
        "fullName email profileImage skills experience"
    )
    .populate(
        "project",
        `
        title
        description
        category
        requiredSkills
        budget
        experienceRequired
        deadline
        status
        `
    )
    .sort({ createdAt: -1 });

    res.json({
        success: true,
        total: applications.length,
        applications,
    });

});
module.exports = {
    applyToProject,
    getMyApplications,
    getProjectApplications,
    updateApplicationStatus,
    hireFreelancer,
    withdrawApplication,
    trackApplication,
    submitProposal,
    getClientApplications,
};