import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { authStateChangeUser } from "../redux/auth/authOperations";
import { getStateChange } from "../redux/auth/selectors";

import LoginScreen from '../screens/auth/LoginScreen';
import RegistrationScreen from '../screens/auth/RegistrationScreen';
import Home from "../screens/mainScreen/Home";

const AuthStack = createNativeStackNavigator();

const Main = () => {
    const stateChange = useSelector(getStateChange);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authStateChangeUser());
    }, []);

return (
    <NavigationContainer>
        {stateChange ? (
            <AuthStack.Navigator>
                <AuthStack.Screen options={{
        headerShown: false,
       }}
       name='Home' component={Home} />
            </AuthStack.Navigator>
        ) : (
            <AuthStack.Navigator>
                <AuthStack.Screen options={{
        headerShown: false,
       }}
       name='Login' component={LoginScreen} />
      <AuthStack.Screen options={{
        headerShown: false,
       }}
      name='Register' component={RegistrationScreen} />
            </AuthStack.Navigator>
        )}
    </NavigationContainer>
)
}

export default Main;