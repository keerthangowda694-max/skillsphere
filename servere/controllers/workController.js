const WorkSubmission = require("../models/WorkSubmission");
const Project = require("../models/Project");


// =======================================
// Submit Work (Freelancer)
// =======================================

const submitWork = async (req, res) => {

    try {

        const { title, description } = req.body;


        const project = await Project.findById(
            req.params.projectId
        );


        if (!project) {
            return res.status(404).json({
                success:false,
                message:"Project not found"
            });
        }



        // Check freelancer assigned

        if (
            !project.freelancer ||
            project.freelancer.toString() !== req.user._id.toString()
        ) {

            return res.status(403).json({
                success:false,
                message:"You are not assigned to this project"
            });

        }



        // Check duplicate submission

        const existingSubmission =
        await WorkSubmission.findOne({
            project: project._id,
            freelancer:req.user._id
        });


        if(existingSubmission){

            return res.status(400).json({
                success:false,
                message:"Work already submitted for this project"
            });

        }




        // Handle files safely

        const files = req.files
        ? req.files.map(file => ({
            filename:file.filename,
            url:`/uploads/${file.filename}`
        }))
        : [];





        const submission =
        await WorkSubmission.create({

            project:project._id,

            freelancer:req.user._id,

            client:project.client,

            title,

            description,

            files,

            status:"Pending"

        });



        res.status(201).json({

            success:true,

            message:"Work submitted successfully",

            submission

        });



    }
    catch(error){

        console.log(error);

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};






// =======================================
// Freelancer Submissions
// =======================================

const getMySubmissions = async(req,res)=>{

    try{


        const submissions =
        await WorkSubmission.find({
            freelancer:req.user._id
        })
        .populate("project")
        .populate(
            "client",
            "fullName email"
        );


        res.json({

            success:true,

            submissions

        });


    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};








// =======================================
// Client Submissions
// =======================================

const getClientSubmissions = async(req,res)=>{

    try{


        const submissions =
        await WorkSubmission.find({

            client:req.user._id

        })
        .populate("project")
        .populate(
            "freelancer",
            "fullName email"
        );



        res.json({

            success:true,

            submissions

        });



    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};




// ===============================
// Approve Work & Complete Project
// ===============================

// ===============================
// Approve Work & Complete Project
// ===============================
const approveWork = async (req, res) => {

    try {

        const submission = await WorkSubmission.findById(req.params.id);

        if (!submission) {
            return res.status(404).json({
                success: false,
                message: "Submission not found"
            });
        }

        // Verify client owns this submission
        if (submission.client.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Not authorized"
            });
        }

        // Approve submission
        submission.status = "Approved";
        await submission.save();

        // Find project
        const project = await Project.findById(submission.project);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        console.log("Before:", project.status);

        // Complete project
        project.status = "Completed";

        // Optional (only if these fields exist in schema)
        project.progress = 100;
        project.completedAt = new Date();

        await project.save();

        console.log("After:", project.status);

        res.status(200).json({
            success: true,
            message: "Work approved and project completed",
            submission,
            project
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// =======================================
// Request Changes
// =======================================

const requestChanges = async(req,res)=>{

    try{


        const submission =
        await WorkSubmission.findById(
            req.params.id
        );



        if(!submission){

            return res.status(404).json({

                success:false,

                message:"Submission not found"

            });

        }




        if(
            submission.client.toString()
            !==
            req.user._id.toString()
        ){

            return res.status(403).json({

                success:false,

                message:"Not authorized"

            });

        }




        submission.status="Changes Requested";


        submission.feedback =
        req.body.feedback ||
        "Please update the work";



        await submission.save();



        res.json({

            success:true,

            message:"Changes requested successfully",

            submission

        });



    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};






module.exports = {

    submitWork,

    getMySubmissions,

    getClientSubmissions,

    approveWork,

    requestChanges

};