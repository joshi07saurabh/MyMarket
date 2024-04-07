import { View, TextInput, ActivityIndicator, Button, SafeAreaView ,Text, TouchableOpacity} from 'react-native';
import React, { useState } from 'react'; 
import { FIREBASE_AUTH} from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
const Register = () => {
const [email, setEmail] = useState('');
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

const navigation = useNavigation()

const signIn = async () => {
  setLoading (true);
  try {
  const response = await signInWithEmailAndPassword(auth,email, password);
  navigation.navigate('Main')
  } catch (error) {
  console.log(error);
  alert("Sign In failed!" + error.Message)
  } finally{
  setLoading (false);
}
}

const signUp = async () => {
  setLoading (true);
  try {
  const response = await createUserWithEmailAndPassword(auth,email, password);
  navigation.navigate('Main')
  } catch (error) {
  console.log(error);
  alert("Sign Up failed!" + error.Message)
  } finally{
  setLoading (false);
}
}
  

return (
<SafeAreaView className='flex flex-1 m-2'>
  <Text className='text-4xl m-8 text-center'>Register</Text>
<SafeAreaView className='flex flex-1 items-center justify-center'>
<TextInput className='border rounded-xl  w-80 mb-8 px-5 py-3' value={shop} placeholder ="Shop Name" autoCapitalize ="none" onChangeText ={(text) => setShop(text)}></TextInput>
<TextInput className='border rounded-xl  w-80 mb-8 px-5 py-3' value={address} placeholder ="Main Line Address" autoCapitalize ="none" onChangeText ={(text) => setAddress(text)}></TextInput>
<TextInput className='border rounded-xl  w-80 mb-8 px-5 py-3' value={landmark} placeholder ="Land Mark" autoCapitalize ="none" onChangeText ={(text) => setLandmark(text)}></TextInput>
<TextInput className='border rounded-xl  w-80 mb-8 px-5 py-3' value={city} placeholder ="City" autoCapitalize ="none" onChangeText ={(text) => setCity(text)}></TextInput>
<TextInput className='border rounded-xl  w-80 mb-8 px-5 py-3' value={pin} placeholder ="PIN" autoCapitalize ="none" onChangeText ={(text) => setPIN(text)}></TextInput>
<TextInput className='border rounded-xl  w-80 mb-8 px-5 py-3' value={state} placeholder ="State" autoCapitalize ="none" onChangeText ={(text) => setSatate(text)}></TextInput>
<TextInput className='border rounded-xl  w-80 mb-8 px-5 py-3' value={email} placeholder ="Email" autoCapitalize ="none" onChangeText ={(text) => setEmail(text)}></TextInput>
<TextInput className='border rounded-xl  w-80 px-5 mb-8 py-3' secureTextEntry ={true} value={password} placeholder ="Password" autoCapitalize ="none" onChangeText ={(text) => setPassword(text)}></TextInput>
<TextInput className='border rounded-xl  w-80 px-5 mb-8 py-3' secureTextEntry ={true} value={confirmpassword} placeholder ="Confirm Password" autoCapitalize ="none" onChangeText ={(text) => setConfirmPassword(text)}></TextInput>
{loading? (
<ActivityIndicator size="large" color="#0000ff" />
) : (
  <>
{/* <TouchableOpacity onPress={signIn} className='w-80 mb-4 bg-black p-3 text-white rounded-xl'>
          <Text className='text-white text-xl text-center'>Login</Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={signUp} className='w-80 mb-8 bg-black p-3 text-white rounded-xl'>
          <Text className='text-white text-xl text-center'>Register</Text>
        </TouchableOpacity>
</>)}
</SafeAreaView>
</SafeAreaView>
)
};
export default Register