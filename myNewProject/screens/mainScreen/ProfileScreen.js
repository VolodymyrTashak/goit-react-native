import React from "react";
import { StyleSheet, Text, View, Button } from 'react-native';
import { useDispatch } from "react-redux";

import db from '../../firebase/config';
import { authSingOutUser } from "../../redux/auth/authOperations";

const ProfileScreen = () => {
    const dispatch = useDispatch();

    const signOut = () => {
      dispatch(authSingOutUser());
    }

return (
<View style={styles.container}>
<Text>ProfileScreen</Text>
<Button title="signOut" onPress={signOut} />
</View>
)
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default ProfileScreen;