import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"; 
const firebaseConfig = {
    apiKey: "AIzaSyArPA6YeQFiy1ve4tp0i48FPwK_Kzg2uAw",
    authDomain: "movies-4d741.firebaseapp.com",
    projectId: "movies-4d741",
    storageBucket: "movies-4d741.firebasestorage.app",
    messagingSenderId: "755417243615",
    appId: "1:755417243615:web:74a19020b0e23ecf7bee6a",
    measurementId: "G-4LYZQNDRYX"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();