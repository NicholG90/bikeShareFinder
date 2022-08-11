
import { useJsApiLoader, GoogleMap, DirectionsRenderer } from '@react-google-maps/api'
import { useState, useEffect } from 'react'


function MapResult({ geolocation }) {

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
    })

    // eslint-disable-next-line no-unused-vars
    const [map, setMap] = useState(null)
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')

    const center = { lat: geolocation.stationLat, lng: geolocation.stationLong }


    useEffect(() => {

        if (isLoaded && geolocation.userLong) {
            calculateRoute();
        }
        async function calculateRoute() {

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

    }, [isLoaded, geolocation])


    return isLoaded ? (
        <>
            <GoogleMap
                zoom={10}
                mapContainerStyle={{ width: '500px', height: '500px' }}
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
            </GoogleMap>
            {directionsResponse && (<p>Walking Time: {duration}</p>)}
            {directionsResponse && (<p>Distance: {distance}</p>)}
        </>
    ) : <></>


}

export default MapResult

// Some assitance with Google API and Directions from https://www.youtube.com/watch?v=iP3DnhCUIsE