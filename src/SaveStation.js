import firebase from './firebase';
import { getDatabase, ref, update, onValue } from 'firebase/database';
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



    return (
        <div>
            {savedExists ? <div>Saved</div> : <button onClick={handleClick}>Save this Station</button>}
        </div>
    );
}

export default SaveStation