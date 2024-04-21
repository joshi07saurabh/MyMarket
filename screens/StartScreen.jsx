import { View, Text, SafeAreaView, Image,TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { StackActions, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getItemFromAsyncStorage } from "../utils/getItemAsyncStorage";
import { addUser } from "../redux/action";
import { useDispatch } from "react-redux";

const StartScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    useEffect(()=>{
      checkSession()
      
    },[])
    const checkSession =async ()=>{
      const isLoggedIn = await getItemFromAsyncStorage('isLoggedIn')
      if(isLoggedIn){
        const profile = await getItemFromAsyncStorage('profile')
        dispatch(addUser(profile))
        navigation.dispatch(
          StackActions.replace('Main'))
      }
    }
    const onPress = ()=>{
      navigation.dispatch(
        StackActions.replace('Login'))
    }
  return (
    <SafeAreaView className="flex flex-1 bg-white items-center justify-center">
      <SafeAreaView className='flex-1 items-center justify-center'>
        <Image className='flex w-80 h-80' source={require("../assets/logo.png")} />
      </SafeAreaView>
      <SafeAreaView className='p-8 w-full'>
        <TouchableOpacity onPress={onPress} className='w-full bg-black p-3 text-white rounded-xl'>
          <Text className='text-white text-xl text-center'>Let's Start</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default StartScreen;
