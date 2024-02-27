import { useState } from "react";

import { darkModeContext } from "./Context/darkModeContext";
import AppLayout from "./pages/AppLayout";
import { Outlet } from "react-router";
import Header from "./components/Header";
function App() {
    const [isDark, setIsDark] = useState(true);

    const mainColor = isDark ? "bg-gray-800" : "bg-stone-100";
    const secondColor = isDark ? "bg-[#475569]" : "bg-white";
    const textColor = isDark ? "text-white" : "text-black";

    return (
        <darkModeContext.Provider value={{ isDark, mainColor, secondColor, textColor, setIsDark }}>
            <Outlet />
        </darkModeContext.Provider>
    );
}

export default App;
