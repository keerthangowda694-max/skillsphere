const express = require("express");
const router = express.Router();
const {
    protect
} = require("../middleware/authMiddleware");

const {

    generateJob,
    proposalGenerator,
    skillSimilarity,
    recommend,
    trendingSkills,
    aiMatchFreelancers,
    freelancerAIInsights,
} = require("../controllers/aiController");

router.post("/generate-job-description", generateJob);

router.post("/generate-proposal", proposalGenerator);

router.post("/skill-match", skillSimilarity);

router.post("/recommend-freelancers", recommend);

router.get("/trending-skills", trendingSkills);

router.post("/match-freelancers", aiMatchFreelancers);

router.get(
    "/freelancer-insights",
    protect,
    freelancerAIInsights
    );
module.exports = router;