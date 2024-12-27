import './App.css';
import './Utils/Constants.js'
import {collection, addDoc, getDocs, onSnapshot} from "firebase/firestore";

import 'bootstrap/dist/css/bootstrap.min.css';
//import bootstrap from 'bootstrap'

import {auth,myDb} from "./api/FireBaseApi";
import React, {useEffect, useState} from "react";

import Navbar from "./Utils/Navbar";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import NoPage from "./Pages/NoPage";


function App() {

    const [totalItems,setTotalItems]= useState(null)

    // const postData= async ( object)=>{
    //     try {
    //         const docRef = await
    //             addDoc(myDb,object/* {} json format*/ );
    //         console.log("Document written with ID: ", docRef.id);
    //     } catch (e) {
    //         console.error("Error adding document: ", e);
    //     }
    // }
    //
    // const getData =async ()=>{
    //     const querySnapshot = await getDocs(myDb);
    //
    //     querySnapshot.forEach((doc) => {
    //        // console.log(`${doc.id} => ${doc.data()}`);
    //     });
    // }
    //
    //
    // const fetchData = async () => {
    //     try {
    //         const querySnapshot = await getDocs(collection(db, "/buy_list"));
    //         querySnapshot.forEach((doc) => {
    //             console.log(`${doc.id} =>`, doc.data());
    //         });
    //     } catch (error) {
    //         console.error("Error fetching data: ", error);
    //     }
    // };
    //
    // useEffect(() => {
    //   //  fetchData();
    // }, []);



// Listen for real-time updates to the collection
    onSnapshot(myDb, (snapshot) => {
        setTotalItems( snapshot.docs.length)
        console.log('Cart items total:',  snapshot.docs.length)

        // snapshot.docChanges().forEach((change) => {
        //     if (change.type === 'added') {
        //         console.log('New document:', change.doc.data());
        //     }
        //     if (change.type === 'modified') {
        //         console.log('Modified document:', change.doc.data());
        //     }
        //     if (change.type === 'removed') {
        //         console.log('Removed document:', change.doc.id);
        //     }
        // });
    });


  return (

    <div className="App">

        <Navbar totalItems={totalItems} />
            <Routes>
                <Route path="/" element={<Navigate to="/shop"/>}/>
                 <Route path="/shop" element={<Shop />} />
                 <Route path="/cart" element={<Cart />} />
                 <Route path="*" element={<NoPage />} />
            </Routes>


    </div>
  );
}

export default App;
