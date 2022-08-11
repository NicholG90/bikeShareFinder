import { Link, Routes, Route } from 'react-router-dom';
import Home from './Home';
import SavedStations from './SavedStations';
import Search from './Search';
import DisplayMap from "./DisplayMap"

function Navigation() {
    return (
        <div className='wrapper'>
            <nav className='headerNav'>
                <ul className='headerNavList'>
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
                <Route path="/map" element={<DisplayMap />} />
                <Route path="/saved" element={<SavedStations />} />
            </Routes>
        </div>
    )
}

export default Navigation