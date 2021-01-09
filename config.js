import firebase from 'firebase';
require('@firebase/firestore')





var firebaseConfig = {
    apiKey: "AIzaSyBzv2k9ufE5Xop8vea_uvrWK1sZvpDkZD4",
    authDomain: "youbeauty-f1b56.firebaseapp.com",
    databaseURL: "https://youbeauty-f1b56.firebaseio.com",
    projectId: "youbeauty-f1b56",
    storageBucket: "youbeauty-f1b56.appspot.com",
    messagingSenderId: "164789526260",
    appId: "1:164789526260:web:32741d822dc07495fd48a1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore();