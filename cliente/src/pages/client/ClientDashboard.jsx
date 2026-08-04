import {
    useEffect,
    useState
} from "react";


import API from "../../services/api";

import ClientLayout from "../../components/client/ClientLayout";


import {
    FaProjectDiagram,
    FaCheckCircle,
    FaClock,
    FaMoneyBillWave,
    FaTrash
} from "react-icons/fa";




const ClientDashboard = ()=>{


const [stats,setStats]=useState({

    totalProjects:0,

    activeProjects:0,

    completedProjects:0,

    totalSpent:0

});



const [projects,setProjects]=useState([]);


const [loading,setLoading]=useState(true);





useEffect(()=>{

    fetchDashboard();

},[]);







// ===============================
// Fetch Dashboard
// ===============================

const fetchDashboard = async()=>{


try{


const res = await API.get(

    "/client/dashboard"

);



console.log(
"CLIENT DASHBOARD",
res.data
);




setStats({

    totalProjects:
    res.data.stats?.totalProjects || 0,


    activeProjects:
    res.data.stats?.activeProjects || 0,


    completedProjects:
    res.data.stats?.completedProjects || 0,


    totalSpent:
    res.data.stats?.totalSpent || 0

});





setProjects(

    res.data.recentProjects || []

);




}

catch(err){


console.log(
err.response?.data || err
);


}


finally{


setLoading(false);


}


};









// ===============================
// Delete Project
// ===============================

const deleteProject = async(id)=>{


const confirmDelete = window.confirm(

    "Are you sure you want to delete this project?"

);



if(!confirmDelete){

    return;

}



try{


await API.delete(

    `/projects/${id}`

);



alert(

    "Project deleted successfully"

);



fetchDashboard();



}

catch(err){


console.log(
err.response?.data || err
);


alert(

err.response?.data?.message ||
"Delete failed"

);


}



};









if(loading){


return(

<ClientLayout>


<div className="
h-[70vh]
flex
items-center
justify-center
text-xl
font-semibold
">

Loading Dashboard...

</div>


</ClientLayout>

);


}








return(


<ClientLayout>


<div className="p-8">



<h1 className="
text-3xl
font-bold
mb-8
">

Client Dashboard

</h1>







{/* Stats */}


<div className="
grid
md:grid-cols-4
gap-6
">





<div className="
bg-white
rounded-2xl
shadow-lg
p-6
">


<div className="
flex
justify-between
items-center
">


<div>

<p className="text-gray-500">

Total Projects

</p>


<h2 className="
text-3xl
font-bold
">

{stats.totalProjects}

</h2>


</div>



<FaProjectDiagram

className="
text-blue-600
text-4xl
"

/>


</div>


</div>







<div className="
bg-white
rounded-2xl
shadow-lg
p-6
">


<div className="
flex
justify-between
items-center
">


<div>

<p className="text-gray-500">

Active Projects

</p>


<h2 className="
text-3xl
font-bold
">

{stats.activeProjects}

</h2>


</div>




<FaClock

className="
text-orange-500
text-4xl
"

/>


</div>


</div>







<div className="
bg-white
rounded-2xl
shadow-lg
p-6
">


<div className="
flex
justify-between
items-center
">


<div>

<p className="text-gray-500">

Completed

</p>


<h2 className="
text-3xl
font-bold
">

{stats.completedProjects}

</h2>


</div>



<FaCheckCircle

className="
text-green-600
text-4xl
"

/>


</div>


</div>







<div className="
bg-white
rounded-2xl
shadow-lg
p-6
">


<div className="
flex
justify-between
items-center
">


<div>

<p className="text-gray-500">

Total Spent

</p>


<h2 className="
text-3xl
font-bold
">

₹{stats.totalSpent}

</h2>


</div>




<FaMoneyBillWave

className="
text-purple-600
text-4xl
"

/>


</div>


</div>







</div>









{/* Recent Projects */}



<div className="mt-10">


<h2 className="
text-2xl
font-bold
mb-5
">

Recent Projects

</h2>








{

projects.length===0 ?


<div className="
bg-white
rounded-2xl
shadow
p-10
text-center
text-gray-500
">

No projects created yet

</div>


:


<div className="
grid
md:grid-cols-2
gap-6
">



{

projects.map(project=>(


<div

key={project._id}

className="
bg-white
rounded-2xl
shadow-lg
p-6
"


>



<h3 className="
text-xl
font-bold
">

{project.title}

</h3>





<p className="
text-gray-600
mt-3
">

{project.description}

</p>








<div className="
mt-5
flex
justify-between
items-center
">



<div>

<p className="
font-semibold
">

Budget

</p>


<p>

₹{project.budget?.min}

-

₹{project.budget?.max}

</p>


</div>





<div className="
flex
gap-3
items-center
">



<span className="
bg-blue-100
text-blue-600
px-4
py-2
rounded-full
text-sm
">

{project.status}

</span>




<button

onClick={()=>deleteProject(project._id)}

className="
bg-red-500
hover:bg-red-600
text-white
p-3
rounded-xl
"

>

<FaTrash/>

</button>




</div>


</div>








<p className="
mt-4
text-sm
text-gray-500
">

Category:

{project.category}

</p>





</div>


))


}



</div>



}





</div>







</div>


</ClientLayout>


);


};



export default ClientDashboard;