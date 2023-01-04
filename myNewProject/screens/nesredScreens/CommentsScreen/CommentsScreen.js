import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, FlatList, SafeAreaView,  } from 'react-native';

import db from '../../../firebase/config';

 const CommentsScreen = () => { 
  const [comment, setComment] = useState('');
  const [allComents, setAllComments] = useState(null);
  const { login } = useSelector((state) => state.auth);
  // const postId = route.params.id;
  // const item = route.params.item;

  const createPost = async () => {
    const date = new Date().toLocaleString();
  db.firestore().collection("posts").doc(postId).collection("comments").add({ comment, login, date });
  setComment('');
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
      <SafeAreaView style={styles.container}>
      <FlatList
        data={allComents}
        renderItem={({ item }) => (
          <View>
            <View>
              <Text>{item.login}</Text>
              <Text>{item.comment}</Text>
              {/* <Text>{item.date}</Text> */}
            </View>
            <View></View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} />
      </View>
      <TouchableOpacity style={styles.sendBtn} onPress={createPost}>
        <Text style={styles.sendLabel}>Add Post</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    inputContainer: {
      marginHorizontal: 10,
      marginBottom: 20,
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: "#FF6C00",
    },
    sendLabel: {
      color: "#FF6C00",
      fontSize: 20,
    },
    sendBtn: {
      marginHorizontal: 30,
      height: 40,
      borderWidth: 2,
      borderColor: "#FF6C00",
      borderRadius: 10,
      marginTop: 20,
      justifyContent: "center",
      alignItems: 'center',
      marginBottom: 30,
    },
  });

export default CommentsScreen;