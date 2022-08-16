import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from 'firebase/database';
import firebase from './firebase';
import DisplayData from "./DisplayData";
import axios from 'axios';
import Select from 'react-select'



function SavedStations() {
    const [savedStations, setSavedStations] = useState([]);
    const [userStation, setUserStation] = useState();


    useEffect(() => {

        const database = getDatabase(firebase)

        const dbRef = ref(database)
        onValue(dbRef, (response) => {
            let newState = [];
            const data = response.val();
            for (let key in data) {
                newState.push({ key: key, name: data[key].name, id: data[key].id, url: data[key].url })
            }
            setSavedStations(newState)
        })

    }, [])

    const savedStationsList = savedStations.map((station) => ({ value: station.key, label: station.name, url: station.url }));

    const handleChange = (selected) => {
        axios({
            url: `https://api.citybik.es/${selected.url}`,
            method: "GET",
        }).then((response) => {
            const stationID = selected.value
            const stations = response.data.network.stations
            setUserStation(stations.find(selectedStation => selectedStation.id === stationID));
        });

    }

    return (
        <div className='mainContent'>
            <div className="stationAndRegionSelect">
                <h2>Saved Stations</h2>
                <Select onChange={handleChange} options={savedStationsList} className="select" />
                {userStation ? <DisplayData userStation={userStation} stationInformation={userStation} /> : null}
            </div>
        </div>
    );
}


export default SavedStations;