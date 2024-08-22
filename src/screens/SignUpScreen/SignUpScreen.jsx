import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import React, {useRef, useState, useContext} from 'react';
import {AuthContext} from '../../navigation/AuthProvider';

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

const SignUpScreen = ({navigation}) => {
  const nameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [loading, setLoading] = useState(false);

  // const {register} = useContext(AuthContext);

  const onSubmit = async () => {
    if (!nameRef.current || !emailRef.current || !passwordRef.current) {
      Alert.alert('Sign up', 'Please fill all the fields');
      return;
    }
    // setLoading(true); 
    // try {
    //   await register(emailRef.current, passwordRef.current, nameRef.current);
    // } catch (error) {
    //   Alert.alert('Sign up', 'Failed to sign up');
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
          <Text style={styles.welcomeText}>Let's</Text>
          <Text style={[styles.welcomeText, {color: colors.primary}]}>
            Get Started!
          </Text>
        </View>
        {/* Form */}
        <View style={styles.form}>
          <Input
            icon={<HugeIcon name="user" size={26} strokeWidth={1.6} />}
            placeholder="Enter your name"
            onChangeText={value => (nameRef.current = value)}
          />
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
          <ActionButton onPress={onSubmit} buttonText="Sign Up" />
          {/* <Text style={{ color: colors.primaryDark }}>or</Text> */}
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

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Pressable>
            <Text
              style={[
                styles.footerText,
                {color: colors.primaryDark, fontWeight: weight.semibold},
              ]}
              onPress={() => navigation.replace('LoginScreen')}>
              Login
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

export default SignUpScreen;

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
