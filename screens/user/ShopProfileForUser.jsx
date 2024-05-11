
import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Profile from '../../components/profile/Profile'
import ShopProfileTabBar from '../../components/shop/ShopProfileTabBar'

const ShopProfileForUser = ({route}) => {  
  const [shopProfile,setShopProfile] = useState({})

 useEffect(()=>{
  setShopProfile(route.params.profile)
 },[route.params])
  return (
    <View className='flex flex-1 bg-white'>
      <Profile {...shopProfile}/>
      <ShopProfileTabBar id={shopProfile?.id}/>
    </View>
  )
}

export default ShopProfileForUser