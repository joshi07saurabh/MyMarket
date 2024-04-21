import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getPostImage } from "../../database/getAllPost";

const ShopProfilePostTab = ({id}) => {
  const navigation = useNavigation();
  const [postLinks, setPostLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(()=>{
    fetchPosts()
  },[])

  const fetchPosts = async ()=>{
    setIsLoading(true);
    const post=await getPostImage(id)
     setPostLinks(post)
     setIsLoading(false);
  }
  const goToImage = (postLink) => {
    navigation.navigate("PostDetail", { image: postLink });
  };

  if(isLoading){
    return <View className='flex flex-1 justify-center items-center bg-white'>
    <Text className='text-xl text-gray-300'>Loading...</Text>
  </View>
  }
  if(postLinks.length  <=0){
    return     <View className='flex flex-1 justify-center items-center bg-white'>
    <Text className='text-xl text-gray-300'>No Posts Available</Text>
  </View>
  }
  return (
    <ScrollView className='bg-white'>
      <View className="flex flex-row flex-wrap bg-white h-full">
        {postLinks?.map((postLink) => (
            <View className="w-1/3 h-40 aspect-square border border-white">
              <TouchableOpacity onPress={()=>goToImage(postLink)}>
              <Image
                source={{ uri: postLink }}
                className="w-full h-full"
              ></Image>
              </TouchableOpacity>
            </View> 
        ))}
      </View>
    </ScrollView>
  );
};

export default ShopProfilePostTab;
