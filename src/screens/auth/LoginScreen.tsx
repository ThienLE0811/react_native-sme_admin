import React, {useState} from 'react';
import {Image, StyleSheet, Switch} from 'react-native';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';

import InputComponent from '../../components/InputComponent';
import {Lock, Sms} from 'iconsax-react-native';
import {appColors} from '../../constansts/appColors';
import ContainerComponent from '../../components/ContainerComponent';
import {appInfo} from '../../constansts/appInfo';
import {fontFamilies} from '../../constansts/fontFamilies';
import authenticationAPI from '../../apis/authApi';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  sectionCompoent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '25%',
  },
  imageSection: {
    width: appInfo.sizes.WIDTH * 0.7,
    resizeMode: 'contain',
  },

  textButton: {
    fontSize: 18,
    fontFamily: fontFamilies.regular,
  },

  buttonComponent: {
    marginTop: 20,
  },
  rowComponent: {
    // justifyContent: 'flex-end',
    gap: 5,
  },
});

const LoginScreen = () => {
  const [userName, setUserName] = useState<string>('');
  const [password, setIsPassword] = useState<string>('');
  const [isRemember, setIsRemember] = useState<boolean>(true);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await authenticationAPI.HandleAuthentication(
        {
          username: userName,
          password: password,
        },
        'post',
      );
      console.log('userName:: ', userName);
      if (res?.data?.responseCode === '00') {
        dispatch(addAuth({accessToken: res?.data?.jwt}));
        await AsyncStorage.setItem(
          'auth',
          isRemember
            ? JSON.stringify({accessToken: res?.data?.jwt, userName: userName})
            : '',
        );
      }
    } catch (error) {
      console.log('error:: ', String(error));
    }
  };

  return (
    <ContainerComponent isImageBackground isScroll>
      <SectionComponent styles={styles.sectionCompoent}>
        <Image
          source={require('../../assets/home/logo.png')}
          style={styles.imageSection}
        />
      </SectionComponent>
      <SectionComponent>
        <TextComponent text="Đăng nhập" title />
        <SpaceComponent height={21} />
        <InputComponent
          value={userName}
          onChange={val => setUserName(val)}
          placeHolder="Tài khoản"
          allowClear
          affix={<Sms size={20} color={appColors.gray} />}
        />

        <InputComponent
          value={password}
          onChange={val => setIsPassword(val)}
          isPassword
          placeHolder="Mật khẩu"
          allowClear
          affix={<Lock size={20} color={appColors.gray} />}
        />

        <RowComponent
          styles={styles.rowComponent}
          justify="flex-start"
          onPress={() => setIsRemember(!isRemember)}>
          <Switch
            trackColor={{true: appColors.primary}}
            thumbColor={appColors.white}
            value={isRemember}
            onChange={() => setIsRemember(!isRemember)}
          />
          <TextComponent text="Ghi nhớ" />
        </RowComponent>

        <ButtonComponent
          text="Đăng nhập"
          onPress={() => handleLogin()}
          // icon={
          //   <View>
          //     <Text>123</Text>
          //   </View>
          // }
          iconFlex="right"
          type="primary"
          textStyles={styles.textButton}
          styles={styles.buttonComponent}
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default LoginScreen;
