import { FaBell, FaComments } from "react-icons/fa";
import { motion } from "framer-motion";

const WelcomeBanner = ({ user }) => {
    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) greeting = "Good Morning";
    else if (hour < 17) greeting = "Good Afternoon";

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-xl"
        >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

                {/* Left */}

                <div>

                    <h1 className="text-4xl font-bold">

                        {greeting},{" "}
                        {user?.fullName || "Freelancer"} 👋

                    </h1>

                    <p className="mt-3 text-blue-100 text-lg">

                        Welcome back to <span className="font-semibold">SkillSphere</span>.
                        Manage your freelance business, projects and AI insights from one place.

                    </p>

                    <div className="flex gap-4 mt-6 flex-wrap">

                        <span className="bg-white/20 px-4 py-2 rounded-full">
                            🚀 Ready to work
                        </span>

                        <span className="bg-white/20 px-4 py-2 rounded-full">
                            🤖 AI Powered
                        </span>

                        <span className="bg-white/20 px-4 py-2 rounded-full">
                            💼 Professional Dashboard
                        </span>

                    </div>

                </div>

                {/* Right */}

                <div className="flex gap-4">

                    <div className="relative bg-white/20 p-4 rounded-2xl cursor-pointer hover:bg-white/30 transition">

                        <FaComments size={24} />

                        <span className="absolute -top-2 -right-2 bg-red-500 w-6 h-6 rounded-full flex items-center justify-center text-xs">
                            2
                        </span>

                    </div>

                    <div className="relative bg-white/20 p-4 rounded-2xl cursor-pointer hover:bg-white/30 transition">

                        <FaBell size={24} />

                        <span className="absolute -top-2 -right-2 bg-red-500 w-6 h-6 rounded-full flex items-center justify-center text-xs">
                            3
                        </span>

                    </div>

                </div>

            </div>
        </motion.div>
    );
};

export default WelcomeBanner;