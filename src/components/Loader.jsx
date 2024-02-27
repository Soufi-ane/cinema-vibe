import { useContext } from "react";
import { darkModeContext } from "../Context/darkModeContext";

function Loader({ className }) {
    const { isDark, secondColor } = useContext(darkModeContext);
    const borderColor = isDark ? "white" : "#535353";

    return (
        <div
            className={`w-full ${
                isDark ? secondColor : "bg-white"
            } flex-1 h-screen flex  items-center justify-center ${className}`}>
            <div
                style={{
                    border: `8px solid ${borderColor}`,
                }}
                className={`spinner`}></div>
        </div>
    );
}

export default Loader;
