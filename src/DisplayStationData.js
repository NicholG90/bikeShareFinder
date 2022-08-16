import { useState } from 'react';
import MapResult from './MapResult';
import SaveStation from "./SaveStation";

function DisplayStationData({ userStation, stationInformation }) {

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
        stationLong: userStation.longitude,
        stationName: userStation.name,
        freeBikes: userStation.free_bikes,
        emptySlots: userStation.empty_slots,
        id: userStation.id,
        href: stationInformation.href
    }


    return (
        <div>
            <div className='stationInformation'>
                <p>{userStation.name}</p>
                {userStation.free_bikes !== null ? <p>Bikes free: {userStation.free_bikes}</p> : <p>Sorry, no information about how many Bikes are free</p>}
                {userStation.empty_slots !== null ? <p>Empty Slots: {userStation.empty_slots}</p> : <p>Sorry, no information about how many slots are empty</p>}
                <SaveStation userStation={userStation} stationInformation={stationInformation} />
                <button onClick={() => { setMapViewable(true) }}>Show On Map</button>
            </div>
            {mapViewable ?
                <div className='mapModal'>
                    <button onClick={() => { setMapViewable(false) }}>Close Map</button>
                    <MapResult geolocation={geolocation} />
                </div> : null}
        </div>

    )
}

export default DisplayStationData