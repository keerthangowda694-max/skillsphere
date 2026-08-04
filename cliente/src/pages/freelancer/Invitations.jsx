import { useEffect, useState } from "react";
import {
    FaCheckCircle,
    FaTimesCircle,
    FaBriefcase,
    FaClock,
    FaClipboardList,
    FaHourglassHalf
} from "react-icons/fa";

import API from "../../services/api";
import DashboardLayout from "../../components/layout/DashboardLayout";

const Invitations = () => {

    const [invitations, setInvitations] = useState([]);
    const [loading, setLoading] = useState(true);

    const [summary, setSummary] = useState({
        total: 0,
        pending: 0,
        accepted: 0,
        rejected: 0,
    });

    useEffect(() => {

        loadData();

    }, []);

    // ==========================
    // Load Invitations + Summary
    // ==========================

    const loadData = async () => {

        setLoading(true);

        try {

            const [inviteRes, summaryRes] = await Promise.all([

                API.get("/invitations/freelancer"),

                API.get("/invitations/summary")

            ]);

            setInvitations(
                inviteRes.data.invitations || []
            );

            setSummary(
                summaryRes.data.summary || {
                    total: 0,
                    pending: 0,
                    accepted: 0,
                    rejected: 0,
                }
            );

        }
        catch (err) {

            console.log(
                err.response?.data || err
            );

        }
        finally {

            setLoading(false);

        }

    };

    // ==========================
    // Accept Invitation
    // ==========================

    const acceptInvitation = async (id) => {

        try {

            await API.put(
                `/invitations/${id}/accept`,
                {}
            );

            await loadData();

            alert("Invitation Accepted");

        }
        catch (err) {

            console.log(err.response?.data || err);

            alert(
                err.response?.data?.message ||
                "Invitation sent "
            );

        }

    };

    // ==========================
    // Reject Invitation
    // ==========================

    const rejectInvitation = async (id) => {

        try {

            await API.put(
                `/invitations/${id}/reject`,
                {}
            );

            await loadData();

            alert("Invitation Rejected");

        }
        catch (err) {

            console.log(err.response?.data || err);

            alert(
                err.response?.data?.message ||
                "Reject failed"
            );

        }

    };

    if (loading) {

        return (

            <DashboardLayout>

                <div className="h-[70vh] flex justify-center items-center text-2xl font-bold">

                    Loading Invitations...

                </div>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <div className="p-8">

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-4xl font-bold">

                            Project Invitations

                        </h1>

                        <p className="text-gray-500 mt-2">

                            Manage invitations received from clients

                        </p>

                    </div>

                </div>

                {/* Summary Cards */}

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

                    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-600">

                        <FaClipboardList className="text-4xl text-blue-600 mb-3"/>

                        <h2 className="text-3xl font-bold">

                            {summary.total}

                        </h2>

                        <p className="text-gray-500">

                            Total Invitations

                        </p>

                    </div>

                    <div className="bg-yellow-50 rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">

                        <FaHourglassHalf className="text-4xl text-yellow-500 mb-3"/>

                        <h2 className="text-3xl font-bold">

                            {summary.pending}

                        </h2>

                        <p className="text-gray-500">

                            Pending

                        </p>

                    </div>

                    <div className="bg-green-50 rounded-2xl shadow-lg p-6 border-l-4 border-green-600">

                        <FaCheckCircle className="text-4xl text-green-600 mb-3"/>

                        <h2 className="text-3xl font-bold">

                            {summary.accepted}

                        </h2>

                        <p className="text-gray-500">

                            Accepted

                        </p>

                    </div>

                    <div className="bg-red-50 rounded-2xl shadow-lg p-6 border-l-4 border-red-600">

                        <FaTimesCircle className="text-4xl text-red-600 mb-3"/>

                        <h2 className="text-3xl font-bold">

                            {summary.rejected}

                        </h2>

                        <p className="text-gray-500">

                            Rejected

                        </p>

                    </div>

                </div>
                {
                    invitations.length === 0 ? (

                        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">

                            <FaBriefcase className="mx-auto text-6xl text-blue-500 mb-5" />

                            <h2 className="text-3xl font-bold mb-3">
                                No Invitations Found
                            </h2>

                            <p className="text-gray-500">
                                You haven't received any project invitations yet.
                            </p>

                        </div>

                    ) : (

                        <div className="grid lg:grid-cols-2 gap-6">

                            {invitations.map((invite) => (

                                <div
                                    key={invite._id}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
                                >

                                    {/* Header */}

                                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white">

                                        <div className="flex items-center gap-4">

                                            <div className="bg-white/20 p-4 rounded-full">

                                                <FaBriefcase className="text-2xl" />

                                            </div>

                                            <div>

                                                <h2 className="text-2xl font-bold">

                                                    {invite.project?.title || "Project"}

                                                </h2>

                                                <p className="text-blue-100">

                                                    From {invite.client?.fullName || "Client"}

                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                    {/* Body */}

                                    <div className="p-6">

                                        <div className="space-y-4">

                                            <div>

                                                <p className="text-sm text-gray-500 mb-1">
                                                    Message
                                                </p>

                                                <p className="text-gray-700">

                                                    {invite.message || "No message"}

                                                </p>

                                            </div>

                                            <div>

                                                <p className="text-sm text-gray-500 mb-1">
                                                    Project Description
                                                </p>

                                                <p className="text-gray-700">

                                                    {invite.project?.description || "No description"}

                                                </p>

                                            </div>

                                            <div className="flex items-center gap-3">

                                                <FaClock className="text-orange-500" />

                                                <span
                                                    className={`px-4 py-2 rounded-full text-sm font-bold
                                                    ${
                                                        invite.status === "Accepted"
                                                            ? "bg-green-100 text-green-700"
                                                            : invite.status === "Rejected"
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                                >

                                                    {invite.status}

                                                </span>

                                            </div>

                                        </div>

                                        {
                                            invite.status === "Pending" && (

                                                <div className="flex gap-4 mt-8">

                                                    <button
                                                        onClick={() =>
                                                            acceptInvitation(invite._id)
                                                        }
                                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2 transition"
                                                    >

                                                        <FaCheckCircle />

                                                        Accept

                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            rejectInvitation(invite._id)
                                                        }
                                                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2 transition"
                                                    >

                                                        <FaTimesCircle />

                                                        Reject

                                                    </button>

                                                </div>

                                            )
                                        }

                                        {
                                            invite.status === "Accepted" && (

                                                <div className="mt-6 bg-green-100 text-green-700 rounded-xl py-3 text-center font-bold">

                                                    ✅ Invitation Accepted

                                                </div>

                                            )
                                        }

                                        {
                                            invite.status === "Rejected" && (

                                                <div className="mt-6 bg-red-100 text-red-700 rounded-xl py-3 text-center font-bold">

                                                    ❌ Invitation Rejected

                                                </div>

                                            )
                                        }

                                    </div>

                                </div>

                            ))}

                        </div>

                    )
                }

            </div>

        </DashboardLayout>

    );

};

export default Invitations;