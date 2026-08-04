import {
    FaArrowCircleDown,
    FaArrowCircleUp,
    FaCheckCircle,
    FaClock,
    FaTimesCircle
} from "react-icons/fa";

const TransactionTable = ({ transactions }) => {

    const statusBadge = (status) => {

        switch (status?.toLowerCase()) {

            case "completed":
            case "success":
                return (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 w-fit">
                        <FaCheckCircle />
                        Completed
                    </span>
                );

            case "pending":
                return (
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 w-fit">
                        <FaClock />
                        Pending
                    </span>
                );

            default:
                return (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 w-fit">
                        <FaTimesCircle />
                        Failed
                    </span>
                );
        }
    };

    return (

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

            <div className="px-8 py-6 border-b">

                <h2 className="text-2xl font-bold">

                    Recent Transactions

                </h2>

                <p className="text-gray-500 mt-1">

                    Complete payment history

                </p>

            </div>

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="text-left px-6 py-4">
                                Type
                            </th>

                            <th className="text-left px-6 py-4">
                                Amount
                            </th>

                            <th className="text-left px-6 py-4">
                                Status
                            </th>

                            <th className="text-left px-6 py-4">
                                Date
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            transactions.map((item) => (

                                <tr
                                    key={item._id}
                                    className="border-b hover:bg-gray-50 transition"
                                >

                                    <td className="px-6 py-5">

                                        <div className="flex items-center gap-3">

                                            {

                                                item.type === "Withdrawal"

                                                    ?

                                                    <FaArrowCircleDown className="text-red-500 text-xl" />

                                                    :

                                                    <FaArrowCircleUp className="text-green-500 text-xl" />

                                            }

                                            <span className="font-semibold">

                                                {item.type}

                                            </span>

                                        </div>

                                    </td>

                                    <td className="px-6 py-5 font-bold">

                                        ₹{item.amount}

                                    </td>

                                    <td className="px-6 py-5">

                                        {statusBadge(item.status)}

                                    </td>

                                    <td className="px-6 py-5 text-gray-600">

                                        {

                                            new Date(
                                                item.createdAt
                                            ).toLocaleDateString()

                                        }

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default TransactionTable;