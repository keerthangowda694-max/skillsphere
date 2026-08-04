import {useEffect,useState} from "react";
import API from "../../services/api";
import AdminLayout from "../../components/admin/AdminLayout";

import {
    FaUsers,
    FaProjectDiagram,
    FaMoneyBillWave,
    FaUserTie,
    FaCheckCircle,
    FaStar
} from "react-icons/fa";


const AdminDashboard = ()=>{


const [stats,setStats]=useState({});



useEffect(()=>{

    loadDashboard();

},[]);





const loadDashboard=async()=>{

try{

const res = await API.get(
    "/admin/dashboard"
);


setStats(
    res.data.analytics
);


}
catch(err){

console.log(
    err.response?.data || err
);

}


};





const cards=[


{
title:"Total Users",
value:stats.totalUsers,
icon:<FaUsers/>
},


{
title:"Clients",
value:stats.totalClients,
icon:<FaUsers/>
},


{
title:"Freelancers",
value:stats.totalFreelancers,
icon:<FaUserTie/>
},


{
title:"Verified Freelancers",
value:stats.verifiedFreelancers,
icon:<FaCheckCircle/>
},


{
title:"Projects",
value:stats.totalProjects,
icon:<FaProjectDiagram/>
},


{
title:"Completed Projects",
value:stats.completedProjects,
icon:<FaCheckCircle/>
},


{
title:"Payments",
value:`₹${stats.totalPaymentVolume || 0}`,
icon:<FaMoneyBillWave/>
},


{
title:"Platform Revenue",
value:`₹${stats.platformRevenue || 0}`,
icon:<FaMoneyBillWave/>
},


{
title:"Reviews",
value:stats.totalReviews,
icon:<FaStar/>
},


{
title:"Success Rate",
value:`${stats.successRate || 0}%`,
icon:<FaCheckCircle/>
}


];




return(


<AdminLayout>


<div className="p-8">


<h1 className="
text-4xl
font-bold
mb-8
">

Admin Dashboard

</h1>





<div className="
grid
sm:grid-cols-2
lg:grid-cols-4
gap-6
">


{
cards.map((card,index)=>(


<div

key={index}

className="
bg-white
shadow-lg
rounded-2xl
p-6
hover:shadow-xl
transition
"


>


<div className="
flex
justify-between
items-center
">


<div>


<h2 className="
text-gray-500
font-semibold
">

{card.title}

</h2>


<p className="
text-3xl
font-bold
mt-3
">

{card.value || 0}

</p>


</div>



<div className="
text-4xl
text-blue-600
">

{card.icon}

</div>



</div>


</div>


))


}


</div>





<div className="
grid
md:grid-cols-3
gap-6
mt-10
">



<div className="
bg-blue-600
text-white
rounded-2xl
p-6
">

<h2 className="font-bold">

Escrow Payments

</h2>

<p className="
text-3xl
mt-3
">

{stats.escrowPayments || 0}

</p>


</div>




<div className="
bg-green-600
text-white
rounded-2xl
p-6
">


<h2 className="font-bold">

Released Payments

</h2>


<p className="
text-3xl
mt-3
">

{stats.releasedPayments || 0}

</p>


</div>





<div className="
bg-red-600
text-white
rounded-2xl
p-6
">

<h2 className="font-bold">

Refunded Payments

</h2>


<p className="
text-3xl
mt-3
">

{stats.refundedPayments || 0}

</p>


</div>




</div>





</div>


</AdminLayout>


);


};


export default AdminDashboard;