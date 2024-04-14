import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Main from './screens/Main';
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ShopProfile from './screens/user/ShopProfile';
import ProfileSelect from './components/ProfileSelect';
import EditProfileUser from './components/EditProfileUser';
import UserRegister from './screens/auth/UserRegister';
import EditProfileShop from './screens/shop/EditProfileShop';
import PostFile from './screens/shop/PostFile';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
        <Stack.Screen options={{headerShown: false}} name="Main" component={Main} />
        <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
        <Stack.Screen options={{headerShown: false}} name="Register" component={Register} />
        <Stack.Screen options={{headerShown: false}} name="UserRegister" component={UserRegister} />
        <Stack.Screen options={{headerShown: false}} name="ShopProfile" component={ShopProfile} />
        <Stack.Screen options={{headerShown: false}} name="ProfileSelect" component={ProfileSelect} />
        <Stack.Screen options={{headerShown: false}} name="EditProfileUser" component={EditProfileUser} />
        <Stack.Screen options={{headerShown: false}} name="EditProfileShop" component={EditProfileShop} />
        <Stack.Screen options={{headerShown: false}} name="PostFile" component={PostFile} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}
