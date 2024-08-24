import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
    apiKey: "AIzaSyDnBiB5yKTXgVhLWqxYMjnvaFhGirs9VDY",
    authDomain: "flashcard-b0972.firebaseapp.com",
    projectId: "flashcard-b0972",
    storageBucket: "flashcard-b0972.appspot.com",
    messagingSenderId: "915462239111",
    appId: "1:915462239111:web:5b496667ccd1e78ce8d922",
    measurementId: "G-89F15Z02JG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}