import React, {useContext} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ProfileScreen2 from '../screens/ProfileScreen/ProfileScreen2';
import Contact from '../screens/Contact/Contact';
import ProvidersScreen from '../screens/ProvidersScreen/ProvidersScreen';
import colors from '../constants/colors';
import FavouritesScreen from '../screens/FavouritesScreen/FavouritesScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProvidersScreen" component={ProvidersScreen} /> 
      <Stack.Screen name="Profile" component={ProfileScreen2} />
    </Stack.Navigator>
  );
};


const HomeDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        swipeEnabled: true,
        drawerStyle: {
          backgroundColor: colors.secondaryColor30,
        },
        drawerActiveBackgroundColor: colors.primaryDark,
        drawerActiveTintColor: colors.secondaryColor30,
        drawerInactiveTintColor: colors.textDark,
      }}>
      <Drawer.Screen name="Home" component={HomeStackNavigator} /> 
      <Drawer.Screen name="Profile" component={ProfileScreen2}/>
      <Drawer.Screen name="Favourites" component={FavouritesScreen} />
      <Drawer.Screen name="Contact" component={Contact} />
    </Drawer.Navigator>
  );
};

export default HomeDrawerNavigator;
