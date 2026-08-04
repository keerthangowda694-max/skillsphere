import { FaBell, FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Topbar = () => {

    const { user } = useContext(AuthContext);

    return (

        <header className="bg-white shadow flex justify-between items-center p-6">

            <h2 className="text-2xl font-bold">

                Dashboard

            </h2>

            <div className="flex items-center gap-6">

                <FaBell className="text-2xl cursor-pointer" />

                <div className="flex items-center gap-3">

                    <FaUserCircle className="text-4xl text-blue-600" />

                    <div>

                        <p className="font-semibold">

                            {user?.fullName}

                        </p>

                        <p className="text-sm text-gray-500">

                            {user?.role}

                        </p>

                    </div>

                </div>

            </div>

        </header>

    );

};

export default Topbar;