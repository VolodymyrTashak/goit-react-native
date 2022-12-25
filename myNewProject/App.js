import { StyleSheet, Text, View } from 'react-native';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

 import LoginScreen from './screens/auth/LoginScreen';
import RegistrationScreen from "./screens/auth/RegistrationScreen";

import PostScreen from "./screens/mainScreen/PostsScreen";
import CreatePostsScreen from "./screens/mainScreen/CreatePostsScreen";
import ProfileScreen from "./screens/mainScreen/ProfileScreen";

import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

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
  return <MainTab.Navigator>
  <MainTab.Screen options={{
       headerShown: false, tabBarIcon: ({focused, color, size}) => <Ionicons name="grid-outline" size={size} color={color} />,
      }} name='Posts' component={PostScreen}/>
  <MainTab.Screen options={{
       headerShown: false, tabBarIcon: ({focused, color, size}) => <AntDesign name="pluscircleo" size={size} color={color} />,
      }} name='Create' component={CreatePostsScreen}/>
  <MainTab.Screen options={{
       headerShown: false, tabBarIcon: ({focused, color, size}) => <AntDesign name="user" size={size} color={color} />,
      }} name='Profile' component={ProfileScreen}/>
</MainTab.Navigator> 
}

export default function App() {
const routing = useRoute(true);
  const [fontsLoaded] = useFonts({
'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
});

  const onLayoutRootView = useCallback(async () => {
if (fontsLoaded) {
 await SplashScreen.hideAsync();
}
}, [fontsLoaded]);

if (!fontsLoaded) {
return null;
}

return (
<NavigationContainer>{routing}</NavigationContainer>
)
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
