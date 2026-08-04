import AdminSidebar from "./AdminSidebar";


const AdminLayout=({children})=>{


return(

<div className="
flex
min-h-screen
bg-gray-100
">


<AdminSidebar/>


<main className="
flex-1
overflow-y-auto
">

{children}

</main>


</div>

)

}


export default AdminLayout;