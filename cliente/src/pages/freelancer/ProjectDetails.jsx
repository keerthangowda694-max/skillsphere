import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../services/api";

import {
    FaUser,
    FaMoneyBillWave,
    FaCalendarAlt,
    FaTasks,
    FaClock,
    FaCheckCircle,
} from "react-icons/fa";


const ProjectDetails = () => {

    const { id } = useParams();

    const [project, setProject] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [applying, setApplying] = useState(false);

    const [applied, setApplied] = useState(false);



    useEffect(() => {
        fetchProject();
    }, []);



    const fetchProject = async () => {

        try {

            const res = await API.get(`/projects/${id}`);

            setProject(res.data.project);


        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to load project."
            );

        }
        finally {

            setLoading(false);

        }

    };




    // ============================
    // APPLY NOW
    // ============================

    const handleApply = async(projectId)=>{

try{

const response = await API.post(

"/applications/apply",

{

projectId,

proposal:
"I am interested in this project. I have the required skills and can deliver quality work.",

bidAmount:5000,

estimatedDays:10

}

);


alert(
response.data.message
);


}

catch(error){

console.log(

error.response?.data || error

);


alert(

error.response?.data?.message ||
"Application failed"

);

}


};




    if (loading) {

        return (

            <DashboardLayout>

                <h2 className="text-center text-2xl font-bold py-10">
                    Loading Project...
                </h2>

            </DashboardLayout>

        );

    }





    if(error){

        return (

            <DashboardLayout>

                <div className="bg-red-100 text-red-700 p-5 rounded-xl">

                    {error}

                </div>

            </DashboardLayout>

        );

    }




    return (

        <DashboardLayout>


            <div className="bg-white rounded-2xl shadow-lg p-8">


                <div className="flex justify-between items-start">


                    <div>

                        <h1 className="text-4xl font-bold">

                            {project.title}

                        </h1>


                        <p className="mt-4 text-gray-600">

                            {project.description}

                        </p>


                    </div>




                    <div className="text-right">


                        <h3 className="text-2xl font-bold">

                            Project Status

                        </h3>



                        <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full">

                            {project.status}

                        </span>



                        {/* APPLY BUTTON */}

                        <div className="mt-6">


                        <button

onClick={() => handleApply(project._id)}

disabled={
    applying ||
    applied
}

className={`
px-6 py-3 rounded-xl 
text-white font-semibold
transition

${
    applied
    ?
    "bg-green-600 cursor-not-allowed"
    :
    applying
    ?
    "bg-gray-500"
    :
    "bg-blue-600 hover:bg-blue-700"
}
`}

>

{
    applied
    ?
    "Applied ✓"
    :
    applying
    ?
    "Applying..."
    :
    "Apply Now"
}

</button>


                        </div>



                    </div>



                </div>






                <div className="grid md:grid-cols-2 gap-10 mt-10">



                    <div className="space-y-6">



                        <div className="flex gap-3">

                            <FaUser className="text-blue-600 mt-1"/>

                            <div>

                                <p className="text-gray-500">
                                    Client
                                </p>

                                <h3 className="font-semibold">

                                    {
                                        project.client?.fullName ||
                                        "Unknown"
                                    }

                                </h3>

                            </div>

                        </div>




                        <div className="flex gap-3">

                            <FaMoneyBillWave className="text-green-600 mt-1"/>

                            <div>

                                <p className="text-gray-500">
                                    Budget
                                </p>


                                <h3 className="font-semibold">

                                {
                                project.budget
                                ?
                                `₹${project.budget.min?.toLocaleString()} - ₹${project.budget.max?.toLocaleString()}`
                                :
                                "Not specified"
                                }


                                </h3>


                            </div>

                        </div>






                        <div className="flex gap-3">

                            <FaTasks className="text-purple-600 mt-1"/>

                            <div>

                                <p className="text-gray-500">
                                    Experience Required
                                </p>

                                <h3 className="font-semibold">

                                    {project.experienceRequired} Years

                                </h3>

                            </div>


                        </div>






                        <div className="flex gap-3">

                            <FaCalendarAlt className="text-red-500 mt-1"/>

                            <div>

                                <p className="text-gray-500">
                                    Deadline
                                </p>


                                <h3 className="font-semibold">

                                {
                                new Date(
                                    project.deadline
                                ).toLocaleDateString()
                                }

                                </h3>


                            </div>


                        </div>




                        <div>


                            <p className="text-gray-500 mb-3">
                                Required Skills
                            </p>


                            <div className="flex flex-wrap gap-2">


                            {
                            project.requiredSkills?.map(skill=>(

                                <span

                                key={skill}

                                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"

                                >

                                {skill}

                                </span>

                            ))
                            }


                            </div>


                        </div>



                    </div>







                    <div>


                        <div className="flex justify-between mb-2">

                            <span>
                                Progress
                            </span>


                            <span>

                            {
                            project.status==="Completed"
                            ?
                            100
                            :
                            project.status==="In Progress"
                            ?
                            50
                            :
                            0
                            }%

                            </span>


                        </div>




                        <div className="w-full bg-gray-200 h-4 rounded-full">

                            <div

                            className="bg-blue-600 h-4 rounded-full"

                            style={{

                            width:
                            `${
                            project.status==="Completed"
                            ?
                            100
                            :
                            project.status==="In Progress"
                            ?
                            50
                            :
                            0
                            }%`

                            }}

                            />

                        </div>




                        <div className="mt-8 space-y-5">


                            <div className="flex gap-3">

                                <FaClock className="text-orange-500"/>

                                <span>

                                Created :
                                {" "}
                                {
                                new Date(
                                project.createdAt
                                ).toLocaleDateString()
                                }

                                </span>


                            </div>





                            <div className="flex gap-3">


                                <FaCheckCircle className="text-green-600"/>


                                <span>

                                Evidence Files :
                                {" "}
                                {
                                project.evidenceFiles?.length || 0
                                }

                                </span>


                            </div>



                        </div>



                    </div>



                </div>



            </div>







            <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">


                <h2 className="text-2xl font-bold mb-4">
                    Project Description
                </h2>


                <p className="text-gray-600 leading-8">

                    {project.description}

                </p>


            </div>






            <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">


                <h2 className="text-2xl font-bold mb-6">

                    Project Milestones

                </h2>


                {
                project.milestones?.length > 0

                ?

                project.milestones.map(
                    (milestone,index)=>(

                    <div

                    key={index}

                    className="border rounded-xl p-4 mb-4"

                    >

                        <h3 className="font-semibold">

                        {
                        milestone.title ||
                        `Milestone ${index+1}`
                        }

                        </h3>


                    </div>

                    )
                )

                :

                <p className="text-gray-500">
                    No milestones added.
                </p>

                }


            </div>



        </DashboardLayout>

    );

};


export default ProjectDetails;