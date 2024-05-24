import { getDownloadURL, getStorage, ref } from "firebase/storage";

export const getURL =async (fullpath)=>{
    const storage = getStorage();
    const storageRef = ref(storage, fullpath)
    const url = await getDownloadURL(storageRef)

    return url
}