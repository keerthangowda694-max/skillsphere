import { motion } from "framer-motion";
import {
    FaMoneyBillWave,
    FaMapMarkerAlt,
    FaClock,
    FaUserTie,
    FaArrowRight
} from "react-icons/fa";
import { Link } from "react-router-dom";

const LatestProjects = ({ projects = [] }) => {

    return (

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8"
        >

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h2 className="text-2xl font-bold">

                        🆕 Latest Client Posted Projects

                    </h2>

                    <p className="text-gray-500 mt-2">

                        Recently posted freelance opportunities

                    </p>

                </div>

                <Link
                    to="/freelancer/projects"
                    className="text-blue-600 font-semibold hover:underline"
                >

                    Browse All →

                </Link>

            </div>

            {

                projects.length === 0 ?

                (

                    <div className="text-center py-16 text-gray-400">

                        No projects available.

                    </div>

                )

                :

                (

                    <div className="space-y-6">

                        {

                            projects.slice(0,5).map(project=>(

                                <div
                                    key={project._id}
                                    className="border rounded-2xl p-6 hover:shadow-lg transition duration-300"
                                >

                                    <div className="flex justify-between items-start">

                                        <div>

                                            <h3 className="text-xl font-bold">

                                                {project.title}

                                            </h3>

                                            <div className="flex items-center gap-2 text-gray-500 mt-2">

                                                <FaUserTie/>

                                                {project.client?.fullName || "Client"}

                                            </div>

                                        </div>

                                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">

                                            {project.status}

                                        </span>

                                    </div>

                                    <div className="grid md:grid-cols-4 gap-5 mt-6">

                                        <div className="flex gap-2">

                                            <FaMoneyBillWave className="text-green-600 mt-1"/>

                                            <div>

                                                <p className="text-gray-500">

                                                    Budget

                                                </p>

                                                <h4 className="font-semibold">

                                                    ₹{project.budget?.min?.toLocaleString()} -
                                                    ₹{project.budget?.max?.toLocaleString()}

                                                </h4>

                                            </div>

                                        </div>

                                        <div className="flex gap-2">

                                            <FaMapMarkerAlt className="text-red-500 mt-1"/>

                                            <div>

                                                <p className="text-gray-500">

                                                    Work Mode

                                                </p>

                                                <h4 className="font-semibold">

                                                    {project.location || "Remote"}

                                                </h4>

                                            </div>

                                        </div>

                                        <div className="flex gap-2">

                                            <FaClock className="text-orange-500 mt-1"/>

                                            <div>

                                                <p className="text-gray-500">

                                                    Deadline

                                                </p>

                                                <h4 className="font-semibold">

                                                    {
                                                        new Date(
                                                            project.deadline
                                                        ).toLocaleDateString()
                                                    }

                                                </h4>

                                            </div>

                                        </div>

                                        <div>

                                            <p className="text-gray-500">

                                                Experience

                                            </p>

                                            <h4 className="font-semibold">

                                                {project.experienceRequired} Years

                                            </h4>

                                        </div>

                                    </div>

                                    <div className="flex flex-wrap gap-2 mt-6">

                                        {

                                            project.requiredSkills?.map(skill=>(

                                                <span
                                                    key={skill}
                                                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                                                >

                                                    {skill}

                                                </span>

                                            ))

                                        }

                                    </div>

                                    <div className="flex justify-end gap-4 mt-8">

                                        <Link
                                            to={`/freelancer/projects/${project._id}`}
                                            className="border border-blue-600 text-blue-600 px-5 py-2 rounded-xl hover:bg-blue-50"
                                        >

                                            View Details

                                        </Link>

                                        

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                )

            }

        </motion.div>

    );

};

export default LatestProjects;