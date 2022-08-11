import { Link, Routes, Route } from 'react-router-dom';
import Home from './Home';
import SavedStations from './SavedStations';
import Search from './Search';
import Map from "./Map"

function Navigation() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/search">Search</Link>
                    </li>
                    <li>
                        <Link to="/map">Map</Link>
                    </li>
                    <li>
                        <Link to="/saved">Saved</Link>
                    </li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/map" element={<Map />} />
                <Route path="/saved" element={<SavedStations />} />
            </Routes>
        </div>
    )
}

export default Navigation