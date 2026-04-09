// Import the functions you need from the SDKs you need
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnUxk-lPZSwR9ZQ4SmExdb1EII9RPnsY0",
  authDomain: "boo-store-cc6e5.firebaseapp.com",
  projectId: "boo-store-cc6e5",
  storageBucket: "boo-store-cc6e5.firebasestorage.app",
  messagingSenderId: "62616586354",
  appId: "1:62616586354:web:2380fb2de2f93e43545aeb",
  measurementId: "G-8LX66C9E27",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

//Obtener productos de Firebase

export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "productos"));

  const products = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return products;
};
