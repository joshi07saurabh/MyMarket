import { View, Text, SafeAreaView, Image,TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const StartScreen = () => {
    const navigation = useNavigation()
    const onPress = ()=>{
        navigation.navigate('Login')
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
