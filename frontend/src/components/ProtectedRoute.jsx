import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, token, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>; // Could use a spinner here
  }

  // If no token or no user, redirect to login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // If roles are specified, check if user's role is allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If not allowed, redirect to their respective dashboard or a generic home page
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/customer/dashboard" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
