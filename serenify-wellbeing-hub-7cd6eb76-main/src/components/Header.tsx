
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Calendar, User, BookOpen, Heart, LogOut } from "lucide-react";
import AuthDialog from './auth/AuthDialog';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, isTherapist, logout } = useAuth();

  const handleLogout = () => {
    // Use the logout function from AuthContext
    logout();
    
    // Navigate to home page
    navigate('/');
  };

  return (
    <header className="w-full py-4 px-6 bg-white/80 dark:bg-serenity-900/80 backdrop-blur-md border-b border-serenity-100 dark:border-serenity-800 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-serenity-600 text-white rounded-full p-2">
            <Heart size={20} className="animate-pulse-gentle" />
          </div>
          <span className="text-xl font-display font-semibold text-serenity-800 dark:text-serenity-100">Serenify</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-serenity-700 dark:text-serenity-200 hover:text-serenity-600 dark:hover:text-white transition-colors">
            Accueil
          </Link>
          
          {currentUser && isTherapist ? (
            // Menu pour les thérapeutes
            <Link 
              to="/therapist-dashboard" 
              className={`text-serenity-700 dark:text-serenity-200 hover:text-serenity-600 dark:hover:text-white transition-colors ${
                location.pathname === '/therapist-dashboard' ? 'text-serenity-600 dark:text-white font-medium' : ''
              }`}
            >
              Tableau de bord
            </Link>
          ) : (
            // Menu pour les clients
            <>
              <Link to="/resources" className="text-serenity-700 dark:text-serenity-200 hover:text-serenity-600 dark:hover:text-white transition-colors">
                Ressources
              </Link>
              <Link to="/mood-tracker" className="text-serenity-700 dark:text-serenity-200 hover:text-serenity-600 dark:hover:text-white transition-colors">
                Suivi d'humeur
              </Link>
              <Link to="/appointments" className="text-serenity-700 dark:text-serenity-200 hover:text-serenity-600 dark:hover:text-white transition-colors">
                Rendez-vous
              </Link>
            </>
          )}
        </nav>
        
        <div className="flex items-center gap-2">
          {currentUser ? (
            <>
              <div className="hidden md:block mr-2">
                <span className="text-sm font-medium text-serenity-700 dark:text-serenity-200">
                  {currentUser.email}
                  {isTherapist && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Thérapeute
                    </span>
                  )}
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full text-serenity-700 dark:text-serenity-300"
                onClick={handleLogout}
              >
                <LogOut size={20} />
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full text-serenity-700 dark:text-serenity-300"
              >
                <User size={20} />
              </Button>
              <Button 
                className="rounded-full hidden md:flex"
                onClick={() => setShowAuthDialog(true)}
              >
                Se connecter
              </Button>
            </>
          )}
        </div>
      </div>
      
      <AuthDialog 
        open={showAuthDialog} 
        onOpenChange={setShowAuthDialog} 
      />
    </header>
  );
};

export default Header;