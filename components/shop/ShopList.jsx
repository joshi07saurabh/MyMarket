import { View, Text,SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import ShopListItem from './ShopListItem'
import data from '../../data/data.json'
import { getAllShop } from '../../database/getAllShop'

const ShopList = () => {
    const [shopData,setShopData] = useState(data.shopData)
    useEffect(()=>{
      getShopData()
    },[])

    const getShopData = async ()=>{
      const shopList =await getAllShop();
      setShopData(shopList?.map((profile) => {
         return {
             "id":profile?.uid,
             "name": profile?.shopName,
             "category": profile?.category || "New",
             "shopImage": "https://etimg.etb2bimg.com/photo/76159933.cms",
             "address": profile?.mainAdd,
             "city": profile?.cityAdd,
             "state": profile?.stateAdd,
             "pin":profile?.pinAdd,
             "landmark": profile?.landmarkAdd,
             "fullAddress": `${profile?.mainAdd} ${profile?.landmark}, ${profile?.cityAdd}, ${profile?.stateAdd}`,
             "coordinate": [],
             "ownerName": profile?.Owner,
             "contactDetails":{
                 "contact": profile?.mobileNumber,
                 "email" : profile?.email
             },
             "productList": [],
             "postList": [],
             "videoList": [],
             "isShopOpen": profile?.isShopOpen,
             "isUser": profile?.isUser
         }
       }))
    }
    
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