import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyApXdNeqJqWtKo6Mu_z7R2GUxVxDEZ-iFM",
  authDomain: "college-project-73f31.firebaseapp.com",
  projectId: "college-project-73f31",
  storageBucket: "college-project-73f31.firebasestorage.app",
  messagingSenderId: "729712196166",
  appId: "1:729712196166:web:7b64adeb034fbf50efe847",
  measurementId: "G-9N66ZNZRML",
  databaseURL:
    "https://college-project-73f31-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);

export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;
export const auth = getAuth(app);
export const db = getDatabase(app);
export default app;
