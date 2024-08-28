import React, {createContext, useState} from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({children}) => {
  const [ownProfile, setOwnProfile] = useState(true);
  const [provider, setProvider] = useState(null);

  return (
    <ProfileContext.Provider
      value={{ownProfile, setOwnProfile, provider, setProvider}}>
      {children}
    </ProfileContext.Provider>
  );
};
