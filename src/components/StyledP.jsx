import { useContext } from "react";
import { darkModeContext } from "../Context/darkModeContext";

function StyledP({ children, type, className }) {
    const { secondColor } = useContext(darkModeContext);
    return (
        <p
            style={{ width: "auto", display: "inline", marginRight: "auto" }}
            className={` ${secondColor} inline ${
                type === "small" ? "px-2 py-1" : "px-5 py-1"
            }   bg-opacity-50 rounded-lg ${className}`}>
            {children}
        </p>
    );
}

export default StyledP;
