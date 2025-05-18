// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { toast } from 'sonner';

// const ProtectedRoute = ({ children, requireTherapist = false }) => {
//   const { isAuthenticated, isTherapist, loading } = useAuth();

//   // Show loading state while authentication is being checked
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   // If not authenticated, redirect to home
//   if (!isAuthenticated) {
//     toast.error('Vous devez être connecté pour accéder à cette page');
//     return <Navigate to="/" replace />;
//   }

//   // If therapist access is required but user is not a therapist
//   if (requireTherapist && !isTherapist) {
//     toast.error('Vous devez être un thérapeute pour accéder à cette page');
//     return <Navigate to="/" replace />;
//   }

//   // If all conditions are met, render the children
//   return children;
// };

// export default ProtectedRoute;
// src/components/ProtectedRoute.jsx
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner'; // Assuming you're using sonner for toast

const ProtectedRoute = ({ children, requireTherapist = false }) => {
  const { currentUser, isLoggedIn, isTherapist } = useAuth();
  
  useEffect(() => {
    // Show appropriate messages based on auth state
    if (!isLoggedIn) {
      toast.error("Veuillez vous connecter pour accéder à cette page");
    } else if (requireTherapist && !isTherapist) {
      toast.error("Cette page est réservée aux thérapeutes");
    } else if (!requireTherapist && isTherapist) {
      toast.info("Vous êtes connecté en tant que thérapeute");
    }
  }, [isLoggedIn, isTherapist, requireTherapist]);

  // Not logged in - redirect to home
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  
  // If we need therapist access but user is not a therapist
  if (requireTherapist && !isTherapist) {
    return <Navigate to="/appointments" replace />;
  }
  
  // If we need patient access but user is a therapist
  if (!requireTherapist && isTherapist) {
    return <Navigate to="/therapist-dashboard" replace />;
  }
  
  // All checks passed, render the protected component
  return children;
};

export default ProtectedRoute;