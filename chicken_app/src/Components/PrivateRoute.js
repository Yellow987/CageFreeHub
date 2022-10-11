import React from 'react'
import { useAuth } from '../AuthContext'
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  //If !currentUser go to login
  //if currentUser and no email verification navigate to confirm email
  // if current user and email verified then go to 1st page in seller profile wizard
  if(!currentUser){
    return <Navigate to="/login" />;
  }
  return children
}