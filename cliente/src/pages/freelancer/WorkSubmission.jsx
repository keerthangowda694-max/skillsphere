import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../services/api";


const WorkSubmission = () => {


    const [projects,setProjects] = useState([]);



    useEffect(()=>{

        fetchProjects();

    },[]);



    const fetchProjects = async()=>{

        try{

            const res = await API.get(
                "/projects/my-projects"
            );

            if(res.data.success){

                setProjects(res.data.projects);

            }

        }
        catch(error){

            console.log(error);

        }

    };




    return (

        <DashboardLayout>


            <div className="p-8">


                <h1 className="
                text-3xl
                font-bold
                mb-6
                ">
                    Work Submission
                </h1>



                <div className="
                grid
                md:grid-cols-2
                gap-6
                ">


                {
                    projects.map(project=>(


                        <div
                        key={project._id}
                        className="
                        bg-white
                        shadow-lg
                        rounded-xl
                        p-6
                        "
                        >


                            <h2 className="
                            text-xl
                            font-bold
                            ">
                                {project.title}
                            </h2>



                            <p className="text-gray-600 mt-2">

                                {project.status}

                            </p>




                            <Link

                            to={`/freelancer/workspace/${project._id}`}

                            className="
                            mt-5
                            block
                            text-center
                            bg-blue-600
                            text-white
                            py-3
                            rounded-xl
                            "

                            >

                            Open Workspace

                            </Link>



                        </div>


                    ))
                }


                </div>


            </div>


        </DashboardLayout>

    );


};


export default WorkSubmission;