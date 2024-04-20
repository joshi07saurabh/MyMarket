import { collection, getDocs } from "firebase/firestore"
import { FIRESTORE_DB } from "../FirebaseConfig"

export const getAllShop =async ()=>{
    try{
    const list = []
    const shopProfile =  await getDocs(collection(FIRESTORE_DB,'shopProfile'))
   shopProfile.forEach((doc)=> {
        list.push(doc.data())
    }) 

    console.log('list',list)
    return list || []
}
catch(err){
    console.log(err)
    return []
}
return []
}