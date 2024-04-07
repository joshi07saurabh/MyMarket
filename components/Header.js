import { View, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'


const Header = () => {
  return (
    <SafeAreaView className='relative h-14 bg-white w-full flex flex-row justify-around items-center'>
        <View className="h-12 w-14 absolute left-2 top-2 overflow-hidden flex justify-center items-center">
      <Image className='flex w-24 h-24' source={require("../assets/logo.png")} />
      </View>
      <Ionicons name="notifications" className="text-2xl absolute right-3 top-4"></Ionicons>
    </SafeAreaView>
  )
}

export default Header