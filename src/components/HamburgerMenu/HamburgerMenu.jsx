import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import HugeIcon from '../../assets/icons';
import colors from '../../constants/colors';

const HamburgerMenu = ({ navigation, backgroundColor = colors.primaryDark }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.openDrawer()}
      style={[styles.hamburgerMenu, { backgroundColor }]}>
      <HugeIcon name="menu" size={26} color={colors.text} />
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
