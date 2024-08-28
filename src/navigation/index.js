import React from 'react';
import {AuthProvider} from './AuthProvider';
import Routes from './Routes';
import AuthStack from './AuthStack';
import {ProfileProvider} from '../context/ProfileProvider';

const Providers = () => {
  return (
    <ProfileProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ProfileProvider>
  );
};

export default Providers;
