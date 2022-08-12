import firebase from './firebase';
import { getDatabase, ref, update, onValue, remove } from 'firebase/database';
import { useState, useEffect } from "react"



function SaveStation({ userStation, stationInformation }) {
    const [savedStations, setSavedStations] = useState(null)
    const [savedExists, setSavedExists] = useState(false);

    useEffect(() => {

        const database = getDatabase(firebase)

        const dbRef = ref(database)
        onValue(dbRef, (response) => {
            let newState = [];
            const data = response.val();
            for (let key in data) {
                newState.push(key)
            }
            setSavedStations(newState)
        })

    }, [])

    useEffect(() => {
        const checkStates = () => {
            if (savedStations.includes(userStation.id)) {
                setSavedExists(true)
            }
        }

        if (savedStations === null) {
            return
        }
        checkStates()

    }, [savedStations, userStation.id])



    const handleClick = (e) => {
        e.preventDefault();
        const database = getDatabase(firebase);
        const dbRef = ref(database);
        update(dbRef, { [userStation.id]: { id: userStation.id, name: userStation.name, url: stationInformation.href } });

    }

    const handleRemove = (e) => {
        e.preventDefault();
        const database = getDatabase(firebase)
        const dbRef = ref(database, `/${userStation.id}`)
        remove(dbRef)
    }



    return (
        <div>
            {savedExists ? <button onClick={(e) => handleRemove(e)}>Remove</button> : <button onClick={(e) => handleClick(e)}>Save this Station</button>}
        </div>
    );
}

export default SaveStation