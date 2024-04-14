import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {NavigationContainer} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen'
import DetailsScreen from './DetailsScreen'
import SettingsScreen from './SettingsScreen'
import UserProfileScreen from './UserProfileScreen';
import SeachScreen from './SeachScreen';
import ShopProfile from '../screens/user/ShopProfile';

import UserFavouriteShop from './user/UserFavouriteShop';
import ShopProfileForShop from '../screens/shop/ShopProfileForShop';
const homeName = 'Home';
const search = 'Search';
// const profileName = 'UserProfile';
const profileName = 'ShopProfileForShop';
const favourite= 'Favourite Shop';
const Tab = createBottomTabNavigator();

const BottomBar = () => {
  const [isCustomer, setIsCustomer] = useState(true);
  return (
      <Tab.Navigator
        initialRouteName = {homeName}
        screenOptions ={({route}) => ({
          tabBarIcon : ({focused, color, size}) =>{
            let iconName;
            let rn = route.name;

            if(rn === homeName){
              iconName = focused ? 'home' : 'home-outline'
            } else if (rn === search){
              iconName = focused ? 'search' : 'search-outline'
            }else if(rn === profileName){
              iconName = focused ? 'person' : 'person-outline'
            }else if (rn === favourite){
              iconName = focused ? 'heart' : 'heart-outline'
            }
            return <Ionicons name={iconName} size={size} color={color}></Ionicons>
          }
        })}

        tabBarOptions = {{
          activeTintColor : 'black',
          inactiveTintColor : 'gray',
          lableStyle : { paddingBottom : 10, fontSize : 10},
          style : {padding : 10, height : 70}
        }}>

        <Tab.Screen name={homeName} options={{headerShown: false}} component={HomeScreen}></Tab.Screen>
        <Tab.Screen name={search} options={{headerShown: false}} component={SeachScreen}></Tab.Screen>
        <Tab.Screen name={favourite} options={{headerShown: false}} component={UserFavouriteShop}></Tab.Screen>
        {
          isCustomer ? 
          //  (<Tab.Screen name={profileName} options={{headerShown: false}} component={UserProfileScreen}></Tab.Screen>):
           (<Tab.Screen name={profileName} options={{headerShown: false}} component={ShopProfileForShop}></Tab.Screen>):
          
          (<Tab.Screen name={profileName} options={{headerShown: false}} component={ShopProfile}></Tab.Screen>)

        }
        
      </Tab.Navigator>
    
  )
}

export default BottomBar