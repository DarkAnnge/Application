import React, { useState } from 'react';

//screens
import RootStack from './navigators/RootStack';

// AppLoading
import AppLoading from 'expo-app-loading';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// token context
import { TokenContext } from './components/TokenContext';

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedToken, setStoredToken] = useState('');

  const checkLoginToken = () => {
    AsyncStorage
      .getItem('loginToken')
      .then((result) => {
        if (result !== null) {
          setStoredToken(JSON.parse(result));
        } else {
          setStoredToken(null);
        }
       })
      .catch()
  }

  if (!appReady) {
    return (
      <AppLoading
        startAsync={ checkLoginToken }
        onFinish={() => setAppReady(true)}
        onError={console.warn}
      />
    )
  }

  return (
    <TokenContext.Provider value={{storedToken, setStoredToken}}>
      <RootStack />
    </TokenContext.Provider>
  )
}
