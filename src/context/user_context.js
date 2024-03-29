import React, { useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const UserContext = React.createContext();

//test user on AWS-RDS: guest@gmail.com / Great123

export const UserProvider = ({ children }) => {
  const { /* isAuthenticated, isLoading, */ loginWithRedirect, logout, user } =
    useAuth0();
  const [myUser, setMyUser] = useState(null);
  useEffect(() => {
    //console.log('from UserContext:', user, isAuthenticated, isLoading);
    /* if (isAuthenticated) {
      setMyUser(user);
    } else {
      setMyUser(null); //false
    } */
    setMyUser(user);
  }, [user]);

  return (
    <UserContext.Provider value={{ loginWithRedirect, logout, myUser }}>
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
