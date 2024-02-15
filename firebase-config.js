// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4-6BS8G_dd1aRBRjtYuDc8Iy1Xxyq5ic",
  authDomain: "lt-menu-c2fff.firebaseapp.com",
  databaseURL: "https://lt-menu-c2fff-default-rtdb.firebaseio.com",
  projectId: "lt-menu-c2fff",
  storageBucket: "lt-menu-c2fff.appspot.com",
  messagingSenderId: "267592842259",
  appId: "1:267592842259:web:cf076b45c8ca9b0c9d93e6",
  measurementId: "G-N30NNFGGC2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);


export { database }