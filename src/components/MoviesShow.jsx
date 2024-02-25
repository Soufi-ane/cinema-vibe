import { useSearchParams } from "react-router-dom";
import Empty from "./Empty";

import MovieItem from "./MovieItem";
import Br from "./Br";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import Loader from "./Loader";

function MoviesShow({ movies, loading, top }) {
    const [searchParams] = useSearchParams();
    const currentType = searchParams.get("type") || "movies";
    const query = searchParams.get("s");

    // if (loading) {
    //     toast.remove();
    //     toast.loading("loading...");
    // } else toast.remove();
    if (loading)
        return <Loader className={top ? "hidden md:block h-[78vh]" : "h-[85vh] hidden md:block"} />;
    if (!movies && !query) return <Br />;
    if (!movies) return <Empty source={currentType} />;
    let regular = `relative px-3 overflow-y-scroll mt-4 ${
        top ? "ml-5 h-[78vh]" : "flex-auto h-[85vh]"
    }`;

    return (
        <div
            className={`${top ? "flex flex-col items-center mb-16" : "flex-auto mt-16"} ${
                top && query ? "hidden md:flex" : ""
            }`}>
            {top && <p className="pt-5 font-medium text-lg">Our recommendations</p>}
            <div className={regular}>
                {movies.map((mov, index) => (
                    <MovieItem className={top ? "h-24 w-16" : ""} movie={mov} key={index} />
                ))}
            </div>
        </div>
    );
}

export default MoviesShow;
