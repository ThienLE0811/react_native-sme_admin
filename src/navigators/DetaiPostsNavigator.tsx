import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DetailPostsScreens} from '../screens';

const DetaiPostslNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Detail Posts" component={DetailPostsScreens} />
    </Stack.Navigator>
  );
};

export default DetaiPostslNavigator;
