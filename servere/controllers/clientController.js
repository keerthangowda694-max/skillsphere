const asyncHandler = require("express-async-handler");
const Project = require("../models/Project");

// =================================
// Client Dashboard
// =================================

const getClientDashboard = asyncHandler(async (req, res) => {
    const projects = await Project.find({
        client: req.user._id,
    }).sort({ createdAt: -1 });

    const totalProjects = projects.length;

    const activeProjects = projects.filter((project) =>
        ["Open", "Assigned", "In Progress"].includes(project.status)
    ).length;

    const completedProjects = projects.filter(
        (project) => project.status === "Completed"
    ).length;

    const cancelledProjects = projects.filter(
        (project) => project.status === "Cancelled"
    ).length;

    const totalSpent = projects.reduce(
        (total, project) => total + (project.budget?.max || 0),
        0
    );

    res.status(200).json({
        success: true,
        stats: {
            totalProjects,
            activeProjects,
            completedProjects,
            cancelledProjects,
            totalSpent,
        },
        recentProjects: projects.slice(0, 5),
    });
});

module.exports = {
    getClientDashboard,
};