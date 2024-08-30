import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (name, email, password) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const {uid} = userCredential.user;

      // Add the user to Firestore
      await firestore()
        .collection('users')
        .doc(uid)
        .set({
          username: name,
          email: email,
          createdAt: firestore.Timestamp.fromDate(new Date()),
          profilePic:
            'https://firebasestorage.googleapis.com/v0/b/localeyes-4811b.appspot.com/o/mainlogo.jpg?alt=media&token=cc1d2f45-5ec5-486e-a16a-0053dbd31597',
          categoryID: '',
          totalRating: null,
          totalAgreements: null,
          phone: null,
        });
    } catch (error) {
      console.log('Something went wrong with sign up: ', error);
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.log(error);
    }
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
