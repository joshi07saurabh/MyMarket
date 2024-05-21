import { View, Text,SafeAreaView, ScrollView, RefreshControl, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import ShopListItem from './ShopListItem'
import data from '../../data/data.json'
import { getAllShop } from '../../database/getAllShop'
import useGetUser from '../../hooks/useGetUser'

const ShopList = ({route}) => {
    const [shopData,setShopData] = useState([])
    const currentUser = useGetUser();
    const [isRefreshing,setIsRefreshing] = useState(false)
    useEffect(()=>{
      getShopData()

     return () =>{
      console.log('bhar hai')
     }
    },[route])

    const getShopData = async ()=>{
      setIsRefreshing(true)
      console.log('refreshing')
      const shopList =await getAllShop();
      setShopData(shopList?.map((profile) => {
         return {
             "id":profile?.uid,
             "name": profile?.shopName,
             "category": profile?.category || "New",
             "shopImage": profile?.imageURL,
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
       setIsRefreshing(false)
    }
    
  return (
    <View className="h-full w-full">
      <FlatList
      data={shopData}
      onRefresh={getShopData}
      refreshing={isRefreshing}
      renderItem={({item})=><ShopListItem {...item}/>}
      keyExtractor={item=>item.id}
      />
    </View>
  )
}

export default ShopList