import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../services/api";

import {
    FaMoneyBillWave,
    FaProjectDiagram,
    FaStar,
    FaEye,
    FaSearch,
    FaChartLine,
    FaRobot,
    FaCheckCircle,
    FaFire
} from "react-icons/fa";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import { motion } from "framer-motion";


const Analytics = () => {


const [dashboard,setDashboard]=useState({});
const [profile,setProfile]=useState({});
const [projects,setProjects]=useState({});
const [revenue,setRevenue]=useState({});
const [reviews,setReviews]=useState({});
const [aiInsights,setAIInsights]=useState({});

const [loading,setLoading]=useState(true);



useEffect(()=>{

fetchAnalytics();

},[]);



const fetchAnalytics=async()=>{

try{


    const [
        dashboardRes,
        profileRes,
        projectsRes,
        revenueRes,
        reviewsRes,
        aiRes
        
        ]=await Promise.all([

API.get("/analytics/freelancer/dashboard"),
API.get("/analytics/freelancer/profile"),
API.get("/analytics/freelancer/projects"),
API.get("/analytics/freelancer/revenue"),
API.get("/analytics/freelancer/reviews"),
API.get("/ai/freelancer-insights")

]);



setDashboard(dashboardRes.data.analytics);

setProfile(profileRes.data.analytics);

setProjects(projectsRes.data.analytics);

setRevenue(revenueRes.data.analytics);

setReviews(reviewsRes.data.analytics);

setAIInsights(
    aiRes.data.analytics
);


}

catch(error){

console.log(error);

}

finally{

setLoading(false);

}

};



if(loading){

return(

<DashboardLayout>

<div className="p-10 text-center text-xl">

Loading Analytics...

</div>

</DashboardLayout>

)

}


const revenueData =
revenue?.monthlyRevenue?.map(item => ({

    month: item.month,

    amount: item.revenue

})) || [];




return (

<DashboardLayout>


<div className="space-y-10">


{/* Header */}


<div>


<h1 className="text-4xl font-bold">

Freelancer Analytics 🚀

</h1>


<p className="text-gray-500 mt-2">

Track your growth, earnings and performance

</p>


</div>





{/* Top Cards */}


<div className="grid md:grid-cols-4 gap-6">


<AnalyticsCard

title="Total Earnings"

value={`₹${dashboard.totalEarnings || 0}`}

icon={<FaMoneyBillWave/>}

/>


<AnalyticsCard

title="Completed Projects"

value={dashboard.completedProjects || 0}

icon={<FaProjectDiagram/>}

/>



<AnalyticsCard

title="Average Rating"

value={dashboard.averageRating || 0}

icon={<FaStar/>}

/>


<AnalyticsCard

title="Profile Views"

value={profile.profileViews || 0}

icon={<FaEye/>}

/>


</div>





{/* Revenue Chart */}


<div className="bg-white rounded-3xl shadow p-8">


<div className="flex justify-between mb-6">


<h2 className="text-2xl font-bold">

Revenue Growth

</h2>


<FaChartLine className="text-green-600 text-2xl"/>


</div>



<ResponsiveContainer width="100%" height={300}>


<LineChart data={revenueData}>


<CartesianGrid strokeDasharray="3 3"/>


<XAxis dataKey="month"/>


<YAxis/>


<Tooltip/>


<Line

type="monotone"

dataKey="amount"

strokeWidth={3}

dot={{r:5}}

activeDot={{r:8}}

/>


</LineChart>


</ResponsiveContainer>


</div>





{/* Project Analytics */}



<div className="bg-white rounded-3xl shadow p-8">


<h2 className="text-2xl font-bold mb-6">

Project Performance

</h2>



<div className="grid md:grid-cols-4 gap-5">


<SmallCard

title="Total"

value={projects.totalProjects}

/>


<SmallCard

title="Completed"

value={projects.completedProjects}

/>


<SmallCard

title="Active"

value={projects.activeProjects}

/>


<SmallCard

title="Success"

value={`${projects.successRate || 0}%`}

/>


</div>


</div>







{/* Profile Growth */}



<div className="bg-white rounded-3xl shadow p-8">


<h2 className="text-2xl font-bold mb-6">

Profile Performance

</h2>


<div className="grid md:grid-cols-3 gap-6">



<PerformanceCard

icon={<FaEye/>}

title="Profile Views"

value={profile.profileViews || 0}

/>



<PerformanceCard

icon={<FaSearch/>}

title="Search Appearance"

value={profile.searchAppearances || 0}

/>



<PerformanceCard

icon={<FaFire/>}

title="Gig Views"

value={profile.gigViews || 0}

/>



</div>


</div>







{/* AI Insights */}

<div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl p-8">


<div className="flex gap-4 items-center">


<FaRobot className="text-4xl"/>


<h2 className="text-2xl font-bold">
AI Career Insights
</h2>


</div>



<div className="mt-6 space-y-6">



<div>

<p className="text-lg">

AI Profile Score

</p>


<h1 className="text-4xl font-bold">

{aiInsights?.profileScore || 0}%

</h1>


</div>




<div>


<h3 className="font-bold text-lg mb-3">

Recommended Skills

</h3>



<div className="flex flex-wrap gap-3">


{

aiInsights?.recommendedSkills?.length > 0

?

aiInsights.recommendedSkills.map(
(skill,index)=>(


<span

key={index}

className="bg-white text-blue-700 px-4 py-2 rounded-full"

>


🔥 {
typeof skill === "object"

?

skill.skill || skill.name || skill.title

:

skill

}


</span>


)

)


:

<span>

No recommendations available

</span>


}



</div>


</div>





<div>


<h3 className="font-bold text-lg mb-3">

Trending Skills

</h3>




<div className="flex flex-wrap gap-3">


{

aiInsights?.trendingSkills?.length > 0

?

aiInsights.trendingSkills.map(
(skill,index)=>(


<span

key={index}

className="bg-white text-purple-700 px-4 py-2 rounded-full"

>


📈 {

typeof skill === "object"

?

skill.skill || skill.name || skill.title

:

skill

}


</span>


)

)


:

<span>

No trending skills found

</span>


}



</div>


</div>





<div>

<h3 className="font-bold text-lg mb-3">

AI Recommendations

</h3>

{
    aiInsights?.suggestions?.length > 0
    ?
    aiInsights.suggestions.map((item, index) => (

        <p key={index} className="mb-2">

            ⭐ {item}

        </p>

    ))
    :
    <p>

        No AI recommendations available.

    </p>
}

</div>




</div>


</div>

{/* Recent Activity */}


<div className="bg-white rounded-3xl shadow p-8">


<h2 className="text-2xl font-bold mb-5">

Recent Activity

</h2>


<div className="space-y-4">


<Activity

text="Project completed successfully"

/>


<Activity

text="Received 5 star review"

/>


<Activity

text="Payment released"

/>



</div>


</div>



</div>



</DashboardLayout>

)

};







const AnalyticsCard=({title,value,icon})=>(


<motion.div

whileHover={{scale:1.05}}

className="bg-white rounded-3xl shadow p-6"

>


<div className="text-blue-600 text-3xl">

{icon}

</div>


<p className="text-gray-500 mt-4">

{title}

</p>


<h2 className="text-3xl font-bold mt-2">

{value}

</h2>


</motion.div>


);






const SmallCard=({title,value})=>(

<div className="bg-gray-50 rounded-xl p-5">

<p className="text-gray-500">

{title}

</p>


<h2 className="text-3xl font-bold mt-2">

{value || 0}

</h2>


</div>

);






const PerformanceCard=({icon,title,value})=>(

<div className="border rounded-2xl p-6">


<div className="text-blue-600 text-3xl">

{icon}

</div>


<p className="mt-4 text-gray-500">

{title}

</p>


<h2 className="text-3xl font-bold">

{value}

</h2>


</div>

);






const Activity=({text})=>(

<div className="flex gap-3 items-center">


<FaCheckCircle className="text-green-600"/>


<p>

{text}

</p>


</div>

);



export default Analytics;