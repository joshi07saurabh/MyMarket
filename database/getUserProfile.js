import { collection, getDoc, getDocs, query, where } from "firebase/firestore"
import { FIRESTORE_DB } from "../FirebaseConfig"

const getUser =async (id)=>{
    try{
    let profileData = null
    const userProfile =  await getDocs(collection(FIRESTORE_DB,'userProfile'))
    userProfile.forEach((doc)=> {
      if(doc.data().uid === id){
        profileData = doc.data()
      }  
    })
    const shopProfile =  await getDocs(collection(FIRESTORE_DB,'shopProfile'))
    shopProfile.forEach((doc)=> {
      if(doc.data().uid === id){
        profileData = doc.data()
      }  
    })
    return profileData
    }catch(err){
    }
    
    return null
}

export default getUser;