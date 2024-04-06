import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <SafeAreaView className='flex h-12 bg-cyan-200 w-full justify-center items-center'>
      <Text className="text-center">header</Text>
    </SafeAreaView>
  )
}

export default Header