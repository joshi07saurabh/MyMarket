import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";

import { ActivityIndicator, useTheme } from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context";
import useGetUser from "../../hooks/useGetUser";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import { getAuth, updateProfile } from "firebase/auth";
import getUser from "../../database/getUserProfile";
import { addUser } from "../../redux/action";
import { useDispatch } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";

const UserEditProfile = () => {
  const { colors } = useTheme();
  const profile = useGetUser();

  const [name, setName] = useState(profile?.name);
  const [city, setCity] = useState(profile?.city || "");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [error, setError] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [ isLoading,setIsLoading] = useState(false)

  const updateUser = async () => {
    if(mobile.length<10 || mobile.length>11){
      setError('Invalid mobile number');
      return;
    }
    try {
      setIsLoading(true)
      setError("");
      const userProfileRef = collection(FIRESTORE_DB, "userProfile");
      const querySnapshot = await getDocs(
        query(userProfileRef, where("uid", "==", profile.uid))
      );

      // Check if there is a matching document
      if (!querySnapshot.empty) {
        // Assuming there's only one document with the given name, you can access it directly
        const userDocRef = querySnapshot.docs[0].ref;
        const updatedProfile = {
          ...profile,
          name: name || profile.name,
          city: city || profile.city,
          phone: phone || profile.phone,
        }
        await updateDoc(userDocRef, updatedProfile);
        dispatch(
          addUser(updatedProfile)
        );
        navigation.goBack(null);
      } else {
        setError("User does not exists!");
      }
      // navigation.goBack(null)
    } catch (e) {
      setError("Something went wrong!");
    }
    finally{
      setIsLoading(false)
    }
  };

  return (
    <>
    <Spinner
          visible={isLoading}
          textContent={'Updating...'}
          textStyle={{color: '#FFF'}}
        />
    <SafeAreaView style={styles.container} className="bg-white">
      <View className="w-full flex flex-row justify-center mt-10 mb-4">
        <View className="rounded-full overflow-hidden w-20 h-20">
          <Image
            source={{
              uri: "https://media.wired.com/photos/59d6bc37b9dfe230914d0dd6/master/w_1600%2Cc_limit/fox.gif",
            }}
            className="w-20 h-20 border"
          />
        </View>
      </View>
      <View className="mx-4">
        <View className="bg-white p-2 h-16 pl-4 border border-gray-200 rounded-md my-3   flex flex-row gap-1 justify-center items-center">
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Full Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View className="bg-white p-2 h-16 pl-4 border border-gray-200 rounded-md my-3   flex flex-row gap-1 justify-center items-center">
          <Feather name="phone" color={colors.text} size={20} />
          <TextInput
            value={phone}
            onChangeText={(text) => setPhone(text)}
            placeholder="Phone"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View className="bg-white p-2 h-16 pl-4 border border-gray-200 rounded-md my-3   flex flex-row gap-1 justify-center items-center">
          <Icon name="map-marker-outline" color={colors.text} size={20} />
          <TextInput
            value={city}
            onChangeText={(text) => setCity(text)}
            placeholder="City"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>

        <TouchableOpacity
          className={`bg-gray-300 p-4 rounded-md mt-4 ${name ?'bg-black':'' }`}
          onPress={updateUser}
          disabled={!name}
        >
          <Text style={styles.panelButtonTitle} className="text-center">
            Submit
          </Text>
        </TouchableOpacity>
        {error && (
          <View className="p-3 mt-4 bg-red-100">
            <Text className=" text-red-800">{error}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
    </>
  );
};

export default UserEditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#05375a",
  },
});

//  import { View, Text } from 'react-native'
//  import React from 'react'
//  import { SafeAreaView } from "react-native-safe-area-context";

//  const EditProfileUser = () => {
//    return (
//      <SafeAreaView>
//        <Text>EditProfileUser</Text>
//      </SafeAreaView>
//    )
//  }

//  export default EditProfileUser
