import { Outlet } from "react-router-dom";
import Navbar from "~/components/navbar";

const Layout = () => {
    return (
        <div className="w-full">
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
