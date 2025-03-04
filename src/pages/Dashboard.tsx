import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import MyFavorites from "../components/MyFavorites";
import MyReviews from "../components/MyReviews";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div className="p-8 bg-gray-900 min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <p className="mb-4">Welcome, <strong>{user?.email}</strong></p>

            <div className="flex space-x-4">
                <button 
                    onClick={() => navigate('/')} 
                    className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
                >
                    Explore Movies
                </button>
                <button onClick={logout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
                    Logout
                </button>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <MyFavorites />
                <MyReviews />
            </div>
        </div>
    );
}
