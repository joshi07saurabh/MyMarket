import React, { useState } from 'react';
import { View, Text, Image, Button, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadToFirebase, uploadToPostTable } from '../../utils/uploadToFIrebase';
import { uriToBlob } from '../../utils/uriToBlob';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getURL } from '../../utils/getDownloadUrl';
import useGetUser from '../../hooks/useGetUser';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';

const AddPost = () => {
  const defaultURL = 'https://i.pinimg.com/736x/61/54/18/61541805b3069740ecd60d483741e5bb.jpg'
  const [isLoading , setLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(defaultURL);
  const [selectedImageName, setSelectedImageName] = useState('');
  const profile = useGetUser();
  const navigation = useNavigation()

  const pickImage = async () => {
    try {
      const { canceled, assets } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [1, 1], // Ensures a square aspect ratio for simplicity
      quality: 1,
      
      });

      if (!canceled) {
        setSelectedImage(assets[0].uri)
        setSelectedImageName(assets[0].fileName)
      }
    } catch (error) {
    }
  };

  const post = async (snapshot) => {
    setLoading(true);
    const URL =await getURL(snapshot.metadata.fullPath)
    await uploadToPostTable(URL,profile?.uid)
    setSelectedImage(defaultURL)
    setSelectedImageName('')
    setLoading(false)
    navigation.navigate('ShopProfile')
  }

  const uploadImage = () => {
    // Implement image upload logic here
    // You can use selectedImage URI to upload the image
    uriToBlob(selectedImage).then((blob) => {

      const storage = getStorage();
      const storageRef = ref(storage, `uploads/${selectedImageName}`);
      uploadBytes(storageRef, blob).then((snapshot) => {
       post(snapshot)
      });

    })
  };
  const windowWidth = Dimensions.get('window').width;
  const imageBoxSize = windowWidth - 40;
  return (
    <View>
            <Spinner
          visible={isLoading}
          textContent={'Uploading Post...'}
          textStyle={{color: '#FFF'}}
        />
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
      {selectedImage ? (
        <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200, marginBottom: 20, overflow:'hidden', flex:1, borderColor:'black',borderRadius:10, }}  className=''/>
      ) : (
        <View style={{ width: 200, height: 200, backgroundColor: 'lightgray', margin: 20 }} />
      )}

      <Button title="Choose Image" onPress={pickImage} color={'black'}  />

      <View style={{ marginTop: 20 }}>
        <Button title="Upload Image" onPress={uploadImage}color={'black'} disabled={!selectedImage || selectedImage===defaultURL} />
      </View>
    </View>
    </View>
  );
};

export default AddPost;
