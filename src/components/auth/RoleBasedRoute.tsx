
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

type RoleBasedRouteProps = {
  children: React.ReactNode;
  allowedRoles: ('admin' | 'faculty' | 'student')[];
  redirectTo?: string;
};

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ 
  children, 
  allowedRoles, 
  redirectTo = '/login' 
}) => {
  const { user, isLoading, hasAccess } = useAuth();
  
  // Show loading state if auth is still being checked
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // If not logged in, redirect to login page
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }
  
  // Check if user role is allowed
  if (!hasAccess(allowedRoles)) {
    // Redirect to appropriate page based on role
    if (user.role === 'student') {
      return <Navigate to="/classrooms" replace />;
    } else if (user.role === 'faculty') {
      return <Navigate to="/faculty" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }
  
  return <>{children}</>;
};

export default RoleBasedRoute;
