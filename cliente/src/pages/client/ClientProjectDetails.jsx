import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import ClientLayout from "../../components/client/ClientLayout";

const ClientProjectDetails = () => {

    const { id } = useParams();

    const [project, setProject] = useState(null);

    useEffect(() => {
        loadProject();
    }, []);

    const loadProject = async () => {
        try {

            const res = await API.get(`/projects/${id}`);

            setProject(res.data.project);

        } catch (err) {

            console.log(err);

        }
    };

    if (!project) {

        return (
            <ClientLayout>
                <div className="p-10 text-center text-xl">
                    Loading...
                </div>
            </ClientLayout>
        );

    }

    return (

        <ClientLayout>

            <div className="p-8">

                <div className="bg-white rounded-3xl shadow-xl p-8">

                    <h1 className="text-3xl font-bold">
                        {project.title}
                    </h1>

                    <p className="mt-5 text-gray-600">
                        {project.description}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mt-8">

                        <div>
                            <h3 className="font-semibold">Category</h3>
                            {<p>{project.category || project.title }</p>}
                        </div>

                        <div>
                            <h3 className="font-semibold">Status</h3>
                            <p>{project.status}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold">Budget</h3>
                            <p>
                                ₹{project.budget?.min} - ₹{project.budget?.max}
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold">Experience</h3>
                            <p>{project.experienceRequired}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold">Deadline</h3>
                            <p>
                                {project.deadline
                                    ? new Date(project.deadline).toLocaleDateString()
                                    : "N/A"}
                            </p>
                        </div>

                    </div>

                    <div className="mt-8">

                        <h3 className="font-semibold mb-3">
                            Required Skills
                        </h3>

                        <div className="flex flex-wrap gap-2">

                            {project.requiredSkills?.map((skill, index) => (

                                <span
                                    key={index}
                                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                                >
                                    {skill}
                                </span>

                            ))}

                        </div>

                    </div>

                </div>

            </div>

        </ClientLayout>

    );

};

export default ClientProjectDetails;