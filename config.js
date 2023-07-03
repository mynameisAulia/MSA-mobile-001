import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import { getDatabase } from 'firebase/database';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC4JszcXtgSuG5l9-maGG7Q5hO8IbPktz4",
  authDomain: "msa-3-c8e3a.firebaseapp.com",
  projectId: "msa-3-c8e3a",
  storageBucket: "msa-3-c8e3a.appspot.com",
  messagingSenderId: "38907559006",
  appId: "1:38907559006:web:b88c8f04f4072ec8b908cf",
  measurementId: "G-NJLCCPFQMT"

}

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}
const storage = getStorage();

export { firebase };
const database = firebase.database();

const db = getDatabase();
export {db} 
