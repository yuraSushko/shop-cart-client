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
//https://fakestoreapi.in/docs

function App() {

    const [totalItems,setTotalItems]= useState(null)




    onSnapshot(myDb, (snapshot) => {
        setTotalItems( snapshot.docs.length)
        console.log('Cart items total:',  snapshot.docs.length)
    });






  return (

    <div className="App">
        <div style={{position: "fixed"}}>
          <Navbar totalItems={totalItems} />
        </div>
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
