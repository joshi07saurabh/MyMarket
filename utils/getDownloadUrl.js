import { getDownloadURL, getStorage, ref } from "firebase/storage";

export const getURL =async (fullpath)=>{

    console.log(fullpath,'paths')
    const storage = getStorage();
    const storageRef = ref(storage, fullpath)
    const url = await getDownloadURL(storageRef)
    console.log(url, url)
    return url
}