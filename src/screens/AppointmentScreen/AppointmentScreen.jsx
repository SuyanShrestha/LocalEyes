import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
} from 'react-native';
import { appointments as initialAppointments } from '../../constants/appointments';
import colors from '../../constants/colors';
import { wp, hp } from '../../helpers/common';
import radius from '../../constants/radius';
import weight from '../../constants/weight';
import HugeIcon from '../../assets/icons';

const { height } = Dimensions.get('window');

const AppointmentScreen = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  const handleAccept = id => {
    // Handle accept logic here
    closeModal();
  };

  const handleReject = id => {
    setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== id));
    closeModal();
  };

  const openModal = order => {
    setSelectedOrder(order);
    console.log('Selected Order:', order);
    setModalVisible(true);
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(),
      Animated.timing(overlayAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start(),
    ]);
  };

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 400,
        useNativeDriver: true,
      }).start(),
      Animated.timing(overlayAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        setModalVisible(false);
      }),
    ]);
  };

  const renderItem = ({ item }) => {
    console.log('Render Item:', item);
    return (
      <TouchableOpacity style={styles.orderItem} onPress={() => openModal(item)}>
        <View style={styles.firstColumn}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
        <View style={styles.secondColumn}>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* title section */}
      <View style={styles.firstSection}>
        <Text style={styles.nameTitle}>Appointments</Text>
      </View>

      {/* list section */}
      <View style={styles.secondSection}>
        <FlatList
          data={appointments}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>

      {/* Modal section */}
      {selectedOrder && (
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="none"
          onRequestClose={closeModal}>
          <Animated.View
            style={[
              styles.overlay,
              {
                opacity: overlayAnim,
              },
            ]}>
            <TouchableOpacity style={{ flex: 1 }} onPress={closeModal} />
          </Animated.View>

          <Animated.View
            style={[
              styles.modalContent,
              { transform: [{ translateY: slideAnim }] },
            ]}>
            <Text style={styles.title}>Request Details</Text>
            <View style={styles.messageRow}>
              <HugeIcon name="user" size={25} strokeWidth={1.5} />
              <Text style={styles.messageText}>{selectedOrder.customerName}</Text>
            </View>
            <View style={styles.messageRow}>
              <HugeIcon name="calendar" size={25} strokeWidth={1.5} />
              <Text style={styles.messageText}>{selectedOrder.appointmentDate}</Text>
            </View>
            <View style={styles.messageRow}>
              <HugeIcon name="location" size={25} strokeWidth={1.5} />
              <Text style={styles.messageText}>{selectedOrder.location}</Text>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.actionButton, styles.acceptButton]}
                onPress={() => handleAccept(selectedOrder.id)}>
                <Text style={styles.actionText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.rejectButton]}
                onPress={() => handleReject(selectedOrder.id)}>
                <Text style={styles.actionText}>Reject</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Modal>
      )}
    </View>
  );
};

export default AppointmentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  firstSection: {
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  firstColumn: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  secondColumn: {
    alignItems: 'center',
  },
  time: {
    fontSize: wp(3.5),
    color: '#999',
  },
  secondSection: {
    marginHorizontal: wp(4),
    marginBottom: hp(10),
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    alignItems: 'flex-start',
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
    justifyContent: 'space-between',
    width: '100%',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  acceptButton: {
    backgroundColor: colors.primary,
  },
  rejectButton: {
    backgroundColor: '#f56a6a',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
  },
});
