import React, { useRef, useEffect } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import { hp, wp } from '../../helpers/common';

const CustomAlert = ({ message, visible }) => {
  const slideAnim = useRef(new Animated.Value(-50)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Reset animation values
      slideAnim.setValue(50);
      fadeAnim.setValue(0);

      Animated.sequence([
        Animated.parallel([
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(1000),
        Animated.parallel([
          Animated.timing(slideAnim, {
            toValue: -50,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }
  }, [visible]);

  return (
    <Animated.View
      style={[
        styles.alertContainer,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      <Text style={styles.alertText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    position: 'absolute',
    top: hp(10),
    maxWidth: wp(80),
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#ffcccc',
    borderRadius: 5,
    alignItems: 'center',
  },
  alertText: {
    color: '#ff0000',
    fontSize: 16,
  },
});

export default CustomAlert;