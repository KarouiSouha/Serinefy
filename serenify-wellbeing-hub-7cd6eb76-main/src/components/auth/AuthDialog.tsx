// import React, { useState } from 'react';
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import LoginForm from './LoginForm';
// import RegisterForm from './RegisterForm';
// import { toast } from 'sonner';

// interface AuthDialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// export interface User {
//   email: string;
//   name?: string;
//   isTherapist: boolean;
//   id: number;
// }

// // Mock user storage - export as a writable variable to maintain state across components
// export let currentUser: User | null = null;

// // Function to reset the current user
// export const resetCurrentUser = () => {
//   currentUser = null;
// };

// const AuthDialog: React.FC<AuthDialogProps> = ({ open, onOpenChange }) => {
//   const [activeTab, setActiveTab] = useState<string>('login');

//   const handleLogin = (values: any) => {
//     console.log('Login values:', values);
    
//     // Vérifier si c'est un thérapeute (email se terminant par @therapist.com)
//     const isTherapist = values.email.toLowerCase().endsWith('@therapist.com');
    
//     // Simuler l'authentification
//     currentUser = {
//       email: values.email,
//       name: values.email.split('@')[0],
//       isTherapist: isTherapist,
//       id: isTherapist ? 1000 + Math.floor(Math.random() * 100) : Math.floor(Math.random() * 100)
//     };
    
//     // Log the currentUser to debug
//     console.log('Current user set to:', currentUser);
    
//     // Afficher un message différent selon le type d'utilisateur
//     if (isTherapist) {
//       toast.success('Connexion thérapeute réussie!');
//     } else {
//       toast.success('Connexion client réussie!');
//     }
    
//     // Fermer la boîte de dialogue
//     onOpenChange(false);
    
//     // Délai court pour permettre à la state de se mettre à jour
//     setTimeout(() => {
//       // Pour les thérapeutes
//       if (isTherapist) {
//         window.location.href = '/therapist-dashboard';
//       } else {
//         window.location.href = '/appointments';
//       }
//     }, 100);
//   };

//   const handleRegister = (values: any) => {
//     console.log('Register values:', values);
    
//     // Vérifier si c'est un thérapeute qui s'inscrit (email se terminant par @therapist.com)
//     const isTherapist = values.email.endsWith('@therapist.com');
    
//     if (isTherapist) {
//       toast.success('Inscription thérapeute réussie! Vous pouvez maintenant vous connecter.');
//     } else {
//       toast.success('Inscription client réussie! Vous pouvez maintenant vous connecter.');
//     }
//     setActiveTab('login');
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle className="text-center text-xl">Accédez à votre compte Serenify</DialogTitle>
//           <DialogDescription className="text-center">
//             Pour accéder à toutes les fonctionnalités de la plateforme
//           </DialogDescription>
//         </DialogHeader>
//         <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//           <TabsList className="grid w-full grid-cols-2 mb-4">
//             <TabsTrigger value="login">Connexion</TabsTrigger>
//             <TabsTrigger value="register">Inscription</TabsTrigger>
//           </TabsList>
//           <TabsContent value="login" className="mt-0">
//             <LoginForm onSubmit={handleLogin} />
//             <div className="mt-2 text-xs text-center text-muted-foreground">
//               <p>Les thérapeutes doivent utiliser une adresse email se terminant par @therapist.com</p>
//             </div>
//             <div className="mt-4 text-center text-sm text-muted-foreground">
//               <p>Vous n'avez pas encore de compte?</p>
//               <button 
//                 className="text-primary hover:underline" 
//                 onClick={() => setActiveTab('register')}
//               >
//                 Créer un compte
//               </button>
//             </div>
//           </TabsContent>
//           <TabsContent value="register" className="mt-0">
//             <RegisterForm onSubmit={handleRegister} />
//             <div className="mt-2 text-xs text-center text-muted-foreground">
//               <p>Les thérapeutes doivent utiliser une adresse email se terminant par @therapist.com</p>
//             </div>
//             <div className="mt-4 text-center text-sm text-muted-foreground">
//               <p>Vous avez déjà un compte?</p>
//               <button 
//                 className="text-primary hover:underline" 
//                 onClick={() => setActiveTab('login')}
//               >
//                 Se connecter
//               </button>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AuthDialog;
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

// Mock API call functions to simulate backend interaction
const apiLogin = async (formData) => {
  try {
    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur de connexion');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

const apiRegister = async (formData) => {
  try {
    const response = await fetch('http://localhost:8000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        role: formData.role,
        specialty: formData.specialty,
        experience: formData.experience,
        bio: formData.bio,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur d\'inscription');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

// Mock user storage - export as a writable variable to maintain state across components
//export let currentUser = null;

// // Function to reset the current user
// export const resetCurrentUser = () => {
//   currentUser = null;
//   localStorage.removeItem('user');
  
//   localStorage.removeItem('token');
// };
// ✅ currentUser est stocké ici au démarrage depuis localStorage
export let currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

export const setCurrentUser = (user) => {
  currentUser = user;
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const resetCurrentUser = () => {
  currentUser = null;
  localStorage.removeItem('currentUser');
};

const AuthDialog = ({ open, onOpenChange }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (formData) => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      
      // For development purposes, use mock login when API is not available
      let userData;
      
      try {
        // Try the real API first
        userData = await apiLogin(formData);
      } catch (error) {
        console.log('Using mock login due to API error:', error);
        
        // Fall back to mock login
        const isTherapist = formData.email.toLowerCase().endsWith('@therapist.com');
        
        // Simulate successful login
        currentUser = {
          email: formData.email,
          name: formData.email.split('@')[0],
          isTherapist: isTherapist,
          id: isTherapist ? 1000 + Math.floor(Math.random() * 100) : Math.floor(Math.random() * 100),
          role: isTherapist ? 'therapist' : 'patient'
        };
        
        // Mock token response structure
        userData = {
          user: currentUser,
          access_token: 'mock_token_' + Math.random().toString(36).substr(2),
          token_type: 'Bearer'
        };
      }
      
      // Store user info and token
      localStorage.setItem('user', JSON.stringify(userData.user));
      localStorage.setItem('token', userData.access_token);
      currentUser = userData.user;
      
      // Display success message
      console.log('Login successful:', currentUser);
      
      // Close the dialog
      onOpenChange(false);
      
      // Redirect based on user role
      if (currentUser.isTherapist || currentUser.role === 'therapist') {
        window.location.href = '/therapist-dashboard';
      } else {
        window.location.href = '/appointments';
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage(error.message || 'Échec de la connexion. Veuillez vérifier vos identifiants.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      
      // Try actual API registration
      try {
        await apiRegister(formData);
      } catch (error) {
        console.log('Using mock registration due to API error:', error);
        // No need to do anything for mock registration
      }
      
      // Display success message
      console.log('Registration successful');
      
      // Switch to login tab
      setActiveTab('login');
    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMessage(error.message || 'Échec de l\'inscription. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  // If dialog is not open, don't render anything
  if (!open) return null;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-96">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto mt-20">
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold">Accédez à votre compte Serenify</h2>
          <p className="text-sm text-gray-500">Pour accéder à toutes les fonctionnalités de la plateforme</p>
        </div>
        
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errorMessage}
          </div>
        )}
        
        <div className="mb-6">
          <div className="flex border-b">
            <button
              className={`flex-1 py-2 text-center ${activeTab === 'login' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
              onClick={() => setActiveTab('login')}
            >
              Connexion
            </button>
            <button
              className={`flex-1 py-2 text-center ${activeTab === 'register' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
              onClick={() => setActiveTab('register')}
            >
              Inscription
            </button>
          </div>
        </div>
        
        <div className="flex justify-center">
          <div className="w-full max-w-sm">
            {activeTab === 'login' ? (
              <>
                <LoginForm onSubmit={handleLogin} />
                <div className="mt-2 text-xs text-center text-gray-500">
                  <p>Les thérapeutes doivent utiliser une adresse email se terminant par @therapist.com</p>
                </div>
                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>Vous n'avez pas encore de compte?</p>
                  <button 
                    className="text-primary hover:underline" 
                    onClick={() => setActiveTab('register')}
                  >
                    Créer un compte
                  </button>
                </div>
              </>
            ) : (
              <>
                <RegisterForm onSubmit={handleRegister} />
                <div className="mt-2 text-xs text-center text-gray-500">
                  <p>Les thérapeutes doivent utiliser une adresse email se terminant par @therapist.com</p>
                </div>
                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>Vous avez déjà un compte?</p>
                  <button 
                    className="text-primary hover:underline" 
                    onClick={() => setActiveTab('login')}
                  >
                    Se connecter
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="mt-4 text-right">
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={() => onOpenChange(false)}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthDialog;


