import { FaWallet } from "react-icons/fa";

const EmptyTransactions = () => {

    return (

        <div className="bg-white rounded-3xl shadow-xl p-16 text-center">

            <div className="flex justify-center">

                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">

                    <FaWallet className="text-blue-600 text-5xl" />

                </div>

            </div>

            <h2 className="text-3xl font-bold mt-8">

                No Transactions Yet

            </h2>

            <p className="text-gray-500 mt-3 text-lg">

                Your payment history will appear here after you receive payments
                or make withdrawals.

            </p>

            <div className="mt-10">

                <button
                    className="
                    bg-gradient-to-r
                    from-blue-600
                    to-indigo-700
                    text-white
                    px-8
                    py-3
                    rounded-xl
                    font-semibold
                    shadow-lg
                    hover:shadow-xl
                    hover:scale-105
                    transition-all
                    duration-300
                    "
                >

                    Start Earning

                </button>

            </div>

        </div>

    );

};

export default EmptyTransactions;