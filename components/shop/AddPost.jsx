import React, { useState } from 'react';
import { View, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AddPost = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChooseImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission Denied', 'Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ uri: pickerResult.uri });
  };

  const handleUploadImage = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image first.');
      return;
    }

    // Replace 'YOUR_UPLOAD_ENDPOINT_HERE' with your actual upload endpoint URL.
    // You can use fetch or any other library for uploading the image.

    Alert.alert('Success', 'Image uploaded successfully.');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {selectedImage && (
        <Image
          source={{ uri: selectedImage.uri }}
          style={{ width: 200, height: 200, marginBottom: 20 }}
        />
      )}
      <Button title="Choose Image" onPress={handleChooseImage} />
      {selectedImage && <View style={{ marginVertical: 10 }} />}
      <Button title="Upload Image" onPress={handleUploadImage} />
    </View>
  );
};

export default AddPost;
