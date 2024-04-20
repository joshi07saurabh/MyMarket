import { View, Text, Image,SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ShopListItem = (profile) => {
  const {name,address,shopImage,city,state,category} = profile
  const fullAddress = `${address}, ${city}, ${state}`
  const navigation = useNavigation()
  const goToShopProfile = ()=>{
    navigation.navigate('ShopProfileForUser',{
      profile: profile
    })
  }
  return (
    <TouchableOpacity onPress={goToShopProfile}>
    <SafeAreaView  className='flex flex-row bg-white m-1 rounded-md shadow-sm shadow-black'>
        <SafeAreaView>
            <Image source={{uri: shopImage}} className="rounded-md w-32 h-32 m-1"/>
        </SafeAreaView>
      <SafeAreaView className="flex flex-1 pt-1 px-3">
        <Text className="text-xl font-semibold">{name}</Text>
        <Text className="font-semibold">{category}</Text>
        <Text className="text-[10px] text-gray-600 capitalize">{address}</Text>
        <Text className="text-[10px] text-gray-600 capitalize">{city}</Text>
        <Text className="text-[10px] text-gray-600 capitalize">{state}</Text>
        <Text className="mt-auto mb-4 ml-auto">4.6&#9733;</Text>
      </SafeAreaView>
    </SafeAreaView>
    </TouchableOpacity>
  )
}

export default ShopListItem