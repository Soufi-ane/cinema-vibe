import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../omdbApi";
import Show from "../pages/Show";

import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { darkModeContext } from "../Context/darkModeContext";

function Br() {
    const navigate = useNavigate();
    const { mainColor, secondColor, textColor } = useContext(darkModeContext);
    const { data, error, isLoading } = useQuery({
        queryKey: ["breakingBad"],
        queryFn: () => getMovieDetails("tt0903747"),
    });

    function HandleDetails() {
        navigate("/cinema-vibe/tt0903747");
    }
    if (isLoading) return null;
    return (
        <div
            className={`flex flex-col mx-auto lg:flex-row items-center lg:w-[60vw] w-[90vw]  ${mainColor} ${textColor} rounded-md px-5 lg:px-10  h-full py-16 gap-5`}>
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
                    className="cursor-pointer text-2xl text-center  sm:text-3xl">{`${data.Title} (Also known as the GOAT 🐐)`}</p>
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
                <p className={` ${secondColor} p-3 rounded-md`}>
                    <span>{data.Plot}</span>
                </p>
            </div>
        </div>
    );
}

export default Br;
