import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Button, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {removeAuth} from '../../redux/reducers/authReducer';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await AsyncStorage.clear();
    dispatch(removeAuth());
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>123</Text>
      <Button title="LogOut" onPress={async () => handleLogout()} />
    </View>
  );
};

export default HomeScreen;
