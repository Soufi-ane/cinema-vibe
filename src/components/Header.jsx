import { RiMovie2Line } from "react-icons/ri";
import { getMovies } from "../omdbApi";
import { useContext, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { darkModeContext } from "../Context/darkModeContext";

import { MdDarkMode, MdLightMode } from "react-icons/md";

function Header() {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentSearch = searchParams.get("s") || "";
    const currentType = searchParams.get("type") || "movie";
    const currentYear = searchParams.get("y") || "";
    const thisYear = new Date().getFullYear();
    const [search, setSearch] = useState(currentSearch);
    const [type, setType] = useState(currentType);
    const [year, setYear] = useState(currentYear);
    const { id } = useParams();
    const headerType = id ? "show" : "home";
    useEffect(() => {
        window.addEventListener("keydown", (e) => {
            if (event.key === "Enter" || event.keyCode === 13 || event.keyCode === 3) {
                searchRef.current.blur();
            }
        });
    }, []);

    const { mainColor, secondColor, textColor, isDark, setIsDark } = useContext(darkModeContext);
    const {
        isLoading,
        error,
        data: movies,
    } = useQuery({
        queryKey: ["movies"],
        queryFn: getMovies,
    });
    const navigate = useNavigate();
    const searchRef = useRef();
    function HandleSearch(e) {
        e.preventDefault();
        navigate("/cinema-vibe/");

        if (!search.length) return;
        searchParams.set("s", search);
        if (type) searchParams.set("type", type);

        if (year) searchParams.set("y", year);
        setSearchParams(searchParams);
        if (year.length < 4) searchParams.delete("y");
    }

    return (
        <div
            className={`flex w-screen   fixed justify-between items-center py-3 z-20  h-16 ${
                headerType === "show" ? `${mainColor} lg:bg-inherit` : `${mainColor}`
            }`}>
            <div className="hidden lg:flex gap-2 items-center">
                <p className="text-purple-600 text-4xl ml-2">🍿</p>
                <span
                    style={{
                        fontFamily: "Roboto Mono",
                    }}
                    className={`${textColor} w-36 text-xl font-medium`}>
                    Cinema Vibe
                </span>
            </div>
            <div className="flex gap-2 md:pr-2 lg:pr-20  items-center ">
                <form
                    onSubmit={HandleSearch}
                    className="flex items-center px-[10vw] gap-2 sm:w-full w-screen md:gap-3 justify-around">
                    <input
                        value={search}
                        ref={searchRef}
                        onChange={(e) => setSearch(e.target.value)}
                        maxLength={20}
                        className={`py-1 rounded-full md:mr-5 px-3 md:w-64 w-[50vw] sm:w-[35vw] md:focus:w-80 focus:outline-8 outline-stone-300 text-sm md:focus:py-1.5 transition-all border-2 border-stone-300 sm:-order-1 order-2 ${secondColor} ${textColor}`}
                        type="text"
                        placeholder="Search"
                    />
                    <button
                        className={`py-1 hidden sm:inline ${textColor} ${secondColor} px-6 rounded-full `}>
                        Search
                    </button>
                    <button
                        className={`sm:hidden order-last p-2 ${
                            headerType === "show" ? "bg-stone-100" : "bg-white"
                        } rounded-full`}>
                        <IoSearch />
                    </button>
                    <select
                        className={`rounded-full py-1 px-3 text-sm focus:outline-8 outline-stone-300 sm:order-first ${textColor} ${secondColor}  lg:order-1`}
                        name="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}>
                        <option value="movie">Movies</option>
                        <option value="series">Series</option>
                    </select>
                    <input
                        className={`py-1 hidden sm:inline  rounded-full px-4 w-28 focus:outline-8 outline-stone-300 text-sm  transition-all border-2 border-stone-300 ${textColor} ${secondColor} lg:order-last`}
                        type="number"
                        placeholder="year"
                        value={year}
                        onChange={(e) => {
                            setYear(() => (e.target.value > thisYear ? thisYear : e.target.value));
                        }}
                    />

                    <button
                        onClick={() => setIsDark((curr) => !curr)}
                        className={`hidden md:inline lg:order-last rounded-full text-sm p-2 ${secondColor} `}
                        type="reset">
                        {!isDark ? (
                            <MdDarkMode className="text-lg" />
                        ) : (
                            <MdLightMode className="text-yellow-600 text-lg" />
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Header;
