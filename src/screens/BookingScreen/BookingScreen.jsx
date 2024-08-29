import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import BackButton from '../../components/BackButton/BackButton';
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu';
import colors from '../../constants/colors';
import {wp, hp} from '../../helpers/common';
import weight from '../../constants/weight';
import radius from '../../constants/radius';
import HugeIcon from '../../assets/icons';
import SlideUpModal from '../../components/SlideUpModal/SlideUpModal';
import {AuthContext} from '../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import DatePicker from 'react-native-date-picker';

const BookingScreen = ({navigation, route}) => {
  const {provider} = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [fieldToEdit, setFieldToEdit] = useState('');

  const {user} = useContext(AuthContext);

  const [heading, setHeading] = useState('Add heading');
  const [paragraph, setParagraph] = useState('Add paragraph');
  const [location, setLocation] = useState('Add location');
  const [calendar, setCalendar] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState(null);

  const formattedDate = calendar
    ? calendar.toLocaleDateString()
    : 'Add datetime';

  const [date, setDate] = useState(new Date());

  const openModal = (title, field) => {
    setModalTitle(title);
    setFieldToEdit(field);

    setInputValue(
      field === 'heading'
        ? heading
        : field === 'paragraph'
        ? paragraph
        : location,
    );
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCalendarModalVisible(false);
  };

  const openCalendarModal = title => {
    setModalTitle(title);
    setCalendarModalVisible(true);
  };

  const handleSave = () => {
    if (fieldToEdit === 'heading') {
      setHeading(inputValue);
    } else if (fieldToEdit === 'paragraph') {
      setParagraph(inputValue);
    } else if (fieldToEdit === 'location') {
      setLocation(inputValue);
    }
    closeModal();
  };

  const handleSaveDate = () => {
    setAppointmentDate(date);
    setCalendar(date);
    closeModal();
  };

  const handleConfirmOrder = async () => {
    try {
      const bookingRef = firestore().collection('bookings').doc();
      await bookingRef.set({
        customerID: user.uid,
        providerID: provider.id,
        heading: heading,
        paragraph: paragraph,
        location: location,
        appointmentDate: firestore.Timestamp.fromDate(appointmentDate),
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      alert('Booking confirmed!');
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error confirming booking. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <BackButton navigation={navigation} />
        <Text style={styles.header}>Service Request</Text>
        <HamburgerMenu navigation={navigation} size={20} />
      </View>
      <View style={styles.content}>
        {/* heading */}
        <TouchableOpacity
          style={styles.detailItem}
          onPress={() => openModal('Heading', 'heading')}>
          <HugeIcon name="heading" size={20} strokeWidth={1.5} />
          <Text style={styles.fieldValue}>{heading}</Text>
        </TouchableOpacity>

        {/* paragraph */}
        <TouchableOpacity
          style={styles.detailItem}
          onPress={() => openModal('Paragraph', 'paragraph')}>
          <HugeIcon name="paragraph" size={20} strokeWidth={1.5} />
          <Text style={styles.fieldValue}>{paragraph}</Text>
        </TouchableOpacity>

        {/* location */}
        <TouchableOpacity
          style={styles.detailItem}
          onPress={() => openModal('Location', 'location')}>
          <HugeIcon name="location" size={20} strokeWidth={1.5} />
          <Text style={styles.fieldValue}>{location}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.detailItem}
          onPress={() => openCalendarModal('Calendar')}>
          <HugeIcon name="calendar" size={20} strokeWidth={1.5} />
          <Text style={styles.fieldValue}>{formattedDate}</Text>
        </TouchableOpacity>

        {/* confirm button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleConfirmOrder}>
          <Text style={styles.actionText}>Confirm Order</Text>
        </TouchableOpacity>
      </View>

      {/* slideup modal */}
      <SlideUpModal
        visible={modalVisible}
        onClose={closeModal}
        title={modalTitle}>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={setInputValue}
        />
        <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
          <Text style={styles.actionText}>Save</Text>
        </TouchableOpacity>
      </SlideUpModal>

      {/* slideup modal for calendar */}
      <SlideUpModal
        visible={calendarModalVisible}
        onClose={closeModal}
        title={modalTitle}>
        <DatePicker
          date={date}
          onDateChange={setDate}
          theme="light"
          minimumDate={new Date()}
        />
        <TouchableOpacity style={styles.actionButton} onPress={handleSaveDate}>
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
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: wp(4),
    marginVertical: hp(2),
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
  fieldValue: {
    width: '70%',
    textAlign: 'right',
    fontSize: hp(2),
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
});

export default BookingScreen;
