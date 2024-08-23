import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import globalStyles from '../../styles/globalStyles';
import {hp, wp} from '../../helpers/common';
import colors from '../../constants/colors';
import weight from '../../constants/weight';
import radius from '../../constants/radius';
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu';

import {ContactImage} from '../../assets/images';
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
      {/* first container */}
      <View style={styles.firstContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTitle}>Contact Us</Text>
        </View>

        {/* hamburger */}
        <HamburgerMenu navigation={navigation} />
      </View>

      {/* second container */}
      <View style={styles.secondContainer}>
        <Text style={styles.introText}>
          Got questions? We're excited to assist you!
        </Text>

        <View style={styles.secondContainerContent}>
          {/* first section */}
          <View style={styles.directLinkContainer}>
            <View style={styles.linkedContacts}>
              <TouchableOpacity
                style={styles.buttonDiv}
                onPress={handlePhonePress}>
                <HugeIcon
                  name="phone"
                  strokeWidth={2.5}
                  color={colors.textDark}
                />
              </TouchableOpacity>
              <Text>+977 9861609800</Text>
            </View>
            <View style={styles.linkedContacts}>
              <TouchableOpacity
                style={styles.buttonDiv}
                onPress={handleMailPress}>
                <HugeIcon name="mail" strokeWidth={2.5} color={colors.textDark} />
              </TouchableOpacity>
              <Text>sh.suyan16@gmail.com</Text>
            </View>
          </View>
          {/* second section */}
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
  firstContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    height: hp(12),
    paddingHorizontal: wp(5),
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1),
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 50,
    resizeMode: 'contain',
  },
  nameTitle: {
    fontSize: hp(3.5),
    fontWeight: weight.bold,
    color: colors.secondaryColor30,
    width: wp(50),
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
    // fontWeight: weight.semibold,
    width: '100%',
  },
  secondContainerContent: {
    height: hp(75),
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
