import { View, Text } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import ShopProfilePostTab from "./ShopProfilePostTab";
import ShopProfileVideoTab from "./ShopProfileVideoTab";
import ShopProfileProductTab from "./ShopProfileProductTab";
const ShopPosts = "ShopPosts";
const ShopVideos = "ShopVideos";
const ShopProducts = "ShopProducts";
const Tab = createMaterialTopTabNavigator();

const ShopProfileTabBar = ({ id }) => {
  return (
    <Tab.Navigator
      initialRouteName={ShopProducts}
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          backgroundColor: "black",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === ShopPosts) {
            iconName = focused ? "image" : "image-outline";
          } else if (rn === ShopVideos) {
            iconName = focused ? "videocam" : "videocam-outline";
          } else if (rn === ShopProducts) {
            iconName = focused ? "list" : "list-outline";
          }
          return <Ionicons name={iconName} size={25} color={color}></Ionicons>;
        },
      })}
    >
      <Tab.Screen
        name={ShopPosts}
        options={{ headerShown: false }}
        component={() => ShopProfilePostTab({ id: id })}
      ></Tab.Screen>
      <Tab.Screen
        name={ShopVideos}
        options={{ headerShown: false }}
        component={() => ShopProfileVideoTab({ id: id })}
      ></Tab.Screen>
      <Tab.Screen
        name={ShopProducts}
        options={{ headerShown: false }}
        component={() => ShopProfileProductTab({ id: id })}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default ShopProfileTabBar;
