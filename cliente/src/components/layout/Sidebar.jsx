import {
    FaHome,
    FaProjectDiagram,
    FaBell,
    FaCog,
    FaChartLine,
    FaUserCircle,
    FaSignOutAlt,
    FaComments,
    FaEnvelope,
    FaWallet,
    FaFileAlt,
    FaFileUpload
} from "react-icons/fa";


import { NavLink } from "react-router-dom";
import { color, hover, motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";



const Sidebar = () => {


const {logout}=useContext(AuthContext);



const menu=[


{
name:"Dashboard",
icon:<FaHome/>,
path:"/freelancer/dashboard"
},


{
name:"Projects",
icon:<FaProjectDiagram/>,
path:"/freelancer/projects"
},
{
    name:"Work Submission",
    path:"/freelancer/workspace",
    icon:<FaFileUpload/>
},


{

    name: "Applications",
    path: "/freelancer/applications",
    icon: <FaFileAlt />,
    
},


{
name:"Analytics",
icon:<FaChartLine/>,
path:"/freelancer/analytics"
},


{
name:"Messages",
icon:<FaComments/>,
path:"/freelancer/chats"
},


{
name:"Notifications",
icon:<FaBell/>,
path:"/freelancer/notifications"
},


{
name:"Invitations",
icon:<FaEnvelope/>,
path:"/freelancer/invitations"
},


{
name:"Payments",
icon:<FaWallet/>,
path:"/freelancer/payments"
},


{
name:"Profile",
icon:<FaUserCircle/>,
path:"/profile"
},


{
name:"Settings",
icon:<FaCog/>,
path:"/settings"
},


];




return(


<div className="
w-72
h-screen
bg-slate-900
text-white
flex
flex-col
shadow-2xl
">



{/* LOGO */}

<div className="
p-8
border-b
border-slate-700
">


<h1 className="
text-3xl
font-extrabold
tracking-wide
">

SkillSphere

</h1>


<p className="
text-slate-400
mt-2
">

Freelancer Panel

</p>


</div>






{/* MENU */}


<div className="
flex-1
mt-6
overflow-y-auto
">


{

menu.map(item=>(


<NavLink

key={item.name}

to={item.path}


className={({isActive})=>`


mx-4
mb-2
flex
items-center
gap-4
px-5
py-4
rounded-xl
transition-all
duration-300


${

isActive

?


"bg-blue-600 text-white shadow-lg shadow-blue-600/30"

:

"hover:bg-slate-800 text-slate-300"

}


`}


>


<motion.span

whileHover={{
scale:1.15
}}

className="
text-xl
"

>

{item.icon}

</motion.span>



<span className="
font-medium
">

{item.name}

</span>



</NavLink>


))


}



</div>







{/* LOGOUT */}


<div className="
p-6
">


<motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}


onClick={logout}


className="
w-full
bg-red-500
hover:bg-red-600
rounded-xl
py-3
font-semibold
transition
"


>


<FaSignOutAlt
className="
inline
mr-3
"/>


Logout


</motion.button>



</div>





</div>


);


};


export default Sidebar;