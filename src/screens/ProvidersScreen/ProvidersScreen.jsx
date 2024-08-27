import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import BackButton from '../../components/BackButton/BackButton';
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu';
// import { users } from '../../constants/users';
import colors from '../../constants/colors';
import { wp, hp } from '../../helpers/common';
import radius from '../../constants/radius';
import weight from '../../constants/weight';
import HugeIcon from '../../assets/icons';
import SearchBar from '../../components/SearchBar/SearchBar';
import LottieComponent from '../../components/LottieComponent/LottieComponent';
import { EmptyLottie } from '../../assets/lottie';

import firestore from '@react-native-firebase/firestore';


const ProvidersScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const [searchTerm, setSearchTerm] = useState('');
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .where('categoryID', '==', category.id)
      .onSnapshot(
        snapshot => {
          const users = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProviders(users);
        },
        error => {
          console.error("Error fetching providers: ", error);
        }
      );

    return () => unsubscribe();
  }, [category.id]);

  const filteredProviders = providers.filter(provider =>
    provider.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderUser = ({ item }) => (
    <TouchableOpacity style={styles.userCard}>
      <View style={styles.userInfo}>
        <Image source={{ uri: item.profilePic }} style={styles.profilePic} />
        <View style={styles.textContainer}>
          <Text style={styles.username}>{item.username}</Text>
        </View>
      </View>
      <View style={styles.userScores}>
        <View style={styles.agreementContainer}>
          <HugeIcon
            name="agreement"
            size={20}
            strokeWidth={1.5}
            style={styles.agreementIcon}
          />
          <Text style={styles.rating}>{item.totalAgreements}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <HugeIcon
            name="star"
            size={20}
            strokeWidth={1.5}
            style={styles.ratingIcon}
          />
          <Text style={styles.rating}>{item.totalRating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <BackButton navigation={navigation} />
        <Text style={styles.header}>{category.name} Providers</Text>
        <HamburgerMenu navigation={navigation} size={20} />
      </View>
      <SearchBar
        placeholder="Search providers"
        onSearch={setSearchTerm}
        style={styles.searchBar}
      />
      {filteredProviders.length > 0 ? (
        <FlatList
          data={filteredProviders}
          keyExtractor={item => item.id}
          renderItem={renderUser}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <LottieComponent
            animationData={EmptyLottie}
            width={wp(100)}
            height={wp(100)}
          />
          <Text style={styles.noProvidersText}>No providers found with that name.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColor60,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    backgroundColor: colors.primary,
    height: hp(8),
  },
  header: {
    fontSize: hp(2.5),
    fontWeight: weight.semibold,
    color: colors.secondaryColor30,
  },
  searchBar: {
    width: wp(90),
    marginVertical: hp(2),
    alignSelf: 'center',
  },
  listContent: {
    paddingBottom: hp(2),
    paddingHorizontal: wp(4),
  },
  userCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp(4),
    backgroundColor: colors.secondaryColor30,
    borderRadius: radius.xs,
    marginBottom: hp(1.5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: wp(4),
  },
  profilePic: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
  },
  username: {
    fontSize: hp(2.25),
    fontWeight: weight.bold,
    color: colors.text,
  },
  userScores: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  agreementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryColor20,
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(2),
    borderRadius: radius.sm,
    marginRight: wp(3),
  },
  agreementIcon: {
    marginRight: wp(1),
    color: colors.primary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryColor20,
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(2),
    borderRadius: radius.sm,
  },
  ratingIcon: {
    marginRight: wp(1),
    color: colors.primary,
  },
  rating: {
    fontSize: hp(2),
    fontWeight: weight.medium,
    color: colors.primaryDark,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProvidersText: {
    fontSize: hp(2),
    fontWeight: weight.medium,
    color: colors.text,
    marginTop: hp(2),
  },
});

export default ProvidersScreen;
