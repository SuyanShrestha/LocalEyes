import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import globalStyles from '../../styles/globalStyles';
import SearchBar from '../../components/SearchBar/SearchBar';
import HugeIcon from '../../assets/icons';
import { hp, wp } from '../../helpers/common';
import colors from '../../constants/colors';
import weight from '../../constants/weight';
import radius from '../../constants/radius';
import CategoryList from '../../components/CategoryList/CategoryList';
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu';
import { categories } from '../../constants/categories';
import LottieComponent from '../../components/LottieComponent/LottieComponent';
import { EmptyLottie2 } from '../../assets/lottie';

import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../navigation/AuthProvider';

const HomeScreen = ({ navigation }) => {
  const [filteredCategories, setFilteredCategories] = useState(categories);

  const [userName, setUserName] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const unsubscribe = firestore()
        .collection('users')
        .doc(user.uid)
        .onSnapshot((doc) => {
          if (doc.exists) {
            setUserName(doc.data().username || 'User');
          }
        }, (error) => {
          console.log('Error fetching user data: ', error);
        });

      // Clean up subscription on unmount
      return () => unsubscribe();
    }
  }, [user]);

  const handleSearch = (searchTerm) => {
    const filtered = categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredCategories(filtered);
  };

  const handleCategoryPress = (category) => {
    navigation.navigate('ProvidersScreen', { category });
  };

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
          <Text style={styles.nameTitle}>{userName}</Text>
        </View>

        {/* hamburger */}
        <HamburgerMenu navigation={navigation} />
      </View>

      {/* search bar */}
      <SearchBar
        placeholder="What service do you want?"
        onSearch={handleSearch}
        style={styles.searchBar}
      />

      {/* second container */}
      <View style={styles.secondContainer}>
        <Text style={styles.sectionTitle}>Services</Text>
        {filteredCategories.length > 0 ? (
          <CategoryList categories={filteredCategories} onCategoryPress={handleCategoryPress}/>
        ) : (
          <LottieComponent
            animationData={EmptyLottie2}
            width={wp(100)}
            height={wp(100)}
          />
        )}
      </View>
    </ScrollView>
  );
};

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
    height: '100%',
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
  searchBar: {
    position: 'absolute',
    top: hp(22),
    width: wp(90),
    zIndex: 10,
  },
});

export default HomeScreen;
