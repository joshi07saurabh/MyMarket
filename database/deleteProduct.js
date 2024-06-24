import { collection, deleteDoc, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../FirebaseConfig";

export const deleteSingleProduct = async (id) => {
  try {
    const post = await getDocs(collection(FIRESTORE_DB, "productTable"));
    post.forEach((doc) => {
      if (doc.id === id) {
        deleteDoc(doc.ref)
          .then(() => {
            console.log("Document successfully deleted!");
          })
      }
    });
  } catch (err) {
  }
};
