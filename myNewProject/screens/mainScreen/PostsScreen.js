import React from "react";
import { StyleSheet, Text, View } from 'react-native';

const PostsScreen = () => {
    
return (
<View style={styles.container}>
<Text>PostsScreen</Text>
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

export default PostsScreen;