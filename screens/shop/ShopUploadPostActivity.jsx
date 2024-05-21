import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AddPost from '../../components/shop/AddPost'
import AddProduct from '../../components/shop/AddProduct'
// import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ShopUploadActivity = () => {
  const [isAddPostTabEnabled, setIsAddPostTabEnabled] = useState(false)
  const PostTabClicked = () => {
    setIsAddPostTabEnabled(true)
  }
  const ProductTabClicked = () => {
    setIsAddPostTabEnabled(false)
  }
  return (
    <ScrollView className='bg-white pt-2'>
      <View className='border border-gray-200 flex flex-row justify-center'>
        <TouchableOpacity onPress={PostTabClicked} className='w-1/2 border-gray-200 border-r h-full p-4'>
          <View className={`w-full flex flex-1 items-center justify-center ${isAddPostTabEnabled ? 'text-black' : 'text-gray-500'}`}>
        <Icon name="camera" color={isAddPostTabEnabled?'black':'#777777'} size={20} />
            <Text className={`text-[10px] text-center ${isAddPostTabEnabled ? 'text-black' : 'text-gray-500'}`}>Add Post</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={ProductTabClicked} className='w-1/2 border-gray-200 border-r h-full p-4'>
          <View className={`w-full flex flex-1 items-center justify-center ${!isAddPostTabEnabled ? 'text-black' : 'text-gray-500'}`}>
        <Icon name="sticker-plus" color={!isAddPostTabEnabled?'black':'#777777'} size={20} />
            <Text className={`text-[10px] text-center ${!isAddPostTabEnabled ? 'text-black' : 'text-gray-500'}`}>Add Post</Text>
            </View>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={changeTab} className='w-1/2 border-gray-200 border-r h-full p-4'>
          <View className={`w-full flex flex-1 items-center justify-center ${!isAddPostTabEnabled ? 'text-black' : 'text-gray-500'}`}>
        <Icon name="sticker-plus" color={!isAddPostTabEnabled?'black':'#777777'} size={20} />
            <Text className={`text-[10px] text-center ${!isAddPostTabEnabled ? 'text-black' : 'text-gray-500'}`}>Add Product</Text>
            </View>
        </TouchableOpacity> */}
      </View>
      <View>
        {
          isAddPostTabEnabled ?
            <AddPost />
            :
            <AddProduct />
        }
      </View>
    </ScrollView>
  )
}

export default ShopUploadActivity