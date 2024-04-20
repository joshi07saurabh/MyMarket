import { View, Text } from 'react-native'
import React from 'react'
import BottomBar from '../components/BottomBar'
import Header from '../components/header/Header'
import { SafeAreaView } from 'react-native-safe-area-context';

const Main = () => {
  return (
    <SafeAreaView className='flex flex-1 w-full bg-white'>
      <Header/>
      <BottomBar/>
    </SafeAreaView>
  )
}

export default Main