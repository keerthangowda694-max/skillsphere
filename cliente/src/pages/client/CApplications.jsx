import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import ClientLayout from "../../components/client/ClientLayout";

import {
    FaSearch,
    FaUserTie,
    FaClock,
    FaCheckCircle,
    FaTimesCircle,
    FaBriefcase,
    FaEye,
    FaUserCheck,
    FaUserTimes,
    FaHandshake
} from "react-icons/fa";

const CApplications = () => {

    const [applications, setApplications] = useState([]);
    const [filtered, setFiltered] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    const [actionLoading, setActionLoading] = useState("");

    useEffect(() => {
        loadApplications();
    }, []);

    useEffect(() => {
        filterApplications();
    }, [applications, search, statusFilter]);

    const loadApplications = async () => {

        try {

            const res = await API.get("/applications/client");

            setApplications(res.data.applications || []);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    const filterApplications = () => {

        let data = [...applications];

        if (statusFilter !== "All") {

            data = data.filter(

                item => item.status === statusFilter

            );

        }

        if (search) {

            data = data.filter(item =>

                item.freelancer?.fullName
                    ?.toLowerCase()
                    .includes(search.toLowerCase())

                ||

                item.project?.title
                    ?.toLowerCase()
                    .includes(search.toLowerCase())

            );

        }

        setFiltered(data);

    };
    const updateStatus = async (id, status) => {

        try {
    
            setActionLoading(id);
    
            await API.put(
    
                `/applications/${id}/status`,
    
                {
                    status
                }
    
            );
    
            await loadApplications();
    
        }
    
        catch (err) {
    
            console.log(err);
    
            alert(err.response?.data?.message || "Failed");
    
        }
    
        finally {
    
            setActionLoading("");
    
        }
    
    };
    
    const hireFreelancer = async (id) => {
    
        try {
    
            setActionLoading(id);
    
            await API.put(
    
                `/applications/hire/${id}`
    
            );
    
            alert("Freelancer hired successfully.");
    
            await loadApplications();
    
        }
    
        catch (err) {
    
            alert(err.response?.data?.message || "Hire failed");
    
        }
    
        finally {
    
            setActionLoading("");
    
        }
    
    };

    const stats = useMemo(() => {

        return {

            total: applications.length,

            pending: applications.filter(

                a => a.status === "Pending"

            ).length,

            accepted: applications.filter(

                a => a.status === "Accepted"

            ).length,

            rejected: applications.filter(

                a => a.status === "Rejected"

            ).length

        };

    }, [applications]);

    if (loading) {

        return (

            <ClientLayout>

                <div className="flex justify-center items-center h-[70vh]">

                    <h2 className="text-2xl font-bold">

                        Loading Applications...

                    </h2>

                </div>

            </ClientLayout>

        );

    }

    return (

        <ClientLayout>

            <div className="p-8">

                <h1 className="text-4xl font-bold">

                    Applications

                </h1>

                <p className="text-gray-500 mt-2">

                    Review freelancer applications for your projects

                </p>

                {/* Dashboard Cards */}

                <div className="grid md:grid-cols-4 gap-6 mt-8">

                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <FaBriefcase className="text-blue-600 text-3xl mb-4"/>

                        <p className="text-gray-500">

                            Total Applications

                        </p>

                        <h2 className="text-3xl font-bold">

                            {stats.total}

                        </h2>

                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <FaClock className="text-orange-500 text-3xl mb-4"/>

                        <p className="text-gray-500">

                            Pending

                        </p>

                        <h2 className="text-3xl font-bold">

                            {stats.pending}

                        </h2>

                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <FaCheckCircle className="text-green-600 text-3xl mb-4"/>

                        <p className="text-gray-500">

                            Accepted

                        </p>

                        <h2 className="text-3xl font-bold">

                            {stats.accepted}

                        </h2>

                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <FaTimesCircle className="text-red-600 text-3xl mb-4"/>

                        <p className="text-gray-500">

                            Rejected

                        </p>

                        <h2 className="text-3xl font-bold">

                            {stats.rejected}

                        </h2>

                    </div>

                </div>

                {/* Search */}

                <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

                    <div className="grid md:grid-cols-2 gap-5">

                        <div className="relative">

                            <FaSearch className="absolute left-4 top-4 text-gray-400"/>

                            <input

                                type="text"

                                placeholder="Search freelancer or project..."

                                value={search}

                                onChange={(e)=>setSearch(e.target.value)}

                                className="w-full border rounded-xl pl-12 p-3"

                            />

                        </div>

                        <select

                            value={statusFilter}

                            onChange={(e)=>setStatusFilter(e.target.value)}

                            className="border rounded-xl p-3"

                        >

                            <option>All</option>

                            <option>Pending</option>

                            <option>Accepted</option>

                            <option>Rejected</option>

                        </select>

                    </div>

                </div>

                {/* Applications */}

                <div className="mt-8 space-y-6">

                    {

                        filtered.length === 0 ?

                        (

                            <div className="bg-white rounded-2xl p-10 shadow-lg text-center">

                                <FaUserTie className="mx-auto text-6xl text-gray-300"/>

                                <h2 className="text-2xl font-bold mt-5">

                                    No Applications Found

                                </h2>

                            </div>

                        )

                        :

                        filtered.map(application=>(

                            <div
                            key={application._id}
                            className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition duration-300 p-8 border border-gray-100"
                        >
                        
                            <div className="flex flex-col lg:flex-row justify-between gap-8">
                        
                                {/* Left */}
                        
                                <div className="flex gap-6 flex-1">
                        
                                    <img
                                        src={
                                            application.freelancer?.profileImage ||
                                            "https://ui-avatars.com/api/?name=" +
                                            encodeURIComponent(
                                                application.freelancer?.fullName || "Freelancer"
                                            )
                                        }
                                        alt=""
                                        className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
                                    />
                        
                                    <div className="flex-1">
                        
                                        <div className="flex items-center gap-3 flex-wrap">
                        
                                            <h2 className="text-2xl font-bold">
                        
                                                {application.freelancer?.fullName}
                        
                                            </h2>
                        
                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        
                                                {application.status}
                        
                                            </span>
                        
                                        </div>
                        
                                        <p className="text-gray-500 mt-1">
                        
                                            Applied for
                        
                                            <span className="font-semibold ml-1">
                        
                                                {application.project?.title}
                        
                                            </span>
                        
                                        </p>
                        
                                        <div className="grid md:grid-cols-3 gap-4 mt-6">
                        
                                            <div className="bg-gray-50 rounded-xl p-4">
                        
                                                <p className="text-gray-500 text-sm">
                        
                                                    Experience
                        
                                                </p>
                        
                                                <h3 className="font-bold text-lg">
                        
                                                {application.project?.experienceRequired || "N/A"}
                        
                                                </h3>
                        
                                            </div>
                        
                                            <div className="bg-gray-50 rounded-xl p-4">
                        
                                                <p className="text-gray-500 text-sm">
                        
                                                    Proposed Budget
                        
                                                </p>
                        
                                                <h3 className="font-bold text-lg text-green-600">
                        
                                                    

₹{application.bidAmount}
                        
                                                   
                        
                                                </h3>
                        
                                            </div>
                        
                                            <div className="bg-gray-50 rounded-xl p-4">
                        
                                                <p className="text-gray-500 text-sm">
                        
                                                    Delivery
                        
                                                </p>
                        
                                                <h3 className="font-bold text-lg">
                        
                                                    {application.estimatedDays || "--"} Days
                        
                                                </h3>
                        
                                            </div>
                        
                                        </div>
                        
                                        <div className="mt-6">
                        
                                            <p className="font-semibold mb-3">
                        
                                                Skills
                        
                                            </p>
                        
                                            <div className="flex flex-wrap gap-2">
                                            {
    application.project?.requiredSkills?.length ? (

        application.project.requiredSkills.map((skill, index) => (

            <span
                key={index}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm"
            >
                {skill}
            </span>

        ))

    ) : (

        <span className="text-gray-400">
            No Skills Required
        </span>

    )
}
                        
                                            </div>
                        
                                        </div>
                        
                                        <div className="mt-6">
                        
                                            <p className="font-semibold mb-3">
                        
                                                Proposal
                        
                                            </p>
                        
                                            <div className="bg-gray-50 rounded-xl p-5 border">
                        
                                                <p className="text-gray-600 leading-7">
                        
                                                    {
                        
                                                        application.proposal ||
                        
                                                        "No proposal submitted."
                        
                                                    }
                        
                                                </p>
                        
                                            </div>
                        
                                        </div>
                        
                                    </div>
                        
                                </div>
                        
                                {/* Right */}
                        
                                <div className="w-full lg:w-72">
                        
                                    <div className="bg-gray-50 rounded-2xl p-6">
                        
                                        <h3 className="font-bold text-xl mb-5">
                        
                                            Application Details
                        
                                        </h3>
                        
                                        <div className="space-y-4">
                        
                                            <div>
                        
                                                <p className="text-gray-500 text-sm">
                        
                                                    Applied On
                        
                                                </p>
                        
                                                <h4 className="font-semibold">
                        
                                                    {
                        
                                                        new Date(
                        
                                                            application.createdAt
                        
                                                        ).toLocaleDateString()
                        
                                                    }
                        
                                                </h4>
                        
                                            </div>
                        
                                            <div>
                        
                                                <p className="text-gray-500 text-sm">
                        
                                                    Email
                        
                                                </p>
                        
                                                <h4 className="font-semibold break-all">
                        
                                                    {
                        
                                                        application.freelancer?.email
                        
                                                    }
                        
                                                </h4>
                        
                                            </div>
                        
                                            <div>
                        
                                                <p className="text-gray-500 text-sm">
                        
                                                    Project Budget
                        
                                                </p>
                        
                                                <h4 className="font-semibold">
                        
                                                    ₹
                        
                                                    {
                        
                                                        application.project?.budget?.min
                        
                                                    }
                        
                                                    -
                        
                                                    ₹
                        
                                                    {
                        
                                                        application.project?.budget?.max
                        
                                                    }
                        
                                                </h4>
                        
                                            </div>
                        
                                        </div>
                        
                                        <div className="mt-8 space-y-3">

                                        <Link
    to={`/client/project/${application.project._id}`}
    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex justify-center items-center gap-2"
>
    <FaEye />
    View Project
</Link>
{

    application.status === "Pending" && (

        <>

            <button

                onClick={() => {

                    if (

                        window.confirm(

                            "Accept this application?"

                        )

                    ) {

                        updateStatus(

                            application._id,

                            "Accepted"

                        );

                    }

                }}

                disabled={

                    actionLoading === application._id

                }

                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl flex justify-center items-center gap-2"

            >

                <FaUserCheck/>

                {

                    actionLoading === application._id

                        ?

                        "Please wait..."

                        :

                        "Accept"

                }

            </button>

            <button

                onClick={() => {

                    if (

                        window.confirm(

                            "Reject this application?"

                        )

                    ) {

                        updateStatus(

                            application._id,

                            "Rejected"

                        );

                    }

                }}

                disabled={

                    actionLoading === application._id

                }

                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl flex justify-center items-center gap-2"

            >

                <FaUserTimes/>

                Reject

            </button>

        </>

    )

}

{

    application.status === "Accepted" && (

        <button

            onClick={() => {

                if (

                    window.confirm(

                        "Hire this freelancer?"

                    )

                ) {

                    hireFreelancer(

                        application._id

                    );

                }

            }}

            disabled={

                actionLoading === application._id

            }

            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl flex justify-center items-center gap-2"

        >

            <FaHandshake/>

            Hire Freelancer

        </button>

    )

}

{

    application.status === "Rejected" && (

        <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center text-red-600 font-semibold">

            Application Rejected

        </div>

    )

}

{

    application.status === "Hired" && (

        <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center text-green-700 font-bold">

            Freelancer Hired ✔

        </div>

    )

}

</div>
                        
                                    </div>
                        
                                </div>
                        
                            </div>
                        
                        </div>
                         

                        ))

                    }

                </div>

            </div>

        </ClientLayout>

    );

};

export default CApplications;