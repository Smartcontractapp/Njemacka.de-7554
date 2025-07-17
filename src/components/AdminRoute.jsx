import React from 'react';
import { Navigate } from 'react-router-dom';
import { adminState } from '../data/admin';

const AdminRoute = ({ children }) => {
  const isAuthenticated = adminState.checkAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

export default AdminRoute;