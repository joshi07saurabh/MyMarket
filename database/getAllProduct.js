import { collection, getDocs } from "firebase/firestore"
import { FIRESTORE_DB } from "../FirebaseConfig"

export const getAllProduct =async (id)=>{
    try{
    const list = []
    const products =  await getDocs(collection(FIRESTORE_DB,'productTable'))
    products.forEach((doc)=> {
        if(doc.data().uid ===id){
            list.push({
                imageUrl: doc.data().imageURL,
                productName: doc.data().description,
                price: doc.data().price,
              })
        }
    }) 
    return list || []
}
catch(err){
    return []
}
return []
}