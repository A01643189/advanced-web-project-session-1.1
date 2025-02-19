import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Movie } from "./Home";
import { FavoritesContext } from "../context/FavoritesContext";

const TMDb_API_KEY = "9009a9c14a2a609e5050427ed142b099";
const TMDb_API_URL = `https://api.themoviedb.org/3/movie`;

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState<Movie>();

    const { setFavorite,favorites } = useContext(FavoritesContext);

    console.log("Movie ID from useParams:", id); // Debugging

    useEffect(() => {
        if (id) {
            axios.get(`${TMDb_API_URL}/${id}?api_key=${TMDb_API_KEY}`)
                .then((response) => {
                    console.log("API Response:", response.data); // Debugging
                    setMovie(response.data);
                })
                .catch((error) => console.error("Error fetching movie details:", error));
        }
    }, [id]);

    if (!movie) return <p>Loading...</p>;

    let favButtonLabel = '';

    if (!favorites.has(movie.id)) {
        favButtonLabel = 'Add to Favorites';
    } else {
        favButtonLabel = 'Remove from Favorites';
    }

    return (
        <div className="p-4 bg-gray-900 text-white rounded-lg">
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full rounded"
            />
            <h1 className="text-lg font-bold mt-2">{movie.title}</h1>
            <p>{movie.overview}</p>
            <p>⭐ {movie.vote_average}</p>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                onClick={() => setFavorite(movie)}
            >
                {favButtonLabel}
            </button>
        </div>
    );
}
