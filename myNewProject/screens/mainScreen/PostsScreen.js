import { useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from '@expo/vector-icons'; 

import DefaultScreenPosts from "../nesredScreens/DefaultPostsScreen/DefaultPostsScreen";
import CommentsScreen from "../nesredScreens/CommentsScreen/CommentsScreen";
import MapScreen from '../nesredScreens/MapScreen/MapScreen';

import { authSingOutUser } from '../../redux/auth/authOperations';

const NestedScreen = createNativeStackNavigator();

const PostsScreen = () => {
  const dispatch = useDispatch();
  
  const signOut = () => {
    dispatch(authSingOutUser());
  };

  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen name="Posts" component={DefaultScreenPosts} 
      options={{
        headerRight: () => (
          <TouchableOpacity activeOpacity={0.8} style={{ marginRight: 16 }} onPress={signOut}>
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        ),
        headerStyle: {
          borderBottomWidth: 1,
          borderBottomColor: "#E8E8E8",
        },
        headerTitleAlign: 'center',
      }} />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  )
};

export default PostsScreen;

// import React, { useEffect, useState } from "react";
// import { StyleSheet, Text, View, FlatList, Image } from 'react-native';

// const PostsScreen = ({ route }) => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     if (route.params) {
//       setPosts(prevState => [...prevState, route.params]);
//     }
//   }, [route.params]);

// return (
// <View style={styles.container}>
//   <FlatList data={posts} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => (
//   <View style={{marginBottom: 10, justifyContent: 'center', alignItems: "center"}}>
//     <Image source={{ uri: item.photo }} style={{ width: 350, height: 200 }}/>
//     </View>)}/>
// </View>
// );
// };

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//   });

// export default PostsScreen;