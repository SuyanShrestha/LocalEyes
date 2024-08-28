import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {appointments as initialAppointments} from '../../constants/appointments';
import colors from '../../constants/colors';
import radius from '../../constants/radius';
import weight from '../../constants/weight';
import HugeIcon from '../../assets/icons';
import SlideUpModal from '../../components/SlideUpModal/SlideUpModal';
import {hp, wp} from '../../helpers/common';
import {AuthContext} from '../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

const AppointmentScreen = () => {
  // const [appointments, setAppointments] = useState(initialAppointments);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [appointments, setAppointments] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [username, setUsername] = useState('');

  const {user} = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('bookings')
      .where('providerID', '==', user.uid)
      .onSnapshot(snapshot => {
        const fetchedAppointments = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAppointments(fetchedAppointments);
      });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  const handleAccept = bookingId => {
    const bookingRef = firestore().collection('bookings').doc(bookingId);

    const unsubscribe = bookingRef.onSnapshot(async doc => {
      if (doc.exists) {
        const bookingData = doc.data();

        try {
          // adding booking data to the orders collection
          const ordersRef = firestore().collection('orders').doc();
          await ordersRef.set({
            customerID: bookingData.customerID,
            providerID: bookingData.providerID,
            heading: bookingData.heading,
            paragraph: bookingData.paragraph,
            createdAt: firestore.FieldValue.serverTimestamp(),
          });

          // deleting the accepted booking from the bookings collection
          await bookingRef.delete();

          alert('Order has been accepted and moved to orders!');
          unsubscribe();
        } catch (error) {
          console.error('Error processing order: ', error);
          alert('Error accepting the booking. Please try again.');
        }
      } else {
        alert('Booking not found!');
        unsubscribe();
      }
    });

    closeModal();
  };

  const handleReject = async id => {
    await firestore().collection('bookings').doc(id).delete();
    setAppointments(prevAppointments =>
      prevAppointments.filter(appointment => appointment.id !== id),
    );
    closeModal();
  };

  const openModal = order => {
    setSelectedOrder(order);
    setModalVisible(true);

    // Fetching username based on customerID for modal
    const unsubscribe = firestore()
      .collection('users')
      .doc(order.customerID)
      .onSnapshot(doc => {
        if (doc.exists) {
          setUsername(doc.data().username);
        }
      });

    return () => unsubscribe();
  };

  const closeModal = () => {
    setModalVisible(false);
    setUsername(''); // reset username
  };

  // for flatlists
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
          <Text style={styles.time}>{timeAgo}</Text>
        </View>
      </TouchableOpacity>
    );
  };

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
            {/* username */}
            <View style={styles.messageRow}>
              <HugeIcon
                name="user"
                size={25}
                strokeWidth={1.5}
                color={colors.textDark}
              />
              <Text style={[styles.messageText, styles.headingText]}>
                {username}
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

            {/* location */}
            <View style={styles.messageRow}>
              <HugeIcon name="location" size={25} strokeWidth={1.5} />
              <Text style={styles.messageText}>{selectedOrder.location}</Text>
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
    textAlign: 'center',
    width: wp(25),
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
  headingText: {
    fontWeight: weight.medium,
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
