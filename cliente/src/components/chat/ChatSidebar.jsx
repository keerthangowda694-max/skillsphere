import React from "react";

const ChatSidebar = ({
    conversations,
    selectedChat,
    setSelectedChat,
}) => {

    return (

        <div className="w-80 border-r bg-white overflow-y-auto">

            <div className="p-5 border-b">

                <h2 className="text-2xl font-bold">
                    Conversations
                </h2>

            </div>

            {
                conversations.length === 0 ? (

                    <div className="p-5 text-gray-500">
                        No conversations found
                    </div>

                ) : (

                    conversations.map((chat) => (

                        <div
                            key={chat._id}
                            onClick={() => setSelectedChat(chat)}
                            className={`
                                p-4
                                border-b
                                cursor-pointer
                                hover:bg-gray-100
                                ${
                                    selectedChat?._id === chat._id 
                                        ? "bg-blue-2000"
                                        : "bg-blue-5000"
                                }
                            `}
                        >

                            <h3 className="font-semibold">

                                {chat.project?.title || "Project"}

                            </h3>

                            <p className="text-sm text-gray-500 mt-1">

                                {chat.lastMessage?.message ||
                                    "Start chatting..."}

                            </p>

                        </div>

                    ))

                )
            }

        </div>

    );

};

export default ChatSidebar;