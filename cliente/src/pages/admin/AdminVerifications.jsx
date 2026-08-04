import {useEffect,useState} from "react";
import API from "../../services/api";
import AdminLayout from "../../components/admin/AdminLayout";

import {
    FaCheck,
    FaTimes,
    FaUserCheck
} from "react-icons/fa";


const AdminVerifications =()=>{


const [requests,setRequests]=useState([]);
const [loading,setLoading]=useState(true);



useEffect(()=>{

loadRequests();

},[]);





const loadRequests=async()=>{


try{


const res=await API.get(
"/admin/pending-verifications"
);


setRequests(
res.data.users || 
res.data.requests ||
[]
);


}
catch(err){

console.log(err);

}
finally{

setLoading(false);

}


};







const verifyFreelancer=async(id,status)=>{


try{


await API.put(

`/admin/verify-freelancer/${id}`,

{
status
}

);


alert(
status==="approved"
?
"Freelancer Verified"
:
"Verification Rejected"
);


loadRequests();


}
catch(err){

console.log(err);

}



};







if(loading){

return(

<AdminLayout>

<div>
Loading Verification Requests...
</div>

</AdminLayout>

)

}





return(


<AdminLayout>


<h1 className="
text-3xl
font-bold
mb-8
flex
items-center
gap-3
">

<FaUserCheck/>

Freelancer Verification

</h1>




{
requests.length===0 ?

<div className="
bg-white
rounded-xl
shadow
p-10
text-center
">

No Pending Verification Requests

</div>



:


<div className="
grid
md:grid-cols-2
gap-6
">


{

requests.map(user=>(


<div

key={user._id}

className="
bg-white
rounded-2xl
shadow
p-6
"


>


<h2 className="
text-xl
font-bold
">

{user.fullName}

</h2>


<p className="text-gray-600">

{user.email}

</p>


<p className="mt-3">

Skills:

{user.skills?.join(", ")}

</p>





<div className="
flex
gap-4
mt-6
">


<button

onClick={()=>
verifyFreelancer(
user._id,
"approved"
)
}

className="
bg-green-600
text-white
px-5
py-3
rounded-xl
flex
items-center
gap-2
"

>

<FaCheck/>

Approve

</button>



<button

onClick={()=>
verifyFreelancer(
user._id,
"rejected"
)
}

className="
bg-red-600
text-white
px-5
py-3
rounded-xl
flex
items-center
gap-2
"

>

<FaTimes/>

Reject

</button>


</div>



</div>


))


}


</div>


}



</AdminLayout>


)


}


export default AdminVerifications;