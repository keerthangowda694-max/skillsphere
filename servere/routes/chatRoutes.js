const express = require("express");

const router = express.Router();

const {
    protect,
} = require("../middleware/authMiddleware");

const chatUpload = require("../middleware/chatUploadMiddleware");

const {
    createConversation,
    getMyConversations,
    getConversationByProject,
    sendMessage,
    getMessages,
    editMessage,
    deleteMessage,
    markMessageAsRead,
    uploadChatFile,
} = require("../controllers/chatController");




router.post(
    "/conversation",
    protect,
    createConversation
);

router.get(
    "/conversation",
    protect,
    getMyConversations
);

router.get(
    "/conversation/:projectId",
    protect,
    getConversationByProject
);


router.post(
    "/message",
    protect,
    sendMessage
);

router.get(
    "/message/:conversationId",
    protect,
    getMessages
);

router.put(
    "/message/:id",
    protect,
    editMessage
);

router.delete(
    "/message/:id",
    protect,
    deleteMessage
);

router.put(
    "/message/read/:id",
    protect,
    markMessageAsRead
);

// ======================================
// Upload Chat File
// ======================================

router.post(

    "/upload",

    protect,

    chatUpload.single("file"),

    uploadChatFile

);


module.exports = router;