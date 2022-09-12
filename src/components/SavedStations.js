import { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { getDatabase, ref, onValue } from 'firebase/database';
import firebase from '../helpers/firebase';
import DisplayStationData from "./DisplayStationData";
import axios from 'axios';
import Select from 'react-select'
import { customStyles } from '../helpers/selectStyling';
import { AuthContext } from "./Auth";


function SavedStations() {
    const [savedStations, setSavedStations] = useState([]);
    const [userStation, setUserStation] = useState();

    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        if (currentUser) {
            const database = getDatabase(firebase)
            const userID = currentUser.uid
            const userRef = ref(database, userID);
            onValue(userRef, (response) => {
                let newState = [];
                const data = response.val();
                for (let key in data) {
                    newState.push({ key: key, name: data[key].name, id: data[key].id, url: data[key].url })
                }
                setSavedStations(newState)
            })
        }
    }, [currentUser])

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

    if (currentUser === null) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className='mainContent'>
            <div className="stationAndRegionSelect">
                {savedStationsList.length !== 0 ? <label>Select a Saved Station</label> : null}
                {savedStationsList.length !== 0 ? <Select onChange={handleChange} options={savedStationsList} styles={customStyles} /> : <h2>Save Some Stations!</h2>}
                {userStation && savedStationsList.length !== 0 ? <DisplayStationData userStation={userStation} stationInformation={userStation} /> : null}
            </div>
        </div>
    );
}


export default SavedStations;