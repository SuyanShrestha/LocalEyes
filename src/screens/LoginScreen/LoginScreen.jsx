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

import { AuthContext } from '../../navigation/AuthProvider';


const LoginScreen = ({navigation}) => {
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [loading, setLoading] = useState(false);
  // const { login } = useContext(AuthContext);

  const onSubmit = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Login', 'Please fill all the fields');
      return;
    }

    // setLoading(true);
    // try {
    //   await login(emailRef.current, passwordRef.current);
    //   Alert.alert('Login', 'Logged in successfully!');
    //   navigation.navigate('Dashboard'); 
    // } catch (error) {
    //   Alert.alert('Login', error.message);
    // } finally {
    //   setLoading(false);
    // }
  };
  return (
    <ScreenWrapper bg={colors.white}>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <BackButton navigation={navigation} />
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
            <Text style={{color: colors.primaryDark}}>or</Text>
            <ActionButton
              onPress={() => {}}
              buttonText="Continue with Google"
              backgroundColor="transparent"
              textColor={colors.roseLight}
            />
            <ActionButton
              onPress={() => {}}
              buttonText="Continue with Facebook"
              backgroundColor="transparent"
              textColor={colors.roseLight}
            />
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
        <ActionButton
          onPress={() => navigation.navigate('Dashboard')}
          buttonText="Go to Dashboard"
          backgroundColor="transparent"
          textColor={colors.roseLight}
        />
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
    justifyContent: 'space-between',
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
});
