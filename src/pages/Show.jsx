import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../omdbApi";
import { TiStarFullOutline } from "react-icons/ti";
import Loader from "../components/Loader";
import { LiaImdb } from "react-icons/lia";

import { MdOutlineLanguage } from "react-icons/md";
import { RiPencilLine } from "react-icons/ri";

import { FaTheaterMasks } from "react-icons/fa";
import { IoMdTrophy } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import Empty from "../components/Empty";

import StyledP from "../components/StyledP";
import StyledDiv from "../components/StyledDiv";
import { useContext, useEffect, useState } from "react";
import { darkModeContext } from "../Context/darkModeContext";

function Show() {
    const { id } = useParams();
    const backgroundUrl = `https://images.metahub.space/background/large/${id}/img`;
    const [isLoadedBg, setIsLoadedBg] = useState(false);
    const { secondColor, textColor } = useContext(darkModeContext);
    useEffect(() => {
        const background = new Image();
        background.src = backgroundUrl;
        background.onload = () => {
            setIsLoadedBg(true);
        };
    }, [backgroundUrl]);

    const { data, error, isLoading } = useQuery({
        queryKey: [`${id}`],
        queryFn: () => getMovieDetails(id),
    });

    if (isLoading || !isLoadedBg) return <Loader className="h-[90vh]" />;
    function HandleIMDB() {
        window.open(`https://www.imdb.com/title/${id}/`, "_self");
    }
    function HandleStremio() {
        window.open(`https://web.stremio.com/#/detail/${data.Type}/${id}/`, "_self");
    }

    if (data.Response === "False") return <Empty height="h-[95vh]" source="Element with this id" />;

    return (
        <>
            <div className={`${textColor} ${secondColor} grid h-screen`}>
                <div
                    className="absolute h-full bg-fixed opacity-70 inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${backgroundUrl})`,
                    }}></div>
                <div
                    className="flex flex-col lg:flex-row row-span-1   items-center py-20 lg:py-0 md:py-30 px-0 md:px-10 md:gap-10 gap-3 overflow-x-hidden md:mt-0 w-[100vw] flex-1 z-10 bg-cover bg-transparent bg-center"
                    style={{}}>
                    {" "}
                    <div>
                        {" "}
                        <img className=" w-72 sm:w-96 " src={data.Poster} alt={data.Title} />{" "}
                    </div>{" "}
                    <div className="px-0 md:px-8  flex flex-col gap-1 md:gap-2 lg:w-9/12 w-9/12 md:w-8/12 ">
                        {" "}
                        <StyledP
                            className={`xl:text-5xl text-xl md:text-4xl text-center md:text-left `}>{`${data.Title} (${data.Year})`}</StyledP>
                        <div className="flex flex-col sm:flex-row items-start gap-5 md:gap-5 lg:gap-24  px-0 md:px-5 justify">
                            <div className="flex flex-col gap-1 md:gap-2">
                                <div className="flex  items-center gap-1 lg:w-72 w-36 md:w-56">
                                    <LiaImdb className="text-yellow-500  text-3xl" />

                                    {data.imdbRating}
                                    <TiStarFullOutline className="text-yellow-500" />
                                    <StyledP
                                        type="small"
                                        className="hidden sm:inline text-sm">{`(${data.imdbVotes} votes)`}</StyledP>
                                </div>
                                <StyledP type="small">{data.Genre}</StyledP>
                                <StyledP className=" text-xs">
                                    <span className="hidden sm:inline">Premiered on </span>
                                    <span type="small">{data.Released}</span>
                                </StyledP>{" "}
                                <div className="flex flex-col gap-1 text-sm">
                                    <StyledP type="small">{`${
                                        data.Type === "series" ? data.totalSeasons + " Seasons" : ""
                                    }`}</StyledP>
                                    <span className="flex items-center gap-1">
                                        <StyledP type="small">
                                            <span className="hidden sm:inline">{`${
                                                data.Type == "movie" ? "Runtime :" : "Avg Runtime :"
                                            }`}</span>

                                            <span>{data.Runtime}</span>
                                        </StyledP>
                                    </span>
                                </div>{" "}
                                <span className="flex flex-col gap-1">
                                    {" "}
                                    <div className="flex items-center gap-1">
                                        <IoLocationSharp className="text-md sm:text-xl text-green-600" />
                                        <StyledP type="small"> {data.Country}</StyledP>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MdOutlineLanguage className="text-blue-700 text-md sm:text-xl" />
                                        <StyledP type="small">{data.Language}</StyledP>
                                    </div>
                                </span>
                            </div>{" "}
                            <div className="flex flex-col gap-1">
                                {data.Director !== "N/A" && (
                                    <StyledP type="small" className="flex gap-1">
                                        <span type="small">Director :</span>
                                        <span> {data.Director}</span>
                                    </StyledP>
                                )}
                                {data.Writer !== "N/A" && (
                                    <div className="flex flex-col gap-1">
                                        <span className="flex items-center gap-1">
                                            <span
                                                className={` bg-opacity-40 rounded-full ${secondColor} py-1 px-2`}>
                                                Writers
                                            </span>
                                            <RiPencilLine className="text-xl text-green-700" />
                                        </span>
                                        <StyledDiv>{data.Writer}</StyledDiv>
                                    </div>
                                )}
                                <div className="flex flex-col gap-1">
                                    <span className="flex items-center gap-1">
                                        <span
                                            className={` bg-opacity-40 rounded-full  ${secondColor} py-1 px-2`}>
                                            Actors
                                        </span>
                                        <FaTheaterMasks className="text-lg text-orange-800" />
                                    </span>
                                    <StyledDiv>{data.Actors}</StyledDiv>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="flex items-center gap-1">
                                        <span
                                            className={` bg-opacity-40 rounded-full  ${secondColor} py-1 px-2`}>
                                            Awards
                                        </span>
                                        <IoMdTrophy className="text-lg text-amber-500" />
                                    </span>
                                    <StyledDiv>{`${
                                        !data.Awards || data.Awards == "N/A"
                                            ? "No awards yet"
                                            : data.Awards
                                    }`}</StyledDiv>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2 ">
                            <StyledP>Plot :</StyledP>
                            <StyledDiv className="md:px-10 w-12/12 xl:w-11/12 md:w-12/12  py-2 px-3 sm:p-3 rounded-md">
                                <span> {data.Plot}</span>
                            </StyledDiv>
                        </div>
                        <button
                            onClick={HandleIMDB}
                            className="lg:w-11/12 mb-2 sm:mb-0 mt-5 w-12/12 md:w-12/12 text-black font-medium py-2 px-3 rounded-md bg-[#E1B000]">
                            View on IMDB
                        </button>
                        <button
                            onClick={HandleStremio}
                            className="text-white lg:w-11/12 mb-10 lg:mb-1 sm:mb-0 w-12/12 md:w-12/12  font-medium py-2 px-3 rounded-md bg-[#0046F5]">
                            Watch on Stremio
                        </button>
                    </div>{" "}
                </div>{" "}
            </div>
        </>
    );
}

export default Show;
