import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import colors from '../../constants/colors';
import { wp, hp } from '../../helpers/common';
import radius from '../../constants/radius';
import weight from '../../constants/weight';


const InlinedDatePicker = () => {
  const [date, setDate] = useState(new Date());

  return (
    <View>
      <DatePicker date={date} onDateChange={setDate} />
      <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
        <Text style={styles.actionText}>Save</Text>
      </TouchableOpacity>
      <Text>Selected Date and Time: {date.toString()}</Text>
    </View>
  );
};

export default InlinedDatePicker;

const styles = StyleSheet.create({
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
});
