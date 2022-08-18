import firebase from "firebase/compat/app"
import "firebase/compat/auth"

const firebaseconfig = {
    apiKey: "AIzaSyAo6IxBpXIBgxJronNaxJo-_ncLtb27QlQ",
    authDomain: "mygitapp-5d2d7.firebaseapp.com",
    projectId: "mygitapp-5d2d7",
    storageBucket: "mygitapp-5d2d7.appspot.com",
    messagingSenderId: "1085346484635",
    appId: "1:1085346484635:web:1bdb8e032d6c1bf800513e",
    measurementId: "G-JCGJ8WW8MY"
  };
const fire = firebase.initializeApp(firebaseconfig)
export default fire