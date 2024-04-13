
import { CheckBox, CheckBoxBase } from '@react-native-community/checkbox';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';


const AppToggle = ({onToggle,isShopOpen})=> {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          width: 58,
          height: 28,
          borderRadius: 32,
          padding: 4,
          backgroundColor: isShopOpen
            ? "limegreen"
            : "gray",
        }}
        onPress={() => onToggle()}
      >
        <View style={{
          width: 20,
          height: 20,
          backgroundColor:'white',
          borderRadius: 32,
          transform: [{
            translateX: isShopOpen ? 32 : 0,
          }]
        }} />
      </TouchableOpacity>
    </View>
  )
}

export default AppToggle