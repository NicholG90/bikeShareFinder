import firebase from '../helpers/firebase';
import { getDatabase, ref, update, onValue, remove } from 'firebase/database';
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "./Auth"
import { Link } from 'react-router-dom';




function SaveStation({ userStation, stationInformation }) {
    const [savedStations, setSavedStations] = useState(null)
    const [savedExists, setSavedExists] = useState(false);
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
                    newState.push(key)
                }
                setSavedStations(newState)
            })
        }
    }, [savedExists, currentUser])

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
        const postData = {
            id: userStation.id,
            name: userStation.name,
            url: stationInformation.href
        };
        const updates = {};
        updates[currentUser.uid + "/" + userStation.id] = postData;
        update(dbRef, updates)

    }

    const handleRemove = (e) => {
        e.preventDefault();
        const database = getDatabase(firebase)
        const dbRef = ref(database, currentUser.uid + '/' + userStation.id)
        remove(dbRef)
        setSavedExists(false)

    }


    if (currentUser)
        return (
            <div>
                {savedExists ? <button onClick={(e) => handleRemove(e)} className='displayDataButton'>Remove</button> : <button onClick={(e) => handleClick(e)} className='displayDataButton'>Save this Station</button>}
            </div>)
    else
        return (
            <div>
                <button className='displayDataButton'>
                    <Link to="/login" >Login to Save</Link>
                </button>
            </div>
        )
}

export default SaveStation