// import { StyleSheet, Text, View } from 'react-native';

import { useCallback, useState } from 'react';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

import { store } from './redux/store';
import Main from './components/Main';

export default function App() {
  const [user, setUser] = useState(null);
  
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
  <Provider store={store}>
    <Main />
    {/* <NavigationContainer>{routing}</NavigationContainer> */}
  </Provider>
)
}

// export default function App() { 
//   return <View style={styles.container}><Text>Welcome to react native</Text></View>
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
