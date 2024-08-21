import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import colors from '../constants/colors';

const Drawer = createDrawerNavigator();

const HomeDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        swipeEnabled: true,
        drawerStyle: {
          backgroundColor: colors.secondaryColor30,
        },
        drawerActiveBackgroundColor: colors.primaryDark,
        drawerActiveTintColor: colors.white,
        drawerInactiveTintColor: colors.textDark,
      }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

export default HomeDrawerNavigator;
