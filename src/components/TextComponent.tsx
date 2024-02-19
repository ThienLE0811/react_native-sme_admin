import React from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';
import {appColors} from '../constansts/appColors';
import {fontFamilies} from '../constansts/fontFamilies';

interface Props {
  text: string;
  color?: string;
  size?: number;
  flex?: number;
  font?: string;
  styles?: StyleProp<TextStyle>;
  title?: boolean;
}

const TextComponent = (props: Props) => {
  const {text, size, color, flex, styles, font, title} = props;

  return (
    <Text
      style={[
        // eslint-disable-next-line react-native/no-inline-styles
        {
          color: color ?? appColors.text,
          flex: flex ?? 0,
          fontSize: size ?? title ? 20 : 14,
          fontFamily:
            font ?? title ? fontFamilies.medium : fontFamilies.regular,
        },
        styles,
      ]}>
      {text}
    </Text>
  );
};

export default TextComponent;
