import React from 'react';
import {Text, View} from 'react-native';
import {ButtonComponent} from '../../components';
import {globalStyles} from '../../styles/globalStyles';

const LoginScreen = () => {
  return (
    <View
      style={[
        globalStyles.container,
        {padding: 16, backgroundColor: '#F2F2F2'},
      ]}>
      <ButtonComponent
        text="LOGIN"
        onPress={() => console.log('Login')}
        icon={
          <View>
            <Text>123</Text>
          </View>
        }
        iconFlex="right"
        type="primary"
      />
    </View>
  );
};

export default LoginScreen;
