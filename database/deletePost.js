import { collection, deleteDoc, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../FirebaseConfig";

export const deleteSinglePost = async (id) => {
  try {
    const post = await getDocs(collection(FIRESTORE_DB, "postTable"));
    post.forEach((doc) => {
      if (doc.id === id) {
        deleteDoc(doc.ref)
          .then(() => {
          })
      }
    });
  } catch (err) {
  }
};
