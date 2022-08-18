import { NavLink, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import Home from './Home';
import SavedStations from './SavedStations';
import Search from './Search';
import MapPage from "./MapPage"
import Login from "./Login"
import { logout } from "./firebase";
import { AuthContext } from "./Auth";
import { ReactComponent as CloseMenu } from "./assets/closeButton.svg";
import { ReactComponent as OpenMenu } from "./assets/burgerBars.svg";

function Navigation() {
    const { currentUser } = useContext(AuthContext);
    const [headerName, setHeaderName] = useState('');
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    let location = useLocation()
    useEffect(() => {
        switch (location.pathname) {
            case "/":
                setHeaderName("Bike Share Finder")
                break
            case "/search":
                setHeaderName("Search")
                break
            case "/map":
                setHeaderName("Map Stations")
                break
            case "/saved":
                setHeaderName("Saved Stations")
                break
            case "/login":
                setHeaderName("Login")
                break
            default: setHeaderName('')
        }
    }, [location])


    return (
        <div>
            <nav className='headerNav '>
                <div className='headerSection'>
                    <h1 className='pageTitle wrapper'>{headerName}</h1>
                    <div onClick={handleClick}>
                        {click ? (
                            <CloseMenu className='burgerButton'><p className='sr-only'>Close</p></CloseMenu>
                        ) : (
                            <OpenMenu className='burgerButton'><p className='sr-only'>Open</p></OpenMenu>
                        )}
                    </div>
                </div>
                <div className='wrapper'>
                    <ul className={click ? 'sideNavActive' : 'sideNav'}>
                        <li>
                            <NavLink to="/" onClick={closeMobileMenu} className={(navData) => (navData.isActive ? 'active' : undefined)}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/search" onClick={closeMobileMenu} className={(navData) => (navData.isActive ? 'active' : undefined)}>Search</NavLink>
                        </li>
                        <li>
                            <NavLink to="/map" onClick={closeMobileMenu} className={(navData) => (navData.isActive ? 'active' : undefined)}>Map</NavLink>
                        </li>
                        {currentUser ? <li>
                            <NavLink to="/saved" onClick={closeMobileMenu} className={(navData) => (navData.isActive ? 'active' : undefined)}>Saved Stations</NavLink>
                        </li> : null}
                        <li >
                            {currentUser ?
                                <button onClick={logout} className>Sign Out</button> :
                                <NavLink to="/login" onClick={closeMobileMenu}>Login</NavLink>}
                        </li>
                        <li >
                            <p className='junoCredit'>Made with ❤️ by <a href="https://portfolio.gourlay.me" target="_blank" rel="noopener noreferrer">Nick</a> at <a href="https://junocollege.com/" target="_blank" rel="noopener noreferrer">Juno</a></p>
                        </li>
                    </ul>
                </div>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/saved" element={<SavedStations />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    )
}

export default Navigation