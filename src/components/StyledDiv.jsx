import { useContext } from "react";
import { darkModeContext } from "../Context/darkModeContext";

function StyledDiv({ children, className }) {
    const { secondColor } = useContext(darkModeContext);
    return (
        <div className={` ${secondColor} px-4 py-2 bg-opacity-50 rounded-lg ${className}`}>
            {children}
        </div>
    );
}

export default StyledDiv;
