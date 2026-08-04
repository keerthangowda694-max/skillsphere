import {useEffect,useState} from "react";
import API from "../../services/api";
import AdminLayout from "../../components/admin/AdminLayout";


const AdminUsers=()=>{


const [users,setUsers]=useState([]);


useEffect(()=>{

API.get("/admin/users")
.then(res=>setUsers(res.data.users));

},[]);



return(

<AdminLayout>


<h1 className="text-3xl font-bold mb-6">
Users
</h1>


<div className="grid gap-4">


{
users.map(user=>(


<div
className="
bg-white
p-5
rounded-xl
shadow
"
key={user._id}
>


<h2 className="font-bold">

{user.fullName}

</h2>


<p>
{user.email}
</p>


<p>
Role : {user.role}
</p>


</div>


))
}


</div>


</AdminLayout>

)

}


export default AdminUsers;