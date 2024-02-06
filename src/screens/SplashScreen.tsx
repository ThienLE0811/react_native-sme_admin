import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {appInfo} from '../constansts/appInfo';
import {SpaceComponent} from '../components';
import {appColors} from '../constansts/appColors';

const SplashScreen = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: appInfo.sizes.WIDTH * 0.7,
      resizeMode: 'contain',
    },
  });

  return (
    <ImageBackground
      source={require('../assets/home/splash-screen.png')}
      style={styles.container}>
      <Image source={require('../assets/home/logo.png')} style={styles.logo} />
      <SpaceComponent height={16} />
      <ActivityIndicator color={appColors.gray} size={22} />
    </ImageBackground>
  );
};

export default SplashScreen;
