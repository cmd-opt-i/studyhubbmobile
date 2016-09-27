import firebase from 'firebase'
import firebaseConfig from './firebase.config.js'
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firebaseDB = firebase.database()
