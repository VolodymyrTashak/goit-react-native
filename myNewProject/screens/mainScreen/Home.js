import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import PostScreen from './PostsScreen';
import CreatePostsScreen from './CreatePostsScreen';
import ProfileScreen from './ProfileScreen';

const MainTab = createBottomTabNavigator();

const Home = ({ navigation }) => {
return (
    <MainTab.Navigator 
    initialRouteName='Posts'
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
    }}
    >
        <MainTab.Screen 
          name='Posts' 
          component={PostScreen} 
          options={{
           headerShown: false, 
           tabBarIcon: ({focused, color, size}) => (
              <TouchableOpacity>
                  <Ionicons name="grid-outline" size={size} color={color} focused={focused}/>
              </TouchableOpacity>
           ),
           tabBarHideOnKeyboard: true,
           tabBarItemStyle: {
            height: 40,
            width: 70,
           },
          }} 
        />
        <MainTab.Screen  
            name='Create' 
            component={CreatePostsScreen} 
            options={{
                 headerShown: false, 
                 tabBarIcon: ({focused, color, size}) => (
                    <TouchableOpacity>
                        <AntDesign name="pluscircleo" size={size} color="#FFFFFF" focused={focused} />
                    </TouchableOpacity>
                 ),
                 tabBarHideOnKeyboard: true,
                 tabBarStyle: {
                    display: "none",
                },
                tabBarItemStyle: {
                    height: 40,
                    width: 70,
                    backgroundColor: "#124250",
                    borderRadius: 20,
                    marginHorizontal: 31,
                   },
                   headerLeft: () => (
                    <TouchableOpacity
                     activeOpacity={0.8}
                      style={{marginLeft: 16 }}
                       onPress={() => navigation.navigate("Posts")}>
                         <Feather name="arrow-left" size={24} color="#BDBDBD" />
                    </TouchableOpacity>
                   ),
                   headerStyle: {
                    borderBottomColor: '#E8E8E8',
                    borderBottomWidth: 1,
                   },
                   headerTitleAlign: 'center',
                }}
        />
        <MainTab.Screen 
           name='Profile' 
           component={ProfileScreen} 
           options={{
            headerShown: false, 
            tabBarIcon: ({focused, color, size}) => (
               <TouchableOpacity>
                   <AntDesign name="user" size={size} color={color} focused={focused}/>
               </TouchableOpacity>
            ),
            tabBarHideOnKeyboard: true,
            tabBarItemStyle: {
                width: 70,
                height: 40,
            },
            headerShown: false,
            headerRight: () => (
                <TouchableOpacity
                 activeOpacity={0.8}
                  style={{marginRight: 16 }}>
                     <Feather name="log-out" size={24} color="#BDBDBD" />
                </TouchableOpacity>
               ),
           }}
        />
    </MainTab.Navigator>
);
};

export default Home;