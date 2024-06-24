import './index.css'
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/StartScreen';
import Main from './screens/Main';
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ShopProfile from './screens/ShopProfile';
import ProfileSelect from './screens/auth/ProfileSelect';
import EditProfileUser from './screens/user/UserEditProfile';
import UserRegister from './screens/auth/UserRegister';
import EditProfileShop from './screens/shop/ShopEditProfile';
import PostFile from './components/shop/ShopUploadPhoto';
import { Provider } from 'react-redux';
import store from './redux/store';
import ShopProfileForUser from './screens/user/ShopProfileForUser';
import PostDetail from './screens/shop/PostDetail';
import ShopEditProfile from './screens/shop/ShopEditProfile';
import ProductDetail from './screens/shop/ProductDetail';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
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
        <Stack.Screen options={{headerShown: false}} name="ShopProfileForUser" component={ShopProfileForUser} />
        <Stack.Screen options={{headerShown: false}} name="PostFile" component={PostFile} />
        <Stack.Screen options={{headerShown: false}} name="PostDetail" component={PostDetail} />
        <Stack.Screen options={{headerShown: false}} name="ProductDetail" component={ProductDetail} />
        <Stack.Screen options={{headerShown: false}} name="ShopEditProfile" component={ShopEditProfile} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
    </SafeAreaProvider>
  );
}
