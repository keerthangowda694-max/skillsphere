import { useEffect, useState } from "react";
import {
    FaUser,
    FaCamera,
    FaSave,
    FaGithub,
    FaLinkedin
} from "react-icons/fa";

import API from "../../services/api";
import DashboardLayout from "../../components/layout/DashboardLayout";


const Profile = () => {


    const [user,setUser] = useState(null);

    const [loading,setLoading] = useState(true);

    const [photo,setPhoto] = useState(null);



    const [form,setForm] = useState({

        fullName:"",
        phone:"",
        bio:"",
        location:"",
        experience:"",
        skills:"",
        portfolio:"",
        github:"",
        linkedin:""

    });




    useEffect(()=>{

        fetchProfile();

    },[]);





    // ==========================
    // Get Profile
    // ==========================

    const fetchProfile = async()=>{

        try{


            const res = await API.get(
                "/users/profile"
            );


            const data = res.data.user;


            setUser(data);



            setForm({

                fullName:data.fullName || "",

                phone:data.phone || "",

                bio:data.bio || "",

                location:data.location || "",

                experience:data.experience || "",

                skills:data.skills?.join(", ") || "",

                portfolio:data.portfolio || "",

                github:data.github || "",

                linkedin:data.linkedin || ""

            });


        }
        catch(err){

            console.log(err);

        }
        finally{

            setLoading(false);

        }

    };







    // ==========================
    // Update Profile
    // ==========================


    const updateProfile = async()=>{


        try{


            await API.put(
                "/users/profile",
                {

                    ...form,

                    skills:
                    form.skills
                    .split(",")
                    .map(skill=>skill.trim())

                }
            );


            alert(
                "Profile Updated Successfully"
            );


            fetchProfile();


        }
        catch(err){

            console.log(
                err.response?.data || err
            );

        }


    };






    // ==========================
    // Upload Photo
    // ==========================

    const uploadPhoto = async()=>{


        if(!photo){

            return alert(
                "Select image first"
            );

        }



        const formData = new FormData();


        formData.append(
            "photo",
            photo
        );



        try{


            await API.post(

                "/users/profile/photo",

                formData,

                {

                    headers:{

                        "Content-Type":
                        "multipart/form-data"

                    }

                }

            );


            alert(
                "Photo uploaded"
            );


            fetchProfile();


        }
        catch(err){

            console.log(
                err.response?.data || err
            );

        }


    };






    if(loading){


        return(

            <DashboardLayout>

                <div className="p-10 text-xl">

                    Loading Profile...

                </div>


            </DashboardLayout>

        );

    }






return (

<DashboardLayout>


<div className="p-8">


<h1 className="text-3xl font-bold mb-8">

    My Profile

</h1>



<div className="bg-white rounded-3xl shadow-xl p-8">



{/* Profile Header */}

<div className="flex items-center gap-6 mb-8">


<div className="relative">


<img

src={
user?.profilePhoto ||
"https://via.placeholder.com/150"
}

className="
w-32
h-32
rounded-full
object-cover
border-4
border-blue-500
"

/>



<label className="
absolute
bottom-0
right-0
bg-blue-600
text-white
p-3
rounded-full
cursor-pointer
">


<FaCamera/>


<input

type="file"

hidden

onChange={(e)=>
setPhoto(e.target.files[0])
}

/>


</label>


</div>



<div>


<h2 className="text-2xl font-bold">

{user?.fullName}

</h2>


<p className="text-gray-500">

{user?.email}

</p>


<button

onClick={uploadPhoto}

className="
mt-3
bg-blue-600
text-white
px-5
py-2
rounded-xl
"

>

Upload Photo

</button>


</div>


</div>







{/* Form */}


<div className="
grid
md:grid-cols-2
gap-5
">



{
[
["fullName","Full Name"],
["phone","Phone"],
["location","Location"],
["experience","Experience"],
["portfolio","Portfolio"],
["github","Github"],
["linkedin","LinkedIn"]

].map(([key,label])=>(


<div key={key}>


<label className="font-semibold">

{label}

</label>


<input

value={form[key]}

onChange={(e)=>

setForm({

...form,

[key]:e.target.value

})

}

className="
w-full
border
rounded-xl
p-3
mt-2
"

/>


</div>


))


}



</div>





<div className="mt-5">


<label className="font-semibold">

Bio

</label>


<textarea

rows="4"

value={form.bio}

onChange={(e)=>

setForm({

...form,

bio:e.target.value

})

}

className="
w-full
border
rounded-xl
p-3
mt-2
"

/>


</div>





<div className="mt-5">


<label className="font-semibold">

Skills
(Comma separated)

</label>


<input

value={form.skills}

onChange={(e)=>

setForm({

...form,

skills:e.target.value

})

}

placeholder="React, Node.js, MongoDB"

className="
w-full
border
rounded-xl
p-3
mt-2
"

/>


</div>







<button

onClick={updateProfile}

className="
mt-8
bg-green-600
hover:bg-green-700
text-white
px-8
py-3
rounded-xl
flex
items-center
gap-3
font-semibold
"

>

<FaSave/>

Save Profile

</button>




</div>


</div>


</DashboardLayout>

);


};


export default Profile;