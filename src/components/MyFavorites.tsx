import { useContext } from "react";
import { FavoritesContext, ContextProps } from "../context/FavoritesContext";  
import { Link } from "react-router-dom";
import { Movie } from "../pages/Home";

export default function MyFavorites() {
    const context = useContext(FavoritesContext);

    if (!context) {
        return <p className="text-red-500">FavoritesContext is not available. Make sure your app is wrapped with <strong>FavoritesProvider</strong>.</p>;
    }

    const { favorites } = context as ContextProps;  

    return (
        <div className="bg-gray-800 p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">My Favorites</h2>
            {favorites.size === 0 ? (
                <p>You haven't favorited any movies yet.</p>
            ) : (
                <ul className="space-y-2">
                    {Array.from(favorites.values() as unknown as Movie[]).map((movie) => (
                        <li key={movie.id}>
                            <Link 
                                to={`/movie/${movie.id}`} 
                                className="text-blue-400 hover:underline"
                            >
                                {movie.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
