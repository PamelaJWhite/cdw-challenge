// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// import firebase from "firebase/app";
// import "firebase/firestore"

import { collection, getDocs } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// configure
export const firebaseConfig =  {
  apiKey: "AIzaSyCpWKvTi8m4CyyzFIYZzho3bDvH1S6Fs3o",
  authDomain: "cdwchallenge-3146c.firebaseapp.com",
  projectId: "cdwchallenge-3146c",
  storageBucket: "cdwchallenge-3146c.appspot.com",
  messagingSenderId: "915055786960",
  appId: "1:915055786960:web:4adf5a53217bb8ad6f57d5",
  measurementId: "G-SG6E01EY28"
};

//initialize Firebase
const app = initializeApp(firebaseConfig)

//export firestore to be able to access it directly
export const firestore = getFirestore(app)

const querySnapshot = await getDocs(collection(app, "users"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});
