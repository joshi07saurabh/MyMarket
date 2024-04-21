import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import ListComponent from '../list/ListComponent'
import { getAllProduct } from '../../database/getAllProduct'

const ShopProfileProductTab = ({id}) => {
  const [productList,setProductList] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    fetchProducts()
  },[])

  const fetchProducts = async ()=>{
    setIsLoading(true);
    const product=await getAllProduct(id)
     setProductList(product)
     setIsLoading(false);
  }
if(isLoading){
  return <View className='flex flex-1 justify-center items-center bg-white'>
  <Text className='text-xl text-gray-300'>Loading...</Text>
</View>
}
if(productList.length  <=0){
  return     <View className='flex flex-1 justify-center items-center bg-white'>
  <Text className='text-xl text-gray-300'>No Products Available</Text>
</View>
}
  return (
    <View className='flex flex-1 h-full bg-white'>
      
      {productList.map((product)=>{
        return (
          <ListComponent {...product}/>
        )
      })}
    </View>
  )
}

export default ShopProfileProductTab