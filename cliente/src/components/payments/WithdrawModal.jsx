import { FaMoneyBillWave, FaTimes } from "react-icons/fa";

const WithdrawModal = ({
    amount,
    setAmount,
    onWithdraw,
    onClose
}) => {

    return (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-[fadeIn_.25s_ease]">

                {/* Header */}

                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 flex justify-between items-center">

                    <div className="flex items-center gap-3">

                        <FaMoneyBillWave className="text-2xl" />

                        <h2 className="text-2xl font-bold">

                            Withdraw Money

                        </h2>

                    </div>

                    <button
                        onClick={onClose}
                        className="hover:bg-white/20 p-2 rounded-full transition"
                    >
                        <FaTimes />
                    </button>

                </div>

                {/* Body */}

                <div className="p-6">

                    <label className="block text-gray-600 font-semibold mb-2">

                        Enter Amount

                    </label>

                    <input
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <p className="text-gray-400 text-sm mt-3">

                        The amount will be transferred to your registered bank account.

                    </p>

                </div>

                {/* Footer */}

                <div className="flex gap-4 p-6 pt-0">

                    <button
                        onClick={onClose}
                        className="flex-1 border border-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
                    >

                        Cancel

                    </button>

                    <button
                        onClick={onWithdraw}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition"
                    >

                        Withdraw

                    </button>

                </div>

            </div>

        </div>

    );

};

export default WithdrawModal;