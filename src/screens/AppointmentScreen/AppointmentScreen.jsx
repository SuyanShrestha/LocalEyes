import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {appointments as initialAppointments} from '../../constants/appointments';
import colors from '../../constants/colors';
import radius from '../../constants/radius';
import weight from '../../constants/weight';
import HugeIcon from '../../assets/icons';
import SlideUpModal from '../../components/SlideUpModal/SlideUpModal';
import {hp, wp} from '../../helpers/common';
import { AuthContext } from '../../navigation/AuthProvider';

const AppointmentScreen = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const {user} = useContext(AuthContext);

  const handleAccept = id => {
    // Handle accept logic here
    closeModal();
  };

  const handleReject = id => {
    setAppointments(prevAppointments =>
      prevAppointments.filter(appointment => appointment.id !== id),
    );
    closeModal();
  };

  const openModal = order => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderItem = ({item}) => (
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

  return (
    <View style={styles.container}>
      {/* Title section */}
      <View style={styles.firstSection}>
        <Text style={styles.nameTitle}>Appointments</Text>
      </View>

      {/* List section */}
      <View style={styles.secondSection}>
        <FlatList
          data={appointments}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>

      {/* Modal section */}
      {selectedOrder && (
        <SlideUpModal
          visible={modalVisible}
          onClose={closeModal}
          title="Request Details">
          <View style={styles.messageContent}>
            <View style={styles.messageRow}>
              <HugeIcon name="user" size={25} strokeWidth={1.5} />
              <Text style={styles.messageText}>
                {selectedOrder.customerName}
              </Text>
            </View>
            <View style={styles.messageRow}>
              <HugeIcon name="calendar" size={25} strokeWidth={1.5} />
              <Text style={styles.messageText}>
                {selectedOrder.appointmentDate}
              </Text>
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
          </View>
        </SlideUpModal>
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
  messageContent: {
    marginVertical: 8,
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
