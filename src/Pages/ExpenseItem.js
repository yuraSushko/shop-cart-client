import {useEffect, useState} from "react";
import {auth,myDb} from "../api/FireBaseApi";
import {collection, doc, setDoc,getDoc,getDocs,deleteDoc} from "firebase/firestore";
import "./ExpenseItem.css"

export default function ExpenseItem(props){
    const add='+'
    const remove='-'
    const init ='init'
    const [amountBought,setAmountBought]= useState( null)

    const handleAmount = (action)=>{
        if(amountBought !== undefined && amountBought !== null) {
            let amt = amountBought
            if (action === add) {
                amt++
            } else if (action === remove) {
                amt--
            }
            const amountToSet= amt > 0 ? amt : 0
            setAmountBought(amountToSet)
        }
        console.log('posting to DB', props.id, amountBought)

    }
    useEffect(() => { findItemIfExistsAndSetAmount() },[])

    useEffect(()=>{
        if (amountBought !== undefined && amountBought !== null) {
            postItemToDB()
        }
    },[amountBought])

    const postItemToDB= async ()=>{
        if( amountBought>0) {
            const objToAdd = {
                name: props.name,
                img: props.img,
                price: props.price,
                amount: amountBought
            }
            await setDoc(doc(myDb, String(props.id)), objToAdd)
        }
        else{
             try {
                await deleteDoc(doc(myDb, String(props.id)))
             }catch (e) {console.log(e)}
        }
    }

    const findItemIfExistsAndSetAmount =async ()=>{
        const item = await getDoc(doc(myDb, String(props.id)))
        if(item.data()) {
            console.log(props.id,' item found', item, item.data())
        }else{
            console.log(props.id,' item not found', item, item.data())
        }
        const foundItem =  await item.data()
        const amountToSet =  foundItem ? foundItem.amount : 0
        setAmountBought(amountToSet)
    }



    return(
       <div className={"expenseItem container"} >
            <div>
                <img src={props.img} className={"item-img"} style={{width: "100%", height: "auto", maxHeight:"200px"}} alt={"img"}/>
            </div>

            <div className={" item-body fs-3"}>
               <div className={"item-name fs-5"}>
                    <label >  {props.name}</label>
               </div>
                <div className="item-details">
                    <label>price: {props.price} $</label><br/>

                    <button className={props.canChangeAmount ? "btn btn-secondary" : "d-none"}
                            onClick={() => handleAmount(add)}>{add}</button>
                    <label className={""}>amount: {amountBought}</label>
                    <button className={props.canChangeAmount ? "btn btn-secondary" : "d-none"}
                            onClick={() => handleAmount(remove)}>{remove}</button>
                    </div>
                </div>
        </div>
            )

            }