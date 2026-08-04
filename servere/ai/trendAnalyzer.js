const marketSkills = [

    "artificial intelligence",
    "machine learning",
    "cloud computing",
    "aws",
    "docker",
    "kubernetes",
    "devops",
    "typescript",
    "cybersecurity",
    "data science"
    
    ];
    
    
    const analyzeTrendingSkills = (freelancers)=>{
    
    
        const skillCount={};
    
    
    
        freelancers.forEach(user=>{
    
    
            user.skills?.forEach(skill=>{
    
    
                let name =
                typeof skill==="object"
                ?
                skill.name
                :
                skill;
    
    
    
                name =
                name.toLowerCase();
    
    
    
                skillCount[name] =
                (skillCount[name] || 0)+1;
    
    
            });
    
    
        });
    
    
    
        const databaseTrends =
        Object.entries(skillCount)
        .map(([skill,count])=>({
            skill,
            count
        }));
    
    
    
        const finalTrends = [
    
            ...marketSkills.map(skill=>({
                skill,
                count:100
            })),
    
            ...databaseTrends
    
        ];
    
    
    
        return finalTrends
        .slice(0,5);
    
    
    };
    
    
    
    module.exports = analyzeTrendingSkills;