import React, {useEffect} from 'react';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {addAuth, authSelector} from '../redux/reducers/authReducer';

const AppRouters = () => {
  const {getItem} = useAsyncStorage('auth');
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();

  const checkLogin = async () => {
    const res = await getItem();
    console.log('res:: ', res);
    res && dispatch(addAuth({accessToken: JSON.parse(res).jwt}));
  };

  useEffect(() => {
    checkLogin();
  }, []);
  console.log('auth data:: ', auth);

  return (
    <>{auth.accessToken?.length > 0 ? <MainNavigator /> : <AuthNavigator />}</>
  );
};

export default AppRouters;
