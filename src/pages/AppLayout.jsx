import { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import Main from "../components/Main";

function AppLayout() {
    return (
        <div>
            <Toaster position={"top-center"} />
            <Header />
            <Main />
        </div>
    );
}

export default AppLayout;
