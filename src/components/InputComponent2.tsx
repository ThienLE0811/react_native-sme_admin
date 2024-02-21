import React, {ReactNode, useState} from 'react';
import {KeyboardType, StyleSheet, TextInput, View} from 'react-native';
import {appColors} from '../constansts/appColors';
import {globalStyles} from '../styles/globalStyles';
import {Control, Controller, RegisterOptions} from 'react-hook-form';

interface Props {
  affix?: ReactNode;
  suffix?: ReactNode;
  placeHolder?: string;
  isPassword?: boolean;
  allowClear?: boolean;
  type?: KeyboardType;
  defaultValue?: string;
  control: Control<any>;
  rules?: Omit<
    RegisterOptions<any>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  name: string;
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

const InputComponent2 = (props: Props) => {
  const {
    affix,
    suffix,
    placeHolder,
    isPassword,
    type,
    allowClear,
    defaultValue,
    control,
    rules,
    name,
  } = props;
  const [isShowPassword, setIsShowPassword] = useState<boolean>(
    isPassword ?? false, // neu undefind la false
  );

  return (
    <View style={[styles.inputContainer]}>
      {affix ?? affix}
      <Controller
        control={control}
        rules={rules}
        name={name}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={[styles.input, globalStyles.text]}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeHolder ?? ''}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry={isShowPassword}
            placeholderTextColor={'#747688'}
            keyboardType={type ?? 'default'}
          />
        )}
      />
      {suffix ?? suffix}
      {/* <TouchableOpacity
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
      </TouchableOpacity> */}
    </View>
  );
};

export default InputComponent2;
