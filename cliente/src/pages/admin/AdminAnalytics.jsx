import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
}
from "recharts";


import AdminLayout from "../../components/admin/AdminLayout";



const AdminAnalytics=()=>{


const revenueData=[

{
month:"Jan",
revenue:20000
},

{
month:"Feb",
revenue:45000
},

{
month:"Mar",
revenue:70000
},

{
month:"Apr",
revenue:95000
},

];




const userData=[

{
name:"Clients",
value:120
},

{
name:"Freelancers",
value:250
}


];



const projectData=[

{
name:"Completed",
count:80
},

{
name:"Pending",
count:20
},

{
name:"Rejected",
count:10
}

];




return(


<AdminLayout>


<h1 className="
text-4xl
font-bold
mb-8
">

Platform Analytics

</h1>





<div className="
grid
lg:grid-cols-2
gap-8
">





<div className="
bg-white
p-6
rounded-2xl
shadow
">


<h2 className="
font-bold
text-xl
mb-5
">

Revenue Growth

</h2>



<ResponsiveContainer
width="100%"
height={300}
>


<LineChart data={revenueData}>


<XAxis dataKey="month"/>

<YAxis/>


<Tooltip/>


<Line
type="monotone"
dataKey="revenue"
/>


</LineChart>


</ResponsiveContainer>



</div>







<div className="
bg-white
p-6
rounded-2xl
shadow
">


<h2 className="
font-bold
text-xl
mb-5
">

Users Distribution

</h2>



<ResponsiveContainer
width="100%"
height={300}
>


<PieChart>


<Pie

data={userData}

dataKey="value"

nameKey="name"

outerRadius={100}

>


{
userData.map(
(item,index)=>(

<Cell
key={index}
/>

)

)
}



</Pie>


<Tooltip/>


</PieChart>


</ResponsiveContainer>


</div>










<div className="
bg-white
p-6
rounded-2xl
shadow
lg:col-span-2
">


<h2 className="
font-bold
text-xl
mb-5
">

Project Statistics

</h2>



<ResponsiveContainer
width="100%"
height={300}
>


<BarChart data={projectData}>


<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>


<Bar
dataKey="count"
/>


</BarChart>


</ResponsiveContainer>


</div>



</div>


</AdminLayout>


)


}


export default AdminAnalytics;