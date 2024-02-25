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
        return (
            <Loader className={top ? "hidden  md:flex h-[78vh] " : "h-[85vh] md:pt-0 pt-[50vh] "} />
        );
    if (!movies && !query) return <Br />;
    if (!movies) return <Empty height="90vh" source={currentType} />;
    let regular = `relative px-3 overflow-y-scroll mt-4 ${
        top ? "ml-5 h-[74vh]" : "flex-auto h-[85vh]"
    }`;

    return (
        <div
            className={`${top ? "flex flex-col items-center pb-16" : "flex-auto pt-16 "} ${
                top && query ? "hidden md:flex" : ""
            }`}>
            {top && <p className="lg:mt-20 font-medium text-lg">Our recommendations</p>}
            <div className={regular}>
                {movies.map((mov, index) => (
                    <MovieItem className={top ? "h-24 w-16" : ""} movie={mov} key={index} />
                ))}
            </div>
        </div>
    );
}

export default MoviesShow;
