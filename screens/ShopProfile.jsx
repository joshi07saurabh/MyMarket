
import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Profile from '../components/profile/Profile'
import ShopProfileTabBar from '../components/shop/ShopProfileTabBar'
import useGetUser from '../hooks/useGetUser'
import { useNavigation } from '@react-navigation/native'

const ShopProfile = () => {  
  const profile = useGetUser();
  const [shopProfile,setShopProfile] = useState({});
  useEffect(() =>{
    setShopProfile({
      "id":profile?.uid,
      "name": profile?.shopName,
      "category": profile?.category || "New",
      "shopImage": profile?.imageURL,
      "address": profile?.mainAdd,
      "city": profile?.cityAdd,
      "state": profile?.stateAdd,
      "pin":profile?.pinAdd,
      "landmark": profile?.landmarkAdd,
      "fullAddress": `${profile?.mainAdd|| ''} ${profile?.landmark || ''}, ${profile?.cityAdd}, ${profile?.stateAdd}`,
      "coordinate": [],
      "ownerName": profile?.Owner,
      "contactDetails":{
          "contact": profile?.mobileNumber,
          "email" : profile?.email
      },
      "productList": [],
      "postList": [],
      "videoList": [],
      "isShopOpen": profile?.isShopOpen,
      "isUser": profile?.isUser
  })
  },[profile])
  return (
    <View className='flex flex-1 bg-white'>
      <Profile {...shopProfile}/>
      <ShopProfileTabBar id={profile?.uid}/>
    </View>
  )
}

export default ShopProfile