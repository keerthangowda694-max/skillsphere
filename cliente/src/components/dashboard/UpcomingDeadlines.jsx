import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

const UpcomingDeadlines = ({ projects = [] }) => {

    const upcomingProjects = projects
        .filter(
            project =>
                project.status !== "Completed" &&
                project.deadline
        )
        .sort(
            (a, b) =>
                new Date(a.deadline) -
                new Date(b.deadline)
        )
        .slice(0, 5);

    const getDaysLeft = (deadline) => {

        const today = new Date();

        const due = new Date(deadline);

        return Math.ceil(
            (due - today) /
            (1000 * 60 * 60 * 24)
        );

    };

    return (

        <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8"
        >

            <div className="flex justify-between items-center mb-6">

                <div>

                    <h2 className="text-2xl font-bold">

                        Upcoming Deadlines

                    </h2>

                    <p className="text-gray-500">

                        Projects requiring attention

                    </p>

                </div>

                <FaCalendarAlt
                    className="text-red-500 text-3xl"
                />

            </div>

            {
                upcomingProjects.length === 0 ? (

                    <div className="text-center py-16 text-gray-400">

                        🎉 No upcoming deadlines

                    </div>

                ) : (

                    <div className="space-y-5">

                        {
                            upcomingProjects.map(project => {

                                const days =
                                    getDaysLeft(project.deadline);

                                return (

                                    <div
                                        key={project._id}
                                        className="flex justify-between items-center border rounded-2xl p-5 hover:bg-gray-50 transition"
                                    >

                                        <div>

                                            <h3 className="font-semibold text-lg">

                                                {project.title}

                                            </h3>

                                            <p className="text-gray-500 mt-1">

                                                Client:
                                                {" "}
                                                {project.client?.fullName ||
                                                    "Unknown"}

                                            </p>

                                        </div>

                                        <div className="text-right">

                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                    days <= 2
                                                        ? "bg-red-100 text-red-700"
                                                        : days <= 7
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-green-100 text-green-700"
                                                }`}
                                            >

                                                {days > 0
                                                    ? `${days} Days Left`
                                                    : "Overdue"}

                                            </span>

                                            <div className="flex items-center justify-end gap-2 mt-3 text-gray-500">

                                                <FaClock />

                                                {new Date(
                                                    project.deadline
                                                ).toLocaleDateString()}

                                            </div>

                                        </div>

                                    </div>

                                );

                            })
                        }

                    </div>

                )
            }

        </motion.div>

    );

};

export default UpcomingDeadlines;