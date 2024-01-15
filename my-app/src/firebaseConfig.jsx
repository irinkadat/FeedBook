import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAIqFi_JA6TgJ-_d_X97yKiwDZBlSK4nCs",
  authDomain: "final-39386.firebaseapp.com",
  projectId: "final-39386",
  storageBucket: "final-39386.appspot.com",
  messagingSenderId: "959151337364",
  appId: "1:959151337364:web:e6bd42c84b4c9f6e3b2981",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };
