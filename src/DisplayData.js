import { useState } from 'react';
import MapResults from './MapResults';

function DisplayData ({ data } ) {

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
            <p>{data.name}</p>
            <p>Bikes free: {data.free_bikes}</p>
            <p>Empty Slots: {data.empty_slots}</p>
            <MapResults />
        </div>

    )
}

export default DisplayData