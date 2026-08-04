const SkillProgress = ({ skills = [] }) => (

    <div className="bg-white rounded-3xl shadow-xl p-6">
    
    <h2 className="text-xl font-bold mb-6">
    
    📊 Skill Progress
    
    </h2>
    
    {
    
    skills.map(skill=>(
    
    <div key={skill.name} className="mb-5">
    
    <div className="flex justify-between">
    
    <span>
    
    {skill.name}
    
    </span>
    
    <span>
    
    {skill.level}%
    
    </span>
    
    </div>
    
    <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
    
    <div
    
    className="bg-blue-600 h-3 rounded-full"
    
    style={{
    
    width:`${skill.level}%`
    
    }}
    
    />
    
    </div>
    
    </div>
    
    ))
    
    }
    
    </div>
    
    );
    
    export default SkillProgress;