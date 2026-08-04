import { motion } from "framer-motion";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";
import { FaChartLine } from "react-icons/fa";

const RevenueChart = ({ revenue = {} }) => {

    const chartData =
        revenue?.monthlyRevenue?.map(item => ({
            month: item.month,
            revenue: item.revenue
        })) || [];

    return (

        <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8"
        >

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h2 className="text-2xl font-bold">

                        Revenue Analytics

                    </h2>

                    <p className="text-gray-500 mt-1">

                        Monthly earnings from completed projects

                    </p>

                </div>

                <div className="bg-green-100 p-4 rounded-2xl">

                    <FaChartLine
                        className="text-green-600 text-3xl"
                    />

                </div>

            </div>

            {
                chartData.length === 0 ? (

                    <div className="h-72 flex items-center justify-center text-gray-400">

                        No revenue available yet.

                    </div>

                ) : (

                    <ResponsiveContainer width="100%" height={320}>

                        <AreaChart data={chartData}>

                            <defs>

                                <linearGradient
                                    id="revenueGradient"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >

                                    <stop
                                        offset="5%"
                                        stopColor="#2563eb"
                                        stopOpacity={0.4}
                                    />

                                    <stop
                                        offset="95%"
                                        stopColor="#2563eb"
                                        stopOpacity={0}
                                    />

                                </linearGradient>

                            </defs>

                            <CartesianGrid
                                strokeDasharray="4 4"
                            />

                            <XAxis
                                dataKey="month"
                            />

                            <YAxis />

                            <Tooltip
                                formatter={(value) =>
                                    `₹${Number(value).toLocaleString()}`
                                }
                            />

                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#2563eb"
                                strokeWidth={4}
                                fill="url(#revenueGradient)"
                            />

                        </AreaChart>

                    </ResponsiveContainer>

                )
            }

        </motion.div>

    );

};

export default RevenueChart;