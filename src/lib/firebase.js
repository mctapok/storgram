import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyDPIAGzNbsPgv7z_pZw9Rq3a1bzqEXokY4",
    authDomain: "stogram-id.firebaseapp.com",
    projectId: "stogram-id",
    storageBucket: "stogram-id.appspot.com",
    messagingSenderId: "454664454637",
    appId: "1:454664454637:web:24ba9e425ca5e65b2027e4",
    measurementId: "G-7NCYFXHQM8"
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;
const { Timestamp } = Firebase.firestore;


export { firebase, FieldValue, Timestamp };