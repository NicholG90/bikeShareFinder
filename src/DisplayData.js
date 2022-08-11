import { useState } from 'react';
import MapResult from './MapResult';
import SaveStation from "./SaveStation";

function DisplayData({ userStation, stationInformation }) {

    const [userLat, setUserLat] = useState();
    const [userLong, setUserLong] = useState();

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
            <p>{userStation.name}</p>
            <p>Bikes free: {userStation.free_bikes}</p>
            <p>Empty Slots: {userStation.empty_slots}</p>
            <SaveStation userStation={userStation} stationInformation={stationInformation} />
            {geolocation ? <MapResult geolocation={geolocation} /> : null}
        </div>

    )
}

export default DisplayData