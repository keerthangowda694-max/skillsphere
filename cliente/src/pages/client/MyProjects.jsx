import { useEffect, useState } from "react";
import API from "../../services/api";
import ClientLayout from "../../components/client/ClientLayout";

import {
    FaEdit,
    FaTrash,
    FaBriefcase
} from "react-icons/fa";

const MyProjects = () => {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);

    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "",
        budgetMin: "",
        budgetMax: "",
        experienceRequired: "",
        deadline: ""
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    // ============================
    // Fetch Projects
    // ============================
    const fetchProjects = async () => {

        try {

            const res = await API.get("/client/dashboard");

            setProjects(res.data.recentProjects || []);

        } catch (err) {

            console.log(err.response?.data || err);

        } finally {

            setLoading(false);

        }
    };

    // ============================
    // Delete Project
    // ============================
    const deleteProject = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this project?"
        );

        if (!confirmDelete) return;

        try {

            await API.delete(`/projects/${id}`);

            setProjects(prev =>
                prev.filter(project => project._id !== id)
            );

            alert("Project deleted successfully");

        } catch (err) {

            console.log(err.response?.data || err);

            alert("Delete failed");

        }
    };

    // ============================
    // Open Edit Modal
    // ============================
    const openEdit = (project) => {

        setEditing(project._id);

        setForm({
            title: project.title,
            description: project.description,
            category: project.category,
            budgetMin: project.budget?.min || "",
            budgetMax: project.budget?.max || "",
            experienceRequired: project.experienceRequired || "",
            deadline: project.deadline
                ? project.deadline.split("T")[0]
                : ""
        });
    };

    // ============================
    // Update Project
    // ============================
    const updateProject = async () => {

        try {

            await API.put(`/projects/${editing}`, form);

            alert("Project updated successfully");

            setEditing(null);

            fetchProjects();

        } catch (err) {

            console.log(err.response?.data || err);

            alert("Update failed");

        }
    };

    if (loading) {

        return (

            <ClientLayout>
                <div className="h-[70vh] flex items-center justify-center text-xl font-semibold">
                    Loading Projects...
                </div>
            </ClientLayout>
        );
    }

    return (

        <ClientLayout>

            <div className="p-8">

                <h1 className="text-3xl font-bold mb-8">
                    My Projects
                </h1>

                {projects.length === 0 ? (

                    <div className="bg-white rounded-2xl shadow-lg p-10 text-center text-gray-500">

                        <FaBriefcase className="mx-auto text-5xl text-blue-500 mb-4" />

                        <h2 className="text-2xl font-bold">
                            No Projects Yet
                        </h2>

                        <p className="mt-2">
                            Create your first project to start hiring freelancers.
                        </p>

                    </div>

                ) : (

                    <div className="grid md:grid-cols-2 gap-6">

                        {projects.map(project => (

                            <div
                                key={project._id}
                                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
                            >

                                <div className="flex justify-between items-start">

                                    <div>

                                        <h2 className="text-xl font-bold">
                                            {project.title}
                                        </h2>

                                        <p className="text-gray-500 text-sm mt-1">
                                            {project.category}
                                        </p>

                                    </div>

                                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                                        {project.status}
                                    </span>

                                </div>

                                <p className="text-gray-600 mt-4 line-clamp-3">
                                    {project.description}
                                </p>

                                <div className="mt-5 grid grid-cols-2 gap-4 text-sm">

                                    <div>

                                        <p className="text-gray-500">
                                            Budget
                                        </p>

                                        <p className="font-semibold">
                                            ₹{project.budget?.min} - ₹{project.budget?.max}
                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-gray-500">
                                            Experience
                                        </p>

                                        <p className="font-semibold">
                                            {project.experienceRequired}
                                        </p>

                                    </div>

                                </div>

                                <div className="mt-6 flex gap-3">

                                    <button
                                        onClick={() => openEdit(project)}
                                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl flex items-center justify-center gap-2"
                                    >
                                        <FaEdit />
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => deleteProject(project._id)}
                                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl flex items-center justify-center gap-2"
                                    >
                                        <FaTrash />
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>
                )}

                {/* Edit Modal */}
                {editing && (

                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                        <div className="bg-white rounded-3xl p-8 w-full max-w-2xl">

                            <h2 className="text-2xl font-bold mb-6">
                                Edit Project
                            </h2>

                            <div className="grid md:grid-cols-2 gap-5">

                                <input
                                    placeholder="Title"
                                    value={form.title}
                                    onChange={(e) =>
                                        setForm({ ...form, title: e.target.value })
                                    }
                                    className="border rounded-xl p-3"
                                />

                                <input
                                    placeholder="Category"
                                    value={form.category}
                                    onChange={(e) =>
                                        setForm({ ...form, category: e.target.value })
                                    }
                                    className="border rounded-xl p-3"
                                />

                                <input
                                    type="number"
                                    placeholder="Min Budget"
                                    value={form.budgetMin}
                                    onChange={(e) =>
                                        setForm({ ...form, budgetMin: e.target.value })
                                    }
                                    className="border rounded-xl p-3"
                                />

                                <input
                                    type="number"
                                    placeholder="Max Budget"
                                    value={form.budgetMax}
                                    onChange={(e) =>
                                        setForm({ ...form, budgetMax: e.target.value })
                                    }
                                    className="border rounded-xl p-3"
                                />

                                <input
                                    placeholder="Experience Required"
                                    value={form.experienceRequired}
                                    onChange={(e) =>
                                        setForm({ ...form, experienceRequired: e.target.value })
                                    }
                                    className="border rounded-xl p-3"
                                />

                                <input
                                    type="date"
                                    value={form.deadline}
                                    onChange={(e) =>
                                        setForm({ ...form, deadline: e.target.value })
                                    }
                                    className="border rounded-xl p-3"
                                />

                            </div>

                            <textarea
                                rows="4"
                                placeholder="Description"
                                value={form.description}
                                onChange={(e) =>
                                    setForm({ ...form, description: e.target.value })
                                }
                                className="border rounded-xl p-3 w-full mt-5"
                            />

                            <div className="flex gap-4 mt-6">

                                <button
                                    onClick={updateProject}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
                                >
                                    Save Changes
                                </button>

                                <button
                                    onClick={() => setEditing(null)}
                                    className="flex-1 bg-gray-200 hover:bg-gray-300 py-3 rounded-xl font-semibold"
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>

                    </div>
                )}

            </div>

        </ClientLayout>
    );
};

export default MyProjects;
