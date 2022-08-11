import firebase from './firebase';
import { getDatabase, ref, update, onValue } from 'firebase/database';
import { useState, useEffect } from "react"



function SaveStation({ userStation, stationInformation }) {
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
            checkStates(newState)
        })

    }, [])

    const checkStates = (newState) => {
        if (newState.includes(userStation.id)) {
            setSavedExists(true)
        }
    }

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