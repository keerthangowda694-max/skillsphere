import { useEffect, useState } from "react";
import ClientLayout from "../../components/client/ClientLayout";
import API from "../../services/api";

import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaBriefcase,
    FaEdit,
    FaSave
} from "react-icons/fa";


const ClientProfile = () => {


    const [profile,setProfile] = useState(null);

    const [loading,setLoading] = useState(true);

    const [edit,setEdit] = useState(false);



    const [form,setForm] = useState({

        fullName:"",
        email:"",
        phone:"",
        company:"",
        bio:""

    });





    useEffect(()=>{

        getProfile();

    },[]);






    const getProfile = async()=>{

        try{

            const res = await API.get(
                "/users/profile"
            );


            if(res.data.success){

                setProfile(
                    res.data.user
                );


                setForm({

                    fullName:
                    res.data.user.fullName || "",

                    email:
                    res.data.user.email || "",

                    phone:
                    res.data.user.phone || "",

                    company:
                    res.data.user.company || "",

                    bio:
                    res.data.user.bio || ""

                });

            }


        }
        catch(error){

            console.log(error);

        }
        finally{

            setLoading(false);

        }

    };








    const updateProfile = async()=>{


        try{


            const res = await API.put(

                "/users/profile",

                form

            );


            alert(
                "Profile Updated Successfully"
            );


            setEdit(false);

            getProfile();



        }
        catch(error){

            console.log(error);

            alert(
                "Update failed"
            );

        }


    };








    if(loading){

        return(

            <ClientLayout>

                <div className="p-10 text-center">

                    Loading Profile...

                </div>

            </ClientLayout>

        );

    }







    return(

    <ClientLayout>


        <div className="p-8">


            <h1 className="
            text-4xl
            font-bold
            mb-8
            flex
            gap-3
            items-center
            ">

                <FaUser/>

                Client Profile

            </h1>






            <div className="
            bg-white
            rounded-2xl
            shadow-xl
            p-8
            max-w-3xl
            ">





                <div className="
                flex
                items-center
                gap-5
                mb-8
                ">


                    <div className="
                    w-24
                    h-24
                    rounded-full
                    bg-blue-600
                    text-white
                    flex
                    items-center
                    justify-center
                    text-4xl
                    font-bold
                    ">

                        {
                        profile?.fullName
                        ?.charAt(0)
                        }


                    </div>



                    <div>

                        <h2 className="
                        text-3xl
                        font-bold
                        ">

                            {profile?.fullName}

                        </h2>


                        <p className="text-gray-500">

                            Client Account

                        </p>


                    </div>



                </div>









                <div className="space-y-5">



                    <div>

                        <label className="font-semibold">
                            Full Name
                        </label>


                        <input

                        disabled={!edit}

                        value={form.fullName}

                        onChange={
                            e=>
                            setForm({
                                ...form,
                                fullName:e.target.value
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







                    <div>

                        <label className="font-semibold">

                            Email

                        </label>


                        <input

                        disabled

                        value={form.email}

                        className="
                        w-full
                        border
                        rounded-xl
                        p-3
                        mt-2
                        "

                        />

                    </div>








                    <div>

                        <label className="font-semibold">

                            Phone

                        </label>


                        <input

                        disabled={!edit}

                        value={form.phone}

                        onChange={
                            e=>
                            setForm({
                                ...form,
                                phone:e.target.value
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








                    <div>

                        <label className="font-semibold">

                            Company

                        </label>


                        <input

                        disabled={!edit}

                        value={form.company}

                        onChange={
                            e=>
                            setForm({
                                ...form,
                                company:e.target.value
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








                    <div>

                        <label className="font-semibold">

                            Bio

                        </label>


                        <textarea

                        disabled={!edit}

                        value={form.bio}

                        onChange={
                            e=>
                            setForm({
                                ...form,
                                bio:e.target.value
                            })
                        }


                        rows="4"

                        className="
                        w-full
                        border
                        rounded-xl
                        p-3
                        mt-2
                        "

                        />

                    </div>




                </div>







                {
                edit ?

                <button

                onClick={updateProfile}

                className="
                mt-8
                bg-green-600
                text-white
                px-6
                py-3
                rounded-xl
                flex
                items-center
                gap-2
                "

                >

                    <FaSave/>

                    Save Changes

                </button>


                :


                <button

                onClick={()=>setEdit(true)}

                className="
                mt-8
                bg-blue-600
                text-white
                px-6
                py-3
                rounded-xl
                flex
                items-center
                gap-2
                "

                >

                    <FaEdit/>

                    Edit Profile

                </button>


                }



            </div>



        </div>


    </ClientLayout>

    );

};


export default ClientProfile;