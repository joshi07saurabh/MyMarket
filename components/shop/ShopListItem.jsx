import { View, Text, Image,SafeAreaView, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { firstEveryWord } from '../../utils/textTransform'
import { TouchableRipple } from 'react-native-paper'

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
    <TouchableOpacity activeOpacity={0.7} onPress={goToShopProfile} >
    <SafeAreaView  className='flex flex-row bg-white rounded-md shadow-sm shadow-black'>
        <SafeAreaView>
            <Image source={{uri: shopImage}} className="rounded-md w-32 h-32 m-1"/>
        </SafeAreaView>
      <SafeAreaView className="flex flex-1 pt-1 px-3">
        <Text className="text-xl font-semibold">{firstEveryWord(name)}</Text>
        <Text className="font-semibold">{category}</Text>
        <Text className="text-[10px] text-gray-600 capitalize">{address}</Text>
        <Text className="text-[10px] text-gray-600 capitalize">{city}</Text>
        <Text className="text-[10px] text-gray-600 capitalize">{state}</Text>
        
      </SafeAreaView>
    </SafeAreaView>
    </TouchableOpacity>
  )
}

export default ShopListItem