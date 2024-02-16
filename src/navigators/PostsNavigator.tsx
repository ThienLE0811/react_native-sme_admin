import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {PostsScreens} from '../screens';

const PostsNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={PostsScreens} />
    </Stack.Navigator>
  );
};

export default PostsNavigator;
