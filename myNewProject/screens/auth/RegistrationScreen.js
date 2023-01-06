import { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Dimensions, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useDispatch } from 'react-redux';

import { AntDesign } from '@expo/vector-icons'; 

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
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [iconName, setIconName] = useState("pluscircleo");
  const [iconColor, setIconColor] = useState("#FF6C00");
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

const onChangePhoto= () => {
 if (iconName === "pluscircleo") {
  setIconName("closecircle");
  setIconColor("#E8E8E8");
 } else {
  setIconName("pluscircleo");
  setIconColor("#FF6C00");
 }
};

  return (
    <TouchableWithoutFeedback onPress={keyboardHide} >
      <View style={styles.container}>
      <ImageBackground
      style={styles.image} 
      source={require("../../assets/imageBG.jpg")}
      >
        <View style={{...styles.form, paddingBottom: isShowKeyboard ? 0 : 45}}>
        <View style={styles.boxAvatar}></View>
            <TouchableOpacity style={styles.btnChangePhoto} activeOpacity={0.8} onPress={onChangePhoto}>
            <AntDesign name={iconName} size={25} color={iconColor} />
            </TouchableOpacity>
            <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
        <View style={{ marginBottom: isShowKeyboard ? 32 : 43 }}>
          <Text style={styles.title}>Регистрация</Text>
          <TextInput 
          style={styles.input}  placeholder={"Логин"} placeholderTextColor={"#bdbdbd"} 
          value={state.login}
          onFocus={() => setIsShowKeyboard(true)}
          onChangeText={(value) => setState((prevState) => ({...prevState, login: value}))} 
          />
          <TextInput 
          style={styles.input}  placeholder={"Адрес электронной почты"} placeholderTextColor={"#bdbdbd"} 
          value={state.email}
          onFocus={() => setIsShowKeyboard(true)}
          onChangeText={(value) => setState((prevState) => ({...prevState, email: value}))}
          />
           <View>
              <TextInput 
              style={{...styles.input, backgroundColor: "#F6F6F6", borderColor: "#E8E8E8", position: "relative", }}  placeholder={"Пароль"} placeholderTextColor={"#bdbdbd"} secureTextEntry={isHidePassword} 
              value={state.password}
              onFocus={() => setIsShowKeyboard(true)}
              onChangeText={(value) => setState((prevState) => ({...prevState, password: value}))}
              />
              <TouchableOpacity activeOpacity={0.8} style={styles.buttonShow} onPress={() => {
                setIsHidePassword((prevState) => !prevState);
                }}>
              <Text style={styles.buttonShowText}>Показать</Text>
              </TouchableOpacity>
              </View>
       </View>
        </KeyboardAvoidingView>
        {!isShowKeyboard && (
              <View>
                <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={hundleSubmit} >
               <Text style={styles.buttonText}>Зарегистрироваться</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("Login")} >
               <Text style={styles.logText}>Уже есть аккаунт? Войти</Text>
              </TouchableOpacity>
              </View>
            )}
        </View>
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
     backgroundColor: '#fff',
     alignItems: 'center',
     borderTopRightRadius: 25,
     borderTopLeftRadius: 25,
  },
  boxAvatar: {
    position: "absolute",
    zIndex: 1,
    top: -45,
    left: 135,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  btnChangePhoto: {
    zIndex: 2,
    position: "absolute",
    top: 30,
    left: 242,
  },
  title: {
    fontSize: 30,
    fontFamily: "Roboto-Medium",
    color: "#212121",
    marginBottom: 22,
    marginTop: 82,
    lineHeight: 35,
    textAlign: "center",
  },
  input: {
    fontFamily: "Roboto-Regular",
    borderWidth: 1,
    paddingLeft: 15,
    color: "#212121",
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
  buttonShow: {
    position: 'absolute',
    top: 14,
    right: 14,
  },
  buttonShowText: {
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
    fontSize: 16,
  },
  logText: {
    color: "#1B4371",
    textAlign: "center",
    fontSize: 16,
  },
});

export default RegistrationScreen;