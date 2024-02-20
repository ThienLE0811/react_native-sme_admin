import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import TabNavigator from './TabNavigator';
import {DetailPostsScreens, UpdatePostsScreeens} from '../screens';
import CreatePostsScreeens from '../screens/posts/CreatePostsScreens';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="Detail Posts" component={DetailPostsScreens} />
      <Stack.Screen name="Update Posts" component={UpdatePostsScreeens} />
      <Stack.Screen name="Create Posts" component={CreatePostsScreeens} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
