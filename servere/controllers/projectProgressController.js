const asyncHandler = require("express-async-handler");

const ProjectProgress = require("../models/ProjectProgress");
const Project = require("../models/Project");
const Notification = require("../models/Notification");

// ======================================
// Add Progress
// ======================================

const addProgress = asyncHandler(async (req, res) => {

    const {
        projectId,
        title,
        description,
        percentage,
        status,
        attachments,
        evidence,
    } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {

        return res.status(404).json({

            success: false,

            message: "Project not found",

        });

    }

    const progress = await ProjectProgress.create({

        project: project._id,

        client: project.client,

        freelancer: project.freelancer,

        title,

        description,

        percentage,

        status,

        attachments,

        evidence,

    });

    await Notification.create({

        recipient: project.client,

        title: "Project Progress Updated",

        message: `${req.user.fullName} uploaded a new progress update.`,

        type: "project",

    });

    if (req.io) {

        req.io.to(project.client.toString()).emit(

            "newNotification",

            {

                title: "Project Progress Updated",

                message: `${req.user.fullName} uploaded a new progress update.`,

                type: "project",

            }

        );

    }

    res.status(201).json({

        success: true,

        message: "Progress added successfully",

        progress,

    });

});


// ======================================
// Update Progress
// ======================================

const updateProgress = asyncHandler(async (req, res) => {

    const progress = await ProjectProgress.findById(req.params.id);

    if (!progress) {

        return res.status(404).json({

            success: false,

            message: "Progress not found",

        });

    }

    if (progress.freelancer.toString() !== req.user._id.toString()) {

        return res.status(403).json({

            success: false,

            message: "Not authorized",

        });

    }

    Object.assign(progress, req.body);

    progress.isApproved = false;

    progress.approvedAt = null;

    await progress.save();

    res.json({

        success: true,

        message: "Progress updated successfully",

        progress,

    });

});


// ======================================
// Get Project Timeline
// ======================================

const getProjectProgress = asyncHandler(async (req, res) => {

    const progress = await ProjectProgress.find({

        project: req.params.projectId,

    })

    .sort({

        createdAt: 1,

    });

    res.json({

        success: true,

        total: progress.length,

        progress,

    });

});


// ======================================
// Approve Progress
// ======================================

const approveProgress = asyncHandler(async (req, res) => {

    const progress = await ProjectProgress.findById(req.params.id);

    if (!progress) {

        return res.status(404).json({

            success: false,

            message: "Progress not found",

        });

    }

    progress.isApproved = true;

    progress.approvedAt = new Date();

    await progress.save();

    await Notification.create({

        recipient: progress.freelancer,

        title: "Progress Approved",

        message: "Your progress update has been approved.",

        type: "project",

    });

    if (req.io) {

        req.io.to(progress.freelancer.toString()).emit(

            "newNotification",

            {

                title: "Progress Approved",

                message: "Your progress update has been approved.",

                type: "project",

            }

        );

    }

    res.json({

        success: true,

        message: "Progress approved successfully",

        progress,

    });

});


// ======================================
// Request Changes
// ======================================

const requestChanges = asyncHandler(async (req, res) => {

    const { feedback } = req.body;

    const progress = await ProjectProgress.findById(req.params.id);

    if (!progress) {

        return res.status(404).json({

            success: false,

            message: "Progress not found",

        });

    }

    progress.isApproved = false;

    progress.feedback = feedback;

    await progress.save();

    await Notification.create({

        recipient: progress.freelancer,

        title: "Changes Requested",

        message: feedback,

        type: "project",

    });

    if (req.io) {

        req.io.to(progress.freelancer.toString()).emit(

            "newNotification",

            {

                title: "Changes Requested",

                message: feedback,

                type: "project",

            }

        );

    }

    res.json({

        success: true,

        message: "Feedback sent successfully",

        progress,

    });

});

module.exports = {

    addProgress,

    updateProgress,

    getProjectProgress,

    approveProgress,

    requestChanges,

};