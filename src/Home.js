import BikeSVG from "./BikeSVG"

function Home() {
    return (
        <div className="mainContent">
            <div className="homePage">
                <div className="introDescription">
                    <p>Find a Bike Share - anywhere!</p>
                    <p>Search, Save and Map Bike Shares across the globe</p>
                    <p>Ride On!</p>
                </div>
                <BikeSVG className="bikeSVG" />
            </div>
        </div>
    )
}

export default Home