const normalizeSkills = (skills)=>{

    if(!Array.isArray(skills))
        return [];


    return skills.map(skill=>{


        if(typeof skill === "object"){

            return (
                skill.name ||
                skill.skill ||
                skill.title ||
                ""
            )
            .toString()
            .trim()
            .toLowerCase();

        }


        return skill
        .toString()
        .trim()
        .toLowerCase();


    })
    .filter(Boolean);

};




const calculateSkillSimilarity = (
    jobSkills,
    freelancerSkills
)=>{


    const job =
    normalizeSkills(jobSkills);



    const freelancer =
    normalizeSkills(freelancerSkills);



    const matchedSkills =
    job.filter(skill=>
        freelancer.includes(skill)
    );



    const missingSkills =
    job.filter(skill=>
        !freelancer.includes(skill)
    );



    const score =
    job.length === 0

    ?

    0

    :

    Math.round(
        (matchedSkills.length/job.length)*100
    );



    return {

        similarityScore:score,

        matchedSkills,

        missingSkills

    };


};



module.exports = calculateSkillSimilarity;