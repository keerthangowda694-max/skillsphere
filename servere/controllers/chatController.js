const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const Conversation = require("../models/Conversation");
const Project = require("../models/Project");

const Message = require("../models/Message"); 
const cloudinary = require("../config/cloudinary");

// =====================================
// Create Conversation
// =====================================
// =====================================
// Create Conversation
// =====================================
const createConversation = asyncHandler(async (req, res) => {

    const { projectId, freelancerId } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
        return res.status(404).json({
            success: false,
            message: "Project not found",
        });
    }

    // Only project client or freelancer can create/open chat
    const isClient =
        project.client.toString() === req.user._id.toString();

    const isFreelancer =
        project.freelancer &&
        project.freelancer.toString() === req.user._id.toString();

    if (!isClient && !isFreelancer) {
        return res.status(403).json({
            success: false,
            message: "Not authorized",
        });
    }

    // One conversation per project
    let conversation = await Conversation.findOne({
        project: projectId,
    });

    if (conversation) {

        return res.status(200).json({
            success: true,
            message: "Conversation already exists",
            conversation,
        });

    }

    conversation = await Conversation.create({

        project: projectId,

        participants: [
            project.client,
            project.freelancer || freelancerId,
        ],

        lastMessage: "",
        lastMessageAt: new Date(),

    });

    await conversation.populate("participants", "-password");
    await conversation.populate("project");

    res.status(201).json({

        success: true,
        message: "Conversation created successfully",
        conversation,

    });

});


// =====================================
// Get My Conversations
// =====================================
const getMyConversations = asyncHandler(async (req, res) => {

    const conversations = await Conversation.find({

        participants: req.user._id,

    })
    .populate("participants", "fullName email profileImage role")
    .populate("project", "title status freelancer client")
    .sort({ lastMessageAt: -1 });

    const formatted = conversations.map((chat) => {

        const otherUser = chat.participants.find(
            (p) => p._id.toString() !== req.user._id.toString()
        );

        return {

            _id: chat._id,

            project: chat.project,

            otherUser,

            participants: chat.participants,

            lastMessage: chat.lastMessage,

            lastMessageAt: chat.lastMessageAt,

            isActive: chat.isActive,

        };

    });

    res.status(200).json({

        success: true,

        total: formatted.length,

        conversations: formatted,

    });

});
// =====================================
// Get Conversation by Project
// =====================================
const getConversationByProject = asyncHandler(async (req, res) => {

    const conversation = await Conversation.findOne({
        project: req.params.projectId,
        participants: req.user._id,
    })
        .populate("participants", "-password")
        .populate("project");

    if (!conversation) {
        return res.status(404).json({
            success: false,
            message: "Conversation not found",
        });
    }

    res.json({
        success: true,
        conversation,
    });

});

//send message api

const sendMessage = asyncHandler(async(req,res)=>{

    const {
        conversationId,
        message,
        attachment
    } = req.body;


    if(!conversationId){

        return res.status(400).json({

            success:false,
            message:"Conversation ID required"

        });

    }


    const conversation = await Conversation.findById(
        conversationId
    );


    if(!conversation){

        return res.status(404).json({

            success:false,
            message:"Conversation not found"

        });

    }



    const newMessage = await Message.create({

        conversation:conversationId,

        sender:req.user._id,

        message:message || "",

        attachment: attachment || {}

    });



    conversation.lastMessage =
        message || "📎 File";

    conversation.lastMessageAt = new Date();


    await conversation.save();



    res.status(201).json({

        success:true,

        message:newMessage

    });


});
// ======================================
// Chat History
// ======================================
const getMessages = asyncHandler(async(req,res)=>{


    const messages = await Message.find({
    
    conversation:req.params.conversationId
    
    })
    
    .populate(
    "sender",
    "fullName profileImage"
    )
    
    .sort({
    createdAt:1
    });
    
    
    
    res.json({
    
    success:true,
    
    messages
    
    });
    
    
    });
   
// ======================================
// Edit Message
// ======================================
const editMessage = asyncHandler(async (req, res) => {

    const { message } = req.body;

    const chat = await Message.findById(req.params.id);

    if (!chat) {
        return res.status(404).json({
            success: false,
            message: "Message not found",
        });
    }

    if (chat.sender.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            success: false,
            message: "Access denied",
        });
    }

    chat.message = message;

    chat.isEdited = true;

    await chat.save();

    res.json({

        success: true,

        message: "Message Updated",

        chat,

    });

});

// ======================================
// Delete Message
// ======================================
const deleteMessage = asyncHandler(async (req,res)=>{

    const message = await Message.findById(req.params.id);


    if(!message){

        return res.status(404).json({
            success:false,
            message:"Message not found"
        });

    }


    // only sender can delete
    if(
        message.sender.toString() !== 
        req.user._id.toString()
    ){

        return res.status(403).json({
            success:false,
            message:"Not allowed"
        });

    }



    // soft delete
    message.isDeleted = true;

    message.message = "";

    await message.save();



    res.json({

        success:true,

        message:"Message deleted",

        data:message

    });


});

// =====================================
// Mark Message As Read
// =====================================
const markMessageAsRead = asyncHandler(async (req, res) => {

    const message = await Message.findById(req.params.id);

    if (!message) {
        return res.status(404).json({
            success: false,
            message: "Message not found",
        });
    }

    const  alreadyRead = message.readBy.find(
        (item) => item.user.toString() === req.user._id.toString()
    );

    if (!alreadyRead) {

        message.readBy.push({
            user: req.user._id,
            readAt: new Date(),
        });

        await message.save();
    }

    res.json({
        success: true,
        message: "Message marked as read",
        data: message,
    });

});

    // ======================================
    // Upload Chat File
    // ======================================
    const uploadChatFile = asyncHandler(async (req, res) => {


        console.log("========== CHAT FILE UPLOAD ==========");
    
        console.log("User:", req.user._id);
    
        console.log(
            "File:",
            req.file ? req.file.originalname : "No File"
        );
    
    
        const { conversationId } = req.body;
    
    
    
        // Check file
    
        if(!req.file){
    
            return res.status(400).json({
    
                success:false,
    
                message:"No file received"
    
            });
    
        }
    
    
    
        // Check conversation id
    
        if(!conversationId){
    
            return res.status(400).json({
    
                success:false,
    
                message:"Conversation ID required"
    
            });
    
        }
    
    
    
        // Find conversation
    
        const conversation = await Conversation.findById(
            conversationId
        );
    
    
        if(!conversation){
    
            return res.status(404).json({
    
                success:false,
    
                message:"Conversation not found"
    
            });
    
        }
    
    
    
    
        try {
    
    
            const uploadResult = await new Promise((resolve, reject) => {

                const stream = cloudinary.uploader.upload_stream(
            
                    {
                        folder: "SkillSphere/ChatFiles",
                        resource_type: "raw",
                        chunk_size: 12000000,
                    },
            
                    (error, result) => {
            
                        if(error){
            
                            console.log(
                                "CLOUDINARY ERROR:",
                                error
                            );
            
                            reject(error);
            
                        } 
                        else {
            
                            resolve(result);
            
                        }
            
                    }
            
                );
            
            
                stream.end(req.file.buffer);
            
            });
    
    
    
    
    
            console.log(
                "CLOUDINARY URL:",
                uploadResult.secure_url
            );
    
    
    
    
    
    
            // Create message
    
            const message = await Message.create({
    
                conversation:conversation._id,
    
                sender:req.user._id,
    
                message:"📎 File",
    
                attachment:{
    
    
                    url:uploadResult.secure_url,
    
    
                    public_id:uploadResult.public_id,
    
    
                    fileName:req.file.originalname,
    
    
                    fileType:req.file.mimetype,
    
    
                    fileSize:req.file.size
    
    
                }
    
    
            });
    
    
    
    
    
    
            // Update conversation
    
            conversation.lastMessage="📎 File";
    
            conversation.lastMessageAt=new Date();
    
    
            await conversation.save();
    
    
    
    
    
    
            return res.status(201).json({
    
    
                success:true,
    
    
                message:"File uploaded successfully",
    
    
                data:message
    
    
            });
    
    
    
    
        }
    
        catch(error){
    
    
            console.log(
                "UPLOAD ERROR:",
                error
            );
    
    
            return res.status(500).json({
    
    
                success:false,
    
    
                message:error.message || "File upload failed"
    
    
            });
    
    
        }
    
    
    
    });
    module.exports = {
        createConversation,
        getMyConversations,
        getConversationByProject,
        sendMessage,
        getMessages,
        editMessage,
        deleteMessage,
        markMessageAsRead,
        uploadChatFile,
    };