import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

 const firebaseConfig = {
   apiKey: "AIzaSyBgAW46C7CoCOcMie9jojjSJsscd6MuLWQ",
   authDomain: "goit-react-native.firebaseapp.com",
   projectId: "goit-react-native",
   storageBucket: "goit-react-native.appspot.com",
   messagingSenderId: "849786583196",
   appId: "1:849786583196:web:6dab2acc2d7eda8bc51559",
   measurementId: "G-2R6KNQZQDQ"
 };


export default firebase.initializeApp(firebaseConfig);