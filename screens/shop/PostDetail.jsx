import React, { useState } from "react";
import { View, Image, StyleSheet, Text, Alert } from "react-native";
import { TouchableRipple } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import { collection } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { deleteSinglePost } from "../../database/deletePost";
import useGetUser from "../../hooks/useGetUser";
import Spinner from "react-native-loading-spinner-overlay";

const PostDetail = ({ route }) => {
  const { image, id,postOwnerId } = route.params;
  const [isLoading,setIsLoading] = useState(false);
  const navigation = useNavigation();
  const currentLoggedUser = useGetUser();
  console.log('user',currentLoggedUser?.uid);
  const deletePost = () => {
    
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this Post?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              setIsLoading(true);
              await deleteSinglePost(id);
              // navigation.emit('refreshPostDetails')
              // navigation.navigate('ShopProfileForUser')r
              // navigation.emit('refreshPostDetails')
              navigation.goBack({message:'refresh'})
              setIsLoading(false);
            } catch (e) {
              console.log(e);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Spinner
          visible={isLoading}
          textContent={'Deleting...'}
          textStyle={{color: '#FFF'}}
        />
      <Image source={{ uri: image }} style={styles.image} />
      {(currentLoggedUser?.uid === postOwnerId) && (
        <TouchableRipple onPress={deletePost}>
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
    </View>
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

export default PostDetail;
