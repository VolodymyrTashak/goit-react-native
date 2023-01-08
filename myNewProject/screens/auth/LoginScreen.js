import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux'; 

import { authSingInUser } from '../../redux/auth/authOperations';
  
const initialState = {
    email: '',
    password: '',
    }

const LoginScreen = ({ navigation }) => { 
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [state, setState] = useState(initialState);
    const [isHidePassword, setIsHidePassword] = useState(true);
    const dispatch = useDispatch();
    const [dimensions, setDimensions] = useState(Dimensions.get("window").width - 20 * 2, );

useEffect(() => {
  const onChange = () => {
    const windowWidth = Dimensions.get("window").width - 20 * 2;
    setDimensions(windowWidth);
  };
  Dimensions.addEventListener("change", onChange);
}, []);

    const keyboardHide = () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
      }
      
        const hundleSubmit = () => {
      setState(initialState);
      dispatch(authSingInUser(state));
      console.log("state: ", state);
        }

    return (
        <TouchableWithoutFeedback onPress={keyboardHide} >
    <View style={styles.container}>
          <ImageBackground
          style={styles.image} 
          source={require('../../assets/imageBG.jpg')}
          >
            <View style={{...styles.form, paddingBottom: isShowKeyboard ? 0 : 111}}>
            <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
            <View style={{ marginBottom: isShowKeyboard ? 200 : 43 }}>
              <Text style={styles.title} >Войти</Text>
              <TextInput 
              style={{ ...styles.input, marginBottom: 16, backgroundColor: "#F6F6F6", borderColor: "#E8E8E8",}}  placeholder={"Адрес электронной почты"} placeholderTextColor={"#bdbdbd"} 
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
               <Text style={styles.buttonText} >Войти</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("Register")} >
               <Text style={styles.logText}>Нет аккаунта? Зарегистрироваться</Text>
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
  title: {
    fontSize: 30,
    fontFamily: "Roboto-Medium",
    color: "#212121",
    marginTop: 32,
    marginBottom: 72,
    lineHeight: 35,
    textAlign: "center",
  },
  input: {
    fontFamily: "Roboto-Regular",
    borderWidth: 1,
    paddingLeft: 15,
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

  export default LoginScreen;





