import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import ShopList from '../components/shop/ShopList';

const FavouriteShops = () => {
  return (
    <SafeAreaView>
        <View>
            <Text className='text-center font-semibold text-3xl'>Favorite Shops</Text>
        </View>
      <ShopList></ShopList>
    </SafeAreaView>
  )
}

export default FavouriteShops