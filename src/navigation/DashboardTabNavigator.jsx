import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeDrawerNavigator from './HomeDrawerNavigator';
import OrdersScreen from '../screens/OrdersScreen/OrdersScreen';
import NotificationsScreen from '../screens/NotificationsScreen/NotificationsScreen';
import HugeIcon from '../assets/icons';
import colors from '../constants/colors';

const Tab = createBottomTabNavigator();

const DashboardTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'HomeDrawer') iconName = 'home';
          else if (route.name === 'Orders') iconName = 'note';
          else if (route.name === 'Notifications') iconName = 'notification';

          return <HugeIcon name={iconName} size={size || 24} color={focused ? color : 'gray'} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="HomeDrawer" component={HomeDrawerNavigator} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
    </Tab.Navigator>
  );
};

export default DashboardTabNavigator;
