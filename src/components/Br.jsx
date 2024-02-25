import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../omdbApi";
import Show from "../pages/Show";
import Loader from "./Loader";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Br() {
    const navigate = useNavigate();
    const { data, error, isLoading } = useQuery({
        queryKey: ["breakingBad"],
        queryFn: () => getMovieDetails("tt0903747"),
    });
    if (isLoading) return <Loader />;
    function HandleDetails() {
        navigate("/cinema-vibe/tt0903747");
    }
    return (
        <div className="flex flex-col mx-auto md:flex-row items-start w-[90vw] md:w-[60rem] bg-stone-100 rounded-md py-10 md:pt-20 px-10 my-16 mt-20 h-full pb-20 md:mt-28 pt-8 md:my-10 gap-5">
            <div>
                <img
                    onClick={HandleDetails}
                    className="cursor-pointer w-96"
                    src={data.Poster}
                    alt={data.Title}
                />
            </div>
            <div className="flex flex-col gap-2">
                <p
                    onClick={HandleDetails}
                    className="cursor-pointer text-2xl text-center sm:text-right sm:text-3xl">{`${data.Title} (Also known as the GOAT 🐐)`}</p>
                <p className="flex items-center gap-1">
                    <span> {`Imdb rating : ${data.imdbRating}`}</span>
                    <FaStar className="text-orange-400 text-lg" />
                </p>
                <p>{data.Awards}</p>
                <p>
                    <span>Cooked by </span>
                    <span>{data.Writer}</span>
                </p>
                <div>Plot : </div>
                <p className="bg-stone-200 p-3 rounded-md">
                    <span>{data.Plot}</span>
                </p>
            </div>
        </div>
    );
}

export default Br;
