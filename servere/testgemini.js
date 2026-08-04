require("dotenv").config();

const generateContent = require("./ai/gemini");

(async () => {
    try {
        const result = await generateContent(
            "Write a professional job description for a React Developer with 2 years of experience."
        );

        console.log(result);
    } catch (error) {
        console.error(error.message);
    }
})();