import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
export default function App() {
  return (
    <ImageBackground source={require("./assets/background.jpg")} style={{ width: "100%", height: "100%" }} >
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(33,36,45,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
