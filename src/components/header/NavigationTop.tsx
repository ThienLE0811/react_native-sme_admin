import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

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

const NavigationTop = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={require('../../assets/home/GoGroup-2-400x139.png')}
        />
      </View>
      <View style={styles?.text}>
        <Text>Sidebar</Text>
      </View>
    </View>
  );
};

export default NavigationTop;
