import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
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
import React, { useEffect, useState } from 'react'
import { Linking } from 'react-native'
import Badge from '../badge/Badge';
import AppToggle from '../app-toggle/AppToggle';
import { useNavigation } from "@react-navigation/native";
import useGetUser from '../../hooks/useGetUser';
import { setItemToAsyncStorage } from '../../utils/setItemAsyncStorage';
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../FirebaseConfig';
import { updateEmail } from 'firebase/auth';
import { addUser } from '../../redux/action';
import { useDispatch } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';



const Profile = ({ shopImage, name, contactDetails, userName = '', fullAddress,id , shopOpen}) => {

  const [isShopOpen, setIsShopOpen] = useState(shopOpen)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const currentLoggedUser = useGetUser()
  const [isSelfOwner,setIsSelfOwner] = useState(false)
  useEffect(()=>{
    setIsSelfOwner(currentLoggedUser?.uid === id)
  },[currentLoggedUser,id])
  const navigation = useNavigation()
  const goToCall = () => {
    Linking.openURL(`tel:${contactDetails.contact}`)
  }
  const goToWhatsapp = () => {
    Linking.openURL(`whatsapp://send?phone=${contactDetails.contact}`)
  }
  const onToggle =async ()=>{
    setIsLoading(true)

    const userProfileRef = collection(FIRESTORE_DB, "shopProfile");
      const querySnapshot = await getDocs(
        query(userProfileRef, where("uid", "==", id))
      );

      // Check if there is a matching document
      if (!querySnapshot.empty) {
        // Assuming there's only one document with the given name, you can access it directly
        const userDocRef = querySnapshot.docs[0].ref;
        const updatedProfile = {
          ...currentLoggedUser,
          isShopOpen: !isShopOpen
        }

        await updateDoc(userDocRef, updatedProfile);
        dispatch(
          addUser(updatedProfile)
        );
        setIsLoading(false)
        setIsShopOpen(!isShopOpen)
      }
  }
  const editProfile = ()=>{
    navigation.navigate('ShopEditProfile')
  }
  const uploadpost = ()=>{
    navigation.navigate('PostFile')
  }
  const logout = ()=>{
    Alert.alert('Logout','Are you sure you want to log out',
    [{
      text : 'Cancel',
      onPress : () => {},
      style : 'cancel'
    },
    {
      text : 'OK',
      onPress : () => {
        setItemToAsyncStorage('isLoggedIn',false);
        setItemToAsyncStorage('profile',{});
        navigation.replace('Login')
      }
    }
    ],
    {cancelable : false}
  
  )
    
  }
  return (
    <SafeAreaView className='bg-white'>
      <Spinner
          visible={isLoading}
          textContent={isShopOpen?'Closing Shop...': 'Opening Shop...'}
          textStyle={{color: '#FFF'}}
        />
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri: shopImage,
            }}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Title style={[styles.title, {
              marginTop: 15,
              marginBottom: 5,
              width:200,
              
              
              
              
            }]}>{name}</Title>
            <Caption style={styles.caption}>{userName}</Caption>
            <View className='w-[75%] flex flex-row justify-between'>
              <Badge color={isShopOpen?'bg-green-500':'bg-red-400'} status={isShopOpen?'Open':'Closed'} />
             {
             isSelfOwner && <AppToggle onToggle={onToggle} isShopOpen={isShopOpen}/>}
            </View>
          </View>
        </View>
      </View>
      <View className='flex flex-row w-full justify-between -mb-4'>
        <View style={styles.userInfoSection} className='w-4/5'>
          <View style={styles.row}>
            <Icon name="map-marker-radius" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>{fullAddress}</Text>
          </View>
          <View style={styles.row}>
            <Icon name="phone" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>{contactDetails?.contact}</Text>
          </View>
          <View style={styles.row}>
            <Icon name="email" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>{contactDetails?.email}</Text>
          </View>
        </View>
        
        {!isSelfOwner &&   <View className='mr-5 self-end mb-8'>
          <TouchableOpacity onPress={goToCall} className='w-full bg-gray-800 p-3 text-white  rounded-full mb-2 flex flex-row'>
            <Ionicons name="call-outline" color="#ffffff" size={16} />
            {/* <Text className='text-white text-xs text-center mx-2'>Call</Text> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={goToWhatsapp} className='w-full bg-gray-800 p-3 text-white rounded-full flex flex-row'>
            <Ionicons name="chatbubbles-outline" color="#ffffff" size={16} />
            {/* <Text className='text-white text-xs text-center mx-2'>Whatsapp</Text> */}
          </TouchableOpacity>
        </View>
}
      </View>
      {isSelfOwner && <View className='w-full flex flex-row mx-8 justify-between items-center'>
      <TouchableOpacity onPress={editProfile} className='h-9 p-1.5  flex flex-row border-black border bg-black text-black rounded-md'>
          <Ionicons name="pencil-outline" color="white" size={18} className='text-bold'/>

            <Text className='text-white text-semibold text-center mx-2'>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={logout} className='h-9 p-1.5 flex flex-row border-black border bg-black text-black rounded-md mr-16'>
          <Icon name="exit-to-app" color="white" size={18} className='text-bold'/>

            <Text className='text-white text-semibold text-center mx-2 w-14'>Logout</Text>
          </TouchableOpacity>

          </View>
}
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
    // lineHeight: 14,
    fontWeight: '500',
    height: 0
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