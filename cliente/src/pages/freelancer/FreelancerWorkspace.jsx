import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../services/api";

import {
    FaUpload,
    FaClock,
    FaCheckCircle,
    FaFileAlt
} from "react-icons/fa";


const FreelancerWorkspace = () => {


    const { projectId } = useParams();


    const [project,setProject] = useState(null);

    const [title,setTitle] = useState("");

    const [description,setDescription] = useState("");

    const [files,setFiles] = useState([]);

    const [loading,setLoading] = useState(false);

    const [pageLoading,setPageLoading] = useState(true);

    const [message,setMessage] = useState("");

    const [error,setError] = useState("");





    // ==========================
    // GET PROJECT
    // ==========================

    const getProject = async()=>{


        try{


            setPageLoading(true);


            const res = await API.get(
                `/projects/${projectId}`
            );


            setProject(
                res.data.project
            );


        }
        catch(err){

            console.log(err);

            setError(
                "Unable to load project"
            );

        }
        finally{

            setPageLoading(false);

        }


    };




    useEffect(()=>{


        getProject();


    },[projectId]);







    // ==========================
    // SUBMIT WORK
    // ==========================

    const submitWork = async(e)=>{


        e.preventDefault();


        if(!title || !description){

            setMessage(
                "Please fill all details"
            );

            return;

        }



        try{


            setLoading(true);

            setMessage("");



            const formData = new FormData();



            formData.append(
                "title",
                title
            );


            formData.append(
                "description",
                description
            );



            files.forEach(file=>{


                formData.append(
                    "files",
                    file
                );


            });





            await API.post(

                `/work/submit/${projectId}`,

                formData,

                {
                    headers:{
                        "Content-Type":
                        "multipart/form-data"
                    }
                }

            );




            setMessage(
                "Work submitted successfully ✅"
            );



            setTitle("");

            setDescription("");

            setFiles([]);



        }
        catch(err){


            console.log(err);


            setMessage(

                err.response?.data?.message ||
                "Submission failed"

            );


        }
        finally{


            setLoading(false);


        }


    };






    if(pageLoading){


        return(

            <DashboardLayout>

                <div className="p-8 text-center">

                    <h2 className="text-xl font-semibold">
                        Loading Workspace...
                    </h2>

                </div>

            </DashboardLayout>

        );

    }







    return(

        <DashboardLayout>


        <div className="p-8">



            <h1 className="
            text-4xl
            font-bold
            mb-8
            ">
                Freelancer Workspace
            </h1>





            {
                error &&

                <div className="
                bg-red-100
                text-red-700
                p-4
                rounded-xl
                mb-5
                ">

                    {error}

                </div>

            }







            {/* PROJECT DETAILS */}


            {
                project &&


                <div className="
                bg-white
                rounded-2xl
                shadow-lg
                p-6
                mb-8
                ">



                    <h2 className="
                    text-2xl
                    font-bold
                    ">

                        {project.title}

                    </h2>



                    <p className="
                    text-gray-600
                    mt-3
                    ">

                        {project.description}

                    </p>




                    <div className="
                    flex
                    gap-10
                    mt-5
                    ">



                        <div>

                            <p className="font-semibold">
                                Budget
                            </p>

                            <p>
                                ₹{project.budget}
                            </p>

                        </div>





                        <div>

                            <p className="font-semibold">
                                Status
                            </p>

                            <div className="
                            flex
                            items-center
                            gap-2
                            ">

                            <FaClock/>

                            {project.status}

                            </div>

                        </div>


                    </div>



                </div>

            }








            {/* SUBMIT WORK */}



            <div className="
            bg-white
            rounded-2xl
            shadow-lg
            p-8
            ">



            <h2 className="
            text-2xl
            font-bold
            mb-6
            ">

                Submit Completed Work

            </h2>





            <form onSubmit={submitWork}>




            <input

            type="text"

            className="
            w-full
            border
            p-3
            rounded-lg
            mb-4
            "

            placeholder="Work title"

            value={title}

            onChange={
                e=>setTitle(e.target.value)
            }

            />







            <textarea

            rows="5"

            className="
            w-full
            border
            p-3
            rounded-lg
            mb-4
            "

            placeholder="Describe completed work"

            value={description}

            onChange={
                e=>setDescription(e.target.value)
            }

            />








            <input

            type="file"

            multiple

            className="
            mb-4
            "

            onChange={
                e=>
                setFiles(
                    Array.from(
                        e.target.files
                    )
                )
            }

            />







            {
                files.length > 0 &&


                <div className="
                mb-4
                text-sm
                text-gray-600
                ">


                {
                    files.map((file,index)=>(

                        <p key={index}
                        className="
                        flex
                        items-center
                        gap-2
                        "
                        >

                        <FaFileAlt/>

                        {file.name}

                        </p>

                    ))
                }


                </div>

            }








            <button

            type="submit"

            disabled={loading}

            className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-8
            py-3
            rounded-xl
            font-semibold
            flex
            items-center
            gap-3
            "

            >


            <FaUpload/>


            {
                loading
                ?
                "Submitting..."
                :
                "Submit Work"
            }


            </button>





            </form>







            {
                message &&


                <div className="
                mt-5
                bg-green-100
                text-green-700
                p-3
                rounded-lg
                font-semibold
                ">

                    {message}

                </div>

            }




            </div>









            {/* STATUS */}



            <div className="
            bg-white
            rounded-2xl
            shadow-lg
            p-6
            mt-8
            ">


                <h2 className="
                text-xl
                font-bold
                mb-4
                ">
                    Submission Status
                </h2>



                <div className="
                flex
                items-center
                gap-3
                text-yellow-600
                ">


                <FaClock/>


                Waiting for client review


                </div>



            </div>






        </div>


        </DashboardLayout>

    );

};


export default FreelancerWorkspace;