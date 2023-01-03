import React, {useState, useEffect} from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, TouchableWithoutFeedback, TextInput, Keyboard } from 'react-native';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 

import db from '../../firebase/config';

const CreatePostsScreen = ({ navigation }) => {
    const [camera, setCamera] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [location, setLocation] = useState(null);
    const [place, setPlace] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
      (async () => {
        let { status } = await Camera.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }
      })();
    }, []);

    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }
        let location = await Location.getCurrentPositionAsync();
        setLocation(location);
      })();
    }, []);

    const keyboardHide = () => {
      Keyboard.dismiss();
    }

const takePhoto = async () => {
  const photo = await camera.takePictureAsync();
  const location = await Location.getCurrentPositionAsync();
  setPhoto(photo.uri);
  setLocation(location.coords);
};

const sendPhoto = () => {
  uploadPhotoToServer();
  navigation.navigate("DefaultScreen", { photo });
  // setPlace('');
  // setDescription('');
  // sendPhoto(null);
};

const clearPost = () => {
  setPlace('');
  setDescription('');
  sendPhoto(null);
}

const uploadPhotoToServer = async () => {
  const responce = await fetch(photo);
  const file = await responce.blob();
  const uniquePostId = Date.now().toString();

  await db.storage().ref(`postImage/${uniquePostId}`).put(file);

  const processedPhoto = await db.storage().ref('postImage').child(uniquePostId).getDownloadURL();
  console.log("processedPhoto", processedPhoto);
};

return (
  <TouchableWithoutFeedback onPress={keyboardHide}>
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
       {photo && (
        <View style={styles.photoContainer}>
         <Image source={{uri: photo }} style={{height: 240,
          width: 360}} />
        </View>)}
        <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={takePhoto}>
          <Ionicons name="md-camera" size={32} color="#BDBDBD" />
        </TouchableOpacity>
      </Camera>
      <TouchableOpacity>
        {!photo ? (
          <Text>Загрузите фото</Text>
        ) : (
          <Text>Редактировать фото</Text>
        )}
      </TouchableOpacity>
        <TextInput 
               textAlign={"left"} placeholder={"Название..."} placeholderTextColor={"#bdbdbd"} value={description}
              onFocus={setDescription}
         />
        <TextInput 
               textAlign={'left'} placeholder={"Местность..."} placeholderTextColor={"#bdbdbd"} value={place}
              onFocus={setPlace} 
        />
      <View>
        <TouchableOpacity activeOpacity={0.8} style={styles.sendBtn} onPress={sendPhoto}>
         <Text style={styles.sendText}>Опубликовать</Text>
        </TouchableOpacity>
      </View>
        <TouchableOpacity activeOpacity={0.8} onPress={clearPost} >
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </TouchableOpacity>
    </View>
  </TouchableWithoutFeedback>

)
};

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      flex: 1,
      paddingVertical: 32,
      backgroundColor: "#ffffff",
      justifyContent: "space-between",
      // marginTop: 32,
      // alignItems: 'center',
    },
    camera: {
      // backgroundColor: '#E8E8E8',
      height: 240,
      width: 360,
      borderColor: "#E8E8E8",
      backgroundColor: "#F6F6F6",
      // flex: 1,
      alignItems: 'center',
      borderRadius: 20,
      marginBottom: 8,
      // justifyContent: 'center',
    },
    btn: {
      borderWidth: 1,
      borderColor: '#fff',
      width: 60,
      height: 60,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    }, 
    text: {
      color: '#fff',
    },
    photoContainer: {
     position: 'absolute',
     borderWidth: 3,
     borderRadius: 8,
     height: 240,
     width: 360,
    },
    sendBtn: {
      marginHorizontal: 30,
      height: 51,
      backgroundColor: '#FF6C00',
      borderRadius: 100,
      justifyContent: 'center',
      marginTop: 20,
      alignItems: 'center',
    },
    sendText: {
      color: "#FFFFFF",
      fontSize: 20,
    },
  });

export default CreatePostsScreen;
