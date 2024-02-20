import React, {ReactNode, useState} from 'react';
import {
  KeyboardType,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {appColors} from '../constansts/appColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {globalStyles} from '../styles/globalStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface Props {
  value: string;
  onChange: (val: string) => void;
  affix?: ReactNode;
  suffix?: ReactNode;
  placeHolder?: string;
  isPassword?: boolean;
  allowClear?: boolean;
  type?: KeyboardType;
  defaultValue?: string;
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColors.gray2,
    width: '100%',
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
    paddingLeft: 2,
    backgroundColor: appColors.white,
    marginBottom: 19,
  },
  input: {
    padding: 0,
    margin: 0,
    flex: 1,
    paddingHorizontal: 14,
    color: appColors.text,
  },
});

const InputComponent = (props: Props) => {
  const {
    value,
    onChange,
    affix,
    suffix,
    placeHolder,
    isPassword,
    type,
    allowClear,
    defaultValue,
  } = props;
  const [isShowPassword, setIsShowPassword] = useState<boolean>(
    isPassword ?? false, // neu undefind la false
  );

  return (
    <View style={[styles.inputContainer]}>
      {affix ?? affix}
      <TextInput
        style={[styles.input, globalStyles.text]}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeHolder ?? ''}
        onChangeText={val => onChange(val)}
        secureTextEntry={isShowPassword}
        placeholderTextColor={'#747688'}
        keyboardType={type ?? 'default'}
      />
      {suffix ?? suffix}
      <TouchableOpacity
        onPress={
          isPassword
            ? () => setIsShowPassword(!isShowPassword)
            : () => onChange('')
        }>
        {isPassword ? (
          <FontAwesome
            name={isShowPassword ? 'eye' : 'eye-slash'}
            size={20}
            color={appColors.gray}
          />
        ) : (
          value?.length > 0 &&
          allowClear && (
            <AntDesign name="close" size={20} color={appColors.text} />
          )
        )}
      </TouchableOpacity>
    </View>
  );
};

export default InputComponent;
