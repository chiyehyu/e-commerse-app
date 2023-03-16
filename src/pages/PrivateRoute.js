import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
// will remove later
//import { useUserContext } from '../context/user_context';

const PrivateRoute = ({ children, ...rest }) => {
  //const { myUser } = useUserContext();
  const { user } = useAuth0();
  //if (!myUser) {
  if (!user) {
    //alert('please login first!');
    return <Navigate to="/" />;
  }

  return children;
};
export default PrivateRoute;
