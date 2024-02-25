import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../omdbApi";
import { TiStarFullOutline } from "react-icons/ti";
import Loader from "../components/Loader";
import { LiaImdb } from "react-icons/lia";
import { RxLapTimer } from "react-icons/rx";
import { MdOutlineLanguage } from "react-icons/md";
import { RiPencilLine } from "react-icons/ri";
import Header from "../components/Header";
import { FaTheaterMasks } from "react-icons/fa";
import { IoMdTrophy } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import Empty from "../components/Empty";

function Show() {
    const { id } = useParams("id");

    const { data, error, isLoading } = useQuery({
        queryKey: [`${id}`],
        queryFn: () => getMovieDetails(id),
    });
    if (isLoading) return <Loader className="h-[90vh]" />;
    function HandleIMDB() {
        window.open(`https://www.imdb.com/title/${id}/`, "_self");
    }
    if (data.Response === "False") return <Empty height="h-[95vh]" source="Element with this id" />;

    return (
        <div className="grid h-screen">
            <Header headerType="white" className="bg-white" />
            <div className="flex flex-col lg:flex-row row-span-1 md:h-[90vh]  items-center py-5 md:py-30 px-0 md:px-10 md:gap-10 gap-3 overflow-x-hidden bg-stone-100 mt-16 md:mt-0 w-[100vw]">
                {" "}
                <div>
                    {" "}
                    <img className=" w-72 sm:w-96 " src={data.Poster} alt={data.Title} />{" "}
                </div>{" "}
                <div className="px-0 md:px-8  flex flex-col gap-1 md:gap-8 lg:w-9/12 w-9/12 md:w-8/12">
                    {" "}
                    <h4 className="xl:text-5xl text-xl md:text-4xl md:w-[50vw] sm:w-[50vw] lg:w-[67vw] text-center md:text-left w-[75vw]">{`${data.Title} (${data.Year})`}</h4>
                    <div className="flex flex-col sm:flex-row items-start gap-5 md:gap-5 lg:gap-24  px-0 md:px-5 justify">
                        <div className="flex flex-col gap-1 md:gap-2">
                            <p className="flex  items-center gap-1 lg:w-72 w-36 md:w-56">
                                <LiaImdb className="text-[#E1B000] text-3xl" />

                                {data.imdbRating}
                                <TiStarFullOutline className="text-yellow-500" />
                                <span className="hidden sm:inline text-sm">{`(${data.imdbVotes} votes)`}</span>
                            </p>
                            <p>{data.Genre}</p>
                            <span className=" text-xs">
                                <span className="hidden sm:inline">Premiered on </span>
                                <span>{data.Released}</span>
                            </span>{" "}
                            <p className="flex flex-col gap-1 text-sm">
                                <span>{`${
                                    data.Type === "series" ? data.totalSeasons + " Seasons" : ""
                                }`}</span>
                                <span className="flex items-center gap-1">
                                    <span>
                                        <span className="hidden sm:inline">{`${
                                            data.Type == "movie" ? "Runtime :" : "Avg Runtime :"
                                        }`}</span>

                                        <span>${data.Runtime}</span>
                                    </span>
                                    <RxLapTimer />
                                </span>
                            </p>{" "}
                            <span>
                                {" "}
                                <p className="flex items-center gap-1">
                                    <IoLocationSharp className="text-md sm:text-xl text-green-600" />
                                    <span> {data.Country}</span>
                                </p>
                                <p className="flex items-center gap-1">
                                    <MdOutlineLanguage className="text-blue-700 text-md sm:text-xl" />
                                    <span>{data.Language}</span>
                                </p>
                            </span>
                        </div>{" "}
                        <div className="flex flex-col gap-1">
                            {data.Director !== "N/A" && (
                                <p>
                                    <span>Director :</span>
                                    <span> {data.Director}</span>
                                </p>
                            )}
                            {data.Writer !== "N/A" && (
                                <p>
                                    <span className="flex items-center gap-1">
                                        <span>Writers</span>
                                        <RiPencilLine className="text-xl text-green-700" />
                                    </span>
                                    <span>{data.Writer}</span>
                                </p>
                            )}
                            <p>
                                <span className="flex items-center gap-1">
                                    <span>Actors</span>
                                    <FaTheaterMasks className="text-lg text-orange-800" />
                                </span>
                                <span>{data.Actors}</span>
                            </p>
                            <p>
                                <span className="flex items-center gap-1">
                                    <span>Awards</span>
                                    <IoMdTrophy className="text-lg text-amber-500" />
                                </span>
                                <span>{`${
                                    !data.Awards || data.Awards == "N/A"
                                        ? "No awards yet"
                                        : data.Awards
                                }`}</span>
                            </p>
                        </div>
                    </div>
                    <div className="space-y-2 ">
                        <div>Plot :</div>
                        <p className="md:px-10 w-12/12 xl:w-11/12 md:w-12/12 bg-stone-200 py-2 px-3 sm:p-3 rounded-md">
                            <span> {data.Plot}</span>
                        </p>
                    </div>
                    <button
                        onClick={HandleIMDB}
                        className="lg:w-11/12 mb-16 sm:mb-0 mt-5 w-12/12 md:w-12/12  font-medium py-2 px-3 rounded-md bg-[#E1B000]">
                        View on IMDB
                    </button>
                </div>{" "}
            </div>{" "}
        </div>
    );
}

export default Show;
