import React, {useEffect, useState} from 'react';
import {collection, getDocs} from "firebase/firestore";
//import {db} from "../api/FireBaseApi";

export  default function Navbar(props)  {
    // const bucket = '/buy_list'
    // const myDb = collection(db, bucket)

    // const getTotalItems= async ()=>{
    //     const querySnapshot = await getDocs(myDb);
    //     const total =querySnapshot.length
    //     setTotalItems(total)
    // }
    // useEffect(()=>{
    //     getTotalItems()
    //     },[] )


    return (

        <nav className="navbar">
            <div className="navbar-left">
                <a href="/" className="">
                    Electronic Store
                </a>
            </div>
            <div className="">
                <a href="/shop" className="logo">
                    shop here
                </a>
            </div>
            <div className="">
                <a href="/cart" className="logo">
                    {props.totalItems} my cart
                </a>
            </div>
        </nav>

    );
};