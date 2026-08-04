import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../services/api";

import {
    FaSearch,
    FaEye,
    FaEdit,
    FaTrash,
    FaTimes
} from "react-icons/fa";

const Applications = () => {

    // ===========================
    // STATES
    // ===========================
    

    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    const [selectedApplication, setSelectedApplication] = useState(null);

    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [proposal, setProposal] = useState("");
    const [bidAmount, setBidAmount] = useState("");
    const [estimatedDays, setEstimatedDays] = useState("");

    // ===========================
    // USE EFFECTS
    // ===========================

    useEffect(()=>{

        loadApplications();
        
        },[]);
        
        
        
        useEffect(()=>{
        
        let data=[...applications];
        
        if(filter!=="All"){
        
        data=data.filter(
        item=>item.status===filter
        );
        
        }
        
        if(search){
        
        data=data.filter(item=>
        
        item.project?.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
        
        );
        
        }
        
        setFilteredApplications(data);
        
        },[applications,search,filter]);

    // ===========================
    // FUNCTIONS
    // ===========================

    const loadApplications=async()=>{

        try{
        
        const res=await API.get("/applications/my");
        
        setApplications(
        res.data.applications || []
        );
        
        }
        
        catch(err){
        
        console.log(err);
        
        }
        
        finally{
        
        setLoading(false);
        
        }
        
        };

        const handleTrack=async(id)=>{

            try{
            
            const res=await API.get(
            
            `/applications/track/${id}`
            
            );
            
            setSelectedApplication(
            res.data.application
            );
            
            setShowViewModal(true);
            
            }
            
            catch(err){
            
            console.log(err);
            
            }
            
            };

            const openEdit=(app)=>{

                setSelectedApplication(app);
                
                setProposal(app.proposal);
                
                setBidAmount(app.bidAmount);
                
                setEstimatedDays(app.estimatedDays);
                
                setShowEditModal(true);
                
                };

                const handleUpdate=async()=>{

                    try{
                    
                    await API.put(
                    
                    `/applications/proposal/${selectedApplication._id}`,
                    
                    {
                    
                    proposal,
                    
                    bidAmount,
                    
                    estimatedDays
                    
                    }
                    
                    );
                    
                    alert("Proposal Updated");
                    
                    setShowEditModal(false);
                    
                    loadApplications();
                    
                    }
                    
                    catch(err){
                    
                    alert(
                    
                    err.response?.data?.message
                    
                    );
                    
                    }
                    
                    };

                    const handleWithdraw=async(id)=>{

                        if(!window.confirm(
                        
                        "Withdraw this application?"
                        
                        ))
                        
                        return;
                        
                        try{
                        
                        await API.delete(
                        
                        `/applications/${id}`
                        
                        );
                        
                        alert("Application Withdrawn");
                        
                        loadApplications();
                        
                        }
                        
                        catch(err){
                        
                        alert(
                        
                        err.response?.data?.message
                        
                        );
                        
                        }
                        
                        };

    // ===========================
    // LOADING
    // ===========================

    if (loading) {
        return (
            <DashboardLayout>
                <div className="p-10 text-center text-xl">
                    Loading Applications...
                </div>
            </DashboardLayout>
        );
    }

    // ===========================
    // RETURN
    // ===========================

    return (
        <DashboardLayout>
    
            <div className="mb-8">
    
                <div className="flex justify-between items-center">
    
                    <div>
                        <h1 className="text-4xl font-bold">
                            My Applications
                        </h1>
    
                        <p className="text-gray-500 mt-2">
                            Manage all your project applications
                        </p>
                    </div>
    
                </div>
    
                <div className="bg-white rounded-2xl shadow p-6 mt-8">
    
                    <div className="grid md:grid-cols-2 gap-5">
    
                        <input
                            type="text"
                            placeholder="Search Project..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border rounded-xl px-5 py-3 outline-none"
                        />
    
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="border rounded-xl px-5 py-3"
                        >
                            <option>All</option>
                            <option>Pending</option>
                            <option>Accepted</option>
                            <option>Rejected</option>
                            <option>Hired</option>
                        </select>
    
                    </div>
    
                </div>
    
                {filteredApplications.length === 0 ? (
    
                    <div className="bg-white rounded-2xl shadow p-10 mt-8 text-center">
    
                        <h2 className="text-2xl font-bold">
                            No Applications Found
                        </h2>
    
                        <p className="text-gray-500 mt-2">
                            Apply to projects to see them here.
                        </p>
    
                    </div>
    
                ) : (
    
                    <div className="space-y-6 mt-8">
    
                        {filteredApplications.map((app) => (
    
                            <div
                                key={app._id}
                                className="bg-white rounded-2xl shadow-lg p-7"
                            >
    
                                <div className="flex justify-between items-start">
    
                                    <div>
    
                                        <h2 className="text-2xl font-bold">
                                            {app.project?.title || "Project"}
                                        </h2>
    
                                        <p className="text-gray-500 mt-2">
                                            {app.project?.description || "No description"}
                                        </p>
    
                                    </div>
    
                                    <span
                                        className={`px-4 py-2 rounded-full text-sm font-semibold ${
                                            app.status === "Pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : app.status === "Accepted"
                                                ? "bg-green-100 text-green-700"
                                                : app.status === "Rejected"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-blue-100 text-blue-700"
                                        }`}
                                    >
                                        {app.status}
                                    </span>
    
                                </div>
    
                                <div className="grid md:grid-cols-3 gap-6 mt-8">
    
                                    <div>
                                        <p className="text-gray-500">Bid Amount</p>
                                        <h3 className="font-bold text-xl">
                                            ₹{app.bidAmount}
                                        </h3>
                                    </div>
    
                                    <div>
                                        <p className="text-gray-500">Estimated Days</p>
                                        <h3 className="font-bold text-xl">
                                            {app.estimatedDays} Days
                                        </h3>
                                    </div>
    
                                    <div>
                                        <p className="text-gray-500">Applied On</p>
                                        <h3 className="font-bold">
                                            {new Date(app.createdAt).toLocaleDateString()}
                                        </h3>
                                    </div>
    
                                </div>
    
                                <div className="bg-gray-100 rounded-xl p-5 mt-6">
    
                                    <h3 className="font-semibold">
                                        Proposal
                                    </h3>
    
                                    <p className="mt-2">
                                        {app.proposal}
                                    </p>
    
                                </div>
    
                                <div className="flex gap-4 mt-6">
    
                                    <button
                                        onClick={() => handleTrack(app._id)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
                                    >
                                        <FaEye className="inline mr-2" />
                                        View
                                    </button>
    
                                    <button
                                        onClick={() => openEdit(app)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-xl"
                                    >
                                        <FaEdit className="inline mr-2" />
                                        Edit
                                    </button>
    
                                    <button
                                        onClick={() => handleWithdraw(app._id)}
                                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl"
                                    >
                                        <FaTrash className="inline mr-2" />
                                        Withdraw
                                    </button>
    
                                </div>
    
                            </div>
    
                        ))}
    
                    </div>
    
                )}
    
            </div>
            {showViewModal && selectedApplication && (

<div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

<div className="bg-white rounded-2xl w-[600px] p-8 relative">

<button
onClick={() => setShowViewModal(false)}
className="absolute top-5 right-5 text-2xl"
>
<FaTimes/>
</button>

<h2 className="text-3xl font-bold mb-6">
Application Details
</h2>

<div className="space-y-5">

<div>
<p className="text-gray-500">Project</p>
<h3 className="font-bold">
{selectedApplication.project?.title}
</h3>
</div>

<div>
<p className="text-gray-500">Status</p>
<h3>{selectedApplication.status}</h3>
</div>

<div>
<p className="text-gray-500">Bid Amount</p>
<h3>₹{selectedApplication.bidAmount}</h3>
</div>

<div>
<p className="text-gray-500">Estimated Days</p>
<h3>{selectedApplication.estimatedDays}</h3>
</div>

<div>
<p className="text-gray-500">Proposal</p>
<p className="mt-2">
{selectedApplication.proposal}
</p>
</div>

</div>

</div>

</div>

)}

{showEditModal && (

<div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

<div className="bg-white rounded-2xl w-[650px] p-8 relative">

<button
onClick={() => setShowEditModal(false)}
className="absolute top-5 right-5 text-2xl"
>
<FaTimes/>
</button>

<h2 className="text-3xl font-bold mb-6">
Edit Proposal
</h2>

<div className="space-y-5">

<div>

<label className="font-semibold">
Proposal
</label>

<textarea

rows={6}

value={proposal}

onChange={(e)=>setProposal(e.target.value)}

className="w-full border rounded-xl p-4 mt-2"

/>

</div>

<div className="grid grid-cols-2 gap-5">

<div>

<label className="font-semibold">
Bid Amount
</label>

<input

type="number"

value={bidAmount}

onChange={(e)=>setBidAmount(e.target.value)}

className="w-full border rounded-xl p-3 mt-2"

/>

</div>

<div>

<label className="font-semibold">
Estimated Days
</label>

<input

type="number"

value={estimatedDays}

onChange={(e)=>setEstimatedDays(e.target.value)}

className="w-full border rounded-xl p-3 mt-2"

/>

</div>

</div>

<button

onClick={handleUpdate}

className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"

>

Update Proposal

</button>

</div>

</div>

</div>

)}
    
        </DashboardLayout>
        
    );
};

export default Applications;