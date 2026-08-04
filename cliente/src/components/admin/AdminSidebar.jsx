import { NavLink } from "react-router-dom";

import {
    FaHome,
    FaUsers,
    FaProjectDiagram,
    FaMoneyBillWave,
    FaUserCheck,
    FaChartLine,
    FaExclamationTriangle,
    FaWallet,
    FaSignOutAlt
} from "react-icons/fa";


const AdminSidebar = () => {


const menu = [

{
name:"Dashboard",
path:"/admin",
icon:<FaHome/>
},

{
name:"Users",
path:"/admin/users",
icon:<FaUsers/>
},

{
name:"Projects",
path:"/admin/projects",
icon:<FaProjectDiagram/>
},

{
name:"Payments",
path:"/admin/payments",
icon:<FaMoneyBillWave/>
},

{
name:"Platform Wallet",
path:"/admin/wallet",
icon:<FaWallet/>
},

{
name:"Verification",
path:"/admin/verifications",
icon:<FaUserCheck/>
},

{
name:"Analytics",
path:"/admin/analytics",
icon:<FaChartLine/>
},

{
name:"Disputes",
path:"/admin/disputes",
icon:<FaExclamationTriangle/>
}

];





return (

<div
className="
w-72
min-h-screen
bg-gradient-to-b
from-slate-950
via-slate-900
to-slate-950
text-white
flex
flex-col
shadow-2xl
"
>


{/* Header */}

<div
className="
p-6
border-b
border-slate-700
"
>

<h1
className="
text-3xl
font-extrabold
tracking-wide
"
>

SkillSphere

</h1>


<p
className="
text-sm
text-slate-400
mt-1
"
>

Admin Dashboard

</p>


</div>





{/* Menu */}

<div
className="
flex-1
p-5
space-y-3
"
>


{
menu.map(item=>(


<NavLink

key={item.path}

to={item.path}

className={({isActive})=>

`
flex
items-center
gap-4
px-5
py-3
rounded-xl
transition-all
duration-300

${
isActive

?

"bg-blue-600 text-white shadow-lg shadow-blue-500/30"

:

"text-slate-300 hover:bg-slate-700 hover:text-white"

}

`

}

>


<span className="text-xl">

{item.icon}

</span>


<span className="font-semibold">

{item.name}

</span>


</NavLink>


))

}



</div>








{/* Logout */}

<div
className="
p-5
border-t
border-slate-700
"
>


<button

onClick={()=>{

localStorage.removeItem("token");

window.location.href="/login";

}}

className="
w-full
flex
items-center
gap-4
px-5
py-3
rounded-xl
bg-red-600
hover:bg-red-700
transition
font-semibold
"

>


<FaSignOutAlt/>

Logout


</button>



</div>




</div>

);

};


export default AdminSidebar;