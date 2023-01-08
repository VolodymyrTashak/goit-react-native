import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: "column",
        paddingTop: 32,
        paddingBottom: 15,
        paddingHorizontal: 16,
        backgroundColor: '#fff'
      },
      image: {
        height: 240,
        width: 343,
        borderRadius: 8,
        marginHorizontal: 16,
        marginBottom: 32,
      },
      commentBox: {
        width: 300,
        height: 80,
        marginHorizontal: 10,
        marginBottom: 10,
        padding: 10,
        backgroundColor: "#F6F6F6",
        borderColor: "#E8E8E8",
        borderWidth: 1,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        borderTopLeftRadius: 6,
      },
      boxLogin: {
        fontFamily: "Roboto-Regular",
        color: "#FF6C00",
        marginBottom: 6,
        textAlign: "right",
      },
      boxComment: {
        fontFamily: "Roboto-Regular",
        color: "#124250",
        marginBottom: 8,
        textAlign: "right",
        fontSize: 13,
        lineHeight: 18,
      },
      boxDate: {
        fontFamily: "Roboto-Regular",
        color: "#BDBDBD",
        textAlign: "right",
        fontSize: 10,
        lineHeight: 12,
      },
      avatar: {
        height: 30,
        width: 30,
        borderRadius: 50,
        backgroundColor: "E8E8E8",
      },
      inputContainer: {
        position: "relative",
        fontFamily: "Roboto-Regular",
        color: "#212121",
        backgroundColor: "F6F6F6",
        height: 50,
        borderColor: "#E8E8E8",
        borderWidth: 1,
        paddingLeft: 15, 
        borderRadius: 50,
      },
      sendBtn: {
        position: "absolute",
        top: 10,
        left: 335,
        justifyContent: 'center',
        alignItems: "center",
        height: 34,
        width: 34,
        borderRadius: 50,
        backgroundColor: "#FF6C00",
      },
  });

  export default styles;