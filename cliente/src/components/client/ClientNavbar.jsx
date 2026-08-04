import {
    FaBell,
    FaUserCircle
    } from "react-icons/fa";
    
    
    const ClientNavbar=()=>{
    
    
    const user =
    JSON.parse(
    localStorage.getItem("user")
    );
    
    
    
    return(
    
    <div className="
    h-20
    bg-white
    shadow
    flex
    items-center
    justify-between
    px-8
    ml-64
    ">
    
    
    <h2 className="
    text-xl
    font-semibold
    ">
    
    Welcome,
    {" "}
    {user?.fullName || "Client"}
    
    </h2>
    
    
    
    
    <div className="
    flex
    items-center
    gap-6
    ">
    
    
    <button className="
    text-gray-600
    text-xl
    ">
    
    <FaBell/>
    
    </button>
    
    
    
    <div className="
    flex
    items-center
    gap-3
    ">
    
    
    <FaUserCircle
    
    className="
    text-4xl
    text-blue-600
    "
    
    />
    
    
    <div>
    
    
    <p className="
    font-semibold
    ">
    
    {user?.fullName}
    
    </p>
    
    
    <p className="
    text-sm
    text-gray-500
    ">
    
    Client
    
    </p>
    
    
    </div>
    
    
    </div>
    
    
    </div>
    
    
    </div>
    
    
    );
    
    
    };
    
    
    export default ClientNavbar;