import {useEffect,useState} from "react";
import API from "../../services/api";
import AdminLayout from "../../components/admin/AdminLayout";


const AdminDisputes=()=>{


const [disputes,setDisputes]=useState([]);



useEffect(()=>{

API.get("/disputes/all")
.then(res=>
setDisputes(res.data.disputes)
);

},[]);



return(

<AdminLayout>


<h1 className="text-3xl font-bold mb-6">
Disputes
</h1>


{
disputes.map(d=>(

<div
key={d._id}
className="
bg-white
p-5
rounded-xl
shadow mb-4
">

<h2>
{d.title}
</h2>


<p>
Status :
{d.status}
</p>


</div>

))
}


</AdminLayout>

)

}


export default AdminDisputes;