import {
    useEffect,
    useState
} from "react";

import {
    FaBell
} from "react-icons/fa";

import API from "../../services/api";

import socket from "../../services/socket";


const NotificationBell =()=>{


const [notifications,setNotifications]=useState([]);

const [open,setOpen]=useState(false);





useEffect(()=>{


loadNotifications();



socket.connect();



socket.on(
"notification",
(data)=>{


setNotifications(prev=>[
data,
...prev
]);


});


return()=>{

socket.off(
"notification"
);

};


},[]);







const loadNotifications=async()=>{


try{


const res=await API.get(
"/notifications"
);


setNotifications(
res.data.notifications || []
);


}

catch(err){

console.log(err);

}


};









const markRead=async(id)=>{


try{


await API.put(
`/notifications/${id}/read`
);



setNotifications(prev=>

prev.map(n=>

n._id===id

?
{
...n,
read:true
}

:

n

)

);


}

catch(err){

console.log(err);

}


};









const unread = notifications.filter(
n=>!n.read
).length;







return(


<div className="
relative
">


<button

onClick={()=>setOpen(!open)}

className="
relative
bg-gray-100
p-3
rounded-full
hover:bg-gray-200
"

>


<FaBell/>

{

unread>0 &&

<span

className="
absolute
-top-1
-right-1
bg-red-500
text-white
text-xs
rounded-full
w-5
h-5
flex
items-center
justify-center
"

>

{unread}

</span>

}


</button>





{
open &&


<div

className="
absolute
right-0
mt-3
w-80
bg-white
rounded-xl
shadow-xl
border
z-50
"

>



<div className="
p-4
font-bold
border-b
">

Notifications

</div>





<div className="
max-h-96
overflow-y-auto
">


{

notifications.length===0

?

<p className="
p-4
text-gray-500
">

No notifications

</p>


:

notifications.map(n=>(


<div

key={n._id}

onClick={()=>markRead(n._id)}

className={`
p-4
border-b
cursor-pointer

${
!n.read
?
"bg-blue-50"
:
""
}

`}

>


<p className="
font-medium
">

{n.title}

</p>


<p className="
text-sm
text-gray-600
">

{n.message}

</p>



</div>


))


}



</div>



</div>


}


</div>


);


};


export default NotificationBell;