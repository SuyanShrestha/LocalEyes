import React from 'react';
import {AuthProvider} from './AuthProvider';
import Routes from './Routes';
import AuthStack from './AuthStack';

const Providers = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default Providers;
