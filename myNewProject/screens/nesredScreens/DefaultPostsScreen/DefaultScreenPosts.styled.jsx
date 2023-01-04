import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    profileBox: {
        paddingHorizontal: 16,
        paddingVertical: 32,
        flexDirection: 'row',
    },
    textBox: {
        marginTop: 16,
        marginLeft: 8,
    },
    profileName: {
        fontFamily: "Roboto-Bold",
        color: '#124250',
        fontSize: 13,
        lineHeight: 15,
    },
    profileEmail: {
        fontFamily: "Roboto-Regular",
        color: '#124250',
        fontSize: 11,
        lineHeight: 13,
    },
    postBox: {
        paddingHorizontal: 16,
        marginBottom: 32,
    },
    postName: {
        fontFamily: "Roboto-Bold",
        color: '#124250',
        fontSize: 16,
        lineHeight: 19,
        marginVertical: 8,
    },
    postLabel: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    comments: {
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 24,
    },
    count: {
        fontFamily: "Roboto-Regular",
        lineHeight: 19,
        fontSize: 16,
        marginLeft: 6,
    },
    likes: {
        color: '#BDBDBD',
    },
    place: {
        flexDirection: 'row',
    },
    placeText: {
        fontFamily: "Roboto-Regular",
        lineHeight: 19,
        fontSize: 16,
        marginLeft: 4,
        color: '#124250',
        textDecorationLine: "underline",
    },
  });

  export default styles;