import { View, TextInput, ActivityIndicator, Button, SafeAreaView ,Text, TouchableOpacity} from 'react-native';
import React, { useState } from 'react'; 
import { FIREBASE_AUTH} from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { StackActions, useNavigation } from '@react-navigation/native';
import { addUser } from '../../redux/action';
import { useDispatch } from 'react-redux';
import getUser from '../../database/getUserProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setItemToAsyncStorage } from '../../utils/setItemAsyncStorage';
import { getItemFromAsyncStorage } from '../../utils/getItemAsyncStorage';
const Login = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);
const auth = FIREBASE_AUTH;

const navigation = useNavigation()
const dispatch = useDispatch()

const validateEmail = (email) => {
  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const signIn = async () => {
  setLoading (true);
  try {
    if(!email || !password){
      alert('Please enter email and password');
      setLoading (false);
      return;
    }
    // if(!validateEmail()){
      
    //   alert('Please enter valid email');
    //   setLoading (false);
    //   return;
    // }

  const response = await signInWithEmailAndPassword(auth,email, password);
  const user = getAuth().currentUser
  const profile = await getUser(user.uid)
  dispatch(addUser(profile))
  await setItemToAsyncStorage('isLoggedIn', true)
  await setItemToAsyncStorage('profile',profile)
  const value = await getItemFromAsyncStorage('isLoggedIn')
  console.log(value)

  navigation.dispatch(
    StackActions.replace('Main'))
  // navigation.navigate('Main')
  } catch (error) {
  console.log(error);
  alert("Sign In failed!" + error.Message)
  } finally{
  setLoading (false);
}
}

const signUp = async () => {
  navigation.navigate('ProfileSelect')
}
  

return (
<SafeAreaView className='flex flex-1 m-2 bg-white'>
<SafeAreaView className='flex flex-1 items-center justify-center'>
<Text className='text-4xl m-8 text-center font-semibold'>Login</Text>
<TextInput className='border rounded-xl  w-80 mb-8 px-5 py-3' value={email} placeholder ="Email" autoCapitalize ="none" onChangeText ={(text) => setEmail(text)} keyboardType="email-address"></TextInput>
<TextInput className='border rounded-xl  w-80 px-5 mb-8 py-3' secureTextEntry ={true} value={password} placeholder ="Password" autoCapitalize ="none" onChangeText ={(text) => setPassword(text)}></TextInput>
{loading? (
<ActivityIndicator size="large" color="#0000ff" />
) : (
  <>
<TouchableOpacity onPress={signIn} className='w-80 bg-black p-3 text-white rounded-xl'>
          <Text className='text-white text-xl text-center'>Login</Text>
        </TouchableOpacity>
        <Text className='m-2'>Or</Text>
        <TouchableOpacity onPress={signUp} className='w-80 mb-8 border bg-white p-3 text-white rounded-xl'>
          <Text className='text-black text-xl text-center'>Register</Text>
        </TouchableOpacity>
</>)}
</SafeAreaView>
</SafeAreaView>
)
};
export default Login