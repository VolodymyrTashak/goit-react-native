import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, FlatList, SafeAreaView,  } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

import db from '../../../firebase/config';
import { getLogin } from '../../../redux/auth/selectors';

 const CommentsScreen = ({ route }) => { 
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState(null);
  const login = useSelector(getLogin);
  const postId = route.params.item.id;
  const item = route.params.item;
  const photo = route.params.item.photo;

  const createPost = async () => {
    const date = new Date().toLocaleString();
  db.firestore().collection("posts").doc(postId).collection("comments").add({ comment, login, date });
  setComment('');

  db.firestore().collection("posts").doc(postId).set({ ...item, commentsCount: allComments.length +1 });
  };

  const getAllPost = async () => {
    db.firestore().collection("posts").doc(postId).collection("comments").onSnapshot((data) => setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };

useEffect(() => {
  getAllPost();
}, [])

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.image} />
      <SafeAreaView style={styles.box}>
      <FlatList
        data={allComments}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <View style={styles.commentBox}>
              <Text style={styles.boxLogin} >{item.login}</Text>
              <Text style={styles.boxComment} >{item.comment}</Text>
              <Text style={styles.boxDate} >{item.date}</Text>
            </View>
            <View style={styles.avatar}></View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
      <View>
        <TextInput style={styles.inputContainer} value={comment} onChangeText={setComment} placeholder="Комментировать..." placeholderTextColor="#BDBDBD" />
        <TouchableOpacity style={styles.sendBtn} onPress={createPost}>
      <AntDesign name="arrowup" size={24} color="#FFF" />
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: "column",
      paddingTop: 32,
      paddingBottom: 15,
      paddingHorizontal: 16,
      backgroundColor: '#fff'
    },
    image: {
      height: 240,
      width: 343,
      borderRadius: 8,
      marginHorizontal: 16,
      marginBottom: 32,
    },
    box: {
      flex: 1,
    },
    commentBox: {
      width: 300,
      height: 80,
      marginHorizontal: 10,
      marginBottom: 10,
      padding: 10,
      backgroundColor: "#F6F6F6",
      borderColor: "#E8E8E8",
      borderWidth: 1,
      borderBottomLeftRadius: 6,
      borderBottomRightRadius: 6,
      borderTopLeftRadius: 6,
    },
    boxLogin: {
      fontFamily: "Roboto-Regular",
      color: "#FF6C00",
      marginBottom: 6,
      textAlign: "right",
    },
    boxComment: {
      fontFamily: "Roboto-Regular",
      color: "#124250",
      marginBottom: 8,
      textAlign: "right",
      fontSize: 13,
      lineHeight: 18,
    },
    boxDate: {
      fontFamily: "Roboto-Regular",
      color: "#BDBDBD",
      textAlign: "right",
      fontSize: 10,
      lineHeight: 12,
    },
    avatar: {
      height: 30,
      width: 30,
      borderRadius: 50,
      backgroundColor: "E8E8E8",
    },
    inputContainer: {
      position: "relative",
      fontFamily: "Roboto-Regular",
      color: "#212121",
      backgroundColor: "F6F6F6",
      height: 50,
      borderColor: "#E8E8E8",
      borderWidth: 1,
      paddingLeft: 15, 
      borderRadius: 50,
    },
    sendBtn: {
      position: "absolute",
      top: 10,
      left: 335,
      justifyContent: 'center',
      alignItems: "center",
      height: 34,
      width: 34,
      borderRadius: 50,
      backgroundColor: "#FF6C00",
    },
  });

export default CommentsScreen;