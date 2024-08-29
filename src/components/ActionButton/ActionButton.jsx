import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {hp, wp} from '../../helpers/common';
import colors from '../../constants/colors';
import radius from '../../constants/radius';

const ActionButton = ({buttonText, onPress, backgroundColor, textColor}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {backgroundColor: backgroundColor || colors.primaryDark},
      ]}>
      <Text
        style={[
          styles.buttonText,
          {color: textColor || colors.secondaryColor30},
        ]}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  container: {
    height: hp(4),
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.4,
    borderColor: colors.text,
    borderRadius: radius.xxl,
    borderCurve: 'continuous',
  },
  buttonText: {
  },
});
