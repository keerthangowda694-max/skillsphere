import { useEffect, useState } from "react";
import ClientLayout from "../../components/client/ClientLayout";
import API from "../../services/api";
import PayButton from "../../components/payments/PayButton";
import {
    FaFile,
    FaUser,
    FaClock,
    FaCheckCircle,
    FaTimesCircle,
    FaComments
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const ClientWorkspace =()=>{


    const [submissions,setSubmissions] = useState([]);

    const [loading,setLoading] = useState(true);

    const [feedback,setFeedback] = useState({});

    const [actionLoading,setActionLoading] = useState(false);

    const navigate = useNavigate();






    useEffect(()=>{

        getSubmissions();

    },[]);








    const getSubmissions = async()=>{


        try{


            const res = await API.get(
                "/client/work-submissions"
            );


            if(res.data.success){

                setSubmissions(
                    res.data.submissions
                );

            }


        }
        catch(error){

            console.log(error);

        }
        finally{

            setLoading(false);

        }


    };








    // =========================
    // APPROVE WORK
    // =========================

    const approveWork = async(id)=>{


        try{


            setActionLoading(true);


            await API.put(
                `/work/client/work/${id}/approve`
            );


            alert(
                "Work Approved Successfully"
            );


            getSubmissions();


        }
        catch(error){

            console.log(error);

            alert(
                "Approval Failed"
            );

        }
        finally{

            setActionLoading(false);

        }


    };









    // =========================
    // REQUEST CHANGES
    // =========================

    const requestChanges = async(id)=>{


        try{


            setActionLoading(true);


            await API.put(

                `/work/client/work/${id}/request-changes`,

                {
                    feedback:
                    feedback[id] ||
                    "Please make changes"
                }

            );



            alert(
                "Changes Requested"
            );


            getSubmissions();


        }
        catch(error){

            console.log(error);

            alert(
                "Request Failed"
            );

        }
        finally{

            setActionLoading(false);

        }


    };

    const messageFreelancer = async (item) => {

        try {
    
            const res = await API.post("/chat/conversation", {
                projectId: item.project._id,
                freelancerId: item.freelancer._id,
            });
    
            navigate("/client/chat", {
                state: {
                    conversation: res.data.conversation,
                },
            });
    
        } catch (error) {
    
            console.log(error);
    
            alert("Unable to open chat.");
    
        }
    
    };









    if(loading){

        return(

            <ClientLayout>

                <div className="
                p-10
                text-center
                text-xl
                ">

                    Loading Work Review...

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
            ">

                Work Review

            </h1>







            {
                submissions.length === 0 ?


                <div className="
                bg-white
                rounded-2xl
                shadow
                p-10
                text-center
                ">


                    <h2 className="
                    text-xl
                    font-semibold
                    ">

                        No Work Submitted Yet

                    </h2>


                    <p className="
                    text-gray-500
                    mt-2
                    ">

                        Freelancer submissions will appear here.

                    </p>


                </div>



                :



                <div className="
                grid
                lg:grid-cols-2
                gap-6
                ">


                {

                submissions.map(item=>(


                <div

                key={item._id}

                className="
                bg-white
                rounded-2xl
                shadow-lg
                p-6
                "

                >




                    <h2 className="
                    text-2xl
                    font-bold
                    ">

                        {item.project?.title}

                    </h2>





                    <p className="
                    text-gray-600
                    mt-3
                    ">

                        {item.project?.description}

                    </p>









                    <div className="
                    mt-5
                    space-y-3
                    ">


                        <div className="
                        flex
                        items-center
                        gap-3
                        ">

                            <FaUser/>


                            Freelancer:

                            <b>
                            {item.freelancer?.fullName}
                            </b>


                        </div>






                        <div className="
                        flex
                        items-center
                        gap-3
                        ">


                            <FaClock/>


                            Status:


                            <b className={

                            item.status==="Approved"

                            ?

                            "text-green-600"

                            :

                            item.status==="Changes Requested"

                            ?

                            "text-red-600"

                            :

                            "text-yellow-600"

                            }>


                            {
                            item.status ||
                            "Pending Review"
                            }


                            </b>


                        </div>



                    </div>









                    <h3 className="
                    font-bold
                    mt-6
                    mb-3
                    ">

                        Submitted Files

                    </h3>








                    {

                    item.files?.length > 0 ?


                    item.files.map(

                    (file,index)=>(


                    <div

                    key={index}

                    className="
                    flex
                    items-center
                    gap-3
                    bg-gray-100
                    p-3
                    rounded-xl
                    mb-2
                    "

                    >


                        <FaFile/>




                        <a

                        href={file.url}

                        target="_blank"

                        rel="noreferrer"

                        className="
                        text-blue-600
                        "

                        >

                        {file.fileName || file.filename}

                        </a>



                    </div>


                    ))



                    :


                    <p className="
                    text-gray-500
                    ">

                        No files uploaded

                    </p>


                    }









<div className="mt-6">

{item.status !== "Approved" && (
    <>
        <textarea
            className="w-full border rounded-xl p-3"
            rows="3"
            placeholder="Write feedback for freelancer"
            value={feedback[item._id] || ""}
            onChange={(e) =>
                setFeedback({
                    ...feedback,
                    [item._id]: e.target.value,
                })
            }
        />

        <div className="flex gap-4 mt-4">

            <button
                disabled={actionLoading}
                onClick={() => approveWork(item._id)}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
            >
                <FaCheckCircle />
                Approve
            </button>

            <button
                disabled={actionLoading}
                onClick={() => requestChanges(item._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
            >
                <FaTimesCircle />
                Request Changes
            </button>

        </div>
    </>
)}

<button
    onClick={() => messageFreelancer(item)}
    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
>
    <FaComments />
    Message Freelancer
</button>

{
item.status==="Approved" &&

<PayButton

    projectId={item.project?._id}

    amount={item.project?.budget||5000}

/>

}

</div>


                </div>


                ))

                }



                </div>


            }




        </div>


    </ClientLayout>


    );

};


export default ClientWorkspace;