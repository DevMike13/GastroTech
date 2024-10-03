// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database'; // This is for Realtime Database, remove if not used

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6LId_hNbon7bDNxZ1GRO9O5yrdQkns0g",
  authDomain: "gastrotech-6776f.firebaseapp.com",
  databaseURL: "https://gastrotech-6776f-default-rtdb.firebaseio.com",
  projectId: "gastrotech-6776f",
  storageBucket: "gastrotech-6776f.appspot.com",
  messagingSenderId: "378821618111",
  appId: "1:378821618111:web:74fb4928c9485ced44590a"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // Use the existing app
}

// Export Firebase services
const auth = firebase.auth();
const firestore = firebase.firestore();
// const database = firebase.database(); // Uncomment if using Realtime Database

export { auth, firestore }; // Export auth and firestore for use in your app
