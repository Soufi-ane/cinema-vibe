import { useContext } from "react";
import { darkModeContext } from "../Context/darkModeContext";

function Loader({ className, isLoading }) {
    const { isDark, secondColor } = useContext(darkModeContext);
    const borderColor = isDark ? "white" : "#535353";

    return (
        <div
            className={`w-full ${isLoading ? "pb-72 lg:pb-10" : ""} pt-0 md:pt-[40%] lg:pt-[10%] ${
                isDark ? secondColor : "bg-white"
            } flex-1 h-screen flex  items-center justify-center ${className}`}>
            <div
                style={{
                    border: `8px solid ${borderColor}`,
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                }}
                className="spinner"></div>
        </div>
    );
}

export default Loader;
