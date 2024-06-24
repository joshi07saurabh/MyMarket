import { View, Text,ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import ListComponent from '../list/ListComponent'
import { getAllProduct } from '../../database/getAllProduct'
import { useNavigation } from '@react-navigation/native'

const ShopProfileProductTab = ({id}) => {
  const navigation = useNavigation();
  const [productList,setProductList] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const goToImage = (product) => {
    console.log('product',product)
    navigation.navigate("ProductDetail", { product: product, id: product.productId, postOwnerId: product.ownerId });
  };

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
    <ScrollView className='flex flex-1 bg-white'>
      
      {productList.map((product,index)=>{
        return (
          <TouchableOpacity onPress={()=>goToImage(product)}>
          <ListComponent key={index} {...product}/>
          </TouchableOpacity>
        )
      })}
    </ScrollView>
  )
}

export default ShopProfileProductTab