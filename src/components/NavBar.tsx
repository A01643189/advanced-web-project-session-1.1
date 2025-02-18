import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {

    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        navigate(`/search?query=${query}`);
    }

    return (
        <nav className="flex gap-4 p-4 bg-gray-800 text-white">
        <Link to="/"> Home </Link>
        <Link to="/search"> Search </Link>
        <Link to="/dashboard"> Dashboard </Link>
        <Link to="/profile"> Profile </Link>
        <form onSubmit={handleSearch} className="flex gap-4 bg-gray-800 text-white"> 
            <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Search movies..." 
                className="px-2 py-1 rounded"
            />
            <button 
                type="submit" 
                className="bg-blue-500 px-2 py-1 rounded">
                    Search
            </button>
        </form>
        </nav>
    )
}