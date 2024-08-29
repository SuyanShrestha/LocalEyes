import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import colors from '../../constants/colors';
import HugeIcon from '../../assets/icons';
import SlideUpModal from '../../components/SlideUpModal/SlideUpModal';
import {wp, hp} from '../../helpers/common';
import radius from '../../constants/radius';
import weight from '../../constants/weight';
import SearchBar from '../../components/SearchBar/SearchBar';
import {EmptyLottie} from '../../assets/lottie';
import LottieComponent from '../../components/LottieComponent/LottieComponent';
import {AuthContext} from '../../navigation/AuthProvider';
import moment from 'moment';
import {Rating} from 'react-native-ratings';

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [rateModalVisible, setRateModalVisible] = useState(false);
  const [userRating, setUserRating] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [providerName, setProviderName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [phone, setPhone] = useState('');

  const {user} = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('orders')
      .where('customerID', '==', user.uid)
      .onSnapshot(snapshot => {
        const fetchedOrders = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(fetchedOrders);
      });

    return () => unsubscribe();
  }, []);

  const handleDelete = id => {
    firestore().collection('orders').doc(id).delete();
    closeModal();
  };

  const openModal = order => {
    setSelectedOrder(order);
    console.log(order);
    setModalVisible(true);

    // fetching provider's name based on providerID for modal
    const unsubscribe = firestore()
      .collection('users')
      .doc(order.providerID)
      .onSnapshot(doc => {
        if (doc.exists) {
          setProviderName(doc.data().username);
          setPhone(doc.data().phone);
        }
      });

    return () => unsubscribe();
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // for rating modal
  const openRateModal = order => {
    setSelectedOrder(order);
    setRateModalVisible(true);
  };

  const closeRateModal = () => {
    setRateModalVisible(false);
  };

  const handleRatingSubmit = async rating => {
    setUserRating(rating);

    if (!selectedOrder) return;

    const providerRef = firestore()
      .collection('users')
      .doc(selectedOrder.providerID);

    try {
      // used onSnapshot here, but it threw unusual multiple additions, so used runTransaction here afterwards
      // when using runTransaction update is based on the most recent state of the document
      await firestore().runTransaction(async transaction => {
        const providerDoc = await transaction.get(providerRef);
        if (!providerDoc.exists) {
          throw new Error('Provider not found!');
        }

        const providerData = providerDoc.data();
        const currentTotalRating = providerData.totalRating || 0;
        const currentTotalAgreement = providerData.totalAgreements || 0;
        const newTotalRating = currentTotalRating + rating;
        const newTotalAgreement = currentTotalAgreement + 1;

        transaction.update(providerRef, {
          totalRating: newTotalRating,
          totalAgreements: newTotalAgreement,
        });
      });

      handleDelete(selectedOrder.id);
    } catch (error) {
      console.error('Error updating rating:', error);
    } finally {
      closeRateModal();
    }
  };

  const handleCallNow = () => {
    if (phone) {
      Linking.openURL(`tel:${phone}`);
    } else {
      console.warn('Phone number not available');
    }
  };

  // Filter orders (by both title and subtitle)
  const filteredOrders = orders.filter(
    order =>
      order.heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.paragraph.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const renderItem = ({item}) => {
    const timeAgo = moment(item.createdAt.toDate()).fromNow();

    return (
      <TouchableOpacity
        style={styles.orderItem}
        onPress={() => openModal(item)}>
        <View style={styles.firstColumn}>
          <Text style={styles.title}>{item.heading}</Text>
          <Text style={styles.subtitle}>{item.paragraph}</Text>
        </View>
        <View style={styles.secondColumn}>
          <View style={styles.actionButtons}>
            <TouchableOpacity onPress={() => openRateModal(item)}>
              <HugeIcon name="star" size={25} strokeWidth={1.5} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <HugeIcon name="delete" size={25} strokeWidth={1.5} />
            </TouchableOpacity>
          </View>
          <Text style={styles.time}>{timeAgo}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.firstSection}>
        <Text style={styles.nameTitle}>Pending Orders</Text>
      </View>
      <View style={styles.secondSection}>
        <SearchBar
          placeholder="Search orders"
          onSearch={setSearchTerm}
          style={styles.searchBar}
        />
        {filteredOrders.length > 0 ? (
          <FlatList
            data={filteredOrders}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            style={styles.orderList}
          />
        ) : (
          <View style={styles.emptyState}>
            <LottieComponent
              animationData={EmptyLottie}
              width={wp(100)}
              height={wp(100)}
            />
            <Text style={styles.noOrdersText}>No orders found.</Text>
          </View>
        )}
      </View>
      {selectedOrder && (
        <SlideUpModal
          visible={modalVisible}
          onClose={closeModal}
          title="Order Details">
          <View style={styles.messageContent}>
            {/* username */}
            <View style={styles.messageRow}>
              <HugeIcon
                name="user"
                size={25}
                strokeWidth={1.5}
                color={colors.textDark}
              />
              <Text style={[styles.messageText, styles.headingText]}>
                {providerName}
              </Text>
            </View>

            {/* datetime */}
            <View style={styles.messageRow}>
              <HugeIcon name="calendar" size={25} strokeWidth={1.5} />
              <Text style={styles.messageText}>
                {selectedOrder.appointmentDate.toDate().toLocaleString()}
              </Text>
            </View>

            {/* heading */}
            <View style={styles.messageRow}>
              <HugeIcon name="heading" size={25} strokeWidth={1.5} />
              <Text style={[styles.messageText]}>{selectedOrder.heading}</Text>
            </View>

            {/* paragraph */}
            <View style={styles.messageRow}>
              <HugeIcon name="paragraph" size={25} strokeWidth={1.5} />
              <Text style={styles.messageText}>{selectedOrder.paragraph}</Text>
            </View>

            {/* call now */}
            <TouchableOpacity
              style={[styles.actionButton, styles.callButton]}
              onPress={handleCallNow}>
              <Text style={styles.actionText}>Call Now</Text>
            </TouchableOpacity>
          </View>
        </SlideUpModal>
      )}

      {/* slideup modal for rating */}
      <SlideUpModal
        visible={rateModalVisible}
        onClose={closeRateModal}
        title="Rate now">
        <View style={styles.ratingContainer}>
          <Rating
            ratingCount={5}
            fractions={1}
            jumpValue={0.5}
            type="custom"
            ratingColor={colors.primary}
            imageSize={35}
            startingValue={0}
            onFinishRating={setUserRating}
            style={styles.rating}
          />
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => handleRatingSubmit(userRating)}>
          <Text style={styles.submitButtonText}>Submit Rating</Text>
        </TouchableOpacity>
      </SlideUpModal>
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  firstSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    height: hp(8),
  },
  nameTitle: {
    fontSize: hp(2.5),
    fontWeight: weight.semibold,
    color: colors.secondaryColor30,
  },
  searchBar: {
    width: wp(90),
    marginVertical: hp(2),
    alignSelf: 'center',
  },
  orderList: {
    marginBottom: hp(10),
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.secondaryColor30,
    borderRadius: radius.xs,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  firstColumn: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  secondColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: hp(1),
  },
  actionButtons: {
    flexDirection: 'row',
    gap: wp(4),
  },
  time: {
    fontSize: wp(3.5),
    textAlign: 'center',
    width: wp(25),
    color: '#999',
  },
  secondSection: {
    height: '100%',
    marginHorizontal: wp(4),
    backgroundColor: colors.primaryColor60,
  },
  emptyState: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noOrdersText: {
    fontSize: hp(2),
    fontWeight: weight.medium,
    color: colors.text,
    marginTop: hp(2),
  },
  messageContent: {
    marginTop: 8,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  headingText: {
    fontWeight: weight.medium,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  // actionButton: {
  //   paddingVertical: 12,
  //   borderRadius: 8,
  //   alignItems: 'center',
  //   marginHorizontal: 5,
  // },
  acceptButton: {
    backgroundColor: colors.primary,
  },
  // actionText: {
  //   color: '#fff',
  //   fontSize: 16,
  // },
  actionButton: {
    backgroundColor: colors.primary,
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
  callButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: wp(2),
  },
  ratingContainer: {
    alignItems: 'center',
    marginBottom: hp(2),
  },
  rating: {
    marginBottom: hp(2),
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: hp(1.5),
    borderRadius: radius.sm,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: hp(2),
    fontWeight: weight.semibold,
  },
});
