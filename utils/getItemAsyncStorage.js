import AsyncStorage from "@react-native-async-storage/async-storage"

export const getItemFromAsyncStorage =async (key)=>{
    const value = await AsyncStorage.getItem(key);

    return JSON.parse(value) || null
}