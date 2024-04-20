import React, { useState } from 'react';
import { View, Button, Image, ActivityIndicator } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const ShopUploadPhoto = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const selectPhoto = () => {
    ImagePicker.showImagePicker({ title: 'Select Photo' }, (response) => {
      if (!response.didCancel) {
        setSelectedPhoto(response);
      }
    });
  };

  const uploadPhoto = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('photo', {
        uri: selectedPhoto.uri,
        type: selectedPhoto.type,
        name: selectedPhoto.fileName,
      });

      // Replace 'YOUR_UPLOAD_URL' with your actual upload API endpoint
      const response = await axios.post('YOUR_UPLOAD_URL', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload response:', response.data);

      // Handle success - navigate to success screen or display a success message
    } catch (error) {
      console.error('Error uploading photo:', error);
      // Handle error - display an error message to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {selectedPhoto ? (
        <Image source={{ uri: selectedPhoto.uri }} style={{ width: 200, height: 200 }} />
      ) : (
        <Button title="Select Photo" onPress={selectPhoto} />
      )}

      {selectedPhoto && (
        <Button title="Upload Photo" onPress={uploadPhoto} disabled={loading} />
      )}

      {loading && <ActivityIndicator style={{ marginTop: 20 }} />}
    </View>
  );
};

export default ShopUploadPhoto;


