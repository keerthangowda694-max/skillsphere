import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import WalletCards from "../../components/payments/WalletCards";
import TransactionTable from "../../components/payments/TransactionTable";
import WithdrawModal from "../../components/payments/WithdrawModal";
import EmptyTransactions from "../../components/payments/EmptyTransactions";

import API from "../../services/api";

import {
    FaWallet,
    FaMoneyBillWave
} from "react-icons/fa";

const Payments = () => {

    const [wallet, setWallet] = useState(null);

    const [transactions, setTransactions] = useState([]);

    const [loading, setLoading] = useState(true);

    const [showWithdraw, setShowWithdraw] = useState(false);

    const [amount, setAmount] = useState("");



    useEffect(() => {

        fetchWallet();

        fetchTransactions();

    }, []);




    const fetchWallet = async () => {

        try {

            const res = await API.get("/wallet");

            setWallet(res.data.wallet);

        } catch (err) {

            console.log(err.response?.data || err);

        }

    };




    const fetchTransactions = async () => {

        try {

            const res = await API.get("/wallet/transactions");

            setTransactions(res.data.transactions || []);

        } catch (err) {

            console.log(err.response?.data || err);

        } finally {

            setLoading(false);

        }

    };





    const withdrawMoney = async () => {

        if (!amount) return;

        try {

            await API.post("/wallet/withdraw", {

                amount

            });

            setShowWithdraw(false);

            setAmount("");

            fetchWallet();

            fetchTransactions();

        } catch (err) {

            alert(
                err.response?.data?.message || "Withdrawal failed"
            );

        }

    };



    if (loading) {

        return (

            <DashboardLayout>

                <div className="h-[75vh] flex justify-center items-center">

                    <div className="text-2xl font-bold">

                        Loading Wallet...

                    </div>

                </div>

            </DashboardLayout>

        );

    }



    return (

        <DashboardLayout>

            <div className="p-8">

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-4xl font-bold flex items-center gap-3">

                            <FaWallet className="text-blue-600" />

                            Payments & Wallet

                        </h1>

                        <p className="text-gray-500 mt-2">

                            Track your earnings, withdrawals and transactions.

                        </p>

                    </div>

                    <button

                        onClick={() => setShowWithdraw(true)}

                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition"

                    >

                        <FaMoneyBillWave className="inline mr-2" />

                        Withdraw

                    </button>

                </div>



                {/* Wallet Cards */}

                <WalletCards wallet={wallet} />



                {/* Transactions */}

                <div className="mt-10">

                    {

                        transactions.length === 0

                            ?

                            <EmptyTransactions />

                            :

                            <TransactionTable

                                transactions={transactions}

                            />

                    }

                </div>



                {

                    showWithdraw && (

                        <WithdrawModal

                            amount={amount}

                            setAmount={setAmount}

                            onClose={() => setShowWithdraw(false)}

                            onWithdraw={withdrawMoney}

                        />

                    )

                }

            </div>

        </DashboardLayout>

    );

};

export default Payments;