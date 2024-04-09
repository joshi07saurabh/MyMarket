import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import React from 'react'
import {Linking} from 'react-native'


const Profile = ({shopImage,name,contactDetails,userName='',fullAddress}) => {
  const goToCall = () => {  
    Linking.openURL(`tel:${contactDetails.contact}`)
  }
  const goToWhatsapp = ()=>{
    Linking.openURL(`whatsapp://send?phone=${contactDetails.contact}`)
  }
  return (
    <SafeAreaView className='bg-white'>
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image 
            source={{
              uri: shopImage,
            }}
            size={80}
          />
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{name}</Title>
            <Caption style={styles.caption}>{userName}</Caption>
          </View>
        </View>
      </View>
      <View className='flex flex-row w-full justify-between'>
      <View style={styles.userInfoSection} className='w-3/5'>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{fullAddress}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{contactDetails.contact}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{contactDetails.email}</Text>
        </View>
      </View>
      <View className='mr-5 self-end mb-8'>
      <TouchableOpacity onPress={goToCall} className='w-full bg-gray-800 p-3 text-white  rounded-md mb-2 flex flex-row'>
      <Ionicons name="call-outline" color="#ffffff" size={16}/>
          <Text className='text-white text-xs text-center mx-2'>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToWhatsapp} className='w-full bg-gray-800 p-3 text-white rounded-md flex flex-row'>
        <Ionicons name="chatbubbles-outline" color="#ffffff" size={16}/>
          <Text className='text-white text-xs text-center mx-2'>Whatsapp</Text>
        </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
    container: {
      flex: 1,
      color: 'black',
    },
    userInfoSection: {
      paddingHorizontal: 30,
      marginBottom: 25,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      fontWeight: '500',
    },
    row: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    infoBoxWrapper: {
      borderBottomColor: '#dddddd',
      borderBottomWidth: 1,
      borderTopColor: '#dddddd',
      borderTopWidth: 1,
      flexDirection: 'row',
      height: 100,
    },
    infoBox: {
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuWrapper: {
      marginTop: 10,
    },
    menuItem: {
      flexDirection: 'row',
      paddingVertical: 15,
      paddingHorizontal: 30,
    },
    menuItemText: {
      color: '#777777',
      marginLeft: 20,
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 26,
    },
  });