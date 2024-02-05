import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  view: {
    padding: 50,
    display: 'flex',
    justifyContent: 'center',
  },

  text: {
    color: '#d6283c',
    fontWeight: '500',
    fontSize: 18,
  },
});

const Slogan = () => {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>Người yêu tôi ăn cơm chưa</Text>
    </View>
  );
};

export default Slogan;
