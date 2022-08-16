
import { useJsApiLoader, GoogleMap, MarkerClusterer, Marker, InfoWindow } from '@react-google-maps/api'
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios';


function TestWorldMap() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
    })

    const [regions, setRegions] = useState()
    const [activeMarker, setActiveMarker] = useState(null);
    const [regionSelected, setRegionSelected] = useState(false)
    const [url, setUrl] = useState()
    const [map, setMap] = useState(null);



    useEffect(() => {
        if (regionSelected === false) {
            worldWide()
        }
        else {
            local()
        }
        function worldWide() {
            axios({
                url: "https://api.citybik.es/v2/networks/",
                method: "GET",
            }).then((response) => {
                const regionData = response.data.networks
                const mappedData = regionData.map((region) => ({ position: { lat: region.location.latitude, lng: region.location.longitude }, regionName: `${region.name}`, url: `${region.href}` }))
                setRegions(mappedData);
            });
        }
        function local() {
            axios({
                url: `https://api.citybik.es/${url}`,
                method: "GET",
            }).then((response) => {
                const regionData = response.data.network.stations
                const mappedData = regionData.map((region) => ({ position: { lat: region.latitude, lng: region.longitude }, regionName: `${region.name}`, }))
                setRegions(mappedData);
            });
        }
    }, [regionSelected, url]);

    const markerClick = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    }

    // const handleOnLoad = (map) => {
    //     const bounds = new window.google.maps.LatLngBounds();
    //     regions.forEach(({ position }) => bounds.extend(position));
    //     map.fitBounds(bounds);
    // };
    useEffect(() => {
        if (map) {
            const bounds = new window.google.maps.LatLngBounds();
            regions.forEach(({ position }) => bounds.extend(position));
            map.fitBounds(bounds);
            console.log('i was calleds')
        }
    }, [map, regions])

    const regionSelectedClick = (url) => {
        setRegionSelected(true)
        setUrl(url)
    }

    const onLoad = useCallback(
        (map) => {
            setMap(map);
        }, []);

    return isLoaded && regions ? (
        <div className='mainContent'>
            <div className='displayMapContainer'>
                <GoogleMap
                    zoom={2}
                    mapContainerStyle={{ width: '100%', height: '100%' }}
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
                            regions.map(({ position, regionName, url }) => (
                                <>
                                    <Marker
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
                                            <div>
                                                <p>{regionName}</p>
                                                <button onClick={() => regionSelectedClick(url)}>Select</button>
                                            </div>
                                        </InfoWindow>) : null}
                                    </Marker>

                                </>

                            ))
                        }
                    </MarkerClusterer>

                </GoogleMap>
                {regionSelected && <button onClick={() => setRegionSelected(false)} className="resetButton">Reset to Global</button>}
            </div>
        </div>
    ) : <></>

}

export default TestWorldMap

// Some help with the InfoWindows = https://codesandbox.io/s/react-google-mapsapi-multiple-markers-infowindow-h6vlq?file=/src/Map.js

