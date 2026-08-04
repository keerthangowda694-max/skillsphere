const asyncHandler = require("express-async-handler");

const Project = require("../models/Project");

// ======================================
// Get Pending Projects
// ======================================

const getPendingProjects = asyncHandler(async (req, res) => {

    const projects = await Project.find({
        approvalStatus: "Pending",
    })
    .populate("client", "fullName email")
    .sort({ createdAt: -1 });

    res.json({
        success: true,
        total: projects.length,
        projects,
    });

});
// ======================================
// Approve Project
// ======================================

const approveProject = asyncHandler(async (req, res) => {

    const project = await Project.findById(req.params.projectId);

    if (!project) {
        return res.status(404).json({
            success: false,
            message: "Project not found",
        });
    }

    project.approvalStatus = "Approved";
    project.approvedBy = req.user._id;
    project.approvedAt = new Date();

    await project.save();

    res.json({
        success: true,
        message: "Project approved successfully",
        project,
    });

});
// ======================================
// Reject Project
// ======================================

const rejectProject = asyncHandler(async (req, res) => {

    const { reason } = req.body;

    const project = await Project.findById(req.params.projectId);

    if (!project) {
        return res.status(404).json({
            success: false,
            message: "Project not found",
        });
    }

    project.approvalStatus = "Rejected";
    project.rejectionReason = reason || "";
    project.approvedBy = req.user._id;
    project.approvedAt = new Date();

    await project.save();

    res.json({
        success: true,
        message: "Project rejected",
        project,
    });

});
module.exports = {

    getPendingProjects,

    approveProject,

    rejectProject,

};