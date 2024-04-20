import { View, Text, TouchableOpacity,TouchableHighlight} from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import HomeScreen from '../Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



const user = 'User';
const shop = 'Shop';

const Tab = createBottomTabNavigator();

const ProfileSelect = () => {
    const navigation = useNavigation()
    const asAUser = ()=>{
      // TODO:
        navigation.navigate('UserRegister')
    }
    const asAShop = ()=>{
      // TODO:
      navigation.navigate('Register')
    }
  return (
    <SafeAreaView className='flex items-center justify-center h-screen'>
    <View className='flex items-center justify-center h-screen'>
        
      <Text className='text-center font-semibold text-3xl '>Who Are you?</Text>
      <TouchableOpacity onPress={asAUser}>
      <Ionicons name="person-circle-outline" style={{fontSize:90,top:20}}></Ionicons>
      <Text className='text-center font-bold text-2xl top-3'>User</Text>
      </TouchableOpacity>
      <Text className='text-center font-bold text-md top-7'>Or</Text>
      <TouchableOpacity onPress ={asAShop}>
      <Ionicons name="storefront-outline" style={{fontSize:90, top:50}}></Ionicons>
      <Text className='text-center font-bold text-2xl top-12'>Shop</Text>
      </TouchableOpacity>
      
      </View>
    
    </SafeAreaView>
    

  )
}

export default ProfileSelect