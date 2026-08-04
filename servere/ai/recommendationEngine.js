const calculateSkillSimilarity = require("./similarityEngine");

const recommendFreelancers = (jobSkills, freelancers) => {

    const recommendations = freelancers.map((freelancer) => {

        const result = calculateSkillSimilarity(
            jobSkills,
            freelancer.skills || []
        );

        return {
            _id: freelancer._id,
            fullName: freelancer.fullName,
            email: freelancer.email,
            skills: freelancer.skills,
            trustScore: freelancer.trustScore,
            matchPercentage: result.matchPercentage,
            matchedSkills: result.matchedSkills,
            missingSkills: result.missingSkills,
        };
    });

    recommendations.sort((a, b) => {

        if (b.matchPercentage !== a.matchPercentage) {
            return b.matchPercentage - a.matchPercentage;
        }

        return b.trustScore - a.trustScore;
    });

    return recommendations.slice(0, 5);
};

module.exports = recommendFreelancers;