import { useSearchParams } from "react-router-dom";
import Empty from "./Empty";

import MovieItem from "./MovieItem";
import Br from "./Br";

import Loader from "./Loader";
import { useContext } from "react";
import { darkModeContext } from "../Context/darkModeContext";

function MoviesShow({ movies, loading, top }) {
    const [searchParams] = useSearchParams();
    const currentType = searchParams.get("type") || "movies";
    const query = searchParams.get("s");
    const { textColor } = useContext(darkModeContext);

    if (loading)
        return (
            <Loader className={top ? "hidden  md:flex h-[78vh] " : "h-[85vh] md:pt-0 pt-[50vh] "} />
        );
    if (!movies && !query)
        return (
            <div className={` ${textColor} h-full  py-16`}>
                <div className="h-36 mb-10">
                    <h3 className="pt-10 px-6 pb-3 md:text-4xl text-3xl lg:text-4xl xl:text-5xl font-medium text-center">
                        Welcome to Cinema Vibe 🍿
                    </h3>
                    <p
                        style={{
                            fontFamily: "Roboto Mono",
                        }}
                        className="font-medium px-5 text-center">
                        All you need about movies and series in one place
                    </p>
                </div>
                <Br />
            </div>
        );
    if (!movies) return <Empty height="90vh" source={currentType} />;
    let regular = `relative px-3 overflow-y-scroll mt-4 ${
        top ? "ml-5 h-[80vh]" : "flex-auto h-[85vh]"
    }`;

    return (
        <div
            className={`${top ? "flex flex-col items-center pb-16" : "flex-auto pt-16 "} ${
                top && query ? "mt-60 lg:mt-0 hidden md:flex" : ""
            }`}>
            {top && (
                <p className={`lg:mt-20 ${textColor} font-medium text-lg`}>Our recommendations</p>
            )}
            <div className={regular}>
                {movies.map((mov, index) => (
                    <MovieItem className={top ? "h-24 w-16" : ""} movie={mov} key={index} />
                ))}
            </div>
        </div>
    );
}

export default MoviesShow;
