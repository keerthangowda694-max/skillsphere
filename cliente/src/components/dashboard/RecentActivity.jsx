import {
    FaCheckCircle,
    FaMoneyBillWave,
    FaBriefcase
    } from "react-icons/fa";
    
    const RecentActivity = ({ activities = [] }) => (
    
    <div className="bg-white rounded-3xl shadow-xl p-6">
    
    <h2 className="text-xl font-bold mb-6">
    
    ⚡ Recent Activity
    
    </h2>
    
    {
    
    activities.length===0
    
    ?
    
    <div className="space-y-4">
    
    <Activity icon={<FaCheckCircle className="text-green-600"/>} text="Project completed"/>
    
    <Activity icon={<FaMoneyBillWave className="text-blue-600"/>} text="Payment released"/>
    
    <Activity icon={<FaBriefcase className="text-purple-600"/>} text="New invitation received"/>
    
    </div>
    
    :
    
    activities.map((activity,index)=>(
    
    <Activity
    
    key={index}
    
    icon={<FaCheckCircle className="text-green-600"/>}
    
    text={activity}
    
    />
    
    ))
    
    }
    
    </div>
    
    );
    
    const Activity=({icon,text})=>(
    
    <div className="flex gap-3 items-center">
    
    {icon}
    
    {text}
    
    </div>
    
    );
    
    export default RecentActivity;