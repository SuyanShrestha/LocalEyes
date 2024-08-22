import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import globalStyles from '../../styles/globalStyles';
import Input from '../../components/Input/Input';
import HugeIcon from '../../assets/icons';
import {hp, wp} from '../../helpers/common';
import colors from '../../constants/colors';
import weight from '../../constants/weight';
import radius from '../../constants/radius';
import CategoryList from '../../components/CategoryList/CategoryList';
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu';
import {categories} from '../../constants/categories';

import LottieComponent from '../../components/LottieComponent/LottieComponent';
import { EmptyLottie, EmptyLottie2 } from '../../assets/lottie';

const HomeScreen = ({navigation}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [timeoutId, setTimeoutId] = useState(null);

  // for search using debounce
  useEffect(() => {
    if (timeoutId) clearTimeout(timeoutId);

    const newTimeoutId = setTimeout(() => {
      const filtered = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredCategories(filtered);
    }, 500);

    setTimeoutId(newTimeoutId);

    return () => clearTimeout(newTimeoutId); 
  }, [searchTerm]);

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
        <HamburgerMenu navigation={navigation} />
      </View>

      {/* second container */}
      <View style={styles.secondContainer}>
        <Text style={styles.sectionTitle}>Services</Text>
        {filteredCategories.length > 0 ? (
          <CategoryList categories={filteredCategories} />
        ) : (
          <LottieComponent
            animationData={EmptyLottie2}
            width={wp(100)}
            height={wp(100)}
          />
        )}
      </View>

      {/* search container */}
      <View style={styles.searchContainer}>
        <Input
          icon={<HugeIcon name="userSearch" size={26} strokeWidth={1.6} />}
          placeholder="Who do you want to hire?"
          onChangeText={value => setSearchTerm(value)}
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
    backgroundColor: colors.primaryDark,
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
    color: colors.secondaryColor30,
    width: wp(50),
  },
  secondContainer: {
    minHeight: hp(69),
    paddingTop: hp(5),
    paddingHorizontal: wp(5),
    backgroundColor: colors.primaryColor60,
  },
  sectionTitle: {
    fontSize: hp(3),
    fontWeight: weight.bold,
    color: colors.text,
    marginBottom: hp(3),
  },
  searchContainer: {
    marginHorizontal: wp(5),
    width: wp(90),
    position: 'absolute',
    top: hp(21),
    zIndex: 10,
    backgroundColor: colors.secondaryColor30,
    borderRadius: radius.xxl,
    borderCurve: 'continuous',
  },
});
