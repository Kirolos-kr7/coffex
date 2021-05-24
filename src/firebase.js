import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
// import "firebase/auth";

var firebaseConfig = {
  apiKey: 'AIzaSyASltuUehlnYlElwV74nIjDdk-ZR3G80e8',
  authDomain: 'coffex0.firebaseapp.com',
  projectId: 'coffex0',
  storageBucket: 'coffex0.appspot.com',
  messagingSenderId: '421056789047',
  appId: '1:421056789047:web:8b2ecb9e3f6e9c6fc4ddb2',
}

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
export const storage = firebase.storage()
