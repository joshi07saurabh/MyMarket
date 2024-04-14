import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import ShopProfileProductTab from '../../screens/user/ShopProfileProductTab';
import ShopProfilePostTab from '../../screens/user/ShopProfilePostTab';
import ShopListItem from '../ShopListItem';
import ShopList from '../ShopList';

const UserFavouriteShop = () => {
  return (
    <SafeAreaView>
        <View>
            <Text className='text-center font-semibold text-3xl'>Favorite Shops</Text>
        </View>
      <ShopList></ShopList>
    </SafeAreaView>
  )
}

export default UserFavouriteShop 