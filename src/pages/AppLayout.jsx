import { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import { Outlet } from "react-router";

function AppLayout() {
    return (
        <div className="h-full">
            <Toaster position={"top-center"} />
            <Header />

            <Outlet />
        </div>
    );
}

export default AppLayout;
