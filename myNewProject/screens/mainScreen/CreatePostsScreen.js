import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, TouchableOpacity, View, Image, TouchableWithoutFeedback, TextInput, Keyboard } from 'react-native';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 

import db from '../../firebase/config';
import { getLogin, getUserId } from "../../redux/auth/selectors";

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
        let locationRes = await Location.getCurrentPositionAsync();
        setLocation(locationRes);
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
  uploadPostToServer();
  navigation.navigate("DefaultScreen");
  setPhoto(null);
  setPlace('');
  setDescription('');
};

const userId = useSelector(getUserId);
const login = useSelector(getLogin);

const uploadPostToServer = async () => {
  const photo = await uploadPhotoToServer();
  const createPost = await db.firestore().collection('posts').add({ photo, place, description, location, userId, login });
};

const uploadPhotoToServer = async () => {
  const responce = await fetch(photo);
  const file = await responce.blob();
  const uniquePostId = Date.now().toString();

  await db.storage().ref(`postImage/${uniquePostId}`).put(file);

  const processedPhoto = await db.storage().ref('postImage').child(uniquePostId).getDownloadURL();

  return processedPhoto;
};

const clearPost = () => {
  setPlace('');
  setDescription('');
  sendPhoto(null);
}

const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    setPhoto(result.assets[0].uri);
  }
};

return (
  <TouchableWithoutFeedback onPress={keyboardHide}>
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
       {photo && (
        <View style={styles.photoContainer}>
         <Image source={{uri: photo }} 
          style={{height: 240, width: 360 }} />
        </View>
        )}
        <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={takePhoto}>
          <Ionicons name="md-camera" size={32} color="#BDBDBD" />
        </TouchableOpacity>
      </Camera>
      <TouchableOpacity onPress={pickImage}>
        {!photo ? (
          <Text style={styles.text}>Загрузите фото</Text>
        ) : (
          <Text style={styles.text}>Редактировать фото</Text>
        )}
      </TouchableOpacity>
        <TextInput 
               textAlign={"left"} placeholder={"Название..."} placeholderTextColor={"#bdbdbd"} value={description}
              onChangeText={setDescription}
         />
        <TextInput 
               textAlign={'left'} placeholder={"Местность..."} placeholderTextColor={"#bdbdbd"} value={place}
               onChangeText={setPlace} 
        />
      <View>
        <TouchableOpacity activeOpacity={0.8} onPress={sendPhoto} disabled={photo ? false : true} style={photo ? 
          { ...styles.sendBtn, backgroundColor: "#FF6C00" } : styles.sendBtn
        }>
         <Text style={photo ? 
         { ...styles.sendText, color: "#fff" } : styles.sendText }>Опубликовать</Text>
        </TouchableOpacity>
      </View>
        <TouchableOpacity activeOpacity={0.8} onPress={clearPost} style={styles.deleteBtn}>
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
    },
    camera: {
      height: 240,
      width: 360,
      justifyContent: 'center',
      alignItems: "center",
      borderColor: "#E8E8E8",
      backgroundColor: "#F6F6F6",
      alignItems: 'center',
      borderRadius: 20,
      marginBottom: 8,
    },
    btn: {
      borderWidth: 1,
      borderColor: '#fff',
      backgroundColor: "fff",
      width: 60,
      height: 60,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    }, 
    text: {
      color: '#BDBDBD',
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
      backgroundColor: '#F6F6F6',
      borderRadius: 100,
      justifyContent: 'center',
      marginTop: 20,
      alignItems: 'center',
    },
    sendText: {
      color: "#BDBDBD",
      fontSize: 20,
    },
    deleteBtn: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F6F6F6',
      borderRadius: 20,
      marginRight: 'auto',
      marginLeft: "auto",
      height: 40,
      width: 70,
    },
  });

export default CreatePostsScreen;
