import React from 'react';
import {Button} from 'react-native';
import {Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {removeAuth} from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreens = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await AsyncStorage.clear();
    dispatch(removeAuth());
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Thông tin cá nhân</Text>
      <Button title="LogOut" onPress={async () => handleLogout()} />
    </View>
  );
};

export default ProfileScreens;
