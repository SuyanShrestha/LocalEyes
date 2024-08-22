import React, {createContext, useState} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      setUser(userCredential.user);
    } catch (error) {
      handleError(error);
    }
  };

  const register = async (email, password, name) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const currentUser = userCredential.user;
      await currentUser.updateProfile({displayName: name});
      setUser({...currentUser, displayName: name});
    } catch (error) {
      handleError(error);
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
      setUser(null);
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = error => {
    const errorMessages = {
      'auth/invalid-email': 'Invalid email address format.',
      'auth/user-not-found': 'No user found with this email.',
      'auth/wrong-password': 'Incorrect password.',
      'auth/email-already-in-use': 'Email address is already in use.',
      'auth/weak-password': 'Password is too weak.',
    };

    const message =
      errorMessages[error.code] ||
      'An unknown error occurred. Please try again.';
    Alert.alert('Authentication Error', message);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
