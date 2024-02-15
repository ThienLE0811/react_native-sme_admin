/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {SplashScreen} from './src/screens';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppRouters from './src/navigators/AppRouter';

function App(): React.JSX.Element {
  const [isShowSplash, setIsShowPlash] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowPlash(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);
  console.log('isShowSplash:: ', isShowSplash);

  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor={'transparent'}
      />
      <Provider store={store}>
        {isShowSplash ? (
          <SplashScreen />
        ) : (
          <NavigationContainer>
            <AppRouters />
          </NavigationContainer>
        )}
      </Provider>
    </>
  );
}

export default App;
