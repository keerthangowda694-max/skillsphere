const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcryptjs");


// =============================
// Get Settings
// =============================

const getSettings = asyncHandler(async(req,res)=>{


    const user = await User.findById(req.user._id)
        .select("-password");


    res.json({

        success:true,

        user

    });


});




// =============================
// Update Account Settings
// =============================

const updateSettings = asyncHandler(async(req,res)=>{


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



    user.location =
        req.body.location || user.location;



    user.bio =
        req.body.bio || user.bio;



    await user.save();



    res.json({

        success:true,

        message:"Settings updated",

        user

    });


});




// =============================
// Change Password
// =============================

const changePassword = asyncHandler(async(req,res)=>{


    const {
        currentPassword,
        newPassword
    } = req.body;



    const user = await User.findById(req.user._id);



    const match =
    await bcrypt.compare(
        currentPassword,
        user.password
    );



    if(!match){

        return res.status(400).json({

            success:false,

            message:"Current password incorrect"

        });

    }




    user.password =
        await bcrypt.hash(
            newPassword,
            10
        );



    await user.save();



    res.json({

        success:true,

        message:"Password changed successfully"

    });



});
// =============================
// Change Email
// =============================

const changeEmail = asyncHandler(async(req,res)=>{

    const { email } = req.body;


    if(!email){

        return res.status(400).json({

            success:false,

            message:"Email required"

        });

    }


    const existingUser = await User.findOne({
        email
    });


    if(existingUser && existingUser._id.toString() !== req.user._id.toString()){

        return res.status(400).json({

            success:false,

            message:"Email already in use"

        });

    }



    const user = await User.findById(req.user._id);


    user.email = email;


    await user.save();



    res.json({

        success:true,

        message:"Email updated successfully",

        email:user.email

    });


});





// =============================
// Delete Account
// =============================

const deleteAccount = asyncHandler(async(req,res)=>{


    const user = await User.findById(req.user._id);



    if(!user){

        return res.status(404).json({

            success:false,

            message:"User not found"

        });

    }



    await User.findByIdAndDelete(
        req.user._id
    );



    res.json({

        success:true,

        message:"Account deleted successfully"

    });



});





module.exports={

    getSettings,

    updateSettings,

    changePassword,

    changeEmail,

    deleteAccount,

};