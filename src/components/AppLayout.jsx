import { Toaster } from "react-hot-toast";
import Header from "./Header";
import Main from "./Main";

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
