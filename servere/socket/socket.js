const mongoose = require("mongoose");
const User = require("../models/User");


module.exports = (io) => {


    io.on("connection", (socket) => {


        console.log("🟢 User Connected:", socket.id);



        // ==========================
        // User Online
        // ==========================

        socket.on("userOnline", async (userId) => {


            try {


                if (!mongoose.Types.ObjectId.isValid(userId)) {

                    console.log("Invalid User ID:", userId);

                    return;

                }


                socket.userId = userId;


                await User.findByIdAndUpdate(
                    userId,
                    {
                        isOnline: true,
                    }
                );


                io.emit("userStatus", {

                    userId,

                    isOnline: true

                });



            }
            catch(error){

                console.log(error);

            }


        });





        // ==========================
        // Join Conversation
        // ==========================

        socket.on("joinConversation", (conversationId) => {


            socket.join(conversationId);


            console.log(
                "Joined Conversation:",
                conversationId
            );


        });






        // ==========================
        // Send Message
        // ==========================

        socket.on("sendMessage", (data) => {


            io
            .to(data.conversationId)
            .emit(
                "receiveMessage",
                data
            );


        });







        // ==========================
        // Typing Indicator
        // ==========================

        socket.on("typing", (conversationId)=>{


            socket
            .to(conversationId)
            .emit("userTyping");


        });



        socket.on("stopTyping",(conversationId)=>{


            socket
            .to(conversationId)
            .emit("userStoppedTyping");


        });








        // ==========================
        // Read Receipt
        // ==========================

        socket.on("markRead",(data)=>{


            io
            .to(data.conversationId)
            .emit(
                "messageRead",
                data
            );


        });








        // ==========================
        // File Sharing
        // ==========================

        socket.on("fileShared",(data)=>{


            io
            .to(data.conversationId)
            .emit(
                "receiveFile",
                data
            );


        });









        // ==========================
        // Disconnect
        // ==========================

        socket.on("disconnect", async()=>{


            try{


                if(socket.userId){



                    await User.findByIdAndUpdate(

                        socket.userId,

                        {

                            isOnline:false,

                            lastSeen:new Date()

                        }

                    );





                    io.emit("userStatus",{


                        userId:socket.userId,


                        isOnline:false,


                        lastSeen:new Date()


                    });



                }





            }
            catch(error){

                console.log(error);

            }




            console.log(
                "🔴 User Disconnected:",
                socket.id
            );



        });



    });


};