import {
    FaHome,
    FaProjectDiagram,
    FaPlusCircle,
    FaUsers,
    FaWallet,
    FaUser,
    FaCog,
    FaSignOutAlt,
    FaCheckCircle,
    FaComments
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

const ClientSidebar = () => {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    };

    const menu = [

        {
            name: "Dashboard",
            path: "/client/dashboard",
            icon: <FaHome />
        },

        {
            name: "Post Project",
            path: "/client/post-project",
            icon: <FaPlusCircle />
        },

        {
            name: "My Projects",
            path: "/client/projects",
            icon: <FaProjectDiagram />
        },

        {
            name: "Applications",
            path: "/client/applications",
            icon: <FaUsers />
        },

        {
            name: "Work Review",
            path: "/client/work-review",
            icon: <FaCheckCircle />
        },

        // ✅ NEW CHAT MENU
        {
            name: "Chat",
            path: "/client/chat",
            icon: <FaComments />
        },

        {
            name: "Payments",
            path: "/client/payments",
            icon: <FaWallet />
        },

        {
            name: "Profile",
            path: "/client/profile",
            icon: <FaUser />
        },

        {
            name: "Settings",
            path: "/client/settings",
            icon: <FaCog />
        }

    ];

    return (

        <div
            className="
            w-64
            min-h-screen
            bg-gray-900
            text-white
            p-5
            fixed
            left-0
            top-0
            flex
            flex-col
            "
        >

            <h1
                className="
                text-2xl
                font-bold
                mb-10
                text-blue-400
                text-center
                "
            >
                SkillSphere
            </h1>

            <div className="flex-1 space-y-3 overflow-y-auto">

                {menu.map((item) => (

                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `
                            flex
                            items-center
                            gap-4
                            px-4
                            py-3
                            rounded-xl
                            transition-all
                            duration-200
                            ${
                                isActive
                                    ? "bg-blue-600 shadow-lg"
                                    : "hover:bg-gray-800"
                            }
                            `
                        }
                    >
                        <span className="text-xl">
                            {item.icon}
                        </span>

                        <span className="font-medium">
                            {item.name}
                        </span>

                    </NavLink>

                ))}

            </div>

            <button
                onClick={logout}
                className="
                mt-6
                w-full
                flex
                items-center
                justify-center
                gap-3
                px-4
                py-3
                rounded-xl
                bg-red-600
                hover:bg-red-700
                transition
                "
            >
                <FaSignOutAlt />
                Logout
            </button>

        </div>

    );

};

export default ClientSidebar;