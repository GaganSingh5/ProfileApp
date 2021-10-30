import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { User } from './Components/UserView/User';
import {Links} from './Components/LinksView/Links'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Links />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
