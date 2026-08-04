const express=require("express");

const router=express.Router();


const {
protect,
adminOnly
}=require("../middleware/authMiddleware");


const {

getAdminWallet,
withdrawPlatformFee

}=require("../controllers/adminWalletController");




router.get(
"/wallet",
protect,
adminOnly,
getAdminWallet
);



router.post(
"/wallet/withdraw",
protect,
adminOnly,
withdrawPlatformFee
);



module.exports=router;