import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

// import { ReactNativeFirebase } from "@react-native-firebase/app";

import { useTheme } from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { uriToBlob } from "../../utils/uriToBlob";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { uploadToProductTable } from "../../utils/uploadToFIrebase";
import { getURL } from "../../utils/getDownloadUrl";
import useGetUser from "../../hooks/useGetUser";
import Spinner from "react-native-loading-spinner-overlay";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

//  import BottomSheet from 'reanimated-bottom-sheet';
//  import Animated from 'react-native-reanimated';

const AddProduct = () => {
  const defaultURL = 'https://i.pinimg.com/736x/61/54/18/61541805b3069740ecd60d483741e5bb.jpg'
  const [image, setImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(defaultURL);
  const [selectedImageName, setSelectedImageName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const { colors } = useTheme();
  const profile = useGetUser();
  const pickImage = async () => {
    try {
      const { canceled, assets } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [1, 1], // Ensures a square aspect ratio for simplicity
        quality: 1,
      });
      if (!canceled) {
        setSelectedImage(assets[0].uri);
        setSelectedImageName(assets[0].fileName);
      }
    } catch (e) {
    }
  };

  const post = async (snapshot) => {
    const URL = await getURL(snapshot.metadata.fullPath);
    await uploadToProductTable(URL, profile?.uid, price, desc);
    setSelectedImage("");
    setSelectedImageName("");
    setPrice(null);
    setDesc(null);
    navigation.navigate("ShopProfile");
  };

  const uploadImage = async () => {
    try {
      // Implement image upload logic here
      // You can use selectedImage URI to upload the image
      setIsLoading(true);
      const blob = await uriToBlob(selectedImage);

      const storage = getStorage();
      const storageRef = ref(storage, `uploads/${selectedImageName}`);
      const snapshot = await uploadBytes(storageRef, blob);
      await post(snapshot);
    } catch (e) {
      return "";
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <ScrollView>
      <Spinner
        visible={isLoading}
        textContent={"Adding product..."}
        textStyle={{ color: "#FFF" }}
      />
      <View style={styles.container} className="bg-white">
        <KeyboardAwareScrollView>
          <View className="w-full flex flex-row justify-center mt-10 mb-4">
            <View className="flex flex-column items-center justify-center w-full relative">
              {selectedImage ? (
                <Image
                  source={{ uri: selectedImage }}
                  style={{
                    width: 200,
                    height: 200,
                    marginBottom: 20,
                    overflow: "hidden",
                    flex: 1,
                    borderColor: "black",
                    borderRadius: 10,
                  }}
                  className=""
                />
              ) : (
                <View
                  style={{
                    width: 200,
                    height: 200,
                    backgroundColor: "lightgray",
                    margin: 20,
                  }}
                />
              )}
              {selectedImage && (
                <View className="absolute bg-white p-2 rounded-full left-[45%] bottom-[0%]">
                  <FontAwesome
                    name="camera"
                    onPress={pickImage}
                    color={"black"}
                    size={22}
                  />
                </View>
              )}
            </View>
          </View>
          <View className="mx-4">
            <View className="bg-white p-2 h-16 pl-4 border border-gray-200 rounded-md my-3   flex flex-row gap-1 justify-center items-center">
              <Icon name="sticker-plus" color={colors.text} size={20} />
              <TextInput
                value={desc}
                onChangeText={(text) => setDesc(text)}
                placeholder="Description"
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
              <Icon name="currency-rupee" color={colors.text} size={20} />
              <TextInput
                value={price}
                onChangeText={(text) => setPrice(text)}
                placeholder="Price"
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

            <TouchableOpacity
              className={`bg-gray-300 p-4 rounded-md mt-4 ${
                price && selectedImage && desc ? "bg-black" : ""
              }`}
              onPress={uploadImage}
              disabled={!price || !selectedImage || !desc}
            >
              <Text style={styles.panelButtonTitle} className="text-center">
                Submit
              </Text>
            </TouchableOpacity>
            {/* /{error && (
            <View className="p-3 mt-4 bg-red-100">
              <Text className=" text-red-800">{error}</Text>
            </View>
          )} */}
          </View>
        </KeyboardAwareScrollView>
      </View>
    </ScrollView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#000000",
    alignItems: "center",
    marginTop: 10,
    width: 300,
    marginLeft: 30,
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
    marginLeft: 5,
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
