import { View, StyleSheet, TouchableOpacity } from 'react-native';
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
import React, { useState } from 'react'
import { Linking } from 'react-native'
import Badge from '../../components/badge/Badge';
import AppToggle from '../../components/app-toggle/AppToggle';
import { useNavigation } from "@react-navigation/native";
//import ShopProfile from '../../screens/ShopProfile'
import ShopProfileTabBar from '../../components/shop/ShopProfileTabBar';
import useGetUser from '../../hooks/useGetUser';
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../FirebaseConfig';


const ShopFullProfile = ({ shopImage, shopName, contactDetails, userName = '', fullAddress,isShopOpen }) => {
  const [isCustomer,setIsCustomer] = useState(false)
  const profile = useGetUser()
  
  // const goToCall = () => {
  //   Linking.openURL(`tel:${contactDetails.contact}`)
  // }
  // const goToWhatsapp = () => {
  //   Linking.openURL(`whatsapp://send?phone=${contactDetails.contact}`)
  // }
  const navigation= useNavigation()
  const onToggle =async ()=>{

    const userProfileRef = collection(FIRESTORE_DB, "shopProfile");
      const querySnapshot = await getDocs(
        query(userProfileRef, where("uid", "==", profile?.uid))
      );

      // Check if there is a matching document
      if (!querySnapshot.empty) {
        // Assuming there's only one document with the given name, you can access it directly
        const userDocRef = querySnapshot.docs[0].ref;
        const updatedProfile = {
          ...profile,
          isShopOpen: !isShopOpen
        }

        await updateDoc(userDocRef, updatedProfile);
      }
  }
  
  const editProfile = ()=>{
    navigation.navigate('ShopEditProfile')
  }
  return (
    <SafeAreaView className='bg-white'>
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
              width:290
              
            }]}>{shopName}</Title>
            <Caption style={styles.caption}>{userName}</Caption>
            <View className='w-[80%] flex flex-row justify-between'>
              <Badge color={isShopOpen?'bg-green-500':'bg-red-400'} status={isShopOpen?'Open':'Closed'} />
             {!isCustomer && <AppToggle onToggle={onToggle} isShopOpen={isShopOpen}/>}
            </View>
          </View>
        </View>
      </View>
      <View className='flex flex-row w-full justify-between -mb-4'>
        <View style={styles.userInfoSection} className='w-3/5'>
          <View style={styles.row}>
            <Icon name="map-marker-radius" color="#777777" size={20} />
            {/* <Text style={{ color: "#777777", marginLeft: 20 }}>{fullAddress}</Text> */}
            <Text style={{ color: "#777777", marginLeft: 20 }}>Jaspur</Text>
          </View>
          <View style={styles.row}>
            <Icon name="phone" color="#777777" size={20} />
            {/* <Text style={{ color: "#777777", marginLeft: 20 }}>{contactDetails.contact}</Text> */}
            <Text style={{ color: "#777777", marginLeft: 20 }}>1234567890</Text>
          </View>
          <View style={styles.row}>
            <Icon name="email" color="#777777" size={20} />
            {/* <Text style={{ color: "#777777", marginLeft: 20 }}>{contactDetails.email}</Text> */}
            <Text style={{ color: "#777777", marginLeft: 20 }}>joshi@gmail.com</Text>
          </View>
        </View>
        
        {isCustomer &&   <View className='mr-5 self-end mb-8'>
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
      <View className='w-full flex flex-row mx-8 justify-between items-center'>
      <TouchableOpacity onPress={editProfile} className='h-9 p-1.5  flex flex-row border-black border bg-black text-black rounded-md'>
          <Ionicons name="pencil-outline" color="white" size={18} className='text-bold'/>

            <Text className='text-white text-semibold text-center mx-2'>Edit Profile</Text>
          </TouchableOpacity>
          <View style={styles.row} className='mr-14 mt-3'>
            {/* <Icon name="eye" color="black" size={20} />
            <Text style={{ color: "black", marginLeft: 20 }} >123 Views</Text> */}
            <TouchableOpacity onPress={uploadpost} className='h-9 p-1.5  flex flex-row border-black border bg-black text-black rounded-md'>
          <Ionicons name="pencil-outline" color="white" size={18} className='text-bold'/>

            <Text className='text-white text-semibold text-center mx-2'>Upload Post</Text>
          </TouchableOpacity>
          </View>
          </View>
          <ShopProfileTabBar id={profile?.uid}></ShopProfileTabBar>
    </SafeAreaView>
  )
}

export default ShopFullProfile; 

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