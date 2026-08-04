import { motion } from "framer-motion";
import {
    FaRobot,
    FaMoneyBillWave,
    FaMapMarkerAlt,
    FaArrowRight
} from "react-icons/fa";
import { Link } from "react-router-dom";

const RecommendedProjects = ({ projects = [] }) => {

    return (

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8"
        >

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h2 className="text-2xl font-bold flex items-center gap-3">

                        <FaRobot className="text-purple-600"/>

                        AI Recommended Projects

                    </h2>

                    <p className="text-gray-500 mt-2">

                        Projects matched according to your skills

                    </p>

                </div>

            </div>

            {

                projects.length === 0 ?

                (

                    <div className="text-center py-16 text-gray-400">

                        No AI recommendations available.

                    </div>

                )

                :

                (

                    <div className="space-y-5">

                        {

                            projects.slice(0,3).map(project=>(

                                <div

                                    key={project._id}

                                    className="border rounded-2xl p-6 hover:shadow-lg transition"

                                >

                                    <div className="flex justify-between items-start">

                                        <div>

                                            <h3 className="text-xl font-bold">

                                                {project.title}

                                            </h3>

                                            <p className="text-gray-500 mt-2">

                                                {project.client?.fullName}

                                            </p>

                                        </div>

                                        <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold">

                                            🤖 {project.matchScore || 90}% Match

                                        </span>

                                    </div>

                                    <div className="grid md:grid-cols-3 gap-6 mt-6">

                                        <div className="flex gap-3">

                                            <FaMoneyBillWave className="text-green-600 mt-1"/>

                                            <div>

                                                <p className="text-gray-500">

                                                    Budget

                                                </p>

                                                <h4 className="font-semibold">

                                                    ₹{project.budget?.min?.toLocaleString()} - ₹{project.budget?.max?.toLocaleString()}

                                                </h4>

                                            </div>

                                        </div>

                                        <div className="flex gap-3">

                                            <FaMapMarkerAlt className="text-red-500 mt-1"/>

                                            <div>

                                                <p className="text-gray-500">

                                                    Location

                                                </p>

                                                <h4 className="font-semibold">

                                                    {project.location || "Remote"}

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

                                        <button

                                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl flex items-center gap-2"

                                        >

                                            Apply Now

                                            <FaArrowRight/>

                                        </button>

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

export default RecommendedProjects;