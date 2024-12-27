
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const FIRE_BASE_CONFIG = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const API_ITEM_LIST_URL = "https://fakestoreapi.in/api/products"


const ITEM_LIST_LIMIT = 30
const CATALOG_TABLE_COLUMNS=4


export {
    FIRE_BASE_CONFIG,ITEM_LIST_LIMIT,API_ITEM_LIST_URL,CATALOG_TABLE_COLUMNS
}

