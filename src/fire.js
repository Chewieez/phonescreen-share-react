import firebase from 'firebase'
var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
    apiKey: "AIzaSyAKmOpbBAvjFXRNWeauxDCUjvG9r0xa37Y",
    authDomain: "phonescreen-share.firebaseapp.com",
    databaseURL: "https://phonescreen-share.firebaseio.com",
    projectId: "phonescreen-share",
    storageBucket: "phonescreen-share.appspot.com",
    messagingSenderId: "101826504009"
};
var fire = firebase.initializeApp(config);
export default fire;