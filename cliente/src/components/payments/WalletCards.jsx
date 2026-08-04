import {
    FaWallet,
    FaArrowCircleUp,
    FaArrowCircleDown,
    FaClock
} from "react-icons/fa";

const WalletCards = ({ wallet }) => {

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {/* Wallet Balance */}

            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

                <div className="flex justify-between items-center">

                    <div>

                        <p className="text-blue-100">

                            Wallet Balance

                        </p>

                        <h2 className="text-3xl font-bold mt-2">

                            ₹{wallet?.availableBalance || 0}

                        </h2>

                    </div>

                    <FaWallet className="text-5xl text-blue-200" />

                </div>

            </div>

            {/* Total Earnings */}

            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

                <div className="flex justify-between items-center">

                    <div>

                        <p className="text-green-100">

                            Total Earnings

                        </p>

                        <h2 className="text-3xl font-bold mt-2">

                            ₹{wallet?.lifetimeEarnings || 0}

                        </h2>

                    </div>

                    <FaArrowCircleUp className="text-5xl text-green-200" />

                </div>

            </div>

            {/* Withdrawn */}

            <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

                <div className="flex justify-between items-center">

                    <div>

                        <p className="text-purple-100">

                            Total Withdrawn

                        </p>

                        <h2 className="text-3xl font-bold mt-2">

                            ₹{wallet?.totalWithdrawn || 0}

                        </h2>

                    </div>

                    <FaArrowCircleDown className="text-5xl text-purple-200" />

                </div>

            </div>

            {/* Pending */}

            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

                <div className="flex justify-between items-center">

                    <div>

                        <p className="text-yellow-100">

                            Pending Amount

                        </p>

                        <h2 className="text-3xl font-bold mt-2">

                            ₹{wallet?.lockedBalance || 0}

                        </h2>

                    </div>

                    <FaClock className="text-5xl text-yellow-200" />

                </div>

            </div>

        </div>

    );

};

export default WalletCards;