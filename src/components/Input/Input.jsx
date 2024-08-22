import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import colors from '../../constants/colors';
import radius from '../../constants/radius';
import {hp} from '../../helpers/common';

const Input = props => {
  return (
    <View
      style={[
        styles.container,
        props.containerStyles && props.containerStyles,
      ]}>
      {props.icon && props.icon}
      <TextInput
        style={{flex: 1}}
        placeholderTextColor={colors.textLight}
        ref={props.inputRef && props.inputRef}
        {...props}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: hp(7.2),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.4,
    borderColor: colors.text,
    borderRadius: radius.xxl,
    borderCurve: 'continuous',
    paddingHorizontal: 18,
    gap: 12,
  },
});
