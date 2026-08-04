import { motion } from "framer-motion";
import {
    FaMoneyBillWave,
    FaProjectDiagram,
    FaStar,
    FaRobot
} from "react-icons/fa";

const cards = [
    {
        key: "earnings",
        title: "Total Earnings",
        icon: FaMoneyBillWave,
        color: "from-green-500 to-emerald-600",
        value: (data) => `₹${(data.totalEarnings || 0).toLocaleString()}`,
        footer: "Lifetime Earnings"
    },
    {
        key: "projects",
        title: "Projects",
        icon: FaProjectDiagram,
        color: "from-blue-500 to-indigo-600",
        value: (data) => data.totalProjects || 0,
        footer: "Total Projects"
    },
    {
        key: "rating",
        title: "Average Rating",
        icon: FaStar,
        color: "from-yellow-400 to-orange-500",
        value: (data) => data.averageRating || 0,
        footer: "Client Reviews"
    },
    {
        key: "ai",
        title: "AI Profile Score",
        icon: FaRobot,
        color: "from-purple-500 to-pink-600",
        value: (data) => `${data.profileScore || 0}%`,
        footer: "AI Performance"
    }
];

const StatsCards = ({ dashboard = {}, aiInsights = {} }) => {

    const data = {
        ...dashboard,
        profileScore: aiInsights.profileScore || 0
    };

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {cards.map((card, index) => {

                const Icon = card.icon;

                return (

                    <motion.div
                        key={card.key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{
                            y: -8,
                            scale: 1.02
                        }}
                        className={`bg-gradient-to-r ${card.color} rounded-3xl p-6 shadow-xl text-white`}
                    >

                        <div className="flex justify-between items-start">

                            <div>

                                <p className="text-white/80">

                                    {card.title}

                                </p>

                                <h2 className="text-3xl font-bold mt-3">

                                    {card.value(data)}

                                </h2>

                                <p className="text-white/80 mt-4">

                                    {card.footer}

                                </p>

                            </div>

                            <div className="bg-white/20 p-4 rounded-2xl">

                                <Icon className="text-3xl" />

                            </div>

                        </div>

                    </motion.div>

                );

            })}

        </div>

    );

};

export default StatsCards;