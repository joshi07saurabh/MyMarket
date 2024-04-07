import { View, Text } from 'react-native'
import React from 'react'
import Profile from '../../components/Profile'
import ShopProfileTabBar from '../../components/user/ShopProfileTabBar'

const ShopProfile = () => {
  const shopDetails ={
    "id":1,
    "name":"Joshi Electronics",
    "category": "Electronics",
    "shopImage": "https://etimg.etb2bimg.com/photo/76159933.cms",
    "address": "MOh. Chauhanan Near Temple Jaspur",
    "city": "Jaspur",
    "state": "Uttrakhand",
    "fullAddress": "MOh. Chauhanan Near Temple Jaspur, Uttrakhand",
    "coordinate": [1,2],
    "ownerName": "Saurabh",
    "contactDetails":{
        "contact": "1234567875",
        "email" : "saurabh@gamil.com"
    },
    "itemList": []
}
  return (
    <View className='flex'>
      <Profile {...shopDetails}/>
      <ShopProfileTabBar/>
    </View>
  )
}

export default ShopProfile