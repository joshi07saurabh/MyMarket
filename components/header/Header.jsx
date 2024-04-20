import { View, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'


const Header = () => {
  return (
    <SafeAreaView className='relative h-14 bg-white w-full flex flex-row justify-around items-center'>
        <View className="h-12 w-14 absolute left-2 top-2 overflow-hidden flex justify-center items-center">
      <Image className='flex w-24 h-24' source={require("../../assets/logo.png")} />
      </View>
      <View className='absolute top-4 right-3'>
      <Ionicons name="notifications" className="" size={26}></Ionicons>
      </View>
    </SafeAreaView>
  )
}

export default Header