import ExpenseItem from "./ExpenseItem";
import {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {myDb} from "../api/FireBaseApi";

export default function Cart(){
    const [shopList,setShopList]= useState(null)
    const canChangeAmount = false
    const [totalPrice,setTotalPrice]= useState(0)
    const getData =async ()=>{
        const querySnapshot = await getDocs(myDb);
        setShopList(querySnapshot.docs)
    }

    useEffect(()=>{
        getData()
        getTotalPrice()
    },[])


    const getTotalPrice= async ()=>{
        const querySnapshot = await getDocs(myDb);
        let total =0
        querySnapshot.forEach((doc) => {
            total += doc.data().amount * doc.data().price
        });
        setTotalPrice(total)
    }

    const buyItems=()=>{
        //TODO
    }


    return (
        <div className="shop container-sm cart">
            <div className="row text-center">
                {(shopList ) && (
                    shopList.map((item) => {
                        return (
                            <div key={item.id} className="col-md-12 my-12">
                                {<ExpenseItem id={item.id} name={item.data().name} img={item.data().img} price={item.data().price} canChangeAmount={canChangeAmount}/>}
                            </div>
                        )
                    })
                )}
            </div>

            <div className={"fs-3"}>
                <label> Total : {totalPrice} $&nbsp;&nbsp;  </label>
                <button className={"btn btn-secondary"} onClick={buyItems() }>Buy </button>
            </div>

        </div>
    )

}