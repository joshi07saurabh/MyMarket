import { View, TextInput, ActivityIndicator, Button, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { StackActions, useNavigation } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { addDoc, collection } from 'firebase/firestore';
import { addUser } from '../../redux/action';
import { useDispatch } from 'react-redux';
import getUser from '../../database/getUserProfile';
import { setItemToAsyncStorage } from '../../utils/setItemAsyncStorage';

const Register = () => {
  const [email, setEmail] = useState('');
  const [mobile,setMobile] = useState('');
  const [shop, setShop] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pin, setPIN] = useState('');
  const [state, setSatate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const dispatch = useDispatch()

  const navigation = useNavigation()
  const validateEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validateShopName = (shop) => {
    // Name should not contain special characters
    const nameRegex = /^[a-zA-Z\s]*$/;
    return nameRegex.test(shop);
  };
  const validateCity = (city) => {
    // Name should not contain special characters
    const nameRegex = /^[a-zA-Z\s]*$/;
    return nameRegex.test(city);
  };
  const validateState = (state) => {
    // Name should not contain special characters
    const nameRegex = /^[a-zA-Z\s]*$/;
    return nameRegex.test(state);
  };


  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Main')
    } catch (error) {
      console.log(error);
      alert("Sign In failed!" + error.Message)
    } finally {
      setLoading(false);
    }
  }

  const signUp = async () => {
    setLoading(true);
    try {
      if (!email || !mobile || !address || !password || !city || !state || !confirmpassword || !pin || !shop){
        alert("All fields are required")
        return;
      }
      if (password!== confirmpassword) {
        alert("Passwords do not match")
        return;
      }
      if (!validateEmail(email)) {
        alert('Invalid email address');
        return;
      }
      if(mobile.length<10){
        alert('Invalid mobile number');
        return;
      }
      if(pin.length<6){
        alert('Invalid PIN');
        return;
      }
      if(password.length<8){
        alert('Password should be atleast 8 characters');
        return;
      }
      if (!validateShopName(shop)) {
        alert('Shop Name should not contain special characters or numbers');
        return;
      }
      if (!validateCity(city)) {
        alert('City Name should not contain special characters or numbers');
        return;
      }
      if (!validateCity(state)) {
        alert('State Name should not contain special characters or numbers');
        return;
      }
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = getAuth().currentUser
      const docRef = await addDoc(collection(FIRESTORE_DB,'shopProfile'),{
        email: email,
        isUser: false,
        uid: user.uid,
        mobileNumber: mobile,
        shopName: shop,
        mainAdd: address,
        cityAdd: city,
        landmarkAdd: landmark,
        pinAdd: pin,
        stateAdd: state
      })
      const profile = await getUser(user.uid)
      dispatch(addUser(profile))
      await setItemToAsyncStorage('isLoggedIn', true)
      // console.log(docRef)
      navigation.dispatch(
        StackActions.replace('Main'))
    } catch (error) {
      console.log(error);
      alert("Sign Up failed!" + error.Message)
    } finally {
      setLoading(false);
    }
  }


  return (
    <SafeAreaView className='flex flex-1 m-2'>
      <Text className='text-4xl m-8 text-center font-semibold'>Register</Text>
      <ScrollView>
        <View  className='flex items-center justify-center w-full'>
          <TextInput className='border rounded-xl  w-80 mb-6 px-5 py-3' value={shop} placeholder="Shop Name" autoCapitalize="none" onChangeText={(text) => setShop(text)}></TextInput>
          <TextInput className='border rounded-xl  w-80 mb-6 px-5 py-3' value={email} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)} keyboardType="email-address"></TextInput>
          <TextInput className='border rounded-xl  w-80 mb-6 px-5 py-3' inputMode='numeric' value={mobile} placeholder="Mobile Number" autoCapitalize="none" onChangeText={(text) => setMobile(text)}></TextInput>
          <TextInput className='border rounded-xl  w-80 mb-6 px-5 py-3' value={address} placeholder="Main Line Address" autoCapitalize="none" onChangeText={(text) => setAddress(text)}></TextInput>
          <TextInput className='border rounded-xl  w-80 mb-6 px-5 py-3' value={landmark} placeholder="Land Mark" autoCapitalize="none" onChangeText={(text) => setLandmark(text)}></TextInput>
          <View className='flex flex-row justify-between w-[85%]'>
          <TextInput className='border rounded-xl  w-2/3 mb-6 px-5 py-3 mr-1' value={city} placeholder="City" autoCapitalize="none" onChangeText={(text) => setCity(text)}></TextInput>
          <TextInput className='border rounded-xl  w-1/3 mb-6 px-5 py-3' inputMode='numeric' value={pin} placeholder="PIN" autoCapitalize="none" onChangeText={(text) => setPIN(text)}></TextInput>
          </View>
          <TextInput className='border rounded-xl  w-80 mb-6 px-5 py-3' value={state} placeholder="State" autoCapitalize="none" onChangeText={(text) => setSatate(text)}></TextInput>
          <TextInput className='border rounded-xl  w-80 px-5 mb-6 py-3' secureTextEntry={true} value={password} placeholder="Password" autoCapitalize="none" onChangeText={(text) => setPassword(text)}></TextInput>
          <TextInput className='border rounded-xl  w-80 px-5 mb-6 py-3' secureTextEntry={true} value={confirmpassword} placeholder="Confirm Password" autoCapitalize="none" onChangeText={(text) => setConfirmPassword(text)}></TextInput>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <TouchableOpacity onPress={signUp} className='w-80 mb-6 bg-black p-3 text-white rounded-xl'>
                <Text className='text-white text-xl text-center'>Register</Text>
              </TouchableOpacity>
            </>
          )
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )};

export default Register;