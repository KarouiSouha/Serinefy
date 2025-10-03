
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