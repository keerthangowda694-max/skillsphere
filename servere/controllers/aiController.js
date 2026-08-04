const asyncHandler = require("express-async-handler");
const { generateJobDescription , generateProposal } = require("../services/aiService");
const calculateSkillSimilarity = require("../ai/similarityEngine");
const User = require("../models/User");
const recommendFreelancers = require("../ai/recommendationEngine");
const analyzeTrendingSkills = require("../ai/trendAnalyzer");
const calculateMatchScore = require("../ai/matchingEngine");
const Project = require("../models/Project");
const Review = require("../models/Review");

const generateJob = asyncHandler(async (req, res) => {

    const { jobTitle, skills, experience } = req.body;

    if (!jobTitle || !skills || !experience) {
        return res.status(400).json({
            success: false,
            message: "Please provide all fields"
        });
    }

    const description = await generateJobDescription(
        jobTitle,
        skills,
        experience
    );

    res.status(200).json({
        success: true,
        description
    });

});


const proposalGenerator = asyncHandler(async (req, res) => {

    const {
        projectTitle,
        clientRequirements,
        freelancerSkills,
    } = req.body;

    if (
        !projectTitle ||
        !clientRequirements ||
        !freelancerSkills
    ) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    const proposal = await generateProposal(
        projectTitle,
        clientRequirements,
        freelancerSkills
    );

    res.status(200).json({
        success: true,
        proposal,
    });

});

const skillSimilarity = asyncHandler(async (req, res) => {

    const { jobSkills, freelancerSkills } = req.body;

    if (!jobSkills || !freelancerSkills) {
        return res.status(400).json({
            success: false,
            message: "Both jobSkills and freelancerSkills are required",
        });
    }

    const result = calculateSkillSimilarity(
        jobSkills,
        freelancerSkills
    );

    res.status(200).json({
        success: true,
        ...result,
    });

});

const recommend = asyncHandler(async (req, res) => {

    const { jobSkills } = req.body;

    if (!jobSkills || !Array.isArray(jobSkills)) {
        return res.status(400).json({
            success: false,
            message: "jobSkills array is required",
        });
    }

    const freelancers = await User.find({ role: "freelancer" });

    const recommendations = recommendFreelancers(
        jobSkills,
        freelancers
    );

    res.status(200).json({
        success: true,
        total: recommendations.length,
        recommendations,
    });

});

const trendingSkills = asyncHandler(async (req, res) => {

    const freelancers = await User.find({
        role: "freelancer",
    });

    const trending = analyzeTrendingSkills(freelancers);

    res.status(200).json({
        success: true,
        total: trending.length,
        trendingSkills: trending,
    });

});



const aiMatchFreelancers = asyncHandler(async (req, res) => {

    const {
        requiredSkills,
        requiredExperience,
    } = req.body;

    const freelancers = await User.find({
        role: "freelancer",
    });

    const results = freelancers.map((freelancer) => {

        const score = calculateMatchScore(
            {
                requiredSkills,
                requiredExperience,
            },
            freelancer
        );

        return {
            freelancerId: freelancer._id,
            fullName: freelancer.fullName,
            email: freelancer.email,
            finalScore: score.finalScore,
            skillScore: score.skillScore,
            experienceScore: score.experienceScore,
            trustScore: score.trustScore,
            matchedSkills: score.matchedSkills,
            missingSkills: score.missingSkills,
        };
    });

    results.sort((a, b) => b.finalScore - a.finalScore);

    res.json({
        success: true,
        recommendations: results,
    });

});
// ======================================
// Freelancer AI Insights
// ======================================


const freelancerAIInsights = asyncHandler(async (req, res) => {

    const freelancerId = req.user._id;

    const freelancer = await User.findById(freelancerId);

    if (!freelancer) {
        return res.status(404).json({
            success: false,
            message: "Freelancer not found"
        });
    }

    const allFreelancers = await User.find({
        role: "freelancer"
    });

    const completedProjects = await Project.countDocuments({
        freelancer: freelancerId,
        status: "Completed"
    });

    const reviews = await Review.find({
        freelancer: freelancerId
    });

    const userSkills =
        (freelancer.skills || []).map(skill => {

            if (typeof skill === "string")
                return skill.toLowerCase();

            if (typeof skill === "object")
                return (skill.name || skill.skill || "").toLowerCase();

            return "";

        });

    // -----------------------------
    // Trending Skills
    // -----------------------------

    const trendingSkills =
        analyzeTrendingSkills(allFreelancers);

    const trending =
        trendingSkills.map(item =>
            typeof item === "string"
                ? item
                : item.skill
        );

    // -----------------------------
    // Recommended Skills
    // -----------------------------

    const recommendedSkills =
        trending.filter(skill =>
            !userSkills.includes(skill.toLowerCase())
        ).slice(0,5);

    // -----------------------------
    // Profile Score
    // -----------------------------

    let profileScore = 0;

    // Skills
    profileScore += Math.min(userSkills.length * 8,40);

    // Projects
    profileScore += Math.min(completedProjects * 10,30);

    // Reviews
    profileScore += Math.min(reviews.length * 5,20);

    // Complete profile bonus
    if(
        freelancer.bio &&
        freelancer.profileImage &&
        userSkills.length >=3
    ){
        profileScore +=10;
    }

    profileScore=Math.min(profileScore,100);

    // -----------------------------
    // Suggestions
    // -----------------------------

    const suggestions=[];

    if(userSkills.length<5){
        suggestions.push(
            "Add more technical skills to improve discoverability."
        );
    }

    if(completedProjects<3){
        suggestions.push(
            "Complete more projects to improve client trust."
        );
    }

    if(reviews.length<5){
        suggestions.push(
            "Collect more client reviews to improve ranking."
        );
    }

    if(recommendedSkills.length>0){
        suggestions.push(
            `Learn ${recommendedSkills[0]} to match current market demand.`
        );
    }

    res.json({

        success:true,

        analytics:{

            profileScore,

            recommendedSkills,

            trendingSkills:trending.slice(0,5),

            completedProjects,

            totalReviews:reviews.length,

            suggestions

        }

    });

});
module.exports = {
    generateJob,
    proposalGenerator,
    skillSimilarity,
    recommend,
    trendingSkills,
    aiMatchFreelancers,
    freelancerAIInsights,
};
