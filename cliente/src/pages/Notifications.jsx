import { useEffect, useState } from "react";
import { FaBell, FaCheckCircle } from "react-icons/fa";
import API from "../services/api";


const Notifications = () => {


    const [notifications,setNotifications] = useState([]);
    const [loading,setLoading] = useState(true);



    useEffect(()=>{

        fetchNotifications();

    },[]);




    const fetchNotifications = async()=>{

        try{

            setLoading(true);


            const res = await API.get(
                "/notifications"
            );


            setNotifications(
                res.data.notifications || []
            );


        }
        catch(err){

            console.log(
                err.response?.data || err
            );

        }
        finally{

            setLoading(false);

        }

    };





    const markRead = async(id)=>{

        try{


            await API.put(
                `/notifications/${id}/read`
            );


            setNotifications(prev=>

                prev.map(item=>

                    item._id === id

                    ?

                    {
                        ...item,
                        read:true
                    }

                    :

                    item

                )

            );


        }
        catch(err){

            console.log(err);

        }

    };





    const markAllRead = async()=>{

        try{


            await API.put(
                "/notifications/read-all"
            );


            setNotifications(prev=>

                prev.map(item=>({

                    ...item,
                    read:true

                }))

            );


        }
        catch(err){

            console.log(err);

        }

    };






    if(loading){

        return(

            <div className="
            flex
            justify-center
            items-center
            h-[70vh]
            ">

                <h2 className="
                text-xl
                font-semibold
                ">

                    Loading Notifications...

                </h2>

            </div>

        );

    }





    return(

        <div className="
        p-8
        ">



            <div className="
            flex
            justify-between
            items-center
            mb-6
            ">


                <h1 className="
                text-3xl
                font-bold
                flex
                items-center
                gap-3
                ">

                    <FaBell
                    className="text-blue-600"
                    />

                    Notifications

                </h1>



                {
                    notifications.length > 0 &&

                    <button

                    onClick={markAllRead}

                    className="
                    bg-blue-600
                    text-white
                    px-5
                    py-2
                    rounded-xl
                    hover:bg-blue-700
                    transition
                    "

                    >

                        Mark All Read

                    </button>

                }



            </div>





            <div className="
            bg-white
            rounded-2xl
            shadow-lg
            overflow-hidden
            ">


            {
                notifications.length === 0

                ?

                <div className="
                p-10
                text-center
                text-gray-500
                ">

                    No notifications available

                </div>


                :


                notifications.map(notification=>(


                    <div

                    key={notification._id}

                    onClick={()=>
                        markRead(notification._id)
                    }


                    className={`
                    p-5
                    border-b
                    cursor-pointer
                    flex
                    gap-4
                    items-start
                    transition

                    hover:bg-gray-50

                    ${
                        !notification.read
                        ?
                        "bg-blue-50"
                        :
                        ""
                    }

                    `}


                    >



                        <div className="
                        bg-blue-100
                        p-3
                        rounded-full
                        ">

                            <FaBell
                            className="text-blue-600"
                            />

                        </div>





                        <div className="
                        flex-1
                        ">


                            <h3 className="
                            font-semibold
                            text-lg
                            ">

                                {
                                notification.title ||
                                "Notification"
                                }

                            </h3>



                            <p className="
                            text-gray-600
                            mt-1
                            ">

                                {
                                notification.message
                                }

                            </p>




                            <p className="
                            text-xs
                            text-gray-400
                            mt-2
                            ">

                                {
                                new Date(
                                notification.createdAt
                                )
                                .toLocaleString()
                                }

                            </p>



                        </div>





                        {
                            notification.read &&

                            <FaCheckCircle
                            className="
                            text-green-500
                            mt-2
                            "
                            />

                        }



                    </div>


                ))

            }


            </div>


        </div>

    );

};


export default Notifications;