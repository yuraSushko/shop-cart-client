import {FIRE_BASE_CONFIG} from '../Utils/Constants'

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // For authentication
import {collection, getFirestore} from "firebase/firestore"; // For Firestore database


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = FIRE_BASE_CONFIG
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
//export
const db = getFirestore(app)

const bucket = '/buy_list'
export const myDb = collection(db, bucket)



