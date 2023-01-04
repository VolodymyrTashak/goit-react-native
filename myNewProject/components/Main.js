import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';

import db from "../firebase/config";
import { authStateChangeUser } from "../redux/auth/authOperations";
import LoginScreen from '../screens/auth/LoginScreen';
import RegistrationScreen from '../screens/auth/RegistrationScreen';
import PostsScreen from "../screens/mainScreen/PostsScreen";
import CreatePostsScreen from "../screens/mainScreen/CreatePostsScreen";
import ProfileScreen from "../screens/mainScreen/ProfileScreen";

import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

const useRoute = (isAuth) => {
    if(!isAuth){
      return <AuthStack.Navigator>
      <AuthStack.Screen options={{
        headerShown: false,
       }}
       name='Login' component={LoginScreen} />
      <AuthStack.Screen options={{
        headerShown: false,
       }}
      name='Register' component={RegistrationScreen} />
     </AuthStack.Navigator>
    }
    return <MainTab.Navigator initialRouteName='Posts'
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
        //  tabBarStyle: {
        //     display: 'none',
        //  },
         tabBarItemStyle: {
            height: 40,
            width: 50,
            backgroundColor: "#FF6C00",
            marginHorizontal: 31,
            borderRadius: 20,
         },
         tabBarHideOnKeyboard: true,
         headerLeft: () => (
            <TouchableOpacity activeOpacity={0.7} style={{ marginLeft: 16 }} onPress={() => {}} >
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
            <TouchableOpacity activeOpacity={0.8} style={{ marginRight: 16 }}>
                <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
         }
        }} name='Profile' component={ProfileScreen}/>
  </MainTab.Navigator> 
  }

const Main = () => {
    const { stateChange } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const routing = useRoute(stateChange);
    useEffect(() => {
        dispatch(authStateChangeUser());
    }, []);
return (
    <NavigationContainer>{routing}</NavigationContainer>
)
}

export default Main;