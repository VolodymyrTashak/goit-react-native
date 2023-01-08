import { useDispatch } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import { authSingOutUser } from "../../redux/auth/authOperations";

import PostsScreen from './PostsScreen';
import CreatePostsScreen from './CreatePostsScreen';
import ProfileScreen from './ProfileScreen';

const MainTab = createBottomTabNavigator();

const Home = ({ navigation }) => {
    const dispatch = useDispatch();

    const signOut = () => {
        dispatch(authSingOutUser());
      };
      
return (
    <MainTab.Navigator initialRouteName='Posts'
     screenOptions={{
        tabBarstyle: {
            height: 80,
            paddingHorizontal: 60,
            paddingTop: 9,
            paddingBottom: 25,
        },
        tabBarActiveTintColor: "#FF6C00",
        tabBarInactiveTintColor: "#124250",
        tabBarShowLabel: false,
      }}>
        <MainTab.Screen options={{
            tabBarIcon: ({focused, color, size}) => <Ionicons name="grid-outline" size={size} color={color} focused={focused} />,
         headerShown: false, 
         tabBarItemStyle: {
            height: 40,
            width: 70,
         },
         tabBarHideOnKeyboard: true,
        }} name='Posts' component={PostsScreen}/>
        <MainTab.Screen options={{
            tabBarIcon: ({focused, size}) => <AntDesign name="plus" size={size} focused={focused} color="#FFFFFF" />,
         tabBarStyle: {
            display: 'none',
         },
         tabBarItemStyle: {
            height: 40,
            width: 50,
            backgroundColor: "#FF6C00",
            marginHorizontal: 31,
            borderRadius: 20,
         },
         tabBarHideOnKeyboard: true,
         headerLeft: () => (
            <TouchableOpacity activeOpacity={0.7} style={{ marginLeft: 16 }} onPress={() => navigation.navigate("Posts")} >
                <AntDesign name="arrowleft" size={24} color="#BDBDBD" />
            </TouchableOpacity>
         )
        }} name='Create Posts' component={CreatePostsScreen}/>
       <MainTab.Screen options={{
        tabBarIcon: ({focused, color, size}) => <AntDesign name="user" size={size} color={color} focused={focused} />,
         headerShown: false,
         tabBarItemStyle: {
            height: 40,
            width: 70,
         },
         tabBarHideOnKeyboard: true,
         headerRight: () => {
            <TouchableOpacity activeOpacity={0.8} style={{ marginRight: 16 }} onPress={signOut}>
                <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
         }
        }} name='Profile' component={ProfileScreen}/>
  </MainTab.Navigator> 
);
};

export default Home;