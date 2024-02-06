import React, {ReactNode} from 'react';
import {ImageBackground, SafeAreaView, ScrollView, View} from 'react-native';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  children: ReactNode;
  isImageBackground?: boolean;
  isScroll?: boolean;
  title?: string;
}

const ContainerComponent = (props: Props) => {
  const {children, isImageBackground, isScroll, title} = props;
  const returnContainer = isScroll ? (
    <ScrollView>{children}</ScrollView>
  ) : (
    <View>{children}</View>
  );

  return isImageBackground ? (
    <ImageBackground
      source={require('../assets/home/splash-screen.png')}
      style={{flex: 1}}
      imageStyle={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>{returnContainer}</SafeAreaView>
    </ImageBackground>
  ) : (
    <SafeAreaView style={[globalStyles.container]}>
      <View>{returnContainer}</View>
    </SafeAreaView>
  );
};

export default ContainerComponent;
