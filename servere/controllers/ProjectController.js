const asyncHandler = require("express-async-handler");
const Project = require("../models/Project");

const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const Notification = require("../models/Notification");
const User = require("../models/User");


// ===============================
// Create Project
// ===============================
// ===============================
// Create Project
// ===============================
const createProject = asyncHandler(async (req, res) => {

    const {
        title,
        description,
        category,
        requiredSkills,
        budgetMin,
        budgetMax,
        experienceRequired,
        deadline,
    } = req.body;


    if (
        !title ||
        !description ||
        !budgetMin ||
        !budgetMax ||
        !category ||
        !requiredSkills ||
        !experienceRequired ||
        !deadline
    ) {

        return res.status(400).json({

            success:false,

            message:"Please fill all required fields",

        });

    }



    const project = await Project.create({

        client:req.user._id,

        title,

        description,

        category,

        requiredSkills,

        budget:{

            min:Number(budgetMin),

            max:Number(budgetMax),

        },

        experienceRequired:Number(experienceRequired),

        deadline,


    });



    // ======================================
    // Notify All Freelancers
    // ======================================

    const freelancers = await User.find({

        role:"freelancer",

        isSuspended:false,

    });



    for(const freelancer of freelancers){


        await Notification.create({

            recipient:freelancer._id,

            title:"New Gig Posted",

            message:`A new project "${project.title}" has been posted.`,

            type:"project",

        });


    }



    res.status(201).json({

        success:true,

        message:"Project Created Successfully",

        project,

    });


});


// ===================================
// Get All Projects
// ===================================
const getAllProjects = asyncHandler(async (req, res) => {

    const projects = await Project.find()
        .populate("client", "fullName email profileImage")
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        total: projects.length,
        projects,
    });

});

// ===================================
// Get Project By ID
// ===================================
const getProjectById = asyncHandler(async (req, res) => {

    const project = await Project.findById(req.params.id)
        .populate("client", "fullName email profileImage");

    if (!project) {
        return res.status(404).json({
            success: false,
            message: "Project not found",
        });
    }

    res.status(200).json({
        success: true,
        project,
    });

});

// ===================================
// Update Project
// ===================================
const updateProject = asyncHandler(async (req, res) => {

    const project = await Project.findById(req.params.id);

    if (!project) {
        return res.status(404).json({
            success: false,
            message: "Project not found",
        });
    }

    // Only project owner can update
    if (project.client.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            success: false,
            message: "Not authorized",
        });
    }

    project.title = req.body.title || project.title;
    project.description = req.body.description || project.description;
    project.category = req.body.category || project.category;
    project.requiredSkills =
        req.body.requiredSkills || project.requiredSkills;

    project.budget.min =
        req.body.budgetMin ?? project.budget.min;

    project.budget.max =
        req.body.budgetMax ?? project.budget.max;

    project.experienceRequired =
        req.body.experienceRequired ??
        project.experienceRequired;

    project.deadline =
        req.body.deadline || project.deadline;

    project.status =
        req.body.status || project.status;

    await project.save();

    res.status(200).json({
        success: true,
        message: "Project Updated Successfully",
        project,
    });

});

// ===================================
// Delete Project
// ===================================
const deleteProject = asyncHandler(async (req, res) => {

    const project = await Project.findById(req.params.id);

    if (!project) {
        return res.status(404).json({
            success: false,
            message: "Project not found",
        });
    }

    if (project.client.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            success: false,
            message: "Not authorized",
        });
    }

    await project.deleteOne();

    res.json({
        success: true,
        message: "Project Deleted Successfully",
    });

});

// ===================================
// Search Projects
// ===================================
const searchProjects = asyncHandler(async (req, res) => {

    const keyword = req.query.keyword || "";

    const projects = await Project.find({

        title: {
            $regex: keyword,
            $options: "i",
        },

    });

    res.json({
        success: true,
        total: projects.length,
        projects,
    });

});

const filterBySkills = asyncHandler(async (req, res) => {

    const skills = req.query.skills.split(",");

    const projects = await Project.find({
        requiredSkills: {
            $in: skills,
        },
    });

    res.json({
        success: true,
        total: projects.length,
        projects,
    });

});

const filterByExperience = asyncHandler(async (req, res) => {

    const experience = Number(req.query.experience);

    const projects = await Project.find({
        experienceRequired: {
            $lte: experience,
        },
    });

    res.json({
        success: true,
        total: projects.length,
        projects,
    });

});

const filterByBudget = asyncHandler(async (req, res) => {

    const min = Number(req.query.min);
    const max = Number(req.query.max);

    const projects = await Project.find({
        "budget.min": { $gte: min },
        "budget.max": { $lte: max },
    });

    res.json({
        success: true,
        total: projects.length,
        projects,
    });

});

const filterByCategory = asyncHandler(async (req, res) => {

    const projects = await Project.find({
        category: req.query.category,
    });

    res.json({
        success: true,
        total: projects.length,
        projects,
    });

});


const getProjectsPagination = asyncHandler(async (req, res) => {

    const page = Number(req.query.page) || 1;
    const limit = 10;

    const projects = await Project.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

    const total = await Project.countDocuments();

    res.json({
        success: true,
        page,
        totalPages: Math.ceil(total / limit),
        totalProjects: total,
        projects,
    });

});

//attach document controller
const uploadDocument = asyncHandler(async (req, res) => {

    const project = await Project.findById(req.params.projectId);

    if (!project) {
        return res.status(404).json({
            success: false,
            message: "Project not found",
        });
    }

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "Please upload a PDF",
        });
    }

    const result = await new Promise((resolve, reject) => {

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "skillsphere/projects",
                resource_type: "raw",
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );

        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);

    });

    project.attachments.push({

        public_id: result.public_id,

        fileName: req.file.originalname,

        url: result.secure_url,

        uploadedBy: req.user._id,

    });

    await project.save();

    res.status(200).json({

        success: true,

        message: "Document uploaded successfully",

        attachment: project.attachments[
            project.attachments.length - 1
        ],

    });

});
//attach document get all document

const getDocuments = asyncHandler(async (req, res) => {

    const project = await Project.findById(req.params.projectId);

    if (!project) {

        return res.status(404).json({

            success: false,

            message: "Project not found",

        });

    }

    res.json({

        success: true,

        total: project.attachments.length,

        attachments: project.attachments,

    });

});

//attach Document delete document
const deleteDocument = asyncHandler(async (req, res) => {

    const project = await Project.findById(req.params.projectId);

    if (!project) {

        return res.status(404).json({
            success: false,
            message: "Project not found",
        });

    }

    const attachment = project.attachments.id(req.params.documentId);

    if (!attachment) {

        return res.status(404).json({
            success: false,
            message: "Document not found",
        });

    }

    await cloudinary.uploader.destroy(
        attachment.public_id,
        {
            resource_type: "raw",
        }
    );

    attachment.deleteOne();

    await project.save();

    res.json({

        success: true,

        message: "Document deleted successfully",

    });

});



const trackProjectProgress = asyncHandler(async (req, res) => {

    const project = await Project.findById(req.params.projectId)
        .populate("milestones");

    if (!project) {
        return res.status(404).json({
            success: false,
            message: "Project not found",
        });
    }

    const milestones = project.milestones || [];

    const totalMilestones = milestones.length;

let completedMilestones = milestones.filter(
    milestone => milestone.status === "Completed"
).length;

let remainingMilestones = totalMilestones - completedMilestones;

let progress =
    totalMilestones === 0
        ? 0
        : Math.round((completedMilestones / totalMilestones) * 100);

// If the project itself is marked Completed,
// force the progress to 100%
if (project.status === "Completed") {
    progress = 100;
    completedMilestones = totalMilestones;
    remainingMilestones = 0;
}
      

    const daysRemaining = project.deadline
        ? Math.max(
            0,
            Math.ceil(
                (new Date(project.deadline) - new Date()) /
                (1000 * 60 * 60 * 24)
            )
        )
        : 0;

    res.status(200).json({

        success: true,

        projectStatus: project.status,

        progress,

        totalMilestones,

        completedMilestones,

        remainingMilestones,

        deadline: project.deadline,

        daysRemaining,

        milestones

    });

});
const getMyProjects = asyncHandler(async (req, res) => {



    const projects = await Project.find({
        freelancer: req.user._id
    })
        .populate("client", "fullName email profileImage")
        .sort({ createdAt: -1 });

    

    res.status(200).json({
        success: true,
        total: projects.length,
        projects,
    });

});

// ===================================
// Recommended Projects
// ===================================

const getRecommendedProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find()
        .populate("client", "fullName profileImage")
        .sort({ createdAt: -1 })
        .limit(6);

    res.status(200).json({
        success: true,
        projects,
    });
});

// ===================================
// Latest Projects
// ===================================

const getLatestProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find()
        .populate("client", "fullName profileImage")
        .sort({ createdAt: -1 })
        .limit(10);

    res.status(200).json({
        success: true,
        projects,
    });
});

// ===================================
// Upcoming Deadlines
// ===================================

const getUpcomingDeadlines = asyncHandler(async (req, res) => {
    const today = new Date();

    const projects = await Project.find({
        deadline: { $gte: today },
    })
        .sort({ deadline: 1 })
        .limit(10);

    res.status(200).json({
        success: true,
        projects,
    });
});

// ===================================
// Complete Project
// ===================================

const completeProject = asyncHandler(async (req, res) => {

    const project = await Project.findById(req.params.id);

    if (!project) {
        return res.status(404).json({
            success: false,
            message: "Project not found"
        });
    }

    project.status = "Completed";

    await project.save();

    res.json({
        success: true,
        message: "Project completed successfully",
        project
    });

});

module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
    searchProjects,
    filterBySkills,
    filterByExperience,
    filterByBudget,
    filterByCategory,
    getProjectsPagination,
    uploadDocument,
    getDocuments,
    deleteDocument,
    trackProjectProgress,
    getMyProjects,
    getRecommendedProjects,
    getLatestProjects,
    getUpcomingDeadlines,
    completeProject,
};
    