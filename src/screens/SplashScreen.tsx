import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

const SplashScreen = () => {
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingVertical: 10,
      alignItems: 'center',
      backgroundColor: '#baf2d9',
      paddingHorizontal: 10,
    },
    logo: {
      width: 180,
      height: 63,
    },
    text: {
      alignItems: 'center',
    },
  });

  return (
    <View>
      <Image style={styles.logo} source={require('../assets/home/logo.png')} />
    </View>
  );
};

export default SplashScreen;
