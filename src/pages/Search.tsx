/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"
import MovieCard from "../components/MovieCard"
import { Movie } from "./Home"

const TMDb_API_KEY = '9009a9c14a2a609e5050427ed142b099';
const TMDb_API_URL = `https://api.themoviedb.org/3/search/movie`;


export default function Search() {

    const location = useLocation();
    const [movies, setMovies] = useState<Movie[]>([]);

    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        if (query) {
            axios.get(`${TMDb_API_URL}?api_key=${TMDb_API_KEY}&query=${query}`)
                .then((response) => {
                    console.log("API Response:", response.data); // Debugging
                    setMovies(response.data.results || []);
                })
                .catch((error) => {
                    console.error("Error fetching movies:", error);
                });
        }
    }, [query]);
    

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
            {movies.map((movie) => (
                <MovieCard
                    id={movie.id}
                    title={movie.title}
                    poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    rating={movie.vote_average.toString()}/>
            ))}
        </div>
    );
}