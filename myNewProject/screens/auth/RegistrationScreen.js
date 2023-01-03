import { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Dimensions, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useDispatch } from 'react-redux';

import { authSingUpUser } from '../../redux/auth/authOperations';

SplashScreen.preventAutoHideAsync();

const initialState = {
login: '',
email: '',
password: '',
}

const RegistrationScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();

  // const [dimensions, setDimensions] = useState(Dimensions.get('window').width -20 * 2);

// useEffect(() => {
//   const onChange = () => {
//     const windowWidth = Dimensions.get('window').width -20 * 2;
//     setDimensions(windowWidth)
//     console.log("width:", windowWidth)
//   };
//   Dimensions.addEventListener("change", onChange);
//   return () => {
//     Dimensions.removeEventListener("change", onChange);
//   }
// //   const windowWidth = Dimensions.get('window').width;
// // const windowHeight = Dimensions.get('window').height;
// }, [])

const keyboardHide = () => {
  setIsShowKeyboard(false);
  Keyboard.dismiss();
}

  const hundleSubmit = () => {
    dispatch(authSingUpUser(state));
    setState(initialState);
    console.log("state: ", state);
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide} >
<View style={styles.container}>
      <ImageBackground
      style={styles.image} 
      source={require("../../assets/imageBG.jpg")}
      >
        <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
        <View style={{...styles.form, height: !isShowKeyboard ? 549 : 374, paddingBottom: !isShowKeyboard ? 78 : 0,}}>
          <View style={styles.boxAvatar}>
            <View style={styles.backgroundAvatar}></View>
            <TouchableOpacity style={styles.btnAddAvatar}>
              <Image style={styles.addAvatar} source={require("../../assets/addAvatar.jpg")} />
              </TouchableOpacity>
          </View>
          <Text style={styles.title}>Регистрация</Text>
          <TextInput 
          style={styles.input} textAlign={"center"} placeholder={"Логин"} placeholderTextColor={"#bdbdbd"} 
          value={state.login}
          onFocus={() => setIsShowKeyboard(true)}
          onChangeText={(value) => setState((prevState) => ({...prevState, login: value}))} 
          />
          <TextInput 
          style={styles.input} textAlign={"center"} placeholder={"Адрес электронной почты"} placeholderTextColor={"#bdbdbd"} 
          value={state.email}
          onFocus={() => setIsShowKeyboard(true)}
          onChangeText={(value) => setState((prevState) => ({...prevState, email: value}))}
          />
          <TextInput 
          style={{...styles.input, marginBottom: !isShowKeyboard ? 43 : 180,}} textAlign={"center"} placeholder={"Пароль"} placeholderTextColor={"#bdbdbd"} secureTextEntry={true} 
          value={state.password}
          onFocus={() => setIsShowKeyboard(true)}
          onChangeText={(value) => setState((prevState) => ({...prevState, password: value}))}
          />
          <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={hundleSubmit} >
           <Text style={styles.buttonText} >Зарегистрироваться</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("Login")} >
           <Text style={styles.logText}>Уже есть аккаунт? Войти</Text>
          </TouchableOpacity>
      </View>
        </KeyboardAvoidingView>
    </ImageBackground>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
     width: "100%",
     paddingHorizontal: 16,
     backgroundColor: '#fff',
     alignItems: 'center',
     borderTopRightRadius: 25,
     borderTopLeftRadius: 25,
  },
  boxAvatar: {
    position: "absolute",
    top: -60,
    right: "50%",
    justifyContent: "center",
    width: 132,
    transform: [{translateX: 50}],
  },
  backgroundAvatar: {
    height: 120,
    width: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  btnAddAvatar: {
    position: "absolute",
    bottom: 14,
    right: 0,
  },
  addAvatar: {
    borderRadius: 100,
  },
  title: {
    fontSize: 30,
    fontFamily: "Roboto-Medium",
    color: "#212121",
    marginBottom: 22,
    marginTop: 72,
  },
  input: {
    fontFamily: "Roboto-Regular",
    borderWidth: 1,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderColor: "#e8e8e8",
    height: 50,
    borderRadius: 8,
    backgroundColor: "#f6f6f6",
    width: 343,
  },
  button: {
  backgroundColor: "#FF6C00",
  alignItems: "center",
  paddingHorizontal: 32,
  paddingVertical: 16,
  borderRadius: 100,
  justifyContent: "center",   
  height: 51,
  width: 343,
  marginBottom: 16,
  }, 
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
  },
  logText: {
    color: "#1B4371",
    textAlign: "center",
    fontSize: 16,
  },
});

export default RegistrationScreen;