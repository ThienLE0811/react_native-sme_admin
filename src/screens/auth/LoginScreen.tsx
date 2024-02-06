import React, {useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {
  ButtonComponent,
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

const styles = StyleSheet.create({
  sectionCompoent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
  },
  imageSection: {
    width: appInfo.sizes.WIDTH * 0.7,
    resizeMode: 'contain',
  },

  textButton: {
    fontSize: 18,
    fontFamily: fontFamilies.regular,
  },
});

const LoginScreen = () => {
  const [userName, setUserName] = useState<string>('');
  const [password, setIsPassword] = useState<string>('');

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

        <ButtonComponent
          text="Đăng nhập"
          onPress={() => console.log('Login')}
          // icon={
          //   <View>
          //     <Text>123</Text>
          //   </View>
          // }
          iconFlex="right"
          type="primary"
          textStyles={styles.textButton}
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default LoginScreen;
