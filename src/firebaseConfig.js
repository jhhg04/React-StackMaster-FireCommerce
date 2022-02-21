import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDc69G3n2gjHYsI3Is7hPrVqyt2fx1Zuak',
  authDomain: 'firecommerce-f169b.firebaseapp.com',
  projectId: 'firecommerce-f169b',
  storageBucket: 'firecommerce-f169b.appspot.com',
  messagingSenderId: '654979575213',
  appId: '1:654979575213:web:198b3752afd21b9c610524',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);

export default fireDB;
