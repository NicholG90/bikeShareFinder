import BikeSVG from "./BikeSVG"
import { Link } from 'react-router-dom';


function Home() {
    return (
        <div className="mainContent">
            <div className="homePage">
                <div className="introDescription">
                    <h2>Find a Bike Share - Anywhere!</h2>
                    <p><Link to="/search" className="introLinks">Search</Link>, <Link to="/login" className="introLinks">Save</Link> and <Link to="/map" className="introLinks">Map</Link> Bike Shares Across the Globe</p>
                    <p>Ride On!</p>
                </div>
                <BikeSVG className="bikeSVG" />
            </div>
        </div>
    )
}

export default Home