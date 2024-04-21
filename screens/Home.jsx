import { View, Text,ScrollView } from 'react-native'
import React, { useDebugValue, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ShopList from '../components/shop/ShopList'
import { useSelector } from 'react-redux'


const Home = () => {
  return (
    <ScrollView>
    <View  className='flex flexGrow-1  bg-white h-full'>
      <ShopList/>
    </View>
    </ScrollView>
  )
}

export default Home