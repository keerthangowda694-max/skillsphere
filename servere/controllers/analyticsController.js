const asyncHandler = require("express-async-handler");

const User = require("../models/User");
const Wallet = require("../models/Wallet");
const Transaction = require("../models/Transaction");
const Review = require("../models/Review");
const Project = require("../models/Project");
const Invitation = require("../models/Invitation");


// ======================================
// Freelancer Dashboard Analytics
// ======================================

const freelancerDashboard = asyncHandler(async (req, res) => {

    const freelancerId = req.user._id;


    const wallet = await Wallet.findOne({
        user: freelancerId,
    });


    const totalProjects = await Project.countDocuments({
        freelancer: freelancerId,
    });


    const activeProjects = await Project.countDocuments({
        freelancer: freelancerId,
        status: "In Progress",
    });


    const completedProjects = await Project.countDocuments({
        freelancer: freelancerId,
        status: "Completed",
    });



    const totalInvitations = await Invitation.countDocuments({
        freelancer: freelancerId,
    });


    const acceptedInvitations = await Invitation.countDocuments({
        freelancer: freelancerId,
        status: "Accepted",
    });


    const pendingInvitations = await Invitation.countDocuments({
        freelancer: freelancerId,
        status: "Pending",
    });


    const rejectedInvitations = await Invitation.countDocuments({
        freelancer: freelancerId,
        status: "Rejected",
    });



    const reviews = await Review.find({
        freelancer: freelancerId,
    });



    let averageRating = 0;


    if(reviews.length > 0){

        averageRating =
            reviews.reduce(
                (sum,review)=>
                    sum + review.overallRating,
                0
            ) / reviews.length;

    }



    const completionRate =
        totalProjects === 0
        ? 0
        :
        Number(
            ((completedProjects / totalProjects) * 100)
            .toFixed(2)
        );



    const acceptanceRate =
        totalInvitations === 0
        ? 0
        :
        Number(
            ((acceptedInvitations / totalInvitations)*100)
            .toFixed(2)
        );



    const user = await User.findById(freelancerId);



    res.json({

        success:true,


        analytics:{


            totalEarnings:
                wallet?.lifetimeEarnings || 0,


            completedProjects,


            averageRating:
                Number(averageRating.toFixed(1)),


            totalProjects,


            activeProjects,


            completionRate,


            totalInvitations,


            acceptedInvitations,


            pendingInvitations,


            rejectedInvitations,


            acceptanceRate,


            availableBalance:
                wallet?.availableBalance || 0,


            lockedBalance:
                wallet?.lockedBalance || 0,


            totalWithdrawn:
                wallet?.totalWithdrawn || 0,


            profileViews:
                user?.profileViews || 0,


            gigViews:
                user?.gigViews || 0

        }

    });


});





// ======================================
// Monthly Revenue Analytics
// ======================================

const monthlyRevenue = asyncHandler(async (req, res) => {

    const freelancerId = req.user._id;


    const revenue = await Transaction.aggregate([

        // Only this freelancer's released payments
        {
            $match: {
                user: freelancerId,
                type: "Release",
                status: "Completed"
            }
        },


        {
            $group: {

                _id: {

                    month: {
                        $month: "$createdAt"
                    },

                    year: {
                        $year: "$createdAt"
                    }

                },

                revenue: {
                    $sum: "$amount"
                }

            }

        },


        {
            $sort: {

                "_id.year": 1,
                "_id.month": 1

            }
        }

    ]);



    const formattedRevenue = revenue.map(item => ({

        month:
            new Date(
                item._id.year,
                item._id.month - 1
            ).toLocaleString(
                "default",
                {
                    month: "short"
                }
            ),

        revenue: item.revenue

    }));


    const totalRevenue = formattedRevenue.reduce(
        (sum, item) => sum + item.revenue,
        0
    );


    res.status(200).json({

        success: true,

        analytics: {

            freelancerId,

            totalRevenue,

            monthlyRevenue: formattedRevenue

        }

    });

});

// ======================================
// Review Analytics
// ======================================

const reviewAnalytics = asyncHandler(async(req,res)=>{


    const freelancerId=req.user._id;



    const reviews = await Review.find({

        freelancer:freelancerId

    });



    const positive =
        reviews.filter(
            r=>r.sentiment==="Positive"
        ).length;



    const neutral =
        reviews.filter(
            r=>r.sentiment==="Neutral"
        ).length;



    const negative =
        reviews.filter(
            r=>r.sentiment==="Negative"
        ).length;



    let averageRating=0;



    if(reviews.length>0){

        averageRating =
            reviews.reduce(
                (sum,r)=>
                    sum+r.overallRating,
                0
            ) / reviews.length;

    }



    res.json({

        success:true,


        analytics:{


            averageRating:
                Number(averageRating.toFixed(1)),


            totalReviews:
                reviews.length,


            positive,


            neutral,


            negative


        }


    });



});





// ======================================
// Project Analytics
// ======================================

const projectAnalytics = asyncHandler(async(req,res)=>{


    const freelancerId=req.user._id;



    const totalProjects =
        await Project.countDocuments({

            freelancer:freelancerId

        });



    const activeProjects =
        await Project.countDocuments({

            freelancer:freelancerId,

            status:"In Progress"

        });



    const completedProjects =
        await Project.countDocuments({

            freelancer:freelancerId,

            status:"Completed"

        });



    const cancelledProjects =
        await Project.countDocuments({

            freelancer:freelancerId,

            status:"Cancelled"

        });



    const successRate =
        totalProjects===0
        ?0
        :
        Number(
            ((completedProjects/totalProjects)*100)
            .toFixed(2)
        );



    res.json({

        success:true,


        analytics:{


            totalProjects,


            activeProjects,


            completedProjects,


            cancelledProjects,


            successRate


        }


    });



});





// ======================================
// Profile Analytics
// ======================================

const profileAnalytics = asyncHandler(async(req,res)=>{


    const freelancerId=req.user._id;



    const user =
        await User.findById(freelancerId);



    const reviews =
        await Review.find({

            freelancer:freelancerId

        });



    const wallet =
        await Wallet.findOne({

            user:freelancerId

        });



    let averageRating=0;



    if(reviews.length>0){

        averageRating =
            reviews.reduce(
                (sum,r)=>
                    sum+r.overallRating,
                0
            ) / reviews.length;

    }



    const completedProjects =
        await Project.countDocuments({

            freelancer:freelancerId,

            status:"Completed"

        });



    const activeProjects =
        await Project.countDocuments({

            freelancer:freelancerId,

            status:"In Progress"

        });



    res.json({

        success:true,


        analytics:{


            profileViews:
                user?.profileViews || 0,


            searchAppearances:
                user?.searchAppearances || 0,


            gigViews:
                user?.gigViews || 0,


            averageRating:
                Number(averageRating.toFixed(1)),


            totalReviews:
                reviews.length,


            completedProjects,


            activeProjects,


            totalEarnings:
                wallet?.lifetimeEarnings || 0,


            memberSince:
                user?.createdAt


        }


    });



});




module.exports={

    freelancerDashboard,

    monthlyRevenue,

    reviewAnalytics,

    projectAnalytics,

    profileAnalytics

};