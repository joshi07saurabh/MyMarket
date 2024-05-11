import React from "react";
import { View, Image, StyleSheet, Text, Alert } from "react-native";
import { TouchableRipple } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import { collection } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { deleteSinglePost } from "../../database/deletePost";
import useGetUser from "../../hooks/useGetUser";

const PostDetail = ({ route }) => {
  const { image, id,postOwnerId } = route.params;
  const navigation = useNavigation();
  const currentLoggedUser = useGetUser();
  console.log('user',currentLoggedUser?.uid);
  const deletePost = () => {
    Alert.alert(
      "Logout",
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
              await deleteSinglePost(id);
              // navigation.emit('refreshPostDetails')
              // navigation.navigate('ShopProfileForUser')r
              // navigation.emit('refreshPostDetails')
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
