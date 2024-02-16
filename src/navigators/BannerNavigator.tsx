import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {BannerScreens} from '../screens';

const BannerNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="BannerScreen" component={BannerScreens} />
    </Stack.Navigator>
  );
};

export default BannerNavigator;
