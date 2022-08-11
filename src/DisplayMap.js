
import { useJsApiLoader, GoogleMap, MarkerClusterer, Marker, InfoWindow } from '@react-google-maps/api'
import { useState, useEffect } from 'react'
import axios from 'axios';


function DisplayMap() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
    })

    const [stationGeo, setStationGeo] = useState()
    const [activeMarker, setActiveMarker] = useState(null);


    useEffect(() => {
        axios({
            url: "https://api.citybik.es//v2/networks/bixi-toronto",
            method: "GET",
        }).then((response) => {
            const stationData = response.data.network.stations
            const mappedData = stationData.map((station) => ({ position: { lat: station.latitude, lng: station.longitude }, freeBikes: `${station.free_bikes}`, emptySlots: `${station.empty_slots}`, stationName: `${station.name}`, }))
            setStationGeo(mappedData);
        });
    }, []);

    const markerClick = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    }

    const handleOnLoad = (map) => {
        const bounds = new window.google.maps.LatLngBounds();
        stationGeo.forEach(({ position }) => bounds.extend(position));
        map.fitBounds(bounds);
    };

    return isLoaded && stationGeo ? (
        <div className='displayMapContainer'>
            <GoogleMap
                zoom={10}
                mapContainerStyle={{ width: '100%', height: '100%' }}
                // center={center}
                options={{
                    zoomControl: true,
                    streetViewControl: false,
                    mapTypeControl: true,
                    fullscreenControl: true,
                }}
                onLoad={handleOnLoad}
                onClick={() => setActiveMarker(null)}
            >
                <MarkerClusterer minimumClusterSize={5}>
                    {(clusterer) =>
                        stationGeo.map(({ position, stationName, emptySlots, freeBikes }) => (
                            <>
                                <Marker
                                    // key={`marker-${position.lng}`}
                                    position={position}
                                    clusterer={clusterer}
                                    clickable
                                    onClick={() => markerClick(`marker-${position.lng}`)}
                                >
                                    {activeMarker === `marker-${position.lng}` ? (<InfoWindow
                                        key={`infowindow-${position.lat}`}
                                        onCloseClick={() => setActiveMarker(null)}
                                    >
                                        <div>
                                            <p>Station Name: {stationName}</p>
                                            <p>Free Bikes: {freeBikes}</p>
                                            <p>Empty Slots: {emptySlots}</p>
                                        </div>
                                    </InfoWindow>) : null}
                                </Marker>

                            </>

                        ))
                    }
                </MarkerClusterer>

            </GoogleMap>
        </div>
    ) : <></>

}

export default DisplayMap

// Some help with the InfoWindows = https://codesandbox.io/s/react-google-mapsapi-multiple-markers-infowindow-h6vlq?file=/src/Map.js

