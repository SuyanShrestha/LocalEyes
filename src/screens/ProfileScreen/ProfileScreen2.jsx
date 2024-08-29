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

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const ProfileScreen2 = ({route, navigation}) => {
  // const [ownProfile, setOwnProfile] = useState(true);
  const [ownProfile, setOwnProfile] = useState(
    route.params?.ownProfile ?? true, // because this nullish coalescing operator (??) is better than ||
  );
  const [provider, setProvider] = useState(route.params?.provider ?? true);
  const [profileDetails, setProfileDetails] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [cameraModalVisible, setCameraModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [fieldToEdit, setFieldToEdit] = useState('');
  const {user, logout} = useContext(AuthContext);

  const [imageData, setImageData] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const [favouriteIcon, setFavouriteIcon] = useState('heartAdd');
  const [favourites, setFavourites] = useState([]);

  // for getting user details
  useEffect(() => {
    let unsubscribe;
    if (user) {
      unsubscribe = firestore()
        .collection('users')
        .doc(ownProfile ? user.uid : provider.id)
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

  // for handling favourites
  useEffect(() => {
    const favouritesDocRef = firestore().collection('favourites').doc(user.uid);
    const unsubscribe = favouritesDocRef.onSnapshot(
      docSnapshot => {
        if (docSnapshot.exists) {
          const data = docSnapshot.data();
          if (data) {
            setFavourites(data.favourites || []);
            if (data.favourites && data.favourites.includes(provider.id)) {
              setFavouriteIcon('heartCheck');
            } else {
              setFavouriteIcon('heartAdd');
            }
          }
        } else {
          console.log('Favourites document does not exist for this user!');
        }
      },
      error => {
        console.error('Error fetching favourites document:', error);
      },
    );

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, [user.uid, provider.id]);

  // for fetching profile pic
  useEffect(() => {
    const idToUse = ownProfile ? user.uid : provider.id;

    const unsubscribe = firestore()
      .collection('users')
      .doc(idToUse)
      .onSnapshot(
        doc => {
          if (doc.exists) {
            const profileData = doc.data();
            setImageUrl(profileData.profilePic);
          } else {
            console.log('Document does not exist');
          }
        },
        error => {
          console.error('Error fetching profile pic: ', error);
        },
      );

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, [ownProfile, user, provider]);

  // for profile pic
  const handleImageResult = result => {
    if (result.didCancel) {
      setImageData(null);
    } else if (result.errorCode) {
      console.error('ImagePicker Error: ', result.errorMessage);
      setImageData(null);
    } else {
      setImageData(result);
    }
  };

  // for camera profile pic
  const openCamera = async () => {
    const result = await launchCamera({mediaType: 'photo'});
    handleImageResult(result);
  };

  // for gallery profile pic
  const openGallery = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    handleImageResult(result);
  };

  const uploadImage = async () => {
    try {
      const reference = storage().ref(imageData.assets[0].fileName);
      const pathToFile = imageData.assets[0].uri;
      await reference.putFile(pathToFile);

      const url = await storage()
        .ref(imageData.assets[0].fileName)
        .getDownloadURL();

      await firestore().collection('users').doc(user.uid).update({
        profilePic: url,
      });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

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
    setCameraModalVisible(false);
    setLogoutModalVisible(false);
  };

  const openCameraModal = title => {
    setModalTitle(title);
    setCameraModalVisible(true);
  };

  const openLogoutModal = title => {
    setModalTitle(title);
    setLogoutModalVisible(true);
  };

  const handleCameraSave = () => {
    uploadImage();
    closeModal();
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
      }
    } catch (error) {
      console.error('Error updating profile: ', error);
    }
    closeModal();
  };

  // handling booking
  const handleBooking = () => {
    navigation.navigate('BookingScreen', {provider: provider});
  };

  // adding and removing favourites
  const handleFavourite = async () => {
    try {
      const favouritesDocRef = firestore()
        .collection('favourites')
        .doc(user.uid);

      const updatedFavourites = favourites.includes(provider.id)
        ? favourites.filter(id => id !== provider.id)
        : [...favourites, provider.id];

      await favouritesDocRef.set(
        {
          uid: user.uid,
          favourites: updatedFavourites,
        },
        {merge: true},
      );
    } catch (error) {
      console.error('Error updating favourites:', error);
    }
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
            <TouchableOpacity
              style={styles.imageDiv}
              onPress={() => openCameraModal('Profile Picture')}>
              {imageUrl ? (
                <Image source={{uri: imageUrl}} style={styles.userImg} />
              ) : (
                <Image
                  style={styles.userImg}
                  source={{
                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRooEnD32-UtBw55GBfDTxxUZApMhWWnRaoLw&s',
                  }}
                />
              )}
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
              onPress={() => openLogoutModal('Come back soon!')}>
              <Text style={styles.actionText}>Logout</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // other person profile
          <View style={styles.profileContent}>
            {/* Profile Picture */}
            <View style={styles.imageDiv}>
              {imageUrl ? (
                <Image source={{uri: imageUrl}} style={styles.userImg} />
              ) : (
                <Image
                  style={styles.userImg}
                  source={{
                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRooEnD32-UtBw55GBfDTxxUZApMhWWnRaoLw&s',
                  }}
                />
              )}
            </View>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleBooking}>
                <HugeIcon
                  name="userAdd"
                  size={26}
                  strokeWidth={1.5}
                  style={styles.addButton}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleFavourite}>
                <HugeIcon
                  name={favouriteIcon}
                  size={26}
                  strokeWidth={1.5}
                  style={styles.addButton}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.contentSection}>
              <View style={styles.detailItem}>
                <Text style={styles.fieldName}>Name</Text>
                <Text style={styles.fieldValue}>
                  {profileDetails.find(item => item.field === 'Name')?.value ||
                    'Not Available'}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.fieldName}>Email</Text>
                <Text style={styles.fieldValue}>
                  {profileDetails.find(item => item.field === 'Email')?.value ||
                    'Not Available'}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.fieldName}>Phone</Text>
                <Text style={styles.fieldValue}>
                  {profileDetails.find(item => item.field === 'Phone')?.value ||
                    'Not Available'}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.fieldName}>Category</Text>
                <Text style={styles.fieldValue}>
                  {profileDetails.find(item => item.field === 'Category')
                    ?.value || 'Not Available'}
                </Text>
              </View>
            </View>
          </View>
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

      <SlideUpModal
        visible={cameraModalVisible}
        onClose={closeModal}
        title={modalTitle}>
        {/* image */}
        <View style={styles.modalProfilePicDiv}>
          {imageData ? (
            <Image
              source={{uri: imageData.assets[0].uri}}
              style={styles.modalProfilePic}
            />
          ) : (
            <Image
              source={{
                uri: imageUrl,
              }}
              style={styles.modalProfilePic}
            />
          )}
        </View>
        <View style={styles.profilePicEditButtons}>
          <TouchableOpacity
            onPress={() => {
              openCamera();
            }}
            style={styles.profilePicEditButton}>
            <HugeIcon name="camera" size={25} strokeWidth={1.5} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              openGallery();
            }}
            style={styles.profilePicEditButton}>
            <HugeIcon name="googlePhotos" size={25} strokeWidth={1.5} />
          </TouchableOpacity>
        </View>

        {/* save button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            handleCameraSave();
          }}>
          <Text style={styles.actionText}>Save</Text>
        </TouchableOpacity>
      </SlideUpModal>

      {/* logout modal */}
      <SlideUpModal
        visible={logoutModalVisible}
        onClose={closeModal}
        title={modalTitle}>
        <Text style={styles.subtitle}>Are you sure you want to logout?</Text>
        <TouchableOpacity onPress={logout} style={styles.actionButton}>
          <Text style={styles.actionText}> Yes, Logout.</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={closeModal}>
          <Text style={[styles.actionText, styles.cancelButtonText]}>
            {' '}
            Cancel.
          </Text>
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
    borderColor: colors.primaryColor60,
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
    fontWeight: weight.medium,
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

  // other profile
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: hp(2),
  },
  buttonContainer: {
    backgroundColor: colors.secondaryColor30,
    padding: wp(2.5),
    borderRadius: radius.xs,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  addButton: {
    color: colors.text,
  },
  modalProfilePicDiv: {
    backgroundColor: 'rgba(0,0,0,0.08)',
    padding: 4,
    borderRadius: 75,
    alignSelf: 'center',
  },
  modalProfilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
  },
  profilePicEditButtons: {
    flexDirection: 'row',
    justifyContent:'space-around',
    marginVertical: 10,
    paddingHorizontal: wp(5),
  },
  profilePicEditButton: {
    backgroundColor: 'rgba(0,0,0,0.08)',
    padding: 8,
    borderRadius: 75,
    marginBottom: 10,
    alignSelf: 'center',
  },
  subtitle: {
    color: '#999',
    marginBottom: 10,
  },
  cancelButtonText: {
    color: colors.primaryDark,
    marginTop: 6,
  },
});

export default ProfileScreen2;
