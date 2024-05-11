import * as firebase from 'firebase/app';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import 'firebase/storage';
import { FIRESTORE_DB } from '../FirebaseConfig';

export const uploadToFirebase = (blob,name) => {
    return new Promise((resolve, reject)=>{
      var storageRef = firebase.storage().ref();
      storageRef.child(`uploads/${name}`).put(blob, {
        contentType: 'image/jpeg'
      }).then((snapshot)=>{
        blob.close();
        resolve(snapshot);
      }).catch((error)=>{
        reject(error);
      });
    });
  }

  export const uploadToPostTable =async ( url,uid )=>{
    console.log(url,uid,'hu')
    await addDoc(collection(FIRESTORE_DB,'postTable'),{
        imageURL: url,
        uid: uid,
      })
  }