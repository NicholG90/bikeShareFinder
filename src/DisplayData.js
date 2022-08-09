// import { useState } from 'react';
// import MapResults from './MapResults';
import SaveStation from "./SaveStation";

function DisplayData({ userStation, stationInformation  } ) {

    // const [userLat, setUserLat] = useState();
    // const [userLong, setUserLong] = useState();

    // navigator.geolocation.getCurrentPosition(function (position) {
    //     setUserLat(position.coords.latitude)
    //     setUserLong(position.coords.longitude)
    // });
    
    // const searchURL = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyAH19ev_ngsYqyJefsiPU_zBEeepelnaIY
    // &origin=${userLat},${userLong}&destination=${data.latitude},${data.longitude}`



    return(
        <div>
            <p>{userStation.name}</p>
            <p>Bikes free: {userStation.free_bikes}</p>
            <p>Empty Slots: {userStation.empty_slots}</p>
            {/* <MapResults /> */}
            <SaveStation userStation={userStation} stationInformation={stationInformation} />
        </div>

    )
}

export default DisplayData