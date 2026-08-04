import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ClientLayout from "../../components/client/ClientLayout";

import API from "../../services/api";
import socket from "../../services/socket";

import ChatSidebar from "../../components/chat/ChatSidebar";
import ChatWindow from "../../components/chat/ChatWindow";

const ClientChat = () => {

    const location = useLocation();

    const [conversations, setConversations] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const currentUser = JSON.parse(
        localStorage.getItem("user")
    )?._id;

    useEffect(() => {
        loadChats();
    }, []);

    // If conversation is passed from Work Review
    useEffect(() => {

        if (location.state?.conversation) {

            setSelectedChat(
                location.state.conversation
            );

        }

    }, [location]);

    // Load messages whenever chat changes
    useEffect(() => {

        if (!selectedChat) return;

        loadMessages(selectedChat._id);

        socket.emit(
            "joinConversation",
            selectedChat._id
        );

        return () => {

            socket.emit(
                "leaveConversation",
                selectedChat._id
            );

        };

    }, [selectedChat]);

    // Receive realtime messages
    useEffect(() => {

        socket.on("receiveMessage", (message) => {

            const conversationId =
                message.conversation?._id ||
                message.conversation;

            if (
                conversationId === selectedChat?._id
            ) {

                setMessages(prev => [
                    ...prev,
                    message
                ]);

            }

        });

        return () => {

            socket.off("receiveMessage");

        };

    }, [selectedChat]);

    // ============================
    // Load Conversations
    // ============================

    const loadChats = async () => {

        try {

            const res = await API.get("/chat/conversation");

            const chats =
                res.data.conversations || [];

            setConversations(chats);

            if (location.state?.conversation) {

                const found = chats.find(
                    chat =>
                        chat._id ===
                        location.state.conversation._id
                );

                if (found) {

                    setSelectedChat(found);

                } else {

                    setSelectedChat(
                        location.state.conversation
                    );

                }

            } else if (chats.length > 0) {

                setSelectedChat(chats[0]);

            }

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    // ============================
    // Load Messages
    // ============================

    const loadMessages = async (conversationId) => {

        try {

            const res = await API.get(
                `/chat/message/${conversationId}`
            );

            setMessages(
                res.data.messages || []
            );

        } catch (err) {

            console.log(err);

        }

    };

    if (loading) {

        return (

            <ClientLayout>

                <div className="p-10 text-center text-xl">

                    Loading Chats...

                </div>

            </ClientLayout>

        );

    }

    return (

        <ClientLayout>

            <div className="flex h-[88vh] bg-white rounded-2xl shadow-xl overflow-hidden">

                <ChatSidebar
                    conversations={conversations}
                    selectedChat={selectedChat}
                    setSelectedChat={setSelectedChat}
                    currentUser={currentUser}
                />

                <ChatWindow
                    chat={selectedChat}
                    messages={messages}
                    setMessages={setMessages}
                    socket={socket}
                    currentUser={currentUser}
                />

            </div>

        </ClientLayout>

    );

};

export default ClientChat;