import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../HomeScreen/HomeScreen';
import OrdersScreen from '../OrdersScreen/OrdersScreen';
import NotificationsScreen from '../NotificationsScreen/NotificationsScreen';
import HugeIcon from '../../assets/icons';
import colors from '../../constants/colors';

const DashboardScreen = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Orders') {
            iconName = 'note';
          } else if (route.name === 'Notifications') {
            iconName = 'notification';
          }

          return (
            <HugeIcon
              name={iconName}
              size={size || 24}
              color={focused ? color : 'gray'}
            />
          );
        },
        tabBarActiveTintColor: colors.primary, 
        tabBarInactiveTintColor: 'gray', 
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
    </Tab.Navigator>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({});
