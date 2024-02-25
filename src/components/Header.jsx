import { RiMovie2Line } from "react-icons/ri";
import { getMovies } from "../omdbApi";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

function Header({ headerType }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentSearch = searchParams.get("s") || "";
    const currentType = searchParams.get("type") || "movie";
    const currentYear = searchParams.get("y") || "";
    const thisYear = new Date().getFullYear();
    const [search, setSearch] = useState(currentSearch);
    const [type, setType] = useState(currentType);
    const [year, setYear] = useState(currentYear);
    const {
        isLoading,
        error,
        data: movies,
    } = useQuery({
        queryKey: ["movies"],
        queryFn: getMovies,
    });
    const navigate = useNavigate();

    function HandleSearch(e) {
        e.preventDefault();
        navigate("/");

        if (!search.length) return;
        searchParams.set("s", search);
        if (type) searchParams.set("type", type);

        if (year) searchParams.set("y", year);
        setSearchParams(searchParams);
        if (year.length < 4) searchParams.delete("y");
    }

    return (
        <div
            className={`flex w-screen fixed justify-between items-center py-3  h-16 ${
                headerType === "white" ? "bg-white" : "bg-stone-100"
            }`}>
            <div className="hidden md:flex gap-2 items-center">
                <RiMovie2Line className="text-purple-600 text-4xl ml-2" />
                <span className="font-medium">Cinema Vibe</span>
            </div>
            <div className="flex gap-2 md:pr-2 lg:pr-20  items-center ">
                <form
                    onSubmit={HandleSearch}
                    className="flex items-center gap-2 sm:w-full w-screen md:gap-5 justify-around">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        maxLength={20}
                        className="py-1 rounded-full md:mr-5 px-3 md:w-72 w-44 md:focus:w-80 focus:outline-8 outline-stone-300 text-sm md:focus:py-1.5 transition-all border-2 border-stone-300 sm:-order-1 order-2"
                        type="text"
                        placeholder="Search"
                    />
                    <button
                        className={`py-1 hidden sm:inline px-6 ${
                            headerType === "white" ? "bg-stone-100" : "bg-white"
                        } rounded-full `}>
                        Search
                    </button>
                    <button
                        className={`sm:hidden order-last p-2 ${
                            headerType === "white" ? "bg-stone-100" : "bg-white"
                        } rounded-full`}>
                        <IoSearch />
                    </button>
                    <select
                        className={`${
                            headerType === "white" ? "bg-stone-100" : "bg-white"
                        } rounded-full py-1 px-3 text-sm focus:outline-8 outline-stone-300`}
                        name="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}>
                        <option value="movie">Movies</option>
                        <option value="series">Series</option>
                    </select>
                    <input
                        className="py-1 hidden sm:inline  rounded-full mr-10 px-4 w-28 focus:outline-8 outline-stone-300 text-sm  transition-all border-2 border-stone-300"
                        type="number"
                        placeholder="year"
                        value={year}
                        onChange={(e) => {
                            setYear(() => (e.target.value > thisYear ? thisYear : e.target.value));
                        }}
                    />
                </form>
            </div>
        </div>
    );
}

export default Header;
