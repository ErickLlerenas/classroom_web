import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyA-2PyNUmUNHlxo4MBnjt1M1FX8AP8QSbg",
  authDomain: "classroom-adriana.firebaseapp.com",
  databaseURL: "https://classroom-adriana.firebaseio.com",
  projectId: "classroom-adriana",
  storageBucket: "classroom-adriana.appspot.com",
  messagingSenderId: "882774267585",
  appId: "1:882774267585:web:05a6c90c6018359aa66640",
};


// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();

export const storage = fb.storage();
