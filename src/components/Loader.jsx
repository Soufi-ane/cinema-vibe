import { useScreenWidth } from "../Hooks/useScreenWidth";

function Loader({ className }) {
    return (
        <div className={`w-full flex-1 h-screen flex  items-center justify-center ${className}`}>
            <div className={`spinner`}></div>
        </div>
    );
}

export default Loader;
