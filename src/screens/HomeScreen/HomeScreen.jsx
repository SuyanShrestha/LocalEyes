import {ScrollView, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
import globalStyles from '../../styles/globalStyles';
import Input from '../../components/Input/Input';
import HugeIcon from '../../assets/icons';
import {hp, wp} from '../../helpers/common';
import colors from '../../constants/colors';
import weight from '../../constants/weight';
import radius from '../../constants/radius';

const HomeScreen = ({navigation}) => {
  const searchRef = useRef('');

  return (
    <ScrollView contentContainerStyle={[globalStyles.container]}>
      {/* first container */}
      <View style={styles.firstContainer}>
        <View style={styles.nameContainer}>
          <View style={styles.logoDiv}>
            <Image
              source={require('../../assets/logo/logo5.jpg')}
              style={styles.logo}
            />
          </View>
          <Text style={styles.nameTitle}>Suyan Shrestha</Text>
        </View>

        {/* hamburger */}
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.hamburgerMenu}>
          <HugeIcon name="menu" size={26} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* second container */}
      <View style={styles.secondContainer}></View>

      {/* search container */}
      <View style={styles.searchContainer}>
        <Input
          icon={<HugeIcon name="userSearch" size={26} strokeWidth={1.6} />}
          placeholder="Who do you want to hire?"
          onChangeText={value => (searchRef.current = value)}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;


const styles = StyleSheet.create({
  firstContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    height: hp(25),
    paddingHorizontal: wp(5),
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
  },
  logoDiv: {
    backgroundColor: 'rgba(0, 0, 0, 0.07)',
    padding: 5,
    borderRadius: 50,
  },
  logo: {
    width: 45,
    height: 45,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.text,
    resizeMode: 'cover',
  },
  nameTitle: {
    fontSize: hp(4),
    fontWeight: weight.bold,
    color: colors.text,
    width: wp(50),
  },
  hamburgerMenu: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.07)',
    borderRadius: 50,
  },
  secondContainer: {
    backgroundColor: colors.secondaryColor30,
    // height: 200,
  },

  searchContainer: {
    marginHorizontal: wp(5),
    width: wp(90),
    position: 'absolute',
    top: hp(21),
    zIndex: 10,
    backgroundColor: colors.secondaryColor30,
    // borderWidth: 0.4,
    // borderColor: colors.text,
    borderRadius: radius.xxl,
    borderCurve: 'continuous',
  },
});
