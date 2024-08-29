import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import globalStyles from '../../styles/globalStyles';
import {hp, wp} from '../../helpers/common';
import colors from '../../constants/colors';
import weight from '../../constants/weight';
import radius from '../../constants/radius';
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu';
import BackButton from '../../components/BackButton/BackButton';
import HugeIcon from '../../assets/icons';

const Contact = ({navigation}) => {
  const handlePhonePress = () => {
    Linking.openURL('tel:+9779861609800');
  };

  const handleMailPress = () => {
    Linking.openURL('mailto:sh.suyan16@gmail.com');
  };

  const handleFacebookPress = () => {
    Linking.openURL('https://www.facebook.com/suyanshrestha.9696');
  };

  const handleTwitterPress = () => {
    Linking.openURL('https://x.com/suyanshrestha_');
  };

  const handleInstagramPress = () => {
    Linking.openURL('https://www.instagram.com/suyanshrestha___');
  };

  const handleLinkedInPress = () => {
    Linking.openURL('https://www.linkedin.com/in/suyanshrestha/');
  };

  return (
    <ScrollView contentContainerStyle={[globalStyles.container]}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <BackButton navigation={navigation} />
        <Text style={styles.header}>Contact Us</Text>
        <HamburgerMenu navigation={navigation} size={20} />
      </View>

      {/* Content Section */}
      <View style={styles.secondContainer}>
        <Text style={styles.introText}>
          Got questions? We're excited to assist you!
        </Text>

        <View style={styles.secondContainerContent}>
          {/* Direct Contact */}
          <View style={styles.directLinkContainer}>
            <View style={styles.linkedContacts}>
              <TouchableOpacity
                style={styles.buttonDiv}
                onPress={handlePhonePress}>
                <HugeIcon
                  name="phone"
                  strokeWidth={2.5}
                  color={colors.text}
                />
              </TouchableOpacity>
              <Text>+977 9861609800</Text>
            </View>
            <View style={styles.linkedContacts}>
              <TouchableOpacity
                style={styles.buttonDiv}
                onPress={handleMailPress}>
                <HugeIcon
                  name="mail"
                  strokeWidth={2.5}
                  color={colors.text}
                />
              </TouchableOpacity>
              <Text>sh.suyan16@gmail.com</Text>
            </View>
          </View>

          {/* Social Media */}
          <View style={styles.socialContainer}>
            <Text style={styles.introText}>Get Connected!</Text>
            <View style={styles.socialButtons}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={handleFacebookPress}>
                <HugeIcon
                  name="facebook"
                  strokeWidth={1.5}
                  color={colors.textDark}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={handleTwitterPress}>
                <HugeIcon
                  name="twitter"
                  strokeWidth={1.5}
                  color={colors.textDark}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={handleInstagramPress}>
                <HugeIcon
                  name="instagram"
                  strokeWidth={1.5}
                  color={colors.textDark}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={handleLinkedInPress}>
                <HugeIcon
                  name="linkedin"
                  strokeWidth={1.5}
                  color={colors.textDark}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Contact;

const styles = StyleSheet.create({
  headerSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    height: hp(8),
    paddingHorizontal: wp(5),
    marginBottom: hp(2),
  },
  header: {
    fontSize: hp(2.5),
    fontWeight: weight.semibold,
    color: colors.secondaryColor30,
  },
  secondContainer: {
    minHeight: hp(82),
    paddingTop: hp(2),
    backgroundColor: colors.primaryColor60,
    display: 'flex',
    alignItems: 'center',
  },
  introText: {
    fontSize: hp(1.75),
    marginBottom: hp(1),
    textAlign: 'center',
    width: '100%',
  },
  secondContainerContent: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  directLinkContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: hp(5),
  },
  linkedContacts: {
    display: 'flex',
    alignItems: 'center',
    gap: wp(2),
  },
  buttonDiv: {
    backgroundColor: colors.primary,
    width: wp(12),
    padding: wp(3),
    borderRadius: radius.sm,
  },
  socialContainer: {
    alignItems: 'center',
    width: '100%',
  },
  socialButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: wp(2),
  },
  socialButton: {},
});
