import { collection, getDocs } from "firebase/firestore"
import { FIRESTORE_DB } from "../FirebaseConfig"

export const getAllShop =async ()=>{
    try{
    const list = []
    const shopProfile =  await getDocs(collection(FIRESTORE_DB,'shopProfile'))
   shopProfile.forEach((doc)=> {
        list.push(doc.data())
    }) 
    return list || []
}
catch(err){
    return []
}
return []
}