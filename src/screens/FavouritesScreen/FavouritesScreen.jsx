import React, {useContext, useState, useEffect} from 'react';
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
import {favorites} from '../../constants/favorites';
import {categories} from '../../constants/categories';
import colors from '../../constants/colors';
import {wp, hp} from '../../helpers/common';
import radius from '../../constants/radius';
import weight from '../../constants/weight';
import HugeIcon from '../../assets/icons';
import SearchBar from '../../components/SearchBar/SearchBar';
import LottieComponent from '../../components/LottieComponent/LottieComponent';
import {EmptyLottie} from '../../assets/lottie';
import SlideUpModal from '../../components/SlideUpModal/SlideUpModal';

import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../navigation/AuthProvider';

const FavouritesScreen = ({navigation}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [favouritesIdArray, setFavouritesIdArray] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [providers, setProviders] = useState([]);

  const {user} = useContext(AuthContext);

  // fetching favourites
  useEffect(() => {
    const favouritesDocRef = firestore().collection('favourites').doc(user.uid);

    const unsubscribe = favouritesDocRef.onSnapshot(
      docSnapshot => {
        if (docSnapshot.exists) {
          const data = docSnapshot.data();
          // console.log(data);
          if (data) {
            setFavouritesIdArray(data.favourites || []);
          }
        }
      },
      error => {
        console.error('Error fetching favourites document:', error);
      },
    );

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, [user.uid]);

  // adding data of respective uid to favourites
  useEffect(() => {
    // console.log(favouritesIdArray);

    if (favouritesIdArray.length === 0) {
      setFavourites([]); // Reset the favourites array if there are no favourites
      return;
    }

    const fetchFavourites = async () => {
      try {
        const usersSnapshot = await firestore()
          .collection('users')
          .where(firestore.FieldPath.documentId(), 'in', favouritesIdArray)
          .get();

        const favouritesData = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFavourites(favouritesData);
      } catch (error) {
        console.error('Error fetching favourite users:', error);
      }
    };

    fetchFavourites();
  }, [favouritesIdArray]);

  // Filter favorites based on search term and selected category
  const filteredFavorites = favourites
    .filter(user => {
      const matchesSearchTerm = user.username
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory
        ? user.categoryID === selectedCategory.id
        : true;
      // console.log(user);
      return matchesSearchTerm && matchesCategory;
    })
    .map(user => {
      const category = categories.find(cat => cat.id === user.categoryID);
      return {
        ...user,
        categoryName: category ? category.name : 'Unknown', // Adding categoryName too to each user object alongside categoryID
      };
    });

    // console.log(filteredFavorites);

  // Render each favorite user
  const renderUser = ({item}) => (
    <TouchableOpacity
      style={styles.userCard}
      onPress={() =>
        navigation.navigate('Profile')
      }>
      <View style={styles.userInfo}>
        <Image source={{uri: item.profilePic}} style={styles.profilePic} />
        <View style={styles.textContainer}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.categoryName}>{item.categoryName}</Text>
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
        <Text style={styles.header}>Favourites</Text>
        <HamburgerMenu navigation={navigation} size={20} />
      </View>
      <View style={styles.secondSection}>
        <SearchBar
          placeholder="Search favourites"
          onSearch={setSearchTerm}
          style={styles.searchBar}
        />
        <TouchableOpacity
          style={styles.filterDiv}
          onPress={() => setModalVisible(true)} // Open modal on filter icon press
        >
          <HugeIcon name="filter" size={20} color={colors.textDark} />
        </TouchableOpacity>
      </View>
      {filteredFavorites.length > 0 ? (
        <FlatList
          data={filteredFavorites}
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
          <Text style={styles.noFavoritesText}>
            No favorites found with that name.
          </Text>
        </View>
      )}

      {/* SlideUpModal for Category Filter */}
      <SlideUpModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        title="Select Category">
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryItem}
            onPress={() => {
              setSelectedCategory(category);
              setModalVisible(false);
            }}>
            <Image source={category.image} style={styles.categoryImage} />
            <Text style={styles.modalCategoryName}>{category.name}</Text>
          </TouchableOpacity>
        ))}
        {/* Remove All Filters Button */}
        <TouchableOpacity
          style={styles.removeFiltersButton}
          onPress={() => {
            setSelectedCategory(null);
            setModalVisible(false);
          }}>
          <Text style={styles.removeFiltersText}>Remove All Filters</Text>
        </TouchableOpacity>
      </SlideUpModal>
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
  secondSection: {
    width: wp(90),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchBar: {
    width: wp(75),
    marginVertical: hp(2),
    alignSelf: 'center',
  },
  filterDiv: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: colors.secondaryColor30,
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
    shadowOffset: {width: 0, height: 2},
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
  categoryName: {
    fontSize: hp(1.75),
    color: colors.primaryDark,
  },
  userScores: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  agreementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  noFavoritesText: {
    fontSize: hp(2),
    fontWeight: weight.medium,
    color: colors.text,
    marginTop: hp(2),
  },
  // Styles for the category items in the modal
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: hp(1.5),
    marginBottom: hp(1.5),
    borderBottomColor: colors.primaryColor60,
    borderBottomWidth: 2,
  },
  categoryImage: {
    width: wp(10),
    height: wp(10),
    borderRadius: radius.sm,
    marginRight: wp(4),
  },
  modalCategoryName: {
    fontSize: hp(2),
    fontWeight: weight.medium,
    color: colors.text,
  },
  removeFiltersButton: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    backgroundColor: colors.primaryDark,
    borderRadius: radius.sm,
    marginBottom: hp(2),
    alignSelf: 'center',
  },
  removeFiltersText: {
    fontSize: hp(2),
    fontWeight: weight.semibold,
    color: colors.secondaryColor30,
  },
});

export default FavouritesScreen;
