import firebase from './firebase';
import { getDatabase, ref, update } from 'firebase/database';



function SaveStation({ userStation, stationInformation }) {

    const handleClick = (e) => {
        e.preventDefault();
        const database = getDatabase(firebase);
        const dbRef = ref(database);
        update(dbRef, { [userStation.id]: {id: userStation.id, name: userStation.name, url: stationInformation.href} });

    }

    return (
        <button onClick={handleClick}>Save this Station</button>
    );
}

export default SaveStation