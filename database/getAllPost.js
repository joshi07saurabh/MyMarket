import { collection, getDocs } from "firebase/firestore"
import { FIRESTORE_DB } from "../FirebaseConfig"

export const getPostImage =async (id)=>{
    try{
    const list = []
    const post =  await getDocs(collection(FIRESTORE_DB,'postTable'))
    post.forEach((doc)=> {
        if(doc.data().uid === id){
            list.push({uid:doc.id,imageURL:doc.data().imageURL})
        }
    }) 
    return list || []
}
catch(err){
    return []
}
return []
}