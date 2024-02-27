import { useQuery } from "@tanstack/react-query";
import { getMovies, getTopMovies } from "../omdbApi";
import { useSearchParams } from "react-router-dom";
import MoviesShow from "./MoviesShow";
import toast from "react-hot-toast";
import { useContext } from "react";
import { darkModeContext } from "../Context/darkModeContext";

function Main() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("s");
    const type = searchParams.get("type");
    const year = searchParams.get("y");
    const { isDark, secondColor, setIsDark } = useContext(darkModeContext);
    const { data, error, isLoading } = useQuery({
        queryKey: ["movies", query, type, year],
        queryFn: () => getMovies({ query, type, year }),
    });
    if (!isLoading && !data && query) {
        toast.dismiss();
        toast.error("no movies were found!", { duration: 1000 });
    }
    const {
        data: topMovies,

        isLoading: isLoadingTopMovies,
    } = useQuery({
        queryKey: ["topMovies"],

        queryFn: () => getTopMovies(),
    });

    const withPosterMovies = data?.filter((m) => m.Poster !== "N/A");

    return (
        <div
            className={`xl:pl-20 lg:pl-9  ${
                query ? "h-screen" : `${isLoading ? "h-screen" : "h-full"}`
            }  md:h-full lg:h-screen mr-0  flex flex-col lg:flex-row 2xl:px-[5vw] 2xl:pl-[10vw] justify-between ${secondColor}`}>
            <MoviesShow top={false} movies={withPosterMovies} loading={isLoading} />
            <MoviesShow top={true} movies={topMovies} loading={isLoadingTopMovies} />
        </div>
    );
}

export default Main;
