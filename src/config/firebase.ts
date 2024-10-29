import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDDnc9WHXf4CWwXCVggeiarYGu_xBgibJY",
  authDomain: "eviusauth.firebaseapp.com",
  databaseURL: "https://eviusauth.firebaseio.com",
  projectId: "eviusauth",
  storageBucket: "eviusauth.appspot.com",
  messagingSenderId: "400499146867",
  appId: "1:400499146867:web:5d0021573a43a1df",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
