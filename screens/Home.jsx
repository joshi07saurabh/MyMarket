import { View, Text } from 'react-native'
import React, { useDebugValue, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ShopList from '../components/shop/ShopList'
import { useSelector } from 'react-redux'

const Home = () => {
  return (
    <View  className='flex flex-1  bg-white'>
      <ShopList/>
    </View>
  )
}

export default Home