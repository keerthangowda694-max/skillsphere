import { BrowserRouter, Routes, Route } from "react-router-dom";


// Landing
import LandingPage from "./pages/Landing/LandingPage";


// Authentication
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";


// Protected
import ProtectedRoute from "./components/layout/ProtectedRoute";
import ClientRoute from "./components/layout/ClientRoute";


// Freelancer Pages
import Dashboard from "./pages/freelancer/Dashboard";
import Projects from "./pages/freelancer/Projects";
import ProjectDetails from "./pages/freelancer/ProjectDetails";
import ProjectProgress from "./pages/freelancer/ProjectProgress";
import Analytics from "./pages/freelancer/Analytics";
import Messages from "./pages/freelancer/Messages";
import Applications from "./pages/freelancer/Applications";
import Invitations from "./pages/freelancer/Invitations";
import Payments from "./pages/freelancer/Payments";


// Common
import Notifications from "./pages/Notifications";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/settings/Settings";


// Client Pages
import ClientDashboard from "./pages/client/ClientDashboard";
import PostProject from "./pages/client/PostProject";
import MyProjects from "./pages/client/MyProjects";
import CApplications from "./pages/client/CApplications";
import ClientProjectDetails from "./pages/client/ClientProjectDetails";
import ClientWorkspace from "./pages/client/ClientWorkspace";
import ClientChat from "./pages/client/ClientChat.jsx";
import CPayments from "./pages/client/CPayments";
import ClientProfile from "./pages/client/ClientProfile";
import ClientSettings from "./pages/client/ClientSettings";



// Freelancer Workspace
import ProjectWorkspace from "./pages/freelancer/ProjectWorkspace";
import WorkSubmission from "./pages/freelancer/WorkSubmission";


import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminDisputes from "./pages/admin/AdminDisputes";
import AdminVerifications from "./pages/admin/AdminVerifications";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminWallet from "./pages/admin/AdminWallet";









function App(){


return(

<BrowserRouter>

<Routes>



{/* Landing */}

<Route
path="/"
element={<LandingPage/>}
/>





{/* Authentication */}


<Route
path="/login"
element={<Login/>}
/>


<Route
path="/register"
element={<Register/>}
/>


<Route
path="/verify-email/:token"
element={<VerifyEmail/>}
/>


<Route
path="/forgot-password"
element={<ForgotPassword/>}
/>


<Route
path="/reset-password/:token"
element={<ResetPassword/>}
/>









{/* =====================
FREELANCER ROUTES
===================== */}



<Route
path="/freelancer/dashboard"
element={
<ProtectedRoute>
<Dashboard/>
</ProtectedRoute>
}
/>





<Route
path="/freelancer/projects"
element={
<ProtectedRoute>
<Projects/>
</ProtectedRoute>
}
/>





<Route
path="/freelancer/projects/:id"
element={
<ProtectedRoute>
<ProjectDetails/>
</ProtectedRoute>
}
/>





<Route
path="/freelancer/progress/:id"
element={
<ProtectedRoute>
<ProjectProgress/>
</ProtectedRoute>
}
/>





<Route
path="/freelancer/analytics"
element={
<ProtectedRoute>
<Analytics/>
</ProtectedRoute>
}
/>





<Route
path="/freelancer/chats"
element={
<ProtectedRoute>
<Messages/>
</ProtectedRoute>
}
/>





<Route
path="/freelancer/applications"
element={
<ProtectedRoute>
<Applications/>
</ProtectedRoute>
}
/>





<Route
path="/freelancer/notifications"
element={
<ProtectedRoute>
<Notifications/>
</ProtectedRoute>
}
/>





<Route
path="/freelancer/invitations"
element={
<ProtectedRoute>
<Invitations/>
</ProtectedRoute>
}
/>





<Route
path="/freelancer/payments"
element={
<ProtectedRoute>
<Payments/>
</ProtectedRoute>
}
/>





{/* Freelancer Workspace */}

<Route
path="/freelancer/workspace/:id"
element={
<ProtectedRoute>
<ProjectWorkspace/>
</ProtectedRoute>
}
/>





{/* Freelancer Submit Work */}

<Route
path="/freelancer/work-submission"
element={
<ProtectedRoute>
<WorkSubmission/>
</ProtectedRoute>
}
/>









{/* =====================
CLIENT ROUTES
===================== */}



<Route
path="/client/dashboard"
element={
<ClientRoute>
<ClientDashboard/>
</ClientRoute>
}
/>





<Route
path="/client/post-project"
element={
<ClientRoute>
<PostProject/>
</ClientRoute>
}
/>





<Route
path="/client/projects"
element={
<ClientRoute>
<MyProjects/>
</ClientRoute>
}
/>





<Route
path="/client/applications"
element={
<ClientRoute>
<CApplications/>
</ClientRoute>
}
/>





<Route
path="/client/project/:id"
element={
<ClientRoute>
<ClientProjectDetails/>
</ClientRoute>
}
/>






{/* Client Work Review */}

<Route
path="/client/work-review"
element={
<ClientRoute>
<ClientWorkspace/>
</ClientRoute>
}
/>









{/* =====================
COMMON
===================== */}



<Route
path="/profile"
element={
<ProtectedRoute>
<Profile/>
</ProtectedRoute>
}
/>





<Route
path="/settings"
element={
<ProtectedRoute>
<Settings/>
</ProtectedRoute>
}
/>

<Route
    path="/client/chat"
    element={<ClientChat />}
/>

<Route path="/client/payments" element={<CPayments />} />

<Route
 path="/client/profile"
 element={
   <ProtectedRoute role="client">
      <ClientProfile/>
   </ProtectedRoute>
 }
/>

<Route
 path="/client/settings"
 element={
   <ProtectedRoute role="client">
      <ClientSettings/>
   </ProtectedRoute>
 }
/>

{/* =====================
ADMIN ROUTES
===================== */}

<Route
path="/admin"
element={
    <ProtectedRoute>
        <AdminDashboard/>
    </ProtectedRoute>
}
/>

<Route
path="/admin/dashboard"
element={
    <ProtectedRoute>
        <AdminDashboard/>
    </ProtectedRoute>
}
/>


<Route
path="/admin/payments"
element={
    <ProtectedRoute>
        <AdminPayments/>
    </ProtectedRoute>
}
/>


<Route
path="/admin/projects"
element={
    <ProtectedRoute>
        <AdminProjects/>
    </ProtectedRoute>
}
/>


<Route
path="/admin/users"
element={
    <ProtectedRoute>
        <AdminUsers/>
    </ProtectedRoute>
}
/>


<Route
path="/admin/disputes"
element={
    <ProtectedRoute>
        <AdminDisputes/>
    </ProtectedRoute>
}
/>


<Route
path="/admin/verifications"
element={
    <ProtectedRoute>
        <AdminVerifications/>
    </ProtectedRoute>
}
/>


<Route
path="/admin/analytics"
element={
    <ProtectedRoute>
        <AdminAnalytics/>
    </ProtectedRoute>
}
/>

<Route
path="/admin/wallet"
element={<AdminWallet/>}
/>
</Routes>


</BrowserRouter>


);


}



export default App;