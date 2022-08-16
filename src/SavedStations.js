import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from 'firebase/database';
import firebase from './firebase';
import DisplayStationData from "./DisplayStationData";
import axios from 'axios';
import Select from 'react-select'
import { customStyles } from './selectStyling';




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
                <label>Select a Saved Station</label>
                <Select onChange={handleChange} options={savedStationsList} styles={customStyles} />
                {userStation ? <DisplayStationData userStation={userStation} stationInformation={userStation} /> : null}
            </div>
        </div>
    );
}


export default SavedStations;