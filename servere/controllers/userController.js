const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// Get Logged-in User Profile


// ======================================
// Get Profile
// ======================================

const getProfile = asyncHandler(async(req,res)=>{


    const user = await User.findById(req.user._id)
    .select("-password");


    res.json({

        success:true,

        user

    });


});





// ======================================
// Update Profile
// ======================================

const updateProfile = asyncHandler(async(req,res)=>{


    const user = await User.findById(req.user._id);



    if(!user){

        return res.status(404).json({

            success:false,

            message:"User not found"

        });

    }




    user.fullName =
        req.body.fullName || user.fullName;


    user.phone =
        req.body.phone || user.phone;


    user.bio =
        req.body.bio || user.bio;


    user.location =
        req.body.location || user.location;


    user.experience =
        req.body.experience || user.experience;


    user.portfolio =
        req.body.portfolio || user.portfolio;


    user.github =
        req.body.github || user.github;


    user.linkedin =
        req.body.linkedin || user.linkedin;



    if(req.body.skills){

        user.skills=req.body.skills;

    }




    await user.save();



    res.json({

        success:true,

        message:"Profile updated",

        user

    });


});


// ======================================
// Upload Profile Photo
// ======================================

const uploadProfilePhoto = asyncHandler(async(req,res)=>{


    if(!req.file){

        return res.status(400).json({

            success:false,

            message:"Please upload image"

        });

    }



    const user = await User.findById(req.user._id);



    user.profilePhoto = req.file.path;



    await user.save();



    res.json({

        success:true,

        message:"Profile photo updated",

        profilePhoto:user.profilePhoto

    });


});


module.exports={
    getProfile,
    updateProfile,
    uploadProfilePhoto,
};