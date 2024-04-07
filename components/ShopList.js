import { View, Text,SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import ShopListItem from './ShopListItem'
import data from '../data/data.json'

const ShopList = () => {
    const [shopData,setShopData] = useState(data.shopData)
  return (
    <SafeAreaView className="h-full w-full">
        {
            shopData?.map(shopItem=>{
                return <ShopListItem key={shopItem.id} {...shopItem}/>
            })
        }
    </SafeAreaView>
  )
}

export default ShopList