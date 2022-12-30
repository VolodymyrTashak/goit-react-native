import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DefaultScreenPosts from "../nesredScreens/DefaultPostsScreen/DefaultPostsScreen";
import CommentsScreen from "../nesredScreens/CommentsScreen/CommentsScreen";
import MapScreen from '../nesredScreens/MapScreen/MapScreen';

const NestedScreen = createNativeStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen name="DefaultScreen" component={DefaultScreenPosts} />
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