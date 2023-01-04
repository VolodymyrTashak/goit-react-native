import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from "react-redux";

import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import db from '../../firebase/config';
import { authSingOutUser } from "../../redux/auth/authOperations";
import { getLogin, getUserId } from "../../redux/auth/selectors";

const ProfileScreen = ({ navigation }) => {
  const [userPosts, setUserPosts] = useState([]);
  const image = require("../../assets/imageBG.jpg");
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);
  const login = useSelector(getLogin);

  const getUserPosts = async () => {
    await db.firestore().collection("posts").where("userId", "==", userId).onSnapshot((data) => setUserPosts(data.docs.map((doc) => ({ ...doc.data() })))
    );
  };

    

    const signOut = () => {
      dispatch(authSingOutUser());
    };

    useEffect(() => {
      getUserPosts();
    }, []);

return (
 <View style={styles.container}>
  <Image source={image} />
  <View style={styles.box}>
    <Image source={image} style={styles.boxAvatar} />
      <TouchableOpacity activeOpacity={0.8} style={styles.btnAdd}>
        <AntDesign name="closecircleo" size={24} color="#BDBDBD" />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8} style={styles.btnEx} onPress={signOut}>
        <Feather name="log-out" size={24} color="#BDBDBD" />
      </TouchableOpacity>
        <Text style={styles.boxTitle}>{login}</Text>
      <FlatList
        data={userPosts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.postsBox}>
            <Image source={{ uir: item.photo }}
            style={{ width: 350, height: 200, borderRadius: 10 }} />
            <Text style={styles.postsName}>{item.description}</Text>
            <View style={styles.postsLabel}>
              <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'center', }}>
                <TouchableOpacity activeOpacity={0.8} style={styles.comments} onPress={() => navigation.navigate("Comments", { item })}>
                  <Feather name="message-circle" size={24} color={item.commentsCount ? "#FF6C00" : "#BDBDBD"} />
                  <Text style={{ ...styles.commentsCount, color: item.commentsCount ? "#124250" : "#BDBDBD"}}>{item.commentsCount ? item.commentsCount : 0}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={styles.likes} >
                 <Feather name="thumbs-up" size={24} color={item.likes ? "#FF6C00" : "#BDBDBD"} />
                </TouchableOpacity>
                <Text style={{ ...styles.commentsCount, color: item.likes ? "#124250" : "#BDBDBD"}}>
                {item.likes ? item.likes : 0}
                </Text>
              </View>
              <TouchableOpacity style={styles.place} onPress={() => navigation.navigate("Map", { location: item.location,
              placeName: item.place,
               })
               }>
                <Feather name="map-pin" size={24} color="#BDBDBD" />
                <Text style={styles.placeText}>{item.place}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
  </View>

  {/* <Text>ProfileScreen</Text> */}
 </View>
)
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: "#fff",
    },
    image: {
      position: 'absolute',
      top: 0,
      width: "100%",
      flex: 1,
    },
    box: {
      alignItems: 'center',
      height: 600,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      backgroundColor: "#fff",
    },
    boxAvatar: {
      position: 'absolute',
      top: -55,
      left: 135,
      width: 120,
      height: 120,
      borderRadius: 16,
      zIndex: 1,
    },
    btnAdd: {
      position: 'absolute',
      top: 21,
      left: 240,
      borderRadius: 20,
      backgroundColor: '#fff',
      zIndex: 2,
    },
    btnEx: {
      position: 'absolute',
      top: 25,
      right: 10,
      zIndex: 2,
    },
    boxTitle: {
      fontFamily: "Roboto-Bold",
      fontSize: 30,
      // fontWeight: 500,
      marginTop: 92,
      marginBottom:32,
      textAlign: 'center',
      color: "#124250",
      lineHeight: 35,
      letterSpacing: 0.01,
    },
    postsBox: {
      marginBottom: 32,
      paddingHorizontal: 16,
    },
    postsName: {
      fontFamily: "Roboto-Bold",
      fontSize: 16,
      color: "#124250",
      lineHeight: 19,
      marginVertical: 8,
    },
    postsLabel: {
      justifyContent: 'center',
      flexDirection: 'row',
    },
    comments: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    commentsCount: {
      fontFamily: "Roboto-Regular",
      fontSize: 16,
      lineHeight: 19,
      marginRight: 24,
      marginLeft: 6,
    },
    place: {
      flexDirection: 'row',
    },
    placeText: {
      fontFamily: "Roboto-Regular",
      fontSize: 16,
      color: "#124250",
      textDecorationLine: "underline",
      lineHeight: 19,
      marginLeft: 4,

    }
  });

export default ProfileScreen;

