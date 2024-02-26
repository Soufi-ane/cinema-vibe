import { IoCalendarOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function MovieItem({ movie, className }) {
    const navigate = useNavigate();
    function ShowMovieDetails() {
        navigate(`${movie.imdbID}`);
    }

    return (
        <div
            onClick={ShowMovieDetails}
            className={`flex items-center gap-5 my-2  bg-stone-100 py-2 px-3  rounded-md w-[97%] cursor-pointer  `}>
            <div>
                <img
                    className={`md:w-24 md:h-36 w-16 h-24 rounded-md ${className} `}
                    src={movie.Poster}
                    alt={movie.Title}
                />
            </div>
            <div>
                <p className="md:text-xl text-lg">{movie?.Title}</p>
                <span>{movie.Type}</span>
                <div className="flex items-center gap-1">
                    <span>{movie.Year}</span>
                    <IoCalendarOutline />
                </div>
            </div>
        </div>
    );
}

export default MovieItem;
