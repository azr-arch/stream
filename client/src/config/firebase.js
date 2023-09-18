// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_-ijBCI9uHtqUicVER8NZ9u6QXupd8xo",
  authDomain: "stream-yard-2dcd6.firebaseapp.com",
  projectId: "stream-yard-2dcd6",
  storageBucket: "stream-yard-2dcd6.appspot.com",
  messagingSenderId: "953704378380",
  appId: "1:953704378380:web:db818806721b4bcf3b7e29",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// Get a Firestore instance
const db = getFirestore(firebase);

// Get an Auth instance
const auth = getAuth(firebase);

export { firebase, db, auth };
