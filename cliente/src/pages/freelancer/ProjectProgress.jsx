import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../services/api";

const ProjectProgress = () => {

    const { id } = useParams();

    const [progress, setProgress] = useState({
        projectStatus:"",
        deadline:"",
        progress:0,
        totalMilestones:0,
        completedMilestones:0,
        remainingMilestones:0,
        daysRemaining:0,
        milestones:[]
    });

    const [loading,setLoading] = useState(true);
    const [error,setError] = useState("");



    useEffect(()=>{

        fetchProgress();

    },[id]);



    const fetchProgress = async()=>{

        try{

            setLoading(true);

            const res = await API.get(
                `/projects/${id}/progress`
            );


            console.log(
                "Progress:",
                res.data
            );


            if(res.data.success){


                let percentage = 
                parseInt(
                    res.data.progress
                ) || 0;


                // If backend says completed
                if(
                    res.data.projectStatus === "Completed"
                ){

                    percentage = 100;

                }



                setProgress({

                    ...res.data,

                    progress:percentage

                });


            }


        }
        catch(err){

            console.log(err);

            setError(
                err.response?.data?.message ||
                "Unable to load progress"
            );

        }
        finally{

            setLoading(false);

        }

    };





    const completeMilestone = async(id)=>{

        try{


            await API.put(
                `/milestones/${id}/complete`
            );


            // refresh progress after update

            fetchProgress();



        }
        catch(err){

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Unable to complete milestone"
            );

        }

    };





    if(loading){

        return(

            <DashboardLayout>

                <div className="p-10 text-xl">
                    Loading Progress...
                </div>

            </DashboardLayout>

        );

    }




    if(error){

        return(

            <DashboardLayout>

                <div className="bg-red-100 text-red-700 p-5 rounded-xl">

                    {error}

                </div>

            </DashboardLayout>

        );

    }





    return(

        <DashboardLayout>


            <div className="bg-white rounded-2xl shadow-lg p-8">


                <h1 className="text-3xl font-bold mb-8">

                    Project Progress Tracker

                </h1>




                <div className="grid md:grid-cols-2 gap-6 mb-8">


                    <div>

                        <p className="text-gray-500">
                            Project Status
                        </p>

                        <h2 className="text-xl font-bold">

                            {progress.projectStatus}

                        </h2>

                    </div>




                    <div>

                        <p className="text-gray-500">
                            Deadline
                        </p>


                        <h2 className="text-xl font-bold">

                            {
                            progress.deadline
                            ?
                            new Date(
                                progress.deadline
                            )
                            .toLocaleDateString(
                                "en-IN"
                            )
                            :
                            "N/A"
                            }

                        </h2>

                    </div>


                </div>







                {/* Progress Bar */}


                <div className="mb-10">


                    <div className="flex justify-between mb-3">

                        <span className="font-semibold">

                            Overall Progress

                        </span>


                        <span className="font-bold">

                            {progress.progress}%

                        </span>


                    </div>



                    <div className="w-full h-5 bg-gray-200 rounded-full">


                        <div

                        className="h-5 bg-green-600 rounded-full transition-all duration-700"

                        style={{
                            width:`${progress.progress}%`
                        }}

                        >

                        </div>


                    </div>


                </div>







                <div className="grid md:grid-cols-3 gap-5 mb-8">


                    <div className="bg-blue-100 p-5 rounded-xl text-center">

                        <h2 className="text-3xl font-bold">

                            {progress.totalMilestones}

                        </h2>

                        Total Milestones

                    </div>



                    <div className="bg-green-100 p-5 rounded-xl text-center">

                        <h2 className="text-3xl font-bold">

                            {progress.completedMilestones}

                        </h2>

                        Completed

                    </div>




                    <div className="bg-yellow-100 p-5 rounded-xl text-center">

                        <h2 className="text-3xl font-bold">

                            {progress.remainingMilestones}

                        </h2>

                        Remaining

                    </div>


                </div>





                <div className="bg-gray-100 p-5 rounded-xl mb-8">


                    <h2 className="font-semibold">

                        Days Left

                    </h2>


                    <p className="text-3xl font-bold">

                        {progress.daysRemaining}

                    </p>


                </div>








                <h2 className="text-2xl font-bold mb-5">

                    Project Milestones

                </h2>





                {
                progress.milestones.length === 0

                ?

                <p className="text-gray-500">

                    No milestones

                </p>


                :

                progress.milestones.map(
                    milestone=>(


                    <div

                    key={milestone._id}

                    className="border rounded-xl p-5 mb-5"


                    >


                    <div className="flex justify-between">


                        <h3 className="font-bold">

                            {milestone.title}

                        </h3>



                        <span>

                            {milestone.status}

                        </span>


                    </div>



                    <p className="mt-3 text-gray-600">

                        {milestone.description}

                    </p>



                    <p className="mt-3">

                        Due Date :

                        {
                        milestone.dueDate
                        ?
                        new Date(
                            milestone.dueDate
                        )
                        .toLocaleDateString(
                            "en-IN"
                        )
                        :
                        "-"
                        }

                    </p>



                    <p>

                        Completed At :

                        {
                        milestone.completedAt
                        ?
                        new Date(
                            milestone.completedAt
                        )
                        .toLocaleDateString(
                            "en-IN"
                        )
                        :
                        "-"
                        }

                    </p>





                    {
                    milestone.status !== "Completed"
                    &&

                    <button

                    onClick={()=>
                        completeMilestone(
                            milestone._id
                        )
                    }

                    className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg"

                    >

                    Mark Completed

                    </button>

                    }



                    </div>


                    )
                )

                }



            </div>


        </DashboardLayout>


    );

};


export default ProjectProgress;