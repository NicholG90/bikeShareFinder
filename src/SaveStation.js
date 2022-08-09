import firebase from './firebase';
import { getDatabase, ref, update } from 'firebase/database';



function SaveStation({ data }) {

    const handleClick = (e) => {
        e.preventDefault();
        const database = getDatabase(firebase);
        const dbRef = ref(database);
        update(dbRef, {[data.id]: data.name});

    }

    return (
        <button onClick={handleClick}>Save this Station</button>
    );
}

export default SaveStation