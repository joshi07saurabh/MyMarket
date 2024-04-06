import { View, Text } from 'react-native'
import React from 'react'
import ShopList from '../components/ShopList'
import BottomBar from '../components/BottomBar'
import Header from '../components/Header'
import { SafeAreaView } from 'react-native-safe-area-context';

const Main = () => {
  return (
    <SafeAreaView className='flex flex-1 w-full bg-white'>
      <Header/>
      <ShopList/>
      <BottomBar/>
    </SafeAreaView>
  )
}

export default Main