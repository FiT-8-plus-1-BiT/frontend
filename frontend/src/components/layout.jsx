import { Outlet } from "react-router-dom";
import Navbar from "~/components/navbar";

const Layout = () => {
    return (
        <div className="w-full max-w-[1920px] px-8 pt-8 mx-auto">
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
