import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin(() => {
    const firebaseConfig = {
        apiKey: "AIzaSyCr09b8HDKa6lDWus9hbobpQANvObRaYaE",
        authDomain: "sixchains-todo.firebaseapp.com",
        projectId: "sixchains-todo",
        storageBucket: "sixchains-todo.firebasestorage.app",
        messagingSenderId: "274440145445",
        appId: "1:274440145445:web:20522476eb3e29944d4dcc"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    return {
        provide: {
            firebaseApp: app,
            db
        }
    }
})