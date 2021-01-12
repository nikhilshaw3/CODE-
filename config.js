import firebase from 'firebase';
require('@firebase/firestore')

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAC6Lw--cCElFuR5qUKpUlnXMyyNE81mWA",
  authDomain: "book-santa-app-1e376.firebaseapp.com",
  projectId: "book-santa-app-1e376",
  storageBucket: "book-santa-app-1e376.appspot.com",
  messagingSenderId: "1097560768530",
  appId: "1:1097560768530:web:182de0b5cce1231fd5d8cb",
  measurementId: "G-HJGYLW9LQC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
