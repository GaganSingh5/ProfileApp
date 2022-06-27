import { StatusBar } from 'expo-status-bar';
import * as AuthSession from 'expo-auth-session';
import React from 'react';
import { Alert, Button, Platform, StyleSheet, Text, View } from 'react-native';
import Login from './Login';

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app bhim!</Text>
      <StatusBar style="auto" />
      <Login></Login>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
