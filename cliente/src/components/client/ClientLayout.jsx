import ClientSidebar from "./ClientSidebar";
import ClientNavbar from "./ClientNavbar";

const ClientLayout = ({ children }) => {

    return (

        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar */}
            <ClientSidebar />

            {/* Main Content */}
            <div className="flex-1 ml-64">

                <ClientNavbar />

                <main className="p-6 min-h-screen">
                    {children}
                </main>

            </div>

        </div>

    );

};

export default ClientLayout;