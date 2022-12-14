
import { useJsApiLoader, GoogleMap, MarkerClusterer, MarkerF, InfoWindow } from '@react-google-maps/api'
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios';
import SaveStation from "./SaveStation"
import BikeAnimatedSVG from './BikeAnimatedSVG';


function MapSearch(url) {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
    })

    const [stationGeo, setStationGeo] = useState()
    const [activeMarker, setActiveMarker] = useState(null);
    const [map, setMap] = useState(null);
    const [mapLoaded, setMapLoaded] = useState(true)

    useEffect(() => {
        setMapLoaded(false);
        axios({
            url: `https://api.citybik.es/${url.data}`,
            method: "GET",
        }).then((response) => {
            const stationData = response.data.network.stations
            const mappedData = stationData.map((station) => ({ position: { lat: station.latitude, lng: station.longitude }, id: station.id, freeBikes: station.free_bikes, emptySlots: station.empty_slots, stationName: station.name, href: url.data, key: station.id }))
            setStationGeo(mappedData);
            setMapLoaded(true)
        });
    }, [url.data]);

    useEffect(() => {
        if (map) {
            const bounds = new window.google.maps.LatLngBounds();
            stationGeo.forEach(({ position }) => bounds.extend(position));
            map.fitBounds(bounds);
        }
    }, [map, stationGeo])

    const markerClick = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    }

    const onLoad = useCallback(
        (map) => {
            setMap(map);
        }, []);

    return isLoaded && mapLoaded && stationGeo ? (
        <GoogleMap
            zoom={1}
            mapContainerStyle={{ height: '100%', width: '100%' }}
            options={{
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: true,
                fullscreenControl: true,
            }}
            onLoad={onLoad}
            onClick={() => setActiveMarker(null)}
        >
            <MarkerClusterer minimumClusterSize={5}>
                {(clusterer) =>
                    stationGeo.map(({ position, stationName, emptySlots, freeBikes, href, id }) => (
                        <>
                            <MarkerF
                                key={`marker-${position.lng}`}
                                position={position}
                                clusterer={clusterer}
                                clickable
                                onClick={() => markerClick(`marker-${position.lng}`)}
                            >
                                {activeMarker === `marker-${position.lng}` ? (<InfoWindow
                                    key={`infowindow-${position.lat}`}
                                    onCloseClick={() => setActiveMarker(null)}
                                >
                                    <div className='mapMarker'>
                                        <p className='markerTitle'>{stationName}</p>
                                        <p>Free Bikes: {freeBikes}</p>
                                        <p>Empty Slots: {emptySlots}</p>
                                        <SaveStation userStation={{ name: stationName, id: id }} stationInformation={{ href: href }} />
                                    </div>
                                </InfoWindow>) : null}
                            </MarkerF>
                        </>
                    ))
                }
            </MarkerClusterer>

        </GoogleMap>
    ) : <BikeAnimatedSVG />

}

export default MapSearch

// Some help with the InfoWindows = https://codesandbox.io/s/react-google-mapsapi-multiple-markers-infowindow-h6vlq?file=/src/Map.js

