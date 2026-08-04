import { FaSearch, FaUserCircle } from "react-icons/fa";

const ConversationList = ({
    conversations,
    selectedChat,
    openChat,
    search,
    setSearch
}) => {


    const filteredConversations = conversations.filter((chat)=>{

        const users = chat.participants || [];

        const otherUser = users.find(
            user => user._id !== selectedChat?.participants?.[0]?._id
        );


        return (
            otherUser?.fullName
            ?.toLowerCase()
            .includes(search.toLowerCase())
            ||
            chat.project?.title
            ?.toLowerCase()
            .includes(search.toLowerCase())
            ||
            !search
        );

    });



    return (

        <div className="w-96 border-r bg-gray-50 flex flex-col">


            {/* Header */}

            <div className="p-5 border-b bg-white">


                <h2 className="text-2xl font-bold">
                    Messages
                </h2>


                <div className="mt-4 relative">


                    <FaSearch 
                    className="absolute left-4 top-4 text-gray-400"
                    />


                    <input

                    type="text"

                    placeholder="Search conversations..."

                    value={search}

                    onChange={(e)=>setSearch(e.target.value)}

                    className="
                    w-full
                    pl-11
                    pr-4
                    py-3
                    rounded-xl
                    border
                    outline-none
                    "
                    
                    />

                </div>


            </div>





            {/* Conversations */}


            <div className="flex-1 overflow-y-auto">


            {
                filteredConversations.length === 0 ?

                (

                    <div className="p-8 text-center text-gray-500">

                        No conversations found

                    </div>

                )

                :

                (

                    filteredConversations.map((chat)=>(


                        <div

                        key={chat._id}

                        onClick={()=>openChat(chat)}

                        className={`
                        cursor-pointer
                        p-5
                        border-b
                        hover:bg-blue-50
                        transition

                        ${
                            selectedChat?._id === chat._id
                            ?
                            "bg-blue-100"
                            :
                            ""
                        }

                        `}

                        >



                        <div className="flex gap-4 items-center">


                            <FaUserCircle 
                            className="text-4xl text-gray-400"
                            />


                            <div className="flex-1">


                                <h3 className="font-bold">


                                {
                                    chat.participants
                                    ?.filter(
                                        user =>
                                        user._id !== selectedChat?.user?._id
                                    )
                                    .map(user=>user.fullName)
                                    .join(", ")
                                    ||
                                    "User"
                                }


                                </h3>



                                <p className="text-sm text-gray-500">


                                {
                                    chat.project?.title
                                    ||
                                    "Project Conversation"
                                }


                                </p>



                                <p className="text-sm mt-1 text-gray-400 truncate">


                                {
                                    chat.lastMessage
                                    ||
                                    "No messages yet"
                                }


                                </p>



                            </div>


                        </div>


                        </div>


                    ))

                )

            }


            </div>



        </div>

    );

};


export default ConversationList;