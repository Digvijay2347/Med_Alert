import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, user }) => {
  return user ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
