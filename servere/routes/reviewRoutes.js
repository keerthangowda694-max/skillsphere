const express = require("express");

const router = express.Router();

const { protect, clientOnly } = require("../middleware/authMiddleware");

const { submitReview,
        getFreelancerReviews,
        getFreelancerReputation,
        getReviewAnalytics,
 } = require("../controllers/reviewController");

router.post(

    "/:paymentId",

    protect,

    clientOnly,

    submitReview

);

router.get(

    "/freelancer/:freelancerId",

    getFreelancerReviews

);

router.get(

    "/reputation/:freelancerId",

    getFreelancerReputation

);

router.get(

    "/analytics/:freelancerId",

    getReviewAnalytics

);

module.exports = router;