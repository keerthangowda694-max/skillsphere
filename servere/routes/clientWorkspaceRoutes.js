const express = require("express");

const router = express.Router();


const {

getClientSubmissions,

getSubmissionById

}=require("../controllers/clientWorkspaceController");



const {

protect,

clientOnly

}=require("../middleware/authMiddleware");





// Client view all submissions

router.get(

"/work-submissions",

protect,

clientOnly,

getClientSubmissions

);






// Client view single submission

router.get(

"/work-submissions/:id",

protect,

clientOnly,

getSubmissionById

);





module.exports = router;