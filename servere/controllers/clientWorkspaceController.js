const WorkSubmission = require("../models/WorkSubmission");

const Project = require("../models/Project");



// =======================================
// Get Client Work Submissions
// =======================================

exports.getClientSubmissions = async(req,res)=>{

    try{


        const submissions = await WorkSubmission.find({

            client:req.user._id

        })

        .populate(
            "project",
            "title description budget deadline status"
        )

        .populate(
            "freelancer",
            "fullName email skills"
        );



        res.status(200).json({

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
// Get Single Submission
// =======================================

exports.getSubmissionById = async(req,res)=>{


    try{


        const submission = await WorkSubmission.findById(
            req.params.id
        )

        .populate(
            "project"
        )

        .populate(
            "freelancer",
            "fullName email"
        );




        if(!submission){

            return res.status(404).json({

                success:false,

                message:"Submission not found"

            });

        }





        // Security check

        if(
            submission.client.toString()
            !==
            req.user._id.toString()
        ){

            return res.status(403).json({

                success:false,

                message:"Access denied"

            });

        }




        res.status(200).json({

            success:true,

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