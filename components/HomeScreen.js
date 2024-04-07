import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ShopList from './ShopList'

const HomeScreen = () => {
  return (
    <View  className='flex flex-1  bg-white'>
      <ShopList/>
    </View>
  )
}

export default HomeScreen