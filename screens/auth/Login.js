import { View, TextInput, ActivityIndicator, Button, SafeAreaView ,Text, TouchableOpacity} from 'react-native';
import React, { useState } from 'react'; 
import { FIREBASE_AUTH} from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
const Login = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
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
  navigation.navigate('ProfileSelect')
}
  

return (
<SafeAreaView className='flex flex-1 m-2 bg-white'>
<SafeAreaView className='flex flex-1 items-center justify-center'>
<Text className='text-4xl m-8 text-center font-semibold'>Login</Text>
<TextInput className='border rounded-xl  w-80 mb-8 px-5 py-3' value={email} placeholder ="Email" autoCapitalize ="none" onChangeText ={(text) => setEmail(text)}></TextInput>
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