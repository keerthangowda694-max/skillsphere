const express = require("express");

const router = express.Router();


const {
    protect,
    clientOnly

} = require("../middleware/authMiddleware");



const {

    getClientDashboard

} = require("../controllers/clientController");





// Client Dashboard

router.get(

    "/dashboard",

    protect,

    clientOnly,

    getClientDashboard

);



module.exports = router;