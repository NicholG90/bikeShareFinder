
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInAnonymously, signOut } from "firebase/auth";

const firebaseConfig = {

  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  authDomain: "bikesharefinder-73c4d.firebaseapp.com",
  databaseURL: "https://bikesharefinder-73c4d-default-rtdb.firebaseio.com",
  projectId: "bikesharefinder-73c4d",
  storageBucket: "bikesharefinder-73c4d.appspot.com",
  messagingSenderId: "329356017988",
  appId: "1:329356017988:web:19cc26ca76e6cc6fe8d711"

};

const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);



const googleProvider = new GoogleAuthProvider()
export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (err) {
    if (err.code === "auth/popup-closed-by-user")
      alert('The Login Pop Up was Closed before Login was Completed.');
    if (err.code === "auth/popup-blocked")
      alert('The Login Pop Up was blocked.');
    else
      console.log(err);
  }
};


export const signInAnon = async () => {
  try {
    await signInAnonymously(auth)
  } catch (err) {
    alert(err.message);
  }
};

export const logout = () => {
  signOut(auth);
};

export default firebase



