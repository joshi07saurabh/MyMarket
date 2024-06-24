import React, { useState } from "react";
import { View, Image, StyleSheet, Text, Alert } from "react-native";
import { TouchableRipple } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import { collection } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import useGetUser from "../../hooks/useGetUser";
import Spinner from "react-native-loading-spinner-overlay";
import { deleteSingleProduct } from "../../database/deleteProduct";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductDetail = ({ route }) => {
  const { product, id, postOwnerId } = route.params;
  const [isLoading,setIsLoading] = useState(false);
  const navigation = useNavigation();
  const currentLoggedUser = useGetUser();
  const deleteProduct = () => {
    
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this Product?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              setIsLoading(true);
              await deleteSingleProduct(id);
              // navigation.emit('refreshPostDetails')
              // navigation.navigate('ShopProfileForUser')r
              // navigation.emit('refreshPostDetails')
              navigation.goBack({message:'refresh'})
              setIsLoading(false);
            } catch (e) {
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner
          visible={isLoading}
          textContent={'Deleting...'}
          textStyle={{color: '#FFF'}}
        />
      <Image source={{ uri: product.imageUrl }}  style={styles.image} />
      {(currentLoggedUser?.uid === postOwnerId) && (
        <TouchableRipple onPress={deleteProduct}>
          <View
            style={styles.menuItem}
            className="mb-20 flex flex-row justify-center items-center h-10 p-3"
          >
            {/* <Icon name="information-circle" color="#000000" size={25}/> */}
            <Icon name="delete" color="#000000" size={25}></Icon>
            <Text style={styles.menuItemText}>Delete Post</Text>
          </View>
        </TouchableRipple>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default ProductDetail;
