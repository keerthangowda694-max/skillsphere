import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../services/api";
import socket from "../../services/socket";

import ConversationList from "../../components/chat/ConversationList";
import ChatWindow from "../../components/chat/ChatWindow";



const Messages = () => {

    const [conversations, setConversations] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [currentUser,setCurrentUser] = useState(null);
   
    // ==========================
    // Load Conversations
    // ==========================

    useEffect(() => {

        fetchConversations();
    
    
        const userData = JSON.parse(
            localStorage.getItem("user")
        );
    
    
        if(userData){
    
            setCurrentUser(
                userData._id
            );
    
        }
    
    
        socket.connect();
    
    
        return () => {
    
            socket.disconnect();
    
        };
    
    
    }, []);
    // ==========================
    // Fetch Conversations
    // ==========================
    const fetchConversations = async () => {

        try {
    
            setLoading(true);
    
            const res = await API.get("/chat/conversation");
    
            const chats = res.data.conversations || [];
    
            setConversations(chats);
    
            if (chats.length > 0) {
                openChat(chats[0]);
            }
    
        } catch (err) {
    
            console.log(err);
    
        } finally {
    
            setLoading(false);
    
        }
    
    };
    // ==========================
    // Open Chat
    // ==========================

    const openChat = async (chat) => {

        try {
    
            setSelectedChat(chat);
    
            const res = await API.get(
                `/chat/message/${chat._id}`
            );
    
            setMessages(res.data.messages || []);
    
        } catch (err) {
    
            console.log(err);
    
        }
    
    };

    // ==========================
    // Socket Listener
    // ==========================

    useEffect(() => {

        if (!selectedChat) return;

        socket.emit("joinConversation", selectedChat._id);

        const receiveMessage = (message) => {

            setMessages(prev => [...prev, message]);

            setConversations(prev =>
                prev.map(chat =>
                    chat._id === selectedChat._id
                        ? {
                              ...chat,
                              lastMessage: message.message || message.text,
                              updatedAt: new Date(),
                          }
                        : chat
                )
            );

        };

        socket.on("receiveMessage", receiveMessage);

        return () => {

            socket.off("receiveMessage", receiveMessage);

        };

    }, [selectedChat]);

    // ==========================
    // Loading
    // ==========================

    if (loading) {

        return (

            <DashboardLayout>

                <div className="flex justify-center items-center h-[80vh]">

                    <h2 className="text-2xl font-bold">
                        Loading Conversations...
                    </h2>

                </div>

            </DashboardLayout>

        );

    }

    // ==========================
    // UI
    // ==========================

    return (

        <DashboardLayout>

            <div className="h-[80vh] bg-white rounded-2xl shadow-xl flex overflow-hidden">

                <ConversationList
                    conversations={conversations}
                    selectedChat={selectedChat}
                    openChat={openChat}
                    search={search}
                    setSearch={setSearch}
                />

<ChatWindow
    chat={selectedChat}
    messages={messages}
    setMessages={setMessages}
    socket={socket}
    currentUser={currentUser}
/>

            </div>

        </DashboardLayout>

    );

};

export default Messages;