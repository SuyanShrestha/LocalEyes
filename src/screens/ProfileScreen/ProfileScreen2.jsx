import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import BackButton from '../../components/BackButton/BackButton';
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu';
import colors from '../../constants/colors';
import {wp, hp} from '../../helpers/common';
import weight from '../../constants/weight';
import radius from '../../constants/radius';
import HugeIcon from '../../assets/icons';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../navigation/AuthProvider';
import SlideUpModal from '../../components/SlideUpModal/SlideUpModal';
import {categories} from '../../constants/categories';

const ProfileScreen2 = ({navigation}) => {
  const [ownProfile, setOwnProfile] = useState(true);
  const [profileDetails, setProfileDetails] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [fieldToEdit, setFieldToEdit] = useState('');
  const {user, logout} = useContext(AuthContext);

  useEffect(() => {
    let unsubscribe;
    if (user) {
      unsubscribe = firestore()
        .collection('users')
        .doc(user.uid)
        .onSnapshot(
          userDoc => {
            if (userDoc.exists) {
              const userData = userDoc.data();
              setProfileDetails([
                {field: 'Name', value: userData.username || 'Not Available'},
                {field: 'Email', value: userData.email || 'Not Available'},
                {field: 'Phone', value: userData.phone || 'Not Available'},
                {
                  field: 'Category',
                  value:
                    getCategoryName(userData.categoryID) || 'Not Available',
                },
              ]);
            } else {
              console.log('User document does not exist');
            }
          },
          error => {
            console.error('Error fetching user data: ', error);
          },
        );
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  const getCategoryName = categoryID => {
    const category = categories.find(cat => cat.id === categoryID);
    return category ? category.name : 'Not Available';
  };

  const openModal = (title, content) => {
    setModalTitle(title);
    setInputValue(content);

    let field = '';
    if (title === 'Category') {
      field = 'categoryID';
    } else if (title === 'Phone') {
      field = 'phone';
    }
    setFieldToEdit(field);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSave = async () => {
    try {
      if (user) {
        await firestore()
          .collection('users')
          .doc(user.uid)
          .update({
            [fieldToEdit]: inputValue,
          });

        setProfileDetails(prevDetails =>
          prevDetails.map(detail =>
            detail.field === fieldToEdit
              ? {...detail, value: inputValue}
              : detail,
          ),
        );

        console.log('Profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile: ', error);
    }
    closeModal();
  };

  const renderCategoryItem = ({item}) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => setInputValue(item.id)}>
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <BackButton navigation={navigation} />
        <Text style={styles.header}>Profile</Text>
        <HamburgerMenu navigation={navigation} size={20} />
      </View>

      <View style={styles.contentSection}>
        {ownProfile ? (
          <View style={styles.profileContent}>
            {/* Profile Picture */}
            <TouchableOpacity style={styles.imageDiv}>
              <Image
                style={styles.userImg}
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRooEnD32-UtBw55GBfDTxxUZApMhWWnRaoLw&s',
                }}
              />
            </TouchableOpacity>

            <View style={styles.contentSection}>
              <TouchableOpacity style={styles.detailItem}>
                <Text style={styles.fieldName}>Name</Text>
                <Text style={styles.fieldValue}>
                  {profileDetails.find(item => item.field === 'Name')?.value ||
                    'Not Available'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.detailItem}>
                <Text style={styles.fieldName}>Email</Text>
                <Text style={styles.fieldValue}>
                  {profileDetails.find(item => item.field === 'Email')?.value ||
                    'Not Available'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.detailItem}
                onPress={() =>
                  openModal(
                    'Phone',
                    profileDetails.find(item => item.field === 'Phone')
                      ?.value || 'Not Available',
                  )
                }>
                <Text style={styles.fieldName}>Phone</Text>
                <Text style={styles.fieldValue}>
                  {profileDetails.find(item => item.field === 'Phone')?.value ||
                    'Not Available'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.detailItem}
                onPress={() =>
                  openModal(
                    'Category',
                    getCategoryName(
                      profileDetails.find(item => item.field === 'Category')
                        ?.value,
                    ),
                  )
                }>
                <Text style={styles.fieldName}>Category</Text>
                <Text style={styles.fieldValue}>
                  {profileDetails.find(item => item.field === 'Category')
                    ?.value || 'Not Available'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Logout button */}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => logout()}>
              <Text style={styles.actionText}>Logout</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // other person profile
          <View></View>
        )}
      </View>

      {/* SlideUpModal for displaying details */}
      <SlideUpModal
        visible={modalVisible}
        onClose={closeModal}
        title={modalTitle}>
        {fieldToEdit === 'categoryID' ? (
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id.toString()}
          />
        ) : (
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={setInputValue}
          />
        )}
        <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
          <Text style={styles.actionText}>Save</Text>
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
  contentSection: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  profileContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: hp(2),
  },
  imageDiv: {
    backgroundColor: 'rgba(0,0,0,0.08)',
    padding: 8,
    borderRadius: 75,
    marginVertical: hp(2.5),
    alignSelf: 'center',
  },
  userImg: {
    width: wp(30),
    height: wp(30),
    borderRadius: 75,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: wp(4),
    borderBottomColor: colors.primaryColor60,
    borderBottomWidth: 1,
    backgroundColor: colors.secondaryColor30,
    borderRadius: radius.xs,
    marginBottom: hp(1.5),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: wp(90),
  },
  fieldName: {
    fontSize: hp(2.25),
    fontWeight: weight.bold,
    color: colors.text,
  },
  fieldValue: {
    width: '70%',
    textAlign: 'right',
    fontSize: hp(2.25),
    fontWeight: weight.regular,
    color: 'rgba(0,0,0,0.5)',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.secondaryColor30,
    padding: wp(2),
    borderRadius: radius.xs,
    marginBottom: hp(2),
    width: wp(90),
  },
  actionButton: {
    backgroundColor: colors.primaryDark,
    padding: wp(3),
    borderRadius: radius.xs,
    marginVertical: hp(1),
    width: wp(90),
    alignSelf: 'center',
  },
  actionText: {
    fontSize: hp(2.25),
    fontWeight: weight.bold,
    color: colors.secondaryColor30,
    textAlign: 'center',
  },
  categoryItem: {
    padding: wp(3),
    borderBottomColor: colors.primaryColor60,
    borderBottomWidth: 1,
  },
  categoryText: {
    fontSize: hp(2.25),
    color: colors.text,
  },
});

export default ProfileScreen2;
