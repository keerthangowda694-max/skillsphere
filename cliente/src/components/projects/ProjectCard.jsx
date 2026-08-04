import { Link } from "react-router-dom";

import {
    FaMoneyBillWave,
    FaCalendarAlt,
    FaUser,
    FaClock,
    FaCheckCircle
} from "react-icons/fa";


const ProjectCard = ({ project }) => {


    return (

        <div
            className="
            bg-white
            rounded-2xl
            shadow-lg
            p-6
            hover:shadow-xl
            transition
            "
        >


            {/* Project Title */}

            <h2 className="
                text-2xl
                font-bold
                mb-3
            ">
                {project.title}
            </h2>



            {/* Description */}

            <p className="
                text-gray-600
                mb-5
                line-clamp-3
            ">
                {project.description}
            </p>




            {/* Project Details */}

            <div className="
                space-y-3
                text-gray-700
            ">


                <div className="
                    flex
                    items-center
                    gap-3
                ">

                    <FaMoneyBillWave className="text-green-600"/>

                    <span>
                        Budget:
                        {" "}
                        ₹
                        {
                            project.budget?.max ||
                            project.budget ||
                            0
                        }
                    </span>

                </div>



                <div className="
                    flex
                    items-center
                    gap-3
                ">

                    <FaCalendarAlt className="text-blue-600"/>

                    <span>
                        Deadline:
                        {" "}
                        {
                            project.deadline
                            ?
                            new Date(
                                project.deadline
                            ).toLocaleDateString()
                            :
                            "Not specified"
                        }
                    </span>

                </div>




                <div className="
                    flex
                    items-center
                    gap-3
                ">

                    <FaUser className="text-purple-600"/>

                    <span>
                        Client:
                        {" "}
                        {
                            project.client?.fullName ||
                            project.client?.name ||
                            "Client"
                        }
                    </span>

                </div>




                <div className="
                    flex
                    items-center
                    gap-3
                ">


                    {
                        project.status?.toLowerCase()
                        ===
                        "completed"
                        ?

                        <FaCheckCircle className="text-green-600"/>

                        :

                        <FaClock className="text-yellow-600"/>

                    }


                    <span>
                        Status:
                        {" "}
                        {
                            project.status ||
                            "In Progress"
                        }
                    </span>


                </div>


            </div>




            {/* Progress */}

            <div className="mt-5">


                <div className="
                    flex
                    justify-between
                    mb-2
                ">

                    <span className="font-semibold">
                        Progress
                    </span>


                    <span>
                        {
                            project.progress || 0
                        }%
                    </span>


                </div>



                <div className="
                    w-full
                    bg-gray-200
                    rounded-full
                    h-3
                ">


                    <div

                        className="
                        bg-blue-600
                        h-3
                        rounded-full
                        "

                        style={{
                            width:
                            `${project.progress || 0}%`
                        }}

                    />

                </div>


            </div>





            {/* Workspace Button */}

            <Link

                to={`/freelancer/workspace/${project._id}`}

                className="
                mt-6
                block
                text-center
                bg-blue-600
                hover:bg-blue-700
                text-white
                py-3
                rounded-xl
                font-semibold
                transition
                "

            >

                Open Workspace

            </Link>



        </div>

    );

};


export default ProjectCard;