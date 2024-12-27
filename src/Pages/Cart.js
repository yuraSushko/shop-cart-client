import ExpenseItem from "./ExpenseItem";
import {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {myDb} from "../api/FireBaseApi";

export default function Cart(){
    const [shopList,setShopList]= useState(null)
    //const bucket = '/buy_list'
    //const myDb = collection(db, bucket)
    const canChangeAmount = false
    const [totalPrice,setTotalPrice]= useState(0)

    const getData =async ()=>{
        const querySnapshot = await getDocs(myDb);
        setShopList(querySnapshot.docs)
        querySnapshot.forEach((doc) => {
       //     console.log(`${doc.id} => ${doc.data().name}`);
        });
    }

    //const [count, setCount] = useState(0);

    // useEffect(() => {
    //     //Implementing the setInterval method
    //     const interval = setInterval(() => {
    //         setCount(count + 1);
    //         getData();
    //     }, 500);
    //
    //     //Clearing the interval
    //     return () => clearInterval(interval);
    // }, [count]);


    useEffect(()=>{
        getData()
        getTotalPrice()
    },[])


    const getTotalPrice= async ()=>{
        const querySnapshot = await getDocs(myDb);
        let total =0
        querySnapshot.forEach((doc) => {
            total += doc.data().amount * doc.data().price // console.log(`${doc.id} => ${doc.data()}`);
        });
        setTotalPrice(total)
    }

    const buyItems=()=>{
        //TODO
    }


    return (
        <div className="container">
            hi from cart
            <div className="row text-center">
                {(shopList ) && (//console.log('shopList: ', shopList)
                    shopList.map((item) => { //console.log('item: ', item)
                        return (
                            <div key={item.id} className="col-md-12 my-12">
                                {/*{console.log(item,item.id, '-> ', item.data())}*/}
                                {<ExpenseItem id={item.id} name={item.data().name} img={item.data().img} price={item.data().price} canChangeAmount={canChangeAmount}/>}
                            </div>
                        )
                    })
                )}
            </div>

            <div>
                <label> Total : {totalPrice} $</label>
                <button onClick={buyItems() }>Buy </button>
            </div>

        </div>
    )

}