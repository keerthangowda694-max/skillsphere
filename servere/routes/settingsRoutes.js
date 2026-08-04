const express=require("express");

const router=express.Router();

const {
    protect
}=require("../middleware/authMiddleware");


const {

    getSettings,

    updateSettings,

    changePassword,

    changeEmail,

    deleteAccount,

}=require("../controllers/settingsController");





router.get(
"/",
protect,
getSettings
);



router.put(
"/",
protect,
updateSettings
);



router.put(
"/password",
protect,
changePassword
);

// Change email

router.put(
    "/email",
    protect,
    changeEmail
    );
    
    
    
    // Delete account
    
    router.delete(
    "/delete",
    protect,
    deleteAccount
    );

module.exports=router;