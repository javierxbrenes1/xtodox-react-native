import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './components/Main';
import Auth from './components/Auth';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const changeSessionState = () => {
    setIsLoggedIn(!isLoggedIn);
  }

  return (
    <View style={styles.container}>
      {isLoggedIn ? <Main onLogOut={changeSessionState}/> : <Auth onLogIn={changeSessionState} />}
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
});
