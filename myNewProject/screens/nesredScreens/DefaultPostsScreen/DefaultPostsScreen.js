import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Image, Button } from 'react-native';

const DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts(prevState => [...prevState, route.params]);
    }
  }, [route.params]);

return (
<View style={styles.container}>
  <FlatList data={posts} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => (
  <View style={{marginBottom: 10, justifyContent: 'center', alignItems: "center"}}>
    <Image source={{ uri: item.photo }} style={{ width: 350, height: 200 }}/>
    </View>)}/>
    <Button title="go to map" onPress={() => navigation.navigate("Map")} />
    <Button title="go to comments" onPress={() => navigation.navigate("Comments")} />
</View>
);
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  export default DefaultScreenPosts;