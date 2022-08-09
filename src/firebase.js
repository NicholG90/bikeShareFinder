
import { initializeApp } from "firebase/app";

const firebaseConfig = {

  apiKey: "AIzaSyAH19ev_ngsYqyJefsiPU_zBEeepelnaIY",
  authDomain: "bikesharefinder-73c4d.firebaseapp.com",
  databaseURL: "https://bikesharefinder-73c4d-default-rtdb.firebaseio.com",
  projectId: "bikesharefinder-73c4d",
  storageBucket: "bikesharefinder-73c4d.appspot.com",
  messagingSenderId: "329356017988",
  appId: "1:329356017988:web:19cc26ca76e6cc6fe8d711"

};

const firebase = initializeApp(firebaseConfig);

export default firebase