import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { View, Image, Text, FlatList, TouchableOpacity, Button  } from "react-native";
import { Feather } from '@expo/vector-icons'; 

import db from "../../../firebase/config";
import styles from "./DefaultScreenPosts.styled";

const DefaultScreenPosts = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  const { email, login } = useSelector((state) => state.auth);

  const getAllPost = async () => {
   await db.firestore().collection('post').onSnapshot((data) => 
   setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
   );
  }

  useEffect(() => {
    getAllPost();
  }, []);

  // useEffect(() => {
  //   if (route.params) {
  //     setPosts(prevState => [...prevState, route.params]);
  //   }
  // }, [route.params]);

return (
<View style={styles.container}>
  <View style={styles.profileBox}>
    <Image source={require("../../../assets/imageBG.jpg")} style={{ height: 60, width: 60, borderRadius: 20 }} />
    <View style={styles.textBox}>
      <Text style={styles.profileName}>{login}</Text>
      <Text style={styles.profileName}>{email}</Text>
    </View>
  </View>
  <FlatList data={posts} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => (
  <View style={styles.postBox}>
    <Image source={{ uri: item.photo }} style={{ width: 350, height: 200, borderRadius: 10 }}/>
    <Text style={styles.postName}>{item.description}</Text>
    <View style={styles.postLabel}>
      <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
      <TouchableOpacity style={styles.comments} onPress={() => navigation.navigate("Comments", { item, })}>
    <Feather name="message-circle" size={24} color={item.count ? "#FF6C00" : "#BDBDBD"} />
        <Text style={{...styles.comments, color: item.comments ? "#124250" : "#BDBDBD",}}>{item.comments ? item.comments : 0}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.likes} onPress={() => {}}>
    <Feather name="thumbs-up" size={24} color={item.likes ? "#FF6C00" : "#BDBDBD"} />
    </TouchableOpacity>
    <Text style={{...styles.comments, color: item.likes ? "#124250" : "#BDBDBD",}}>{item.likes ? item.likes : 0}</Text>
      </View>
      <View>
      <TouchableOpacity style={styles.place} onPress={() => navigation.navigate("Map")}>
       <Feather name="map-pin" size={24} color="#BDBDBD" />
       <Text style={styles.placeText}>Map</Text>
      </TouchableOpacity>
      </View>
    </View>
    </View>
    )}/>
    
    <Button title="go to map" onPress={() => navigation.navigate("Map")} />
    <Button title="go to comments" onPress={() => navigation.navigate("Comments")} />
</View>
);
};

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//   });

  export default DefaultScreenPosts;