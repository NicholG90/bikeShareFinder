import { Link, Routes, Route } from 'react-router-dom';
import Home from './Home';
import SavedStations from './SavedStations';
import Search from './Search';
import MapPage from "./MapPage"
import TestWorldMap from './TestWorldMap';

function Navigation() {
    return (
        <div>
            <nav className='headerNav'>
                <ul className='sideNav'>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/search">Search Stations</Link>
                    </li>
                    <li>
                        <Link to="/map">Map</Link>
                    </li>
                    <li>
                        <Link to="/saved">Saved Stations</Link>
                    </li>
                    <li>
                        <Link to="/test">Test</Link>
                    </li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/saved" element={<SavedStations />} />
                <Route path="/test" element={<TestWorldMap />} />

            </Routes>
        </div>
    )
}

export default Navigation