import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {pendingOrders as initialOrders} from '../../constants/orders';
import colors from '../../constants/colors';
import HugeIcon from '../../assets/icons';
import SlideUpModal from '../../components/SlideUpModal/SlideUpModal';
import {wp, hp} from '../../helpers/common';
import radius from '../../constants/radius';
import weight from '../../constants/weight';
import SearchBar from '../../components/SearchBar/SearchBar';
import { EmptyLottie } from '../../assets/lottie';
import LottieComponent from '../../components/LottieComponent/LottieComponent';

const OrdersScreen = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = id => {
    setOrders(prevOrders => prevOrders.filter(order => order.id !== id));
    closeModal();
  };

  const openModal = order => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // Filter orders (by both title and subtitle)
  const filteredOrders = orders.filter(
    order =>
      order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.subtitle.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.orderItem} onPress={() => openModal(item)}>
      <View style={styles.firstColumn}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
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
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Title section */}
      <View style={styles.firstSection}>
        <Text style={styles.nameTitle}>Pending Orders</Text>
      </View>

      {/* List section */}
      <View style={styles.secondSection}>
        {/* Search Bar */}
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
            <Text style={styles.noOrdersText}>
              No such orders found.
            </Text>
          </View>
        )}
      </View>

      {/* Modal section */}
      {selectedOrder && (
        <SlideUpModal
          visible={modalVisible}
          onClose={closeModal}
          title="Order Details">
          <View style={styles.messageContent}>
            <View style={styles.messageRow}>
              <HugeIcon name="user" size={25} strokeWidth={1.5} />
              <Text style={styles.messageText}>
                {selectedOrder.providerName}
              </Text>
            </View>
            <View style={styles.messageRow}>
              <HugeIcon name="calendar" size={25} strokeWidth={1.5} />
              <Text style={styles.messageText}>
                {selectedOrder.appointmentDate}
              </Text>
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
