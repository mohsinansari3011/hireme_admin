import * as firebase from 'firebase';



var config = {
    apiKey: "AIzaSyAZNORQAH7vJisy0Jk-RMWbsL-oZ7wRzmY",
    authDomain: "hireme-3011.firebaseapp.com",
    databaseURL: "https://hireme-3011.firebaseio.com",
    projectId: "hireme-3011",
    storageBucket: "",
    messagingSenderId: "954926979787"
};
firebase.initializeApp(config);


const firedb = firebase.database();


export {
    firebase, firedb
}