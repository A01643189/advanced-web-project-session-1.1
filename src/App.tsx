/* eslint-disable react-refresh/only-export-components */
import { Routes, Route,} from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import NavBar from './components/NavBar';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';

export default () => {
    return (
        <>
            <NavBar />
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                    <Route path="/favorites" element={<Favorites />} />
                </Routes>
            </div>
        </>
    );
}
