import React, {useEffect, useState} from 'react';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {addAuth, authSelector} from '../redux/reducers/authReducer';
import {SplashScreen} from '../screens';

const AppRouters = () => {
  const {getItem} = useAsyncStorage('auth');
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();
  const [isShowSplash, setIsShowPlash] = useState<boolean>(true);

  useEffect(() => {
    checkLogin();
    const timeout = setTimeout(() => {
      setIsShowPlash(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  const checkLogin = async () => {
    const res = await getItem();
    console.log('res check:: ', res);
    res && dispatch(addAuth(JSON.parse(res || '{}')));
  };

  console.log('auth:: ', auth);

  return (
    <>
      {isShowSplash ? (
        <SplashScreen />
      ) : auth?.accessToken?.length > 0 ? (
        <MainNavigator />
      ) : (
        <AuthNavigator />
      )}
    </>
  );
};

export default AppRouters;
