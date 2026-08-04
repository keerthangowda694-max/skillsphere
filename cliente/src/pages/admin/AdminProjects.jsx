import {useEffect,useState} from "react";
import API from "../../services/api";
import AdminLayout from "../../components/admin/AdminLayout";


const AdminProjects =()=>{


const [projects,setProjects]=useState([]);
const [loading,setLoading]=useState(true);



useEffect(()=>{

loadProjects();

},[]);





const loadProjects=async()=>{

try{

const res=await API.get(
"/admin/projects/pending"
);


setProjects(
res.data.projects || []
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





const approveProject=async(id)=>{

try{

await API.put(
`/admin/projects/${id}/approve`
);


alert(
"Project Approved"
);


loadProjects();


}
catch(err){

alert(
"Approval failed"
);

}

};





const rejectProject=async(id)=>{

try{

await API.put(
`/admin/projects/${id}/reject`
);


alert(
"Project Rejected"
);


loadProjects();


}
catch(err){

alert(
"Rejection failed"
);

}

};







return(

<AdminLayout>


<div className="p-8">


<h1 className="
text-4xl
font-bold
mb-8
">

Pending Projects

</h1>





{
loading ?

<div className="text-center">

Loading...

</div>


:

projects.length===0 ?


<div className="
bg-white
shadow-lg
rounded-2xl
p-10
text-center
">


<h2 className="
text-2xl
font-bold
">

No Pending Projects

</h2>


<p className="
text-gray-500
mt-2
">

All projects are reviewed.

</p>


</div>



:


<div className="
grid
lg:grid-cols-2
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
">


<h2 className="
text-2xl
font-bold
">

{project.title}

</h2>



<p className="
text-gray-600
mt-3
">

{project.description}

</p>




<div className="
mt-5
space-y-2
">


<p>

Budget:

<b>
 ₹{project.budget}
</b>

</p>



<p>

Client:

<b>
 {project.client?.fullName}
</b>

</p>


<p>

Category:

<b>
 {project.category}
</b>

</p>


</div>





<div className="
flex
gap-4
mt-6
">


<button

onClick={()=>approveProject(project._id)}

className="
bg-green-600
text-white
px-5
py-3
rounded-xl
"


>

Approve

</button>




<button

onClick={()=>rejectProject(project._id)}

className="
bg-red-600
text-white
px-5
py-3
rounded-xl
"

>

Reject

</button>



</div>



</div>


))


}


</div>



}


</div>


</AdminLayout>

);


};


export default AdminProjects;