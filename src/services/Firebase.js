import firebase from "firebase";

console.log(process.env.REACT_APP_API_KEY);

let firebaseConfig =
  //   process.env.NODE_ENV == "production"
  //     ? process.env.firebaseServiceAccount :
  {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "power-search-8e45f.firebaseapp.com",
    projectId: "power-search-8e45f",
    storageBucket: "power-search-8e45f.appspot.com",
    messagingSenderId: "637151128575",
    appId: "1:637151128575:web:27b379c2aab0a4e3fad5ca",
    measurementId: "G-3SZ3LHCFX2",
  };

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const auth = firebase.auth();
export default firebase;
