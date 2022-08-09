import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import firebase from './firebase';

function SavedStations() {
    const [savedStations, setSavedStations] = useState([]);

    useEffect(() => {

        const database = getDatabase(firebase)

        const dbRef = ref(database)
        onValue(dbRef, (response) => {
            let newState = [];
            const data = response.val();
            for (let key in data) {
                newState.push({ key: key, name: data[key] })
            }
            setSavedStations(newState)
        })

    }, [])

    const handleClick = (key, e) => {
        e.preventDefault();
        listingInformation(key)
        setIsClicked(true)
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
                            <button onClick={handleClick}>{station.name}</button>
                            <button onClick={() => handleRemove(station.key)}>Remove</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default SavedStations;