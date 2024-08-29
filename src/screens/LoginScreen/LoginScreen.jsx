import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  Alert,
  Image,
} from 'react-native';
import React, {useRef, useState, useContext} from 'react';

// Helpers
import {hp, wp} from '../../helpers/common';
import colors from '../../constants/colors';

// Components
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import Input from '../../components/Input/Input';
import BackButton from '../../components/BackButton/BackButton';
import HugeIcon from '../../assets/icons';
import weight from '../../constants/weight';
import ActionButton from '../../components/ActionButton/ActionButton';

import {AuthContext} from '../../navigation/AuthProvider';
import LottieComponent from '../../components/LottieComponent/LottieComponent';
import {LoginLottie} from '../../assets/lottie';
import CustomAlert from '../../components/CustomAlert/CustomAlert';

const LoginScreen = ({navigation}) => {
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const {login} = useContext(AuthContext);

  const onSubmit = async () => {
    if (!emailRef.current || !passwordRef.current) {
      setAlertMessage('Please fill all the fields');
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 2000);
      return;
    }
    login(emailRef.current, passwordRef.current);
  };

  return (
    <ScreenWrapper bg={colors.secondaryColor30}>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <View style={styles.logoDiv}>
            <Image
              source={require('../../assets/logo/logo5.jpg')}
              style={styles.logo}
            />
          </View>
        </View>
        {/* Welcome */}
        <View>
          <Text style={[styles.welcomeText]}>Hey,</Text>
          <Text style={[styles.welcomeText, {color: colors.primary}]}>
            Welcome Back!
          </Text>
        </View>
        {/* Form */}
        <View style={styles.form}>
          <Input
            icon={<HugeIcon name="mail" size={26} strokeWidth={1.6} />}
            placeholder="Enter your email"
            onChangeText={value => (emailRef.current = value)}
          />
          <Input
            icon={<HugeIcon name="lock" size={26} strokeWidth={1.6} />}
            placeholder="Enter your password"
            secureTextEntry
            onChangeText={value => (passwordRef.current = value)}
          />
          <View style={styles.socialDiv}>
            <ActionButton onPress={onSubmit} buttonText="Sign In" />
          </View>
        </View>

        {/* footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <Pressable>
            <Text
              style={[
                styles.footerText,
                {color: colors.primaryDark, fontWeight: weight.semibold},
              ]}
              onPress={() => navigation.replace('SignUpScreen')}>
              Sign up
            </Text>
          </Pressable>
        </View>

        {/* remaining section */}
        <View style={styles.lottieContainer}>
          <LottieComponent
            animationData={LoginLottie}
            width={wp(100)}
            height={wp(75)}
          />
        </View>

        {/* Custom Alert */}
        <CustomAlert message={alertMessage} visible={alertVisible} />
      </View>
    </ScreenWrapper>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: wp(5),
  },
  topSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logoDiv: {
    backgroundColor: 'rgba(0, 0, 0, 0.07)',
    padding: 5,
    borderRadius: 50,
  },
  logo: {
    width: 26,
    height: 26,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.text,
    resizeMode: 'cover',
  },
  welcomeText: {
    fontSize: hp(4),
    fontWeight: weight.bold,
    color: colors.text,
  },
  form: {
    gap: 25,
  },
  forgotPassword: {
    textAlign: 'right',
    fontWeight: weight.semibold,
    color: colors.text,
  },
  socialDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  footerText: {
    textAlign: 'center',
    color: colors.text,
    fontSize: hp(1.6),
  },
  lottieContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(10),
  },
});
