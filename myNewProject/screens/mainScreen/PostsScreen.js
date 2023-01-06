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
