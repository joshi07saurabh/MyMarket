import React from 'react';
import {View, SafeAreaView, StyleSheet,TouchableOpacity,Alert} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import Ionicons from 'react-native-vector-icons/Ionicons'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import useGetUser from '../../hooks/useGetUser';
import { setItemToAsyncStorage } from '../../utils/setItemAsyncStorage';

const UserProfile = () => {
  const navigation = useNavigation()
  const editProfile = ()=>{
    navigation.navigate('EditProfileUser')
  }
  const profile = useGetUser();

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
    <SafeAreaView style={styles.container} className='bg-white'>

      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image 
            source={{
              uri: profile?.profileImage || 'https://static.vecteezy.com/system/resources/previews/005/618/050/original/muzzle-dog-in-the-form-square-icon-children-avatar-cute-animal-in-cartoon-style-vector.jpg',
            }}
            size={80}
          />
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{profile?.name}</Title>
            <Text  className='text-xs text-gray-500'>{profile?.username || 'Customer'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        { profile?.city && <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{profile?.city}</Text>
        </View>}
        { profile?.phone && <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{profile?.phone}</Text>
        </View>}
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{profile?.email}</Text>
        </View>
      </View>
      <View className='w-full flex flex-row mx-8 justify-between items-center'>
      <TouchableOpacity onPress={editProfile} className='h-9 p-1.5  flex flex-row border-black border bg-black text-black rounded-md'>
          <Ionicons name="pencil-outline" color="white" size={18} className='text-bold'/>

            <Text className='text-white text-semibold text-center mx-2'>Edit Profile</Text>
          </TouchableOpacity>
      </View>

      {/* <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>₹140.50</Title>
            <Caption>Wallet</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>12</Title>
            <Caption>Orders</Caption>
          </View>
      </View> */}

      <View style={styles.menuWrapper}>
        {/* <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color="#000000" size={25}/>
            <Text style={styles.menuItemText}>Your Favorites</Text>
          </View>
        </TouchableRipple> */}
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="share" color="#000000" size={25}/>
            <Text style={styles.menuItemText}>Refer</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={()=>{}}>
          <View style={styles.menuItem}>
            {/* <Icon name="information-circle" color="#000000" size={25}/> */}
            <Icon name="information" color="#000000" size={25}></Icon>
            <Text style={styles.menuItemText}>About</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={logout}>
          <View style={styles.menuItem}>
            {/* <Icon name="information-circle" color="#000000" size={25}/> */}
            <Icon name="exit-to-app" color="#000000" size={25}></Icon>
            <Text style={styles.menuItemText}>Logout</Text>
          </View>
        </TouchableRipple>
        {/* <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="setting-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple> */}
      </View>
    </SafeAreaView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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