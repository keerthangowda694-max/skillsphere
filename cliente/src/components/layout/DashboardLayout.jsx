import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const DashboardLayout = ({ children }) => {

    return (

        <div className="flex">

            <Sidebar />

            <div className="flex-1 bg-slate-100 min-h-screen">

                <Topbar />

                <div className="p-8">

                    {children}

                </div>

            </div>

        </div>

    );

};

export default DashboardLayout;