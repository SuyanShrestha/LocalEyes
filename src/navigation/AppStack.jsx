import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeDrawerNavigator from './HomeDrawerNavigator';
import OrdersScreen from '../screens/OrdersScreen/OrdersScreen';
import AppointmentScreen from '../screens/AppointmentScreen/AppointmentScreen';
import HugeIcon from '../assets/icons';
import colors from '../constants/colors';

const Tab = createBottomTabNavigator();

const AppStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Menu') iconName = 'dashboard';
          else if (route.name === 'Orders') iconName = 'note';
          else if (route.name === 'Appointments') iconName = 'appointment';

          return <HugeIcon name={iconName} size={size || 24} color={focused ? color : 'gray'} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Menu" component={HomeDrawerNavigator} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Appointments" component={AppointmentScreen} />
    </Tab.Navigator>
  );
};

export default AppStack;
