import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {CustomerScreens} from '../screens';

const CustomerNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CustomerScreen" component={CustomerScreens} />
    </Stack.Navigator>
  );
};

export default CustomerNavigator;
