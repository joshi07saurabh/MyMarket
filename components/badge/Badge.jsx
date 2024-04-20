import { View, Text } from 'react-native'
import React from 'react'

const Badge = ({ color, status }) => {
    return (
        <View className='border border-gray-300 w-20 flex flex-row justify-center items-center p-1 rounded-md'>
            <View className={`w-2 mr-2 h-2 ${color} rounded-full`}></View>
            <Text className='font-bold text-xs'>{status}</Text>
        </View>
    )
}

export default Badge