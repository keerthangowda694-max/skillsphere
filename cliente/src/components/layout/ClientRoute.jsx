import {Navigate} from "react-router-dom";


const ClientRoute = ({children})=>{


const user =
JSON.parse(
localStorage.getItem("user")
);



if(!user){

return <Navigate to="/login"/>

}



if(user.role !== "client"){

return <Navigate to="/"/>

}



return children;


};


export default ClientRoute;