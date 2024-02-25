import { useQuery } from "@tanstack/react-query";
import { getMovies, getTopMovies } from "../omdbApi";
import { useSearchParams } from "react-router-dom";
import MoviesShow from "./MoviesShow";
import toast from "react-hot-toast";

function Main() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("s");
    const type = searchParams.get("type");
    const year = searchParams.get("y");

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
        queryFn: () =>
            getTopMovies([
                "tt1124373",
                "tt1520211",
                "tt0816692",
                "tt0455275",
                "tt3032476",
                "tt0111161",
                "tt0306414",
                "tt0944947",
                "tt7286456",
                "tt0050083",
                "tt0110912",
                "tt2442560",
                "tt0109830",
                "tt0411008",
                "tt0099685",
                "tt0114369",
                "tt2306299",
                "tt0102926",
                "tt15398776",
            ]),
    });

    const withPosterMovies = data?.filter((m) => m.Poster !== "N/A");

    return (
        <div className="md:pl-28 mr-0  flex flex-col md:flex-row justify-between">
            <MoviesShow top={false} movies={withPosterMovies} loading={isLoading} />
            <MoviesShow top={true} movies={topMovies} loading={isLoadingTopMovies} />
        </div>
    );
}

export default Main;
