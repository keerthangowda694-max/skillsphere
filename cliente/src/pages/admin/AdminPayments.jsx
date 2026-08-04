import {useEffect,useState} from "react";
import API from "../../services/api";
import AdminLayout from "../../components/admin/AdminLayout";


const AdminPayments=()=>{


const [payments,setPayments]=useState([]);


useEffect(()=>{

load();

},[]);



const load=async()=>{

const res=await API.get(
"/admin/payments"
);

setPayments(
res.data.payments
);


}



return(

<AdminLayout>

<h1 className="
text-3xl
font-bold
mb-6
">
Payments
</h1>



<div className="grid gap-5">


{
payments.map(p=>(


<div
key={p._id}
className="
bg-white
p-6
rounded-xl
shadow
">


<h2 className="font-bold">

{p.project?.title}

</h2>


<p>
Client :
{p.client?.fullName}
</p>


<p>
Freelancer :
{p.freelancer?.fullName}
</p>


<p>
Amount :
₹{p.amount}
</p>


<p>
Status :
{p.status}
</p>


</div>


))
}



</div>


</AdminLayout>


)

}


export default AdminPayments;