import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, FlatList, SafeAreaView,  } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

import db from '../../../firebase/config';
import { getLogin } from '../../../redux/auth/selectors';
import styles from './CommentsScreen.styled';

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
      <SafeAreaView style={{ flex: 1 }}>
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

export default CommentsScreen;