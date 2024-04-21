import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {NavigationContainer} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/Home'
import SeachScreen from '../screens/Search';
import ShopProfile from '../screens/ShopProfile';

import UserFavouriteShop from '../screens/FavouriteShops';
import ShopProfileForShop from '../screens/shop/ShopFullProfile';
import useGetUser from '../hooks/useGetUser';
import UserProfile from '../screens/user/UserProfile';
import ShopUploadActivity from '../screens/shop/ShopUploadPostActivity';
const homeName = 'Home';
const search = 'Search';
// const profileName = 'UserProfile';
const profileName = 'ShopProfileForShop';
const addPost = 'AddPost';
const favourite= 'Favourite Shop';
const Tab = createBottomTabNavigator();

const BottomBar = () => {
  const [isCustomer, setIsCustomer] = useState(true);
  const profile = useGetUser()
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
            }else if(rn === addPost){
              iconName = focused ? 'add-circle' : 'add-circle-outline'
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
        }}
>

        <Tab.Screen name={homeName} options={{headerShown: false}} component={HomeScreen}></Tab.Screen>
        <Tab.Screen name={search} options={{headerShown: false}} component={SeachScreen}></Tab.Screen>
        {
          !profile?.isUser &&
          //  (<Tab.Screen name={profileName} options={{headerShown: false}} component={UserProfileScreen}></Tab.Screen>):
           (<Tab.Screen name={addPost} options={{headerShown: false}} component={ShopUploadActivity}></Tab.Screen>)

        }
        {/* <Tab.Screen name={favourite} options={{headerShown: false}} component={UserFavouriteShop}></Tab.Screen> */}
        {
          profile?.isUser ? 
          //  (<Tab.Screen name={profileName} options={{headerShown: false}} component={UserProfileScreen}></Tab.Screen>):
           (<Tab.Screen name={profileName} options={{headerShown: false}} component={UserProfile}></Tab.Screen>):
          
          (<Tab.Screen name={profileName} options={{headerShown: false}} component={ShopProfile}></Tab.Screen>)

        }
        
      </Tab.Navigator>
    
  )
}

export default BottomBar