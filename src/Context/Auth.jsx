import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { auth } from '../firebase/fb-configuration';

export const AuthContext = React.createContext();
const AuthProvider = (props) => {
  const { children } = props;
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
  });
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
AuthProvider.propTypes = {
  children: PropTypes.func.isRequired,
};
