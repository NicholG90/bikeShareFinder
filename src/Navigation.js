import { NavLink, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './Home';
import SavedStations from './SavedStations';
import Search from './Search';
import MapPage from "./MapPage"
import TestWorldMap from './TestWorldMap';

function Navigation() {
    const [headerName, setHeaderName] = useState('');
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    let location = useLocation()
    useEffect(() => {
        switch (location.pathname) {
            case "/":
                setHeaderName("Home")
                break
            case "/search":
                setHeaderName("Search Stations")
                break
            case "/map":
                setHeaderName("Map Stations")
                break
            case "/saved":
                setHeaderName("Saved Stations")
                break
            default: setHeaderName('')
        }
    }, [location])


    return (
        <div>
            <nav className='headerNav'>
                <div className='headerSection'>
                    <h1 className='pageTitle wrapper'>{headerName}</h1>
                    <button className='burgerButton' onClick={handleClick}>{click ? 'Close' : 'Open'}</button>
                </div>
                <ul className={click ? 'sideNavActive' : 'sideNav'}>
                    <li>
                        <NavLink to="/" onClick={closeMobileMenu} className={(navData) => (navData.isActive ? 'active' : undefined)}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/search" onClick={closeMobileMenu} className={(navData) => (navData.isActive ? 'active' : undefined)}>Search Stations</NavLink>
                    </li>
                    <li>
                        <NavLink to="/map" onClick={closeMobileMenu} className={(navData) => (navData.isActive ? 'active' : undefined)}>Map</NavLink>
                    </li>
                    <li>
                        <NavLink to="/saved" onClick={closeMobileMenu} className={(navData) => (navData.isActive ? 'active' : undefined)}>Saved Stations</NavLink>
                    </li>
                    <li>
                        <NavLink to="/test" onClick={closeMobileMenu} className={(navData) => (navData.isActive ? 'active' : undefined)}>Test</NavLink>
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