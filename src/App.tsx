import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';

export default () => {
    return (
        <div>
            <nav className="flex gap-4 p-4 bg-gray-800 text-white">
                <Link to="/"> Home </Link>
                <Link to="/search"> Search </Link>
                <Link to="/dashboard"> Dashboard </Link>
                <Link to="/profile"> Profile </Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/search" element={<Search/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/profile" element={<Profile/>} />
            </Routes>
        </div>
    );
}
