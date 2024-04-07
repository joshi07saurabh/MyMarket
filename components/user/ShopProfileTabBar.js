import { View, Text } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {NavigationContainer} from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import ShopProfilePostTab from '../../screens/user/ShopProfilePostTab';
import ShopProfileVideoTab from '../../screens/user/ShopProfileVideoTab';
import ShopProfileProductTab from '../../screens/user/ShopProfileProductTab';
const ShopPosts = 'ShopPosts';
const ShopVideos = 'ShopVideos';
const ShopProducts = 'ShopProducts';
const Tab = createMaterialTopTabNavigator();

const ShopProfileTabBar = () => {
  return (
      <Tab.Navigator
        initialRouteName = {ShopProducts}
        screenOptions ={({route}) => ({
          tabBarIcon : ({focused, color, size}) =>{
            let iconName;
            let rn = route.name;

            if(rn === ShopPosts){
              iconName = focused ? 'home' : 'home-outline'
            } else if (rn === ShopVideos){
              iconName = focused ? 'search' : 'search-outline'
            }else if(rn === ShopProducts){
              iconName = focused ? 'list' : 'list-outline'
            }
            return <Ionicons name={iconName} size={size} color={color}></Ionicons>
          }
        })}
>

        <Tab.Screen name={ShopPosts} options={{headerShown: false}} component={ShopProfilePostTab}></Tab.Screen>
        <Tab.Screen name={ShopVideos} options={{headerShown: false}} component={ShopProfileVideoTab}></Tab.Screen>
        <Tab.Screen name={ShopProducts} options={{headerShown: false}} component={ShopProfileProductTab}></Tab.Screen>
      </Tab.Navigator>
    
  )
}

export default ShopProfileTabBar