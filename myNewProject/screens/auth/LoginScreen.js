import { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Dimensions, Image } from 'react-native';
  
const initialState = {
    email: '',
    password: '',
    }

const LoginScreen = ({ navigation }) => { 
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [state, setState] = useState(initialState);

    const keyboardHide = () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
      }
      
        const hundleSubmit = () => {
      setState(initialState);
      console.log("state: ", state);
        }

    return (
        <TouchableWithoutFeedback onPress={keyboardHide} >
    <View style={styles.container}>
          <ImageBackground
          style={styles.image} 
          source={require('../../assets/imageBG.jpg')}
          >
            <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
            <View style={{...styles.form, height: !isShowKeyboard ? 549 : 374, paddingBottom: !isShowKeyboard ? 78 : 0,}}>
              <Text style={styles.title} >Войти</Text>
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
               <Text style={styles.buttonText} >Войти</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("Register")} >
               <Text style={styles.logText}>Нет аккаунта? Зарегистрироваться</Text>
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
  title: {
    fontSize: 30,
    fontFamily: "Roboto-Medium",
    color: "#212121",
    marginTop: 32,
    marginBottom: 32,
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

  export default LoginScreen;