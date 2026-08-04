const calculateSkillSimilarity =
require("./similarityEngine");



const normalizeSkills=(skills)=>{


    if(!Array.isArray(skills))
        return [];


    return skills.map(skill=>{


        if(typeof skill==="object"){

            return (
                skill.name ||
                skill.skill ||
                skill.title ||
                ""
            )
            .toString()
            .toLowerCase();

        }


        return skill
        .toString()
        .toLowerCase();


    })
    .filter(Boolean);


};





const calculateMatchScore=(job,freelancer)=>{


    const skillResult =
    calculateSkillSimilarity(

        job.requiredSkills,

        freelancer.skills

    );



    const skillScore =
    skillResult.similarityScore;



    let experienceScore=0;



    if(
        freelancer.experience >=
        job.requiredExperience
    ){

        experienceScore=100;

    }

    else{

        experienceScore=50;

    }



    const trustScore =
    freelancer.rating
    ?
    freelancer.rating*20
    :
    0;




    const finalScore =
    Math.round(

        (skillScore*0.6)+
        (experienceScore*0.2)+
        (trustScore*0.2)

    );



    return {

        finalScore,

        skillScore,

        experienceScore,

        trustScore,

        matchedSkills:
        skillResult.matchedSkills,


        missingSkills:
        skillResult.missingSkills

    };


};



module.exports =
calculateMatchScore;