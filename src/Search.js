import { useEffect, useState } from 'react';
import axios from 'axios';
import RegionSelect from "./RegionSelect";
import StationSelect from "./StationSelect";
import DisplayData from "./DisplayData";

function Search() {

    const [regions, setRegions] = useState();
    const [userRegion, setUserRegion] = useState();
    const [stationInformation, setStationInformation] = useState();
    const [userStation, setUserStation] = useState();

    useEffect(() => {
        axios({
            url: "https://api.citybik.es/v2/networks/",
            method: "GET",
        }).then((response) => {
            setRegions(response.data.networks);
        });
    }, []);



    const regionSelect = (selected) => {
        const regionID = selected
        const regionsCopy = [...regions]
        const userSelectedRegion = regionsCopy.find(selectedRegion => selectedRegion.id === regionID);
        setUserRegion(userSelectedRegion)
        setUserStation(null)
    }



    useEffect(() => {
        if (userRegion)
            axios({
                url: `https://api.citybik.es/${userRegion.href}`,
                method: "GET",
            }).then((response) => {
                setStationInformation(response.data.network);
            });
    }, [userRegion]);

    const stationSelect = (selected) => {
        const stationID = selected
        setUserStation(stationInformation.stations.find(selectedStation => selectedStation.id === stationID));
    }




    return (
        <div className='mainContent'>
            {regions ? <RegionSelect data={regions} regionSelect={regionSelect} /> : <h2>Loading</h2>}
            {stationInformation ? <StationSelect data={stationInformation} stationSelect={stationSelect} /> : null}
            {userStation ? <DisplayData userStation={userStation} stationInformation={stationInformation} /> : null}
        </div>
    );
}

export default Search;
