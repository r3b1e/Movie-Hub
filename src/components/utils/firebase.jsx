// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAnalytics} from 'firebase/analytics';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIqDNgptbzf2t6yroM_nxmjDZyGNhbsnM",
  authDomain: "movie-hub-eb4e4.firebaseapp.com",
  projectId: "movie-hub-eb4e4",
  storageBucket: "movie-hub-eb4e4.firebasestorage.app",
  messagingSenderId: "606535444245",
  appId: "1:606535444245:web:2be182ca4ef3c8bb54eb1c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



export const auth = getAuth();
