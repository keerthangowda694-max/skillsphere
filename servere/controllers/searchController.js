const asyncHandler = require("express-async-handler");

const User = require("../models/User");
const Project = require("../models/Project");


// ======================================
// Search Freelancers
// ======================================

const searchFreelancers = asyncHandler(async (req,res)=>{

    const {
        keyword,
        skill,
        category,
        rating,
        verified,
        experience,
        sort,
        page = 1,
        limit = 10

    } = req.query;


    let query = {
        role:"freelancer",
        isSuspended:false
    };


    // Keyword search
    if(keyword){

        query.$or=[

            {
                fullName:{
                    $regex:keyword,
                    $options:"i"
                }
            },

            {
                bio:{
                    $regex:keyword,
                    $options:"i"
                }
            }

        ];

    }


    // Skill search
    if(skill){

        query.skills={

            $in:[
                new RegExp(skill,"i")
            ]

        };

    }


    // Category
    if(category){

        query.category={
            $regex:category,
            $options:"i"
        };

    }


    // Experience

    if(experience){

        query.experienceLevel=experience;

    }



    // Verified freelancers

    if(verified==="true"){

        query.isVerifiedFreelancer=true;

    }



    // Rating filter

    if(rating){

        query.averageRating={

            $gte:Number(rating)

        };

    }



    let freelancers = User.find(query);



    // Sorting

    if(sort==="rating"){

        freelancers.sort({
            averageRating:-1
        });

    }


    if(sort==="newest"){

        freelancers.sort({
            createdAt:-1
        });

    }



    // Pagination

    freelancers
    .skip((page-1)*limit)
    .limit(Number(limit));



    const result = await freelancers;


    const total = await User.countDocuments(query);



    res.json({

        success:true,

        total,

        page:Number(page),

        freelancers:result

    });


});




// ======================================
// Search Projects
// ======================================


const searchProjects = asyncHandler(async(req,res)=>{


    const {

        keyword,

        category,

        skill,

        minBudget,

        maxBudget,

        status,

        page=1,

        limit=10


    }=req.query;



    let query={};



    if(keyword){

        query.title={

            $regex:keyword,

            $options:"i"

        };

    }



    if(category){

        query.category={

            $regex:category,

            $options:"i"

        };

    }



    if(skill){

        query.skills={

            $in:[
                new RegExp(skill,"i")
            ]

        };

    }



    if(status){

        query.status=status;

    }



    if(minBudget || maxBudget){

        query.budget={};

        if(minBudget){

            query.budget.$gte=Number(minBudget);

        }


        if(maxBudget){

            query.budget.$lte=Number(maxBudget);

        }

    }



    const projects = await Project.find(query)

    .skip((page-1)*limit)

    .limit(Number(limit))

    .sort({
        createdAt:-1
    });



    const total = await Project.countDocuments(query);



    res.json({

        success:true,

        total,

        page:Number(page),

        projects

    });


});



module.exports={

    searchFreelancers,

    searchProjects

};