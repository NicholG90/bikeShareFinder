import { useState } from 'react';
import MapResult from './MapResult';
import SaveStation from "./SaveStation";

function DisplayData({ userStation, stationInformation }) {

    const [userLat, setUserLat] = useState();
    const [userLong, setUserLong] = useState();
    const [mapViewable, setMapViewable] = useState(false)

    navigator.geolocation.getCurrentPosition(function (position) {
        setUserLat(position.coords.latitude)
        setUserLong(position.coords.longitude)
    });

    const geolocation = {
        userLat: userLat,
        userLong: userLong,
        stationLat: userStation.latitude,
        stationLong: userStation.longitude
    }


    return (
        <div>
            <div className='stationInformation'>
                <p>{userStation.name}</p>
                <p>Bikes free: {userStation.free_bikes}</p>
                <p>Empty Slots: {userStation.empty_slots}</p>
                <SaveStation userStation={userStation} stationInformation={stationInformation} />
                <button onClick={() => { setMapViewable(true) }}>Show On Map</button>
            </div>
            {mapViewable ?
                <div className='modal'>
                    <button onClick={() => { setMapViewable(false) }}>Close Map</button>
                    <MapResult geolocation={geolocation} />
                </div> : null}
        </div>

    )
}

export default DisplayData