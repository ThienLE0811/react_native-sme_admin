import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import ProfileScreens from '../screens/profiles/ProfileScreens';

const ProfileNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreens} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
