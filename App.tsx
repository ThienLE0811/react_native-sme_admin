/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppRouters from './src/navigators/AppRouter';
import {appColors} from './src/constansts/appColors';

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar
        barStyle={'default'}
        translucent
        backgroundColor={appColors.primary}
      />
      <Provider store={store}>
        <NavigationContainer>
          <AppRouters />
        </NavigationContainer>
      </Provider>
    </>
  );
}

export default App;
