import { View, TextInput, ActivityIndicator, Button, SafeAreaView ,Text, TouchableOpacity} from 'react-native';
import React, { useState } from 'react'; 
import { FIREBASE_AUTH, FIRESTORE_DB} from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection } from 'firebase/firestore';
import { addUser } from '../../redux/action';
import { useDispatch } from 'react-redux';
import getUser from '../../database/getUserProfile';

const UserRegister = () => {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
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
  const dispatch = useDispatch()
  try {
  const response = await createUserWithEmailAndPassword(auth,email, password);
 const user = getAuth().currentUser
  const docRef = await addDoc(collection(FIRESTORE_DB,'userProfile'),{
    name: name,
    email: email,
    isUser: true,
    uid: user.uid
  })
  const profile = await getUser(user.uid)
  dispatch(addUser(profile))
  navigation.navigate('Main')
  } catch (error) {
  console.log(error);
  alert("Sign Up failed!" + error.Message)
  } finally{
  setLoading (false);
}
}
  

return (
<SafeAreaView className='flex flex-1 m-2 font-semibold items-center justify-center'>
  
<SafeAreaView className='flex flex-1 items-center justify-center'>
<Text className='text-4xl m-8 text-center font-semibold'>Register</Text>
<TextInput className='border rounded-xl  w-80 mb-8 px-5 py-3' value={name} placeholder ="Name" autoCapitalize ="none" onChangeText ={(text) => setName(text)}></TextInput>
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
export default UserRegister