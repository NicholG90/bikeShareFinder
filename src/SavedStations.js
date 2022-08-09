import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import firebase from './firebase';
import DisplayData from "./DisplayData";
import axios from 'axios';


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

    const handleClick = (key, url, name) => {
        // e.preventDefault();
        clickedStation(key, url)

    }

    const clickedStation = (key, url) => {
        axios({
            url: `https://api.citybik.es/${url}`,
            method: "GET",
        }).then((response) => {
            stationSelect(response.data.network.stations, key);
        });
    }
    const stationSelect = (stations, id) => {
        const stationID = id
        setUserStation(stations.find(selectedStation => selectedStation.id === stationID));
    }

    const handleRemove = (stationId) => {
        const database = getDatabase(firebase)
        const dbRef = ref(database, `/${stationId}`)
        remove(dbRef)
    }

    return (
        <div>
            <h2>Saved Stations</h2>
            <ul>
                {savedStations.map((station) => {
                    return (
                        <li key={station.key}>
                            <button onClick={() => handleClick(station.key, station.url, station.name)}>{station.name}</button>
                            <button onClick={() => handleRemove(station.key)}>Remove</button>
                        </li>
                    )
                })}
            </ul>
            {userStation ? <DisplayData userStation={userStation} /> : null}
        </div>
    );
}


export default SavedStations;