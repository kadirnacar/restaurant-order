import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Application from './src';

export default function App() {
  return (
      <Application />
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
