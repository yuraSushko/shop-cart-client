import {useEffect, useState} from "react";
import {auth,myDb} from "../api/FireBaseApi";
import {collection, doc, setDoc,getDoc,getDocs,deleteDoc} from "firebase/firestore";

export default function ExpenseItem(props){
    const add='+'
    const remove='-'
    const init ='init'
    const [amountBought,setAmountBought]= useState( null)
    //const bucket = '/buy_list'
    //const myDb = collection(db, bucket)

    const handleAmount = (action)=>{
        //console.log('amountBought when try to buy ',amountBought )

        if(amountBought !== undefined && amountBought !== null) {
            let amt = amountBought
            //console.log("entered if in buy amout")
              //await findItemIfExists() //amountBought
            //console.log('amt', amt)
            if (action === add) {
                amt++
            } else if (action === remove) {
                amt--
            }
            //console.log('amt', amt)
            const amountToSet= amt > 0 ? amt : 0
            setAmountBought(amountToSet)
        }
        console.log('posting to DB', props.id, amountBought)
        //if(props.id){}
        //postItemToDB()
    }
    useEffect( () => {
        findItemIfExistsAndSetAmount()
        //handleAmount(init)
    },[])

    useEffect(()=>{
        console.log('posting to DB', props.id, amountBought)
        if (amountBought !== undefined && amountBought !== null) {
            postItemToDB()
        }
//        findItemIfExists()
    },[amountBought])

    const postItemToDB= async ()=>{
        //console.log('props.id: ',props.id)
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

            }catch (e){
                console.log(e)
            }
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
        //console.log('amountToSet',amountToSet)
        setAmountBought(amountToSet)
    }



    return(
       // (amountBought) &&(
            <>
                <img src={props.img} style={{width: "50px"}}/> <br/>
                <label >name: {props.name}</label> <br/>
                <label>price: {props.price} $</label> <br/>
                <button className={props.canChangeAmount ? "btn-primary" : "d-none"}  onClick={() => handleAmount(add)}>{add}</button>
                <label>amount: {amountBought}</label>
                <button className={props.canChangeAmount ? "btn-primary" : "d-none"} onClick={() => handleAmount(remove)}>{remove}</button>
            </>
       // )
    )

}