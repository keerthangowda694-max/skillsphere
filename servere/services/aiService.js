const generateContent = require("../ai/gemini");

const generateJobDescription = async (jobTitle, skills, experience) => {
    const prompt = `
Generate a professional freelance job description.

Job Title: ${jobTitle}

Required Skills: ${skills.join(", ")}

Experience: ${experience}
`;

    return await generateContent(prompt);
};

const generateProposal = async (
    projectTitle,
    clientRequirements,
    freelancerSkills
) => {

    const prompt = `
Write a professional freelance proposal.

Project Title:
${projectTitle}

Client Requirements:
${clientRequirements}

Freelancer Skills:
${freelancerSkills.join(", ")}

The proposal should include:
1. Greeting
2. Understanding of the project
3. Why I'm suitable
4. My relevant skills
5. Closing message.
`;

    return await generateContent(prompt);
};

module.exports = {
    generateJobDescription,
    generateProposal,
};