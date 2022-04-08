import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {
  getFirestore,  
} from 'firebase/firestore'

import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  // add firebase config 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// features
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

