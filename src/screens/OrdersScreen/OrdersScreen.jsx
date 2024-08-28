import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
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

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [providerName, setProviderName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');

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
    setModalVisible(true);

    // fetching provider's name based on providerID for modal
    const unsubscribe = firestore()
      .collection('users')
      .doc(order.providerID)
      .onSnapshot(doc => {
        if (doc.exists) {
          setProviderName(doc.data().username);
        }
      });

    return () => unsubscribe();
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // Filter orders (by both title and subtitle)
  const filteredOrders = orders.filter(
    order =>
      order.heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.paragraph.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.orderItem} onPress={() => openModal(item)}>
      <View style={styles.firstColumn}>
        <Text style={styles.title}>{item.heading}</Text>
        <Text style={styles.subtitle}>{item.paragraph}</Text>
      </View>
      <View style={styles.secondColumn}>
        <View style={styles.actionButtons}>
          <TouchableOpacity>
            <HugeIcon name="star" size={25} strokeWidth={1.5} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <HugeIcon name="delete" size={25} strokeWidth={1.5} />
          </TouchableOpacity>
        </View>
        <Text style={styles.time}>
          {new Date(item.createdAt.toDate()).toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

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
            <Text style={styles.noOrdersText}>No such orders found.</Text>
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
            {appointmentDate && (
              <View style={styles.messageRow}>
                <HugeIcon name="calendar" size={25} strokeWidth={1.5} />
                <Text style={styles.messageText}>
                  {selectedOrder.appointmentDate}
                </Text>
              </View>
            )}

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
          </View>
        </SlideUpModal>
      )}
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
    color: '#999',
  },
  secondSection: {
    height: '100%',
    marginHorizontal: wp(4),
    backgroundColor: colors.primaryColor60,
  },
  emptyState: {
    flex: 1,
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
  actionButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  acceptButton: {
    backgroundColor: colors.primary,
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
  },
});
