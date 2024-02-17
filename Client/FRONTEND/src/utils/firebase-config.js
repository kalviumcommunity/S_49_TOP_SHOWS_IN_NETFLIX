
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBBnry54VPa35RH7_HtTOyMY2HMa3hQJ78",
  authDomain: "react-netflix-5a6f0.firebaseapp.com",
  projectId: "react-netflix-5a6f0",
  storageBucket: "react-netflix-5a6f0.appspot.com",
  messagingSenderId: "835026332597",
  appId: "1:835026332597:web:56c867ddc52bcd3eca87fc",
  measurementId: "G-FDVPSTFEYG"
};


const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);