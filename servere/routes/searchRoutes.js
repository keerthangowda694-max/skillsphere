const express=require("express");

const router=express.Router();


const {

searchFreelancers,

searchProjects


}=require("../controllers/searchController");



// Freelancer Search

router.get(

"/freelancers",

searchFreelancers

);



// Project Search

router.get(

"/projects",

searchProjects

);



module.exports=router;