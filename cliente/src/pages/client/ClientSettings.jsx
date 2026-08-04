import { useEffect, useState } from "react";

import API from "../../services/api";
import ClientLayout from "../../components/client/ClientLayout";

import {
    FaSave,
    FaLock,
    FaEnvelope,
    FaTrash
} from "react-icons/fa";


const ClientSettings = () => {


const [form,setForm] = useState({
    fullName:"",
    phone:"",
    location:"",
    bio:""
});


const [password,setPassword] = useState({
    currentPassword:"",
    newPassword:""
});


const [email,setEmail] = useState("");



// ======================
// LOAD SETTINGS
// ======================

useEffect(()=>{

    loadSettings();

},[]);



const loadSettings = async()=>{

    try{

        const res = await API.get("/settings");


        const user = res.data.user;


        setForm({

            fullName:user?.fullName || "",
            phone:user?.phone || "",
            location:user?.location || "",
            bio:user?.bio || ""

        });


        setEmail(
            user?.email || ""
        );


    }
    catch(error){

        console.log(
            error.response?.data || error
        );

    }

};




// ======================
// UPDATE PROFILE
// ======================

const updateSettings = async()=>{

    try{

        await API.put(
            "/settings",
            form
        );


        alert(
            "Profile updated successfully"
        );


    }
    catch(error){

        alert(
            error.response?.data?.message ||
            "Update failed"
        );

    }

};




// ======================
// CHANGE PASSWORD
// ======================

const changePassword = async()=>{

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
    catch(error){

        alert(
            error.response?.data?.message ||
            "Password change failed"
        );

    }

};




// ======================
// CHANGE EMAIL
// ======================

const changeEmail = async()=>{

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
    catch(error){

        alert(
            error.response?.data?.message ||
            "Email update failed"
        );

    }

};




// ======================
// DELETE ACCOUNT
// ======================

const deleteAccount = async()=>{


const confirmDelete = window.confirm(
    "Delete your SkillSphere account?"
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



window.location.href="/login";


}
catch(error){

alert(
    "Delete failed"
);

}


};






return(

<ClientLayout>


<div className="p-8">


<h1 className="
text-4xl
font-bold
mb-8
">

Client Settings

</h1>





{/* PROFILE */}


<div className="
bg-white
rounded-3xl
shadow-xl
p-8
">


<h2 className="
text-2xl
font-bold
mb-5
">

Profile Settings

</h2>



<div className="
grid
md:grid-cols-2
gap-5
">


{
Object.keys(form || {}).map((key)=>(


<div key={key}>


<label className="
font-semibold
capitalize
">

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

value={form[key] || ""}

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
text-white
px-6
py-3
rounded-xl
flex
gap-3
items-center
"

>

<FaSave/>

Save Changes


</button>


</div>









{/* PASSWORD */}


<div className="
bg-white
rounded-3xl
shadow-xl
p-8
mt-8
">


<h2 className="
text-2xl
font-bold
mb-5
">

Change Password

</h2>



<input

type="password"

placeholder="Current Password"

className="
w-full
border
rounded-xl
p-3
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
w-full
border
rounded-xl
p-3
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
text-white
px-6
py-3
rounded-xl
flex
gap-3
items-center
"

>

<FaLock/>

Change Password

</button>



</div>










{/* EMAIL */}


<div className="
bg-white
rounded-3xl
shadow-xl
p-8
mt-8
">


<h2 className="
text-2xl
font-bold
mb-5
">

Change Email

</h2>


<input

type="email"

className="
w-full
border
rounded-xl
p-3
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
text-white
px-6
py-3
rounded-xl
flex
gap-3
items-center
"

>

<FaEnvelope/>

Update Email

</button>



</div>









{/* DELETE */}


<div className="
bg-red-50
border
border-red-200
rounded-3xl
p-8
mt-8
">


<h2 className="
text-2xl
font-bold
text-red-600
">

Danger Zone

</h2>


<p className="mt-2 text-gray-600">

Delete your SkillSphere client account permanently.

</p>



<button

onClick={deleteAccount}

className="
mt-5
bg-red-600
text-white
px-6
py-3
rounded-xl
flex
gap-3
items-center
"

>

<FaTrash/>

Delete Account


</button>



</div>





</div>


</ClientLayout>

);


};


export default ClientSettings;