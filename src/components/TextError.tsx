import React from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';
import {appColors} from '../constansts/appColors';
import {fontFamilies} from '../constansts/fontFamilies';

interface Props {
  //   text: string;
  color?: string;
  size?: number;
  flex?: number;
  font?: string;
  styles?: StyleProp<TextStyle>;
  title?: boolean;
  numberOfLine?: number;
  children: any;
}

const TextError = (props: Props) => {
  const {children, size, color, flex, styles, font, title, numberOfLine} =
    props;

  return (
    <Text
      numberOfLines={numberOfLine}
      style={[
        // eslint-disable-next-line react-native/no-inline-styles
        {
          color: color ?? appColors.error,
          flex: flex ?? 0,
          fontSize: size ?? title ? 20 : 14,
          fontFamily:
            font ?? title ? fontFamilies.medium : fontFamilies.regular,
        },
        styles,
      ]}>
      {children}
    </Text>
  );
};

export default TextError;
