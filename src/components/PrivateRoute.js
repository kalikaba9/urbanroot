import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';

function PrivateRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Chargement...</div>; // Tu peux remplacer ceci par un spinner de chargement
  }

  return user ? children : <Navigate to="/" />;
}

export default PrivateRoute;
