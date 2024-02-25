import { Toaster } from "react-hot-toast";
import Header from "./Header";
import Main from "./Main";
import { useScreenWidth } from "../Hooks/useScreenWidth";

function AppLayout() {
    const { width } = useScreenWidth();
    return (
        <div>
            <Toaster position={width < 600 ? "top-center" : "top-right"} />

            <Header />
            <Main />
        </div>
    );
}

export default AppLayout;
