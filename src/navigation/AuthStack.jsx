import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/OnboardingScreen/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import DashboardTabNavigator from './DashboardTabNavigator';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="OnboardingScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="Dashboard" component={DashboardTabNavigator} />
    </Stack.Navigator>
  );
};

export default AuthStack;