import { View, Text,Image } from 'react-native'
import React from 'react'

const ListComponent = ({imageUrl,productName,price}) => {
  return (
    <View className="dlex flex-row border-2 border-gray-50">
      <View className='w-1/5 h-24 aspect-square'>
        <Image source={{uri:imageUrl}} className="w-full h-full"/>
      </View>
      <View className=' bg-white w-4/5 h-full flex flex-row p-3'>
        <Text className='text-xs w-[80%] mr-2'>{productName}</Text>
        <Text className='text-md font-semibold'>Rs. {price}</Text>
    </View>

    
    </View>
  )
}

export default ListComponent