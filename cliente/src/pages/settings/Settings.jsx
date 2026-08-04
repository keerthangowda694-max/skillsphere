import {useEffect,useState} from "react";

import API from "../../services/api";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
    FaSave,
    FaLock,
    FaEnvelope,
    FaTrash
} from "react-icons/fa";



const Settings = ()=>{


const [form,setForm]=useState({

    fullName:"",
    phone:"",
    location:"",
    bio:""

});



const [password,setPassword]=useState({

    currentPassword:"",
    newPassword:""

});



const [email,setEmail]=useState("");





useEffect(()=>{

    loadSettings();

},[]);







// ============================
// Load Settings
// ============================

const loadSettings=async()=>{


try{


const res =
await API.get(
    "/settings"
);



const user=res.data.user;



setForm({

    fullName:user.fullName || "",

    phone:user.phone || "",

    location:user.location || "",

    bio:user.bio || ""

});


setEmail(
    user.email || ""
);



}
catch(err){

console.log(
    err.response?.data || err
);

}


};









// ============================
// Update Settings
// ============================

const updateSettings=async()=>{


try{


await API.put(

    "/settings",

    form

);


alert(
"Settings updated successfully"
);


}
catch(err){

alert(
err.response?.data?.message
);

}


};









// ============================
// Change Password
// ============================

const changePassword=async()=>{


try{


await API.put(

    "/settings/password",

    password

);



alert(
"Password changed successfully"
);



setPassword({

currentPassword:"",
newPassword:""

});



}
catch(err){

alert(
err.response?.data?.message
);

}


};










// ============================
// Change Email
// ============================


const changeEmail=async()=>{


try{


await API.put(

    "/settings/email",

    {
        email
    }

);



alert(
"Email updated successfully"
);



}
catch(err){


alert(
err.response?.data?.message
);


}


};









// ============================
// Delete Account
// ============================


const deleteAccount=async()=>{


const confirmDelete =
window.confirm(
"Are you sure you want to delete your account?"
);



if(!confirmDelete)
return;




try{


await API.delete(
    "/settings/delete"
);



localStorage.removeItem(
    "token"
);



alert(
"Account deleted"
);



window.location.href="/login";



}
catch(err){

alert(
"Delete failed"
);


}


};








return(


<DashboardLayout>


<div className="p-8">



<h1 className="
text-3xl
font-bold
mb-8
">

Settings

</h1>





{/* Account Settings */}


<div className="
bg-white
rounded-3xl
shadow-xl
p-8
">


<h2 className="
text-xl
font-bold
mb-5
">

Account Settings

</h2>





<div className="
grid
md:grid-cols-2
gap-5
">



{
Object.keys(form).map(key=>(


<div key={key}>


<label className="font-semibold capitalize">

{key}

</label>



<input

className="
w-full
border
rounded-xl
p-3
mt-2
"

value={form[key]}

onChange={(e)=>

setForm({

...form,

[key]:e.target.value

})

}

/>


</div>


))


}



</div>





<button

onClick={updateSettings}

className="
mt-6
bg-blue-600
hover:bg-blue-700
text-white
px-6
py-3
rounded-xl
flex
items-center
gap-3
"

>

<FaSave/>

Save Changes

</button>




</div>









{/* Password */}



<div className="
bg-white
rounded-3xl
shadow-xl
p-8
mt-8
">


<h2 className="
text-xl
font-bold
mb-5
">

Change Password

</h2>





<input

type="password"

placeholder="Current Password"

className="
border
rounded-xl
p-3
w-full
mb-4
"

value={password.currentPassword}

onChange={(e)=>

setPassword({

...password,

currentPassword:e.target.value

})

}

/>





<input

type="password"

placeholder="New Password"

className="
border
rounded-xl
p-3
w-full
"

value={password.newPassword}

onChange={(e)=>

setPassword({

...password,

newPassword:e.target.value

})

}

/>





<button

onClick={changePassword}

className="
mt-5
bg-green-600
hover:bg-green-700
text-white
px-6
py-3
rounded-xl
flex
items-center
gap-3
"

>


<FaLock/>

Change Password


</button>



</div>









{/* Email Change */}



<div className="
bg-white
rounded-3xl
shadow-xl
p-8
mt-8
">


<h2 className="
text-xl
font-bold
mb-5
">

Change Email

</h2>





<input

type="email"

className="
border
rounded-xl
p-3
w-full
"

value={email}

onChange={(e)=>

setEmail(e.target.value)

}

/>





<button

onClick={changeEmail}

className="
mt-5
bg-purple-600
hover:bg-purple-700
text-white
px-6
py-3
rounded-xl
flex
items-center
gap-3
"

>


<FaEnvelope/>

Update Email


</button>



</div>









{/* Danger Zone */}



<div className="
bg-red-50
rounded-3xl
p-8
mt-8
border
border-red-200
">


<h2 className="
text-xl
font-bold
text-red-600
">

Danger Zone

</h2>



<p className="
text-gray-600
mt-2
">

Deleting your account permanently removes your SkillSphere account.

</p>




<button

onClick={deleteAccount}

className="
mt-5
bg-red-600
hover:bg-red-700
text-white
px-6
py-3
rounded-xl
flex
items-center
gap-3
"

>


<FaTrash/>

Delete Account


</button>



</div>







</div>


</DashboardLayout>


);


};


export default Settings;