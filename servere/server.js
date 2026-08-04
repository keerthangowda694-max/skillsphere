require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const clientRoutes = require("./routes/clientRoutes");
const freelancerRoutes = require("./routes/freelancerRoutes");
const aiRoutes = require("./routes/aiRoutes");
const ProjectRoutes = require("./routes/ProjectRoutes");
const milestoneRoutes = require("./routes/milestoneRoutes");
const invitationRoutes = require("./routes/invitationRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const chatRoutes = require("./routes/chatRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const socketHandler = require("./socket/socket");
const { setIO } = require("./socket/socketInstance");

const razorpay = require("./config/razorpay");
console.log("Razorpay Connected:", !!razorpay);

const walletRoutes = require("./routes/walletRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const adminDashboardRoutes = require("./routes/adminDashboardRoutes");
const adminUserRoutes = require("./routes/adminUserRoutes");
const adminProjectRoutes = require("./routes/adminProjectRoutes");
const adminPaymentRoutes = require("./routes/adminPaymentRoutes");
const adminAuditRoutes = require("./routes/adminAuditRoutes");
const searchRoutes = require("./routes/searchRoutes");
const availabilityRoutes = require("./routes/availabilityRoutes");
const disputeRoutes = require("./routes/disputeRoutes");
const projectProgressRoutes = require("./routes/projectProgressRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const workRoutes = require("./routes/workRoutes");
const clientWorkspaceRoutes = require("./routes/clientWorkspaceRoutes");
const adminWalletRoutes = require("./routes/adminWalletRoutes");


// Database
connectDB();


const app = express();


// ===============================
// CORS CONFIGURATION
// ===============================


const allowedOrigins = [
    "http://localhost:5173",
    "https://skillsphere-18vk-beta.vercel.app",
    "https://skillsphere6.onrender.com"
];


app.use(
    cors({
        origin: allowedOrigins,
        methods: [
            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
            "OPTIONS"
        ],
        credentials: true,
        allowedHeaders: [
            "Content-Type",
            "Authorization"
        ]
    })
);


app.use(express.json());


app.use(express.json());



// ===============================
// API ROUTES
// ===============================

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/freelancer", freelancerRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/projects", ProjectRoutes);
app.use("/api/milestones", milestoneRoutes);
app.use("/api/invitations", invitationRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/notifications", notificationRoutes);

app.use("/api/payment", paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/wallet", walletRoutes);

app.use("/api/admin/dashboard", adminDashboardRoutes);
app.use("/api/admin", adminUserRoutes);
app.use("/api/admin", adminProjectRoutes);
app.use("/api/admin", adminPaymentRoutes);
app.use("/api/admin", adminAuditRoutes);
app.use("/api/admin", adminWalletRoutes);

app.use("/api/search", searchRoutes);
app.use("/api/availability", availabilityRoutes);

app.use("/api/disputes", disputeRoutes);
app.use("/api/progress", projectProgressRoutes);

app.use("/api/analytics", analyticsRoutes);

app.use("/api/settings", settingsRoutes);

app.use("/api/work", workRoutes);

app.use("/api/client", clientWorkspaceRoutes);



// ===============================
// TEST ROUTES
// ===============================

app.get("/", (req, res) => {
    res.send("🚀 SkillSphere Backend is Running");
});


app.get("/api", (req, res) => {
    res.json({
        success: true,
        message: "SkillSphere API Running"
    });
});



// ===============================
// SERVER
// ===============================

const server = http.createServer(app);



// ===============================
// SOCKET.IO
// ===============================

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: [
            "GET",
            "POST"
        ],
        credentials: true
    }
});


setIO(io);

socketHandler(io);



// ===============================
// START SERVER
// ===============================

const PORT = process.env.PORT || 5000;


server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
