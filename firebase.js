import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAizTRnKU_2BeY9YebF449w6JHl4EDppW8",
    authDomain: "campusconnect-24a15.firebaseapp.com",
    projectId: "campusconnect-24a15",
    storageBucket: "campusconnect-24a15.firebasestorage.app",
    messagingSenderId: "101928464919",
    appId: "1:101928464919:web:a1af77bf710f6fece5e252"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };