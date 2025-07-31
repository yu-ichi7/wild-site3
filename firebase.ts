
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjNiaTXww4Fv36a9qsY9Y70kITa0vxmsg",
  authDomain: "wild-site3-blog.firebaseapp.com",
  projectId: "wild-site3-blog",
  storageBucket: "wild-site3-blog.appspot.com",
  messagingSenderId: "358798395978",
  appId: "1:358798395978:web:144e50791a97c08451b4b3"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
