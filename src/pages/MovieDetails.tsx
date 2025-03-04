/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useContext, lazy, Suspense, ReactNode } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Movie } from "./Home";
import { FavoritesContext, ContextProps } from "../context/FavoritesContext"; // Updated to import ContextProps
import { AuthContext } from "../context/AuthContext.tsx";
import ReviewForm from "../components/ReviewForm.tsx";
import { db } from "../config/firebase";
import { collection, query, where, getDocs} from "firebase/firestore";

const LazyImage = lazy(() => import("../components/LazyImage"));

const TMDb_API_KEY = "9009a9c14a2a609e5050427ed142b099";
const TMDb_API_URL = `https://api.themoviedb.org/3/movie`;

// Define the Review interface (Step 7 in the image)
interface Review {
    movieId: number;
    review: string;
    userName: string;
    userId: number;
}

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState<Movie>();

    // Explicitly type the context (Step 6 in the image)
    const { setFavorite, favorites } = useContext<ContextProps>(FavoritesContext as React.Context<ContextProps>);

    const { user } = useContext(AuthContext);

    // Explicitly type reviews as Review[] (Step 7 in the image)
    const [reviews, setReviews] = useState<Review[]>([]);

    let reviewForm;
    if (user) {
        reviewForm = <ReviewForm movieId={parseInt(id ?? "-1")} />;
    }

    useEffect(() => {
        if (id) {
            axios.get(`${TMDb_API_URL}/${id}?api_key=${TMDb_API_KEY}`)
                .then((response) => {
                    setMovie(response.data);
                })
                .catch((error) => console.error("Error fetching movie details:", error));
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            const reviewsRef = collection(db, "reviews");
            const q = query(reviewsRef, where("movieId", "==", parseInt(id ?? "-1")));

            getDocs(q).then((snapshot) => {
                // Explicitly cast the result to Review[] (Step 7 in the image)
                setReviews(snapshot.docs.map((doc) => doc.data() as Review));
            });
        }
    }, [id]);

    if (!movie) return <p>Loading...</p>;

    const favButtonLabel = favorites.has(movie.id) ? 'Remove from Favorites' : 'Add to Favorites';

    let reviewDisplay;
    if (reviews.length > 0) {
        reviewDisplay = (
            <div className="p-4">
                <h1>Reviews</h1>
                {reviews.map((r: Review, index) => (  // Explicitly type `r` as Review (Step 7)
                    <p key={index} className="text-right"> {/* Step 9 - Change `align="right"` to `className="text-right"` */}
                        <strong>{r.review}</strong><br />
                        by: {r.userName}
                    </p>
                ))}
            </div>
        );
    } else {
        reviewDisplay = <p>No reviews yet. Be the first to review!</p>;
    }

    return (
        <div className="p-4 bg-gray-900 text-white rounded-lg">
            <Suspense fallback={(<div className="spinner"></div> as ReactNode)}>
                <LazyImage
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className="w-64 rounded"
                    alt={movie.title}
                />
            </Suspense>
            <h1 className="text-lg font-bold mt-2">{movie.title}</h1>
            <p>{movie.overview}</p>
            <p>⭐ {movie.vote_average}</p>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                onClick={() => setFavorite(movie)}
            >
                {favButtonLabel}
            </button>
            {reviewForm}
            <br />
            {reviewDisplay}
            <br />
        </div>
    );
}
