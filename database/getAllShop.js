import { collection, getDocs } from "firebase/firestore"
import { FIRESTORE_DB } from "../FirebaseConfig"

export const getAllShop =async (id='')=>{
    try{
    const shopProfile =  await getDocs(collection(FIRESTORE_DB,'shopProfile'))
    const list = []
   shopProfile.forEach((doc)=> {
        list.push(doc.data())
    }) 
    return list || []
}
catch(err){
    return []
}
}