import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import HugeIcon from '../../assets/icons';
import colors from '../../constants/colors';

const BackButton = ({size = 26, navigation, color}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
      style={styles.button}>
      <HugeIcon name="back" strokeWidth={2.5} size={size} color={color || colors.secondaryColor30} />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    // alignSelf: 'flex-start',
    padding: 5,
    borderRadius: 50,
    // backgroundColor: 'rgba(0, 0, 0, 0.07)',
    backgroundColor: colors.primaryDark,
  },
});
