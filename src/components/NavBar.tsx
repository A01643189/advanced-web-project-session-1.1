import React,{useState, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
import { AuthContext } from "../context/AuthContext";

export default function NavBar() {

    const favorites = useContext(FavoritesContext);
    const {logout, user} = useContext(AuthContext);
    

    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        navigate(`/search?query=${query}`);
    }

    function handleSignup(event: React.FormEvent) {
        event.preventDefault();
        navigate(`/signup`);
       }
    
    function handleLogin(event: React.FormEvent) {
        event.preventDefault();
        navigate(`/login`);
       }
    
    function handleLogout(event: React.FormEvent) {
        event.preventDefault();
        logout();
        navigate(`/`);
       }

       let authForm;

       if (user) {
        authForm = [
          <Link to="/dashboard">{user.email}</Link>,
          <p>
            ⭐: <Link to="/favorites">{favorites?.favorites.size}</Link>
          </p>,
          <form onSubmit={handleLogout} className="float-right md:float-left">
            <button type="submit" className="bg-blue-500 px-2 py-1 rounded">
              🚪 Logout
            </button>
          </form>,
        ];
      } else {
        const signInForm = (
          <form onSubmit={handleSignup}>
            <button type="submit" className="bg-blue-500 px-2 py-1 rounded">
              📝 Sign Up
            </button>
          </form>
        );
      
        const loginForm = (
          <form onSubmit={handleLogin}>
            <button type="submit" className="bg-blue-500 px-2 py-1 rounded">
              🔑 Login
            </button>
          </form>
        );
      
        authForm = [signInForm, loginForm];
      }
      

      return (
        <nav className="flex gap-4 p-4 bg-gray-800 text-white items-end">
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profile</Link>
          
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies..."
              className="px-2 py-1 rounded"
            />
            <button type="submit" className="bg-blue-500 px-2 py-1 rounded">
              🔍
            </button>
          </form>
      
          {authForm}
        </nav>
      );
      
}