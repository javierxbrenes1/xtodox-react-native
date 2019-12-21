import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Main from './components/Main'
import Auth from './components/Auth'
import * as SecureStore from 'expo-secure-store'
import { ID_TOKEN_KEY } from './config'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    (async () => {
    const userInfo = await SecureStore.getItemAsync(ID_TOKEN_KEY)
    if(userInfo) {
      const userObject = JSON.parse(userInfo)
      if(userObject.exp > Math.floor(new Date().getTime() / 1000)) {
        setIsLoggedIn(true)
      }
    }
  })()}, [])

  const changeSessionState = () => {
    setIsLoggedIn(!isLoggedIn)
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
