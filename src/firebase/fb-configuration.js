import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA-UNaoUhSmX6PU4kX1qJfDcfr7f0llypM',
  authDomain: 'pwc-tls.firebaseapp.com',
  projectId: 'pwc-tls',
  storageBucket: 'pwc-tls.appspot.com',
  messagingSenderId: '25235774640',
  appId: '1:25235774640:web:53bafad220b34db0ecef75',
  measurementId: 'G-MWPXYVPJCJ',
};
// Initialize Firebase
export const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();
export const auth = fb.auth();
export const storage = fb.storage();
