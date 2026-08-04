const asyncHandler = require("express-async-handler");

const Milestone = require("../models/Milestone");
const Project = require("../models/Project");

// ==========================================
// Create Milestone
// ==========================================
const createMilestone = asyncHandler(async (req, res) => {

    const project = await Project.findById(req.params.projectId);

    if (!project) {
        return res.status(404).json({
            success: false,
            message: "Project not found",
        });
    }

    const {
        title,
        description,
        amount,
        dueDate,
    } = req.body;

    const milestone = await Milestone.create({

        project: project._id,

        title,

        description,

        amount,

        dueDate,

    });

    project.milestones.push(milestone._id);

    await project.save();

    res.status(201).json({

        success: true,

        message: "Milestone created successfully",

        milestone,

    });

});

// ==========================================
// Update Milestone
// ==========================================
const updateMilestone = asyncHandler(async (req, res) => {

    const milestone = await Milestone.findById(req.params.id);

    if (!milestone) {
        return res.status(404).json({
            success: false,
            message: "Milestone not found",
        });
    }

    milestone.title =
        req.body.title || milestone.title;

    milestone.description =
        req.body.description || milestone.description;

    milestone.amount =
        req.body.amount ?? milestone.amount;

    milestone.dueDate =
        req.body.dueDate || milestone.dueDate;

    milestone.status =
        req.body.status || milestone.status;

    await milestone.save();

    res.json({

        success: true,

        message: "Milestone updated successfully",

        milestone,

    });

});

// ==========================================
// Delete Milestone
// ==========================================
const deleteMilestone = asyncHandler(async (req, res) => {

    const milestone = await Milestone.findById(req.params.id);

    if (!milestone) {
        return res.status(404).json({
            success: false,
            message: "Milestone not found",
        });
    }

    await Project.findByIdAndUpdate(
        milestone.project,
        {
            $pull: {
                milestones: milestone._id,
            },
        }
    );

    await milestone.deleteOne();

    res.json({

        success: true,

        message: "Milestone deleted successfully",

    });

});

// ==========================================
// Complete Milestone
// ==========================================
const completeMilestone = asyncHandler(async (req, res) => {

    const milestone = await Milestone.findById(req.params.id);

    if (!milestone) {
        return res.status(404).json({
            success: false,
            message: "Milestone not found",
        });
    }

    milestone.status = "Completed";
    milestone.completedAt = new Date();

    await milestone.save();

    // Check if every milestone is completed
    const milestones = await Milestone.find({
        project: milestone.project,
    });

    const allCompleted = milestones.every(
        m => m.status === "Completed"
    );

    if (allCompleted) {

        await Project.findByIdAndUpdate(
            milestone.project,
            {
                status: "Completed",
            }
        );

    }

    res.json({
        success: true,
        message: "Milestone completed successfully",
        milestone,
    });

});

// ==========================================
// Get Project Milestones
// ==========================================
const getProjectMilestones = asyncHandler(async (req, res) => {

    const milestones = await Milestone.find({

        project: req.params.projectId,

    }).sort({ createdAt: 1 });

    res.json({

        success: true,

        total: milestones.length,

        milestones,

    });

});

// ==========================================
// Project Progress
// ==========================================
const getProjectProgress = asyncHandler(async (req, res) => {

    const project = await Project.findById(
        req.params.projectId
    );

    if (!project) {
        return res.status(404).json({
            success:false,
            message:"Project not found"
        });
    }


    const milestones = await Milestone.find({
        project:req.params.projectId
    });


    const totalMilestones = milestones.length;


    let completedMilestones = milestones.filter(
        m => m.status === "Completed"
    ).length;


    let remainingMilestones =
        totalMilestones - completedMilestones;



    let percentage =
        totalMilestones === 0
        ? 0
        :
        Math.round(
            (completedMilestones / totalMilestones) * 100
        );



    // If project completed force 100%
    if(project.status === "Completed"){

        percentage = 100;

        completedMilestones = totalMilestones;

        remainingMilestones = 0;

    }



    const daysRemaining = project.deadline
        ?
        Math.max(
            0,
            Math.ceil(
                (
                new Date(project.deadline)
                -
                new Date()
                )
                /
                (1000*60*60*24)
            )
        )
        :
        0;



    res.json({

        success:true,

        projectStatus:project.status,

        deadline:project.deadline,

        totalMilestones,

        completedMilestones,

        remainingMilestones,

        progress:percentage,

        daysRemaining,

        milestones

    });


});

module.exports = {

    createMilestone,

    updateMilestone,

    deleteMilestone,

    completeMilestone,

    getProjectMilestones,

    getProjectProgress,

};