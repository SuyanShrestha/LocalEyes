import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {pendingOrders as initialOrders} from '../../constants/orders';
import colors from '../../constants/colors';
import HugeIcon from '../../assets/icons';
import {wp, hp} from '../../helpers/common';
import radius from '../../constants/radius';
import weight from '../../constants/weight';

const OrdersScreen = () => {
  const [orders, setOrders] = useState(initialOrders);

  const handleDelete = id => {
    setOrders(prevOrders => prevOrders.filter(order => order.id !== id));
  };

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.orderItem}>
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
      {/* title section*/}
      <View style={styles.firstSection}>
        <Text style={styles.nameTitle}>Pending Orders</Text>
      </View>

      {/* list section */}
      <View style={styles.secondSection}>
        <FlatList
          data={orders}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  firstSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: colors.primary,
    height: hp(8),
  },
  nameTitle: {
    fontSize: hp(2.5),
    fontWeight: weight.semibold,
    color: colors.secondaryColor30,
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  secondColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: hp(1),
  },
  actionButtons: {
    display: 'flex',
    flexDirection: 'row',
    gap: wp(4),
  },
  time: {
    fontSize: wp(3.5),
    color: '#999',
  },
  secondSection: {
    marginHorizontal: wp(4),
    marginBottom: hp(10),
    backgroundColor: colors.primaryColor60,
  }
});
