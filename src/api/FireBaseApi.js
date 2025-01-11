import {FIRE_BASE_CONFIG} from '../Utils/Constants'
import { initializeApp } from "firebase/app";
import {collection, getFirestore} from "firebase/firestore"; // For Firestore database
const app = initializeApp(FIRE_BASE_CONFIG)
const db = getFirestore(app)
const bucket = '/buy_list'
export const myDb = collection(db, bucket)
