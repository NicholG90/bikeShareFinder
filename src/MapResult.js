
import { useJsApiLoader, GoogleMap, DirectionsRenderer, Marker, InfoWindow } from '@react-google-maps/api'
import { useState, useEffect } from 'react'
import SaveStation from './SaveStation'


function MapResult({ geolocation }) {

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
    })

    // eslint-disable-next-line no-unused-vars
    const [map, setMap] = useState(null)
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [activeMarker, setActiveMarker] = useState(null);


    const center = { lat: geolocation.stationLat, lng: geolocation.stationLong }

    useEffect(() => {

        if (isLoaded && geolocation.userLong) {
            calculateRoute();
        }
        async function calculateRoute() {
            try {
                const directionsService = new window.google.maps.DirectionsService()
                const results = await directionsService.route({
                    origin: `${geolocation.userLat}, ${geolocation.userLong}`,
                    destination: `${geolocation.stationLat}, ${geolocation.stationLong}`,
                    travelMode: window.google.maps.TravelMode.WALKING,
                })
                setDirectionsResponse(results)
                setDistance(results.routes[0].legs[0].distance.text)
                setDuration(results.routes[0].legs[0].duration.text)
            }
            catch (error) {
                setDistance('No Directions Available')
                setDuration('No Directions Available')
            }
        }

    }, [isLoaded, geolocation])

    const markerClick = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    }



    return isLoaded ? (
        <>
            <GoogleMap
                zoom={13}
                mapContainerStyle={{ width: '70vw', height: '70vh', margin: '0 auto' }}
                options={{
                    zoomControl: true,
                    streetViewControl: false,
                    mapTypeControl: true,
                    fullscreenControl: true,
                }}
                onLoad={map => setMap(map)}
                center={center}
            >
                {directionsResponse && (
                    <DirectionsRenderer directions={directionsResponse} />
                )}
                <Marker
                    key={`marker-${center}`}
                    position={center}
                    clickable
                    onClick={() => markerClick(`marker-${geolocation.stationLat}`)}
                >
                    {activeMarker === `marker-${geolocation.stationLat}` ? (<InfoWindow
                        key={`infowindow-${geolocation.stationLong}`}
                        onCloseClick={() => setActiveMarker(null)}
                    >
                        <div>
                            <p>{geolocation.stationName}</p>
                            <p>Free Bikes: {geolocation.freeBikes}</p>
                            <p>Empty Slots: {geolocation.emptySlots}</p>
                            <SaveStation userStation={{ name: geolocation.stationName, id: geolocation.id }} stationInformation={{ href: geolocation.href }} />
                        </div>
                    </InfoWindow>) : null}
                </Marker>
            </GoogleMap>
            <p>Walking Time: {duration}</p>
            <p>Distance: {distance}</p>
        </>
    ) : <></>


}

export default MapResult

// Some assitance with Google API and Directions from https://www.youtube.com/watch?v=iP3DnhCUIsE