import React, { useState } from 'react';
import { View, Text, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AddPost = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    try {
      const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        
      });

      if (!cancelled) {
        setSelectedImage(uri);
        console.log(uri)
      }
    } catch (error) {
      console.log('Error picking image:', error);
    }
  };

  const uploadImage = () => {
    // Implement image upload logic here
    // You can use selectedImage URI to upload the image
    console.log("Uploading image:", selectedImage);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',  marginTop: 30 }}>
      {selectedImage ? (
        <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200, marginBottom: 20 }} />
      ) : (
        <View style={{ width: 200, height: 200, backgroundColor: 'lightgray', marginBottom: 20 }} />
      )}

      <Button title="Choose Image" onPress={pickImage} />

      <View style={{ marginTop: 20 }}>
        <Button title="Upload Image" onPress={uploadImage} disabled={!selectedImage} />
      </View>
    </View>
  );
};

export default AddPost;
