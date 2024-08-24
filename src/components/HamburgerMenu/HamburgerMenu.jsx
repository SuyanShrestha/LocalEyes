import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import HugeIcon from '../../assets/icons';
import colors from '../../constants/colors';

const HamburgerMenu = ({ navigation, backgroundColor = colors.primaryDark, size = 26 }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.openDrawer()}
      style={[styles.hamburgerMenu, { backgroundColor }]}>
      <HugeIcon name="menu" size={size} color={colors.text} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  hamburgerMenu: {
    padding: 10,
    borderRadius: 50,
  },
});

export default HamburgerMenu;
