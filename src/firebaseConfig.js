// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBb1b-h8GLOuowD_W95fT8i3q9rjA4ZQ-0",
    authDomain: "flutter-medica.firebaseapp.com",
    projectId: "flutter-medica",
    storageBucket: "flutter-medica.appspot.com",
    messagingSenderId: "990097588146",
    appId: "1:990097588146:web:3062b7227f39a2a05d2eab",
    measurementId: "G-ZZXJ407E58"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
