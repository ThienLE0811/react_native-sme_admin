import React, {ReactNode} from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  justify?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  styles?: StyleProp<ViewStyle>;
  children: ReactNode;
  onPress?: () => void;
}

const RowComponent = (props: Props) => {
  const {justify, styles, children, onPress} = props;
  const localStyle = [
    globalStyles.row,
    {
      justifyContent: justify,
    },
    styles,
  ];

  return onPress ? (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={localStyle}>
      {children}
    </TouchableOpacity>
  ) : (
    <View
      style={[
        globalStyles.row,
        {
          justifyContent: justify,
        },
        styles,
      ]}>
      {children}
    </View>
  );
};

export default RowComponent;
