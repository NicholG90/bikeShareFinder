import { Wrapper } from "@googlemaps/react-wrapper";

function MapResults () {
    const center = { lat: -34.397, lng: 150.644 };
    return(
        <Wrapper apiKey={"AIzaSyAH19ev_ngsYqyJefsiPU_zBEeepelnaIY"}>
            <MyMapComponent center={center} />
        </Wrapper>
    )
}

export default MapResults