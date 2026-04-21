import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";


const firebaseConfig = {
  apiKey: "AIzaSyC_jxrJMtOQmiXx4aeBxlJLfKQnzxpRxLg",
  authDomain: "amidfly-e0c69.firebaseapp.com",
  projectId: "amidfly-e0c69",
  storageBucket: "amidfly-e0c69.firebasestorage.app",
  messagingSenderId: "338188901085",
  appId: "1:338188901085:web:42c13b1c59fcfcce135934",
  measurementId: "G-1W1H4EJKZH"
};


// Initialize the Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Auth with React Native AsyncStorage so users stay logged in
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };