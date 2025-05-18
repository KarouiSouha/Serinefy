// // // // import React, { useState, useEffect } from 'react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import Header from '@/components/Header';
// // // // import Footer from '@/components/Footer';
// // // // import { Button } from '@/components/ui/button';
// // // // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// // // // import { Badge } from '@/components/ui/badge';
// // // // import { VideoIcon, Phone, Calendar, Clock, User, MessageSquare } from 'lucide-react';
// // // // import { currentUser } from '@/components/auth/AuthDialog';
// // // // import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
// // // // import { useToast } from "@/hooks/use-toast";
// // // // import { toast } from 'sonner';

// // // // // Types
// // // // interface Patient {
// // // //   id: number;
// // // //   name: string;
// // // //   appointmentType: string;
// // // //   appointmentDate: string;
// // // //   appointmentTime: string;
// // // //   status: 'scheduled' | 'in-waiting-room' | 'active' | 'completed';
// // // // }

// // // // const TherapistDashboard: React.FC = () => {
// // // //   const navigate = useNavigate();
// // // //   const [isOnline, setIsOnline] = useState(false);
// // // //   const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
// // // //   const [showCallDialog, setShowCallDialog] = useState(false);
// // // //   const [callType, setCallType] = useState<'video' | 'phone' | null>(null);
// // // //   const { toast: useToastHook } = useToast();
// // // //   const [user, setUser] = useState(currentUser);

// // // //   // Simulated patients data
// // // //   const [patients, setPatients] = useState<Patient[]>([
// // // //     {
// // // //       id: 1,
// // // //       name: 'Marie Dupont',
// // // //       appointmentType: 'Vidéoconférence',
// // // //       appointmentDate: '12 Mai 2023',
// // // //       appointmentTime: '14:00',
// // // //       status: 'scheduled'
// // // //     },
// // // //     {
// // // //       id: 2,
// // // //       name: 'Jean Martin',
// // // //       appointmentType: 'Chat',
// // // //       appointmentDate: '18 Mai 2023',
// // // //       appointmentTime: '10:30',
// // // //       status: 'scheduled'
// // // //     },
// // // //     {
// // // //       id: 3,
// // // //       name: 'Sophie Bernard',
// // // //       appointmentType: 'Vidéoconférence',
// // // //       appointmentDate: 'Aujourd\'hui',
// // // //       appointmentTime: '15:45',
// // // //       status: 'in-waiting-room'
// // // //     }
// // // //   ]);

// // // //   // Check if user is therapist
// // // //   useEffect(() => {
// // // //     console.log("TherapistDashboard - Current User:", currentUser);
    
// // // //     // On component mount, get the latest user state
// // // //     setUser(currentUser);
    
// // // //     if (!currentUser) {
// // // //       // Redirect to login if not authenticated
// // // //       toast.error("Veuillez vous connecter en tant que thérapeute");
// // // //       navigate('/', { replace: true });
// // // //       return;
// // // //     }
    
// // // //     if (!currentUser.isTherapist) {
// // // //       // Redirect to appointments if not a therapist
// // // //       toast.error("Cette page est réservée aux thérapeutes");
// // // //       navigate('/appointments', { replace: true });
// // // //       return;
// // // //     }
    
// // // //     // Log successful authentication
// // // //     console.log("Therapist authenticated successfully:", currentUser);
// // // //   }, [navigate]);

// // // //   const handleGoOnline = () => {
// // // //     setIsOnline(true);
// // // //     toast.success("Vous êtes maintenant en ligne. Vos patients peuvent vous contacter pour leurs consultations");
// // // //   };

// // // //   const handleGoOffline = () => {
// // // //     setIsOnline(false);
// // // //     toast.error("Vous êtes maintenant hors ligne. Vos patients ne peuvent plus vous contacter pour leurs consultations");
// // // //   };

// // // //   const handleStartCall = (patient: Patient, type: 'video' | 'phone') => {
// // // //     setSelectedPatient(patient);
// // // //     setCallType(type);
// // // //     setShowCallDialog(true);
    
// // // //     // Update patient status
// // // //     setPatients(prevPatients => 
// // // //       prevPatients.map(p => 
// // // //         p.id === patient.id ? {...p, status: 'active' as const} : p
// // // //       )
// // // //     );
// // // //   };

// // // //   const handleEndCall = () => {
// // // //     toast.success(`La consultation avec ${selectedPatient?.name} a été terminée`);
    
// // // //     // Update patient status to completed
// // // //     if (selectedPatient) {
// // // //       setPatients(prevPatients => 
// // // //         prevPatients.map(p => 
// // // //           p.id === selectedPatient.id ? {...p, status: 'completed' as const} : p
// // // //         )
// // // //       );
// // // //     }
    
// // // //     setShowCallDialog(false);
// // // //     setSelectedPatient(null);
// // // //     setCallType(null);
// // // //   };

// // // //   if (!user || !user.isTherapist) {
// // // //     // Return loading or redirect UI
// // // //     return (
// // // //       <div className="min-h-screen flex flex-col">
// // // //         <Header />
// // // //         <div className="flex-grow flex items-center justify-center">
// // // //           <p>Vérification des autorisations...</p>
// // // //         </div>
// // // //         <Footer />
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen flex flex-col">
// // // //       <Header />
// // // //       <main className="flex-grow">
// // // //         <section className="bg-serenity-50 dark:bg-serenity-900 py-12">
// // // //           <div className="container mx-auto px-6">
// // // //             <div className="max-w-3xl mx-auto text-center">
// // // //               <h1 className="text-4xl md:text-5xl font-bold text-serenity-900 dark:text-white mb-6">
// // // //                 Tableau de bord Thérapeute
// // // //               </h1>
// // // //               <p className="text-lg text-serenity-700 dark:text-serenity-200 mb-8">
// // // //                 Gérez vos rendez-vous et consultations en ligne
// // // //               </p>
// // // //               <div className="flex justify-center gap-4">
// // // //                 {!isOnline ? (
// // // //                   <Button 
// // // //                     onClick={handleGoOnline}
// // // //                     className="bg-green-600 hover:bg-green-700"
// // // //                   >
// // // //                     Se mettre en ligne
// // // //                   </Button>
// // // //                 ) : (
// // // //                   <Button 
// // // //                     onClick={handleGoOffline}
// // // //                     variant="destructive"
// // // //                   >
// // // //                     Se mettre hors ligne
// // // //                   </Button>
// // // //                 )}
// // // //               </div>
// // // //               {isOnline && (
// // // //                 <Badge className="mt-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
// // // //                   En ligne
// // // //                 </Badge>
// // // //               )}
// // // //             </div>
// // // //           </div>
// // // //         </section>
        
// // // //         <section className="py-12 bg-white dark:bg-serenity-900">
// // // //           <div className="container mx-auto px-6">
// // // //             <h2 className="text-2xl font-bold text-serenity-900 dark:text-white mb-6">
// // // //               Mes patients
// // // //             </h2>
            
// // // //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // //               {patients.map(patient => (
// // // //                 <Card key={patient.id} className={`
// // // //                   ${patient.status === 'in-waiting-room' ? 'border-2 border-amber-500' : ''}
// // // //                   ${patient.status === 'active' ? 'border-2 border-green-500' : ''}
// // // //                   ${patient.status === 'completed' ? 'opacity-70' : ''}
// // // //                 `}>
// // // //                   <CardHeader>
// // // //                     <div className="flex justify-between items-center">
// // // //                       <CardTitle className="text-xl">{patient.name}</CardTitle>
// // // //                       {patient.status === 'in-waiting-room' && (
// // // //                         <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
// // // //                           En salle d'attente
// // // //                         </Badge>
// // // //                       )}
// // // //                       {patient.status === 'active' && (
// // // //                         <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
// // // //                           En cours
// // // //                         </Badge>
// // // //                       )}
// // // //                       {patient.status === 'completed' && (
// // // //                         <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
// // // //                           Terminé
// // // //                         </Badge>
// // // //                       )}
// // // //                     </div>
// // // //                     <CardDescription>
// // // //                       <div className="flex items-center gap-2 mt-2">
// // // //                         <Calendar className="h-4 w-4" />
// // // //                         <span>{patient.appointmentDate}</span>
// // // //                       </div>
// // // //                       <div className="flex items-center gap-2 mt-1">
// // // //                         <Clock className="h-4 w-4" />
// // // //                         <span>{patient.appointmentTime}</span>
// // // //                       </div>
// // // //                     </CardDescription>
// // // //                   </CardHeader>
// // // //                   <CardContent>
// // // //                     <div className="flex items-center gap-2 mb-4">
// // // //                       <User className="h-4 w-4 text-serenity-600" />
// // // //                       <span className="text-sm text-serenity-800 dark:text-serenity-200">
// // // //                         {patient.appointmentType}
// // // //                       </span>
// // // //                     </div>
// // // //                   </CardContent>
// // // //                   <CardFooter className="flex justify-between">
// // // //                     {patient.status !== 'completed' && isOnline && (
// // // //                       <>
// // // //                         <Button 
// // // //                           onClick={() => handleStartCall(patient, 'video')}
// // // //                           variant="outline" 
// // // //                           className="flex-1 mr-2"
// // // //                         >
// // // //                           <VideoIcon className="mr-2 h-4 w-4" />
// // // //                           Vidéo
// // // //                         </Button>
// // // //                         <Button 
// // // //                           onClick={() => handleStartCall(patient, 'phone')}
// // // //                           variant="outline" 
// // // //                           className="flex-1"
// // // //                         >
// // // //                           <Phone className="mr-2 h-4 w-4" />
// // // //                           Téléphone
// // // //                         </Button>
// // // //                       </>
// // // //                     )}
// // // //                     {patient.status === 'completed' && (
// // // //                       <Button 
// // // //                         variant="outline" 
// // // //                         className="flex-1"
// // // //                         disabled
// // // //                       >
// // // //                         Consultation terminée
// // // //                       </Button>
// // // //                     )}
// // // //                   </CardFooter>
// // // //                 </Card>
// // // //               ))}
// // // //             </div>
// // // //           </div>
// // // //         </section>
// // // //       </main>
// // // //       <Footer />
      
// // // //       {/* Dialog pour l'appel vidéo/téléphone */}
// // // //       <Dialog open={showCallDialog} onOpenChange={() => {}}>
// // // //         <DialogContent className="sm:max-w-md">
// // // //           <DialogHeader>
// // // //             <DialogTitle>
// // // //               {callType === 'video' ? 'Consultation vidéo' : 'Consultation téléphonique'} avec {selectedPatient?.name}
// // // //             </DialogTitle>
// // // //             <DialogDescription>
// // // //               Consultation en cours...
// // // //             </DialogDescription>
// // // //           </DialogHeader>
// // // //           <div className="flex flex-col items-center justify-center p-6">
// // // //             {callType === 'video' ? (
// // // //               <div className="w-full aspect-video bg-slate-800 rounded-lg flex items-center justify-center mb-4">
// // // //                 <VideoIcon className="h-16 w-16 text-white opacity-50" />
// // // //               </div>
// // // //             ) : (
// // // //               <div className="w-full py-12 flex items-center justify-center mb-4">
// // // //                 <Phone className="h-16 w-16 text-serenity-600" />
// // // //               </div>
// // // //             )}
// // // //             <p className="text-center text-serenity-700 dark:text-serenity-300">
// // // //               Durée de la consultation: <span id="call-timer">00:00</span>
// // // //             </p>
// // // //           </div>
// // // //           <DialogFooter className="flex flex-col sm:flex-row sm:justify-between">
// // // //             <Button
// // // //               type="button"
// // // //               variant="outline"
// // // //               className="mb-2 sm:mb-0"
// // // //             >
// // // //               <MessageSquare className="w-4 h-4 mr-2" />
// // // //               Chat
// // // //             </Button>
// // // //             <Button
// // // //               type="button"
// // // //               variant="destructive"
// // // //               onClick={handleEndCall}
// // // //             >
// // // //               Terminer la consultation
// // // //             </Button>
// // // //           </DialogFooter>
// // // //         </DialogContent>
// // // //       </Dialog>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default TherapistDashboard;
// // // import React, { useState, useEffect } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import axios from 'axios'; // Add axios for API calls
// // // import Header from '@/components/Header';
// // // import Footer from '@/components/Footer';
// // // import { Button } from '@/components/ui/button';
// // // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// // // import { Badge } from '@/components/ui/badge';
// // // import { VideoIcon, Phone, Calendar, Clock, User, MessageSquare } from 'lucide-react';
// // // import { currentUser } from '@/components/auth/AuthDialog';
// // // import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
// // // import { toast } from 'sonner';

// // // // Types
// // // interface Patient {
// // //   id: number;
// // //   name: string;
// // //   appointmentType: string;
// // //   appointmentDate: string;
// // //   appointmentTime: string;
// // //   status: 'scheduled' | 'in-waiting-room' | 'active' | 'completed';
// // //   patient_id: number;
// // //   notes?: string;
// // // }

// // // interface TherapistData {
// // //   id: number;
// // //   name: string;
// // //   isOnline: boolean;
// // //   specialty: string;
// // // }

// // // interface Stats {
// // //   total_appointments: number;
// // //   completed_sessions: number;
// // // }

// // // const TherapistDashboard: React.FC = () => {
// // //   const navigate = useNavigate();
// // //   const [isOnline, setIsOnline] = useState(false);
// // //   const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
// // //   const [showCallDialog, setShowCallDialog] = useState(false);
// // //   const [callType, setCallType] = useState<'video' | 'phone' | null>(null);
// // //   const [user, setUser] = useState(currentUser);
// // //   const [loading, setLoading] = useState(true);
// // //   const [patients, setPatients] = useState<Patient[]>([]);
// // //   const [stats, setStats] = useState<Stats>({ total_appointments: 0, completed_sessions: 0 });
// // //   const [therapistData, setTherapistData] = useState<TherapistData | null>(null);
// // //   const [callTimer, setCallTimer] = useState(0);
// // //   const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

// // //   // Load dashboard data
// // //   useEffect(() => {
// // //     console.log("TherapistDashboard - Current User:", currentUser);
    
// // //     // On component mount, get the latest user state
// // //     setUser(currentUser);
    
// // //     if (!currentUser) {
// // //       // Redirect to login if not authenticated
// // //       toast.error("Veuillez vous connecter en tant que thérapeute");
// // //       navigate('/', { replace: true });
// // //       return;
// // //     }
    
// // //     if (!currentUser.isTherapist) {
// // //       // Redirect to appointments if not a therapist
// // //       toast.error("Cette page est réservée aux thérapeutes");
// // //       navigate('/appointments', { replace: true });
// // //       return;
// // //     }
    
// // //     // Load dashboard data from API
// // //     fetchDashboardData();
// // //   }, [navigate]);

// // //   // Start timer for call duration
// // //   useEffect(() => {
// // //     if (showCallDialog && selectedPatient) {
// // //       const interval = setInterval(() => {
// // //         setCallTimer(prev => prev + 1);
// // //       }, 1000);
      
// // //       setTimerInterval(interval);
      
// // //       return () => {
// // //         if (interval) clearInterval(interval);
// // //       };
// // //     } else {
// // //       setCallTimer(0);
// // //       if (timerInterval) clearInterval(timerInterval);
// // //     }
// // //   }, [showCallDialog, selectedPatient, timerInterval]);

// // //   const fetchDashboardData = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const response = await axios.get('/api/therapist/dashboard');
      
// // //       setPatients(response.data.patients || []);
// // //       setStats(response.data.stats || { total_appointments: 0, completed_sessions: 0 });
// // //       setTherapistData(response.data.therapist || null);
      
// // //       // Set online status from API
// // //       if (response.data.therapist) {
// // //         setIsOnline(response.data.therapist.isOnline);
// // //       }
      
// // //       setLoading(false);
// // //     } catch (error) {
// // //       console.error('Error fetching dashboard data:', error);
// // //       toast.error("Erreur lors du chargement des données");
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleGoOnline = async () => {
// // //     try {
// // //       const response = await axios.post('/api/therapist/online-status', { isOnline: true });
      
// // //       if (response.data.success) {
// // //         setIsOnline(true);
// // //         toast.success("Vous êtes maintenant en ligne. Vos patients peuvent vous contacter pour leurs consultations");
// // //       }
// // //     } catch (error) {
// // //       console.error('Error updating online status:', error);
// // //       toast.error("Erreur lors de la mise à jour de votre statut");
// // //     }
// // //   };

// // //   const handleGoOffline = async () => {
// // //     try {
// // //       const response = await axios.post('/api/therapist/online-status', { isOnline: false });
      
// // //       if (response.data.success) {
// // //         setIsOnline(false);
// // //         toast.error("Vous êtes maintenant hors ligne. Vos patients ne peuvent plus vous contacter pour leurs consultations");
// // //       }
// // //     } catch (error) {
// // //       console.error('Error updating online status:', error);
// // //       toast.error("Erreur lors de la mise à jour de votre statut");
// // //     }
// // //   };

// // //   const handleStartCall = async (patient: Patient, type: 'video' | 'phone') => {
// // //     try {
// // //       const response = await axios.post(`/api/therapist/appointments/${patient.id}/start-call`, {
// // //         callType: type
// // //       });
      
// // //       if (response.data.success || response.data.call_link) {
// // //         setSelectedPatient(patient);
// // //         setCallType(type);
// // //         setShowCallDialog(true);
        
// // //         // Update patient status in local state
// // //         setPatients(prevPatients => 
// // //           prevPatients.map(p => 
// // //             p.id === patient.id ? {...p, status: 'active' as const} : p
// // //           )
// // //         );
// // //       }
// // //     } catch (error) {
// // //       console.error('Error starting call:', error);
// // //       toast.error("Erreur lors du démarrage de l'appel");
// // //     }
// // //   };

// // //   const handleEndCall = async () => {
// // //     if (!selectedPatient) return;
    
// // //     try {
// // //       const response = await axios.post(`/api/therapist/appointments/${selectedPatient.id}/end-call`);
      
// // //       if (response.data.success) {
// // //         toast.success(`La consultation avec ${selectedPatient.name} a été terminée`);
        
// // //         // Update patient status in local state
// // //         setPatients(prevPatients => 
// // //           prevPatients.map(p => 
// // //             p.id === selectedPatient.id ? {...p, status: 'completed' as const} : p
// // //           )
// // //         );
        
// // //         setShowCallDialog(false);
// // //         setSelectedPatient(null);
// // //         setCallType(null);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error ending call:', error);
// // //       toast.error("Erreur lors de la fin de l'appel");
// // //     }
// // //   };

// // //   // Format timer display as MM:SS
// // //   const formatTime = (seconds: number) => {
// // //     const mins = Math.floor(seconds / 60);
// // //     const secs = seconds % 60;
// // //     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen flex flex-col">
// // //         <Header />
// // //         <div className="flex-grow flex items-center justify-center">
// // //           <p>Chargement du tableau de bord...</p>
// // //         </div>
// // //         <Footer />
// // //       </div>
// // //     );
// // //   }

// // //   if (!user || !user.isTherapist) {
// // //     return (
// // //       <div className="min-h-screen flex flex-col">
// // //         <Header />
// // //         <div className="flex-grow flex items-center justify-center">
// // //           <p>Vérification des autorisations...</p>
// // //         </div>
// // //         <Footer />
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen flex flex-col">
// // //       <Header />
// // //       <main className="flex-grow">
// // //         <section className="bg-serenity-50 dark:bg-serenity-900 py-12">
// // //           <div className="container mx-auto px-6">
// // //             <div className="max-w-3xl mx-auto text-center">
// // //               <h1 className="text-4xl md:text-5xl font-bold text-serenity-900 dark:text-white mb-6">
// // //                 Tableau de bord Thérapeute
// // //               </h1>
// // //               <p className="text-lg text-serenity-700 dark:text-serenity-200 mb-8">
// // //                 Gérez vos rendez-vous et consultations en ligne
// // //               </p>
// // //               <div className="flex justify-center gap-4">
// // //                 {!isOnline ? (
// // //                   <Button 
// // //                     onClick={handleGoOnline}
// // //                     className="bg-green-600 hover:bg-green-700"
// // //                   >
// // //                     Se mettre en ligne
// // //                   </Button>
// // //                 ) : (
// // //                   <Button 
// // //                     onClick={handleGoOffline}
// // //                     variant="destructive"
// // //                   >
// // //                     Se mettre hors ligne
// // //                   </Button>
// // //                 )}
// // //               </div>
// // //               {isOnline && (
// // //                 <Badge className="mt-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
// // //                   En ligne
// // //                 </Badge>
// // //               )}
              
// // //               {/* Stats section */}
// // //               <div className="mt-8 flex justify-center gap-8">
// // //                 <div className="text-center">
// // //                   <p className="text-3xl font-bold">{stats.total_appointments}</p>
// // //                   <p className="text-sm text-serenity-600">Rendez-vous totaux</p>
// // //                 </div>
// // //                 <div className="text-center">
// // //                   <p className="text-3xl font-bold">{stats.completed_sessions}</p>
// // //                   <p className="text-sm text-serenity-600">Consultations terminées</p>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </section>
        
// // //         <section className="py-12 bg-white dark:bg-serenity-900">
// // //           <div className="container mx-auto px-6">
// // //             <h2 className="text-2xl font-bold text-serenity-900 dark:text-white mb-6">
// // //               Mes patients
// // //             </h2>
            
// // //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //               {patients.length === 0 ? (
// // //                 <p className="text-serenity-600 col-span-full text-center py-12">
// // //                   Aucun rendez-vous programmé pour le moment.
// // //                 </p>
// // //               ) : (
// // //                 patients.map(patient => (
// // //                   <Card key={patient.id} className={`
// // //                     ${patient.status === 'in-waiting-room' ? 'border-2 border-amber-500' : ''}
// // //                     ${patient.status === 'active' ? 'border-2 border-green-500' : ''}
// // //                     ${patient.status === 'completed' ? 'opacity-70' : ''}
// // //                   `}>
// // //                     <CardHeader>
// // //                       <div className="flex justify-between items-center">
// // //                         <CardTitle className="text-xl">{patient.name}</CardTitle>
// // //                         {patient.status === 'in-waiting-room' && (
// // //                           <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
// // //                             En salle d'attente
// // //                           </Badge>
// // //                         )}
// // //                         {patient.status === 'active' && (
// // //                           <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
// // //                             En cours
// // //                           </Badge>
// // //                         )}
// // //                         {patient.status === 'completed' && (
// // //                           <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
// // //                             Terminé
// // //                           </Badge>
// // //                         )}
// // //                       </div>
// // //                       <CardDescription>
// // //                         <div className="flex items-center gap-2 mt-2">
// // //                           <Calendar className="h-4 w-4" />
// // //                           <span>{patient.appointmentDate}</span>
// // //                         </div>
// // //                         <div className="flex items-center gap-2 mt-1">
// // //                           <Clock className="h-4 w-4" />
// // //                           <span>{patient.appointmentTime}</span>
// // //                         </div>
// // //                       </CardDescription>
// // //                     </CardHeader>
// // //                     <CardContent>
// // //                       <div className="flex items-center gap-2 mb-4">
// // //                         <User className="h-4 w-4 text-serenity-600" />
// // //                         <span className="text-sm text-serenity-800 dark:text-serenity-200">
// // //                           {patient.appointmentType}
// // //                         </span>
// // //                       </div>
// // //                     </CardContent>
// // //                     <CardFooter className="flex justify-between">
// // //                       {patient.status !== 'completed' && isOnline && (
// // //                         <>
// // //                           <Button 
// // //                             onClick={() => handleStartCall(patient, 'video')}
// // //                             variant="outline" 
// // //                             className="flex-1 mr-2"
// // //                           >
// // //                             <VideoIcon className="mr-2 h-4 w-4" />
// // //                             Vidéo
// // //                           </Button>
// // //                           <Button 
// // //                             onClick={() => handleStartCall(patient, 'phone')}
// // //                             variant="outline" 
// // //                             className="flex-1"
// // //                           >
// // //                             <Phone className="mr-2 h-4 w-4" />
// // //                             Téléphone
// // //                           </Button>
// // //                         </>
// // //                       )}
// // //                       {patient.status === 'completed' && (
// // //                         <Button 
// // //                           variant="outline" 
// // //                           className="flex-1"
// // //                           disabled
// // //                         >
// // //                           Consultation terminée
// // //                         </Button>
// // //                       )}
// // //                     </CardFooter>
// // //                   </Card>
// // //                 ))
// // //               )}
// // //             </div>
// // //           </div>
// // //         </section>
// // //       </main>
// // //       <Footer />
      
// // //       {/* Dialog pour l'appel vidéo/téléphone */}
// // //       <Dialog open={showCallDialog} onOpenChange={() => {}}>
// // //         <DialogContent className="sm:max-w-md">
// // //           <DialogHeader>
// // //             <DialogTitle>
// // //               {callType === 'video' ? 'Consultation vidéo' : 'Consultation téléphonique'} avec {selectedPatient?.name}
// // //             </DialogTitle>
// // //             <DialogDescription>
// // //               Consultation en cours...
// // //             </DialogDescription>
// // //           </DialogHeader>
// // //           <div className="flex flex-col items-center justify-center p-6">
// // //             {callType === 'video' ? (
// // //               <div className="w-full aspect-video bg-slate-800 rounded-lg flex items-center justify-center mb-4">
// // //                 <VideoIcon className="h-16 w-16 text-white opacity-50" />
// // //               </div>
// // //             ) : (
// // //               <div className="w-full py-12 flex items-center justify-center mb-4">
// // //                 <Phone className="h-16 w-16 text-serenity-600" />
// // //               </div>
// // //             )}
// // //             <p className="text-center text-serenity-700 dark:text-serenity-300">
// // //               Durée de la consultation: <span id="call-timer">{formatTime(callTimer)}</span>
// // //             </p>
// // //           </div>
// // //           <DialogFooter className="flex flex-col sm:flex-row sm:justify-between">
// // //             <Button
// // //               type="button"
// // //               variant="outline"
// // //               className="mb-2 sm:mb-0"
// // //             >
// // //               <MessageSquare className="w-4 h-4 mr-2" />
// // //               Chat
// // //             </Button>
// // //             <Button
// // //               type="button"
// // //               variant="destructive"
// // //               onClick={handleEndCall}
// // //             >
// // //               Terminer la consultation
// // //             </Button>
// // //           </DialogFooter>
// // //         </DialogContent>
// // //       </Dialog>
// // //     </div>
// // //   );
// // // };

// // // export default TherapistDashboard;


// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import Header from '@/components/Header';
// // import Footer from '@/components/Footer';
// // import { Button } from '@/components/ui/button';
// // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Badge } from '@/components/ui/badge';
// // import { VideoIcon, Phone, Calendar, Clock, User, MessageSquare } from 'lucide-react';
// // import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
// // import { toast } from 'sonner';
// // import { useToast } from "@/hooks/use-toast"; // Import the useToast hook

// // // Types
// // interface Patient {
// //   id: number;
// //   name: string;
// //   appointmentType: string;
// //   appointmentDate: string;
// //   appointmentTime: string;
// //   status: 'scheduled' | 'in-waiting-room' | 'active' | 'completed';
// //   patient_id: number;
// //   notes?: string;
// // }

// // interface TherapistData {
// //   id: number;
// //   name: string;
// //   isOnline: boolean;
// //   specialty: string;
// // }

// // interface Stats {
// //   total_appointments: number;
// //   completed_sessions: number;
// // }

// // // Current user service or hook
// // import { useAuth } from '../context/AuthContext'; // Create this hook to access authentication context

// // const TherapistDashboard: React.FC = () => {
// //   const navigate = useNavigate();
// //   const { user } = useAuth(); // Use authentication hook instead of direct import
// //   const { toast: hookToast } = useToast(); // Use the useToast hook for toast notifications
  
// //   const [isOnline, setIsOnline] = useState(false);
// //   const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
// //   const [showCallDialog, setShowCallDialog] = useState(false);
// //   const [callType, setCallType] = useState<'video' | 'phone' | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [patients, setPatients] = useState<Patient[]>([]);
// //   const [stats, setStats] = useState<Stats>({ total_appointments: 0, completed_sessions: 0 });
// //   const [therapistData, setTherapistData] = useState<TherapistData | null>(null);
// //   const [callTimer, setCallTimer] = useState(0);
// //   const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
// // const [authUser, setAuthUser] = useState<{ role: string } | null>(null);

// //   // Load dashboard data
// //   // useEffect(() => {
// //   //   console.log("TherapistDashboard - Current User:", user);
    
// //   //   // Check user authentication
// //   //   if (!user) {
// //   //     // Redirect to login if not authenticated
// //   //     hookToast({
// //   //       title: "Accès refusé",
// //   //       description: "Veuillez vous connecter en tant que thérapeute",
// //   //       variant: "destructive",
// //   //     });
// //   //     navigate('/', { replace: true });
// //   //     return;
// //   //   }
    
// //   //   if (!user.isTherapist) {
// //   //     // Redirect to appointments if not a therapist
// //   //     hookToast({
// //   //       title: "Accès refusé",
// //   //       description: "Cette page est réservée aux thérapeutes",
// //   //       variant: "destructive",
// //   //     });
// //   //     navigate('/appointments', { replace: true });
// //   //     return;
// //   //   }
    
// //   //   // Load dashboard data from API
// //   //   fetchDashboardData();
// //   // }, [navigate, user, hookToast]);

// //   // // Start timer for call duration


// //     useEffect(() => {
// //       // Vérifier si l'utilisateur est connecté
// //       const currentUser = localStorage.getItem('therapist');
// //       if (currentUser) {
// //         const userData = JSON.parse(currentUser);
// //         setAuthUser(userData);
        
// //         // Rediriger les thérapeutes vers leur tableau de bord
// //         if (userData.formData.email.toLowerCase().endsWith('@therapist.com')) {
// //           window.location.href = '/therapist-dashboard';
// //         }
// //       }
// //     }, []);
  
// //   useEffect(() => {
// //     if (showCallDialog && selectedPatient) {
// //       const interval = setInterval(() => {
// //         setCallTimer(prev => prev + 1);
// //       }, 1000);
      
// //       setTimerInterval(interval);
      
// //       return () => {
// //         if (interval) clearInterval(interval);
// //       };
// //     } else {
// //       setCallTimer(0);
// //       if (timerInterval) clearInterval(timerInterval);
// //     }
// //   }, [showCallDialog, selectedPatient, timerInterval]);

// //   const fetchDashboardData = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await axios.get('/api/therapist/dashboard');
      
// //       setPatients(response.data.patients || []);
// //       setStats(response.data.stats || { total_appointments: 0, completed_sessions: 0 });
// //       setTherapistData(response.data.therapist || null);
      
// //       // Set online status from API
// //       if (response.data.therapist) {
// //         setIsOnline(response.data.therapist.isOnline);
// //       }
      
// //       setLoading(false);
// //     } catch (error) {
// //       console.error('Error fetching dashboard data:', error);
// //       hookToast({
// //         title: "Erreur",
// //         description: "Erreur lors du chargement des données",
// //         variant: "destructive",
// //       });
// //       setLoading(false);
// //     }
// //   };

// //   const handleGoOnline = async () => {
// //     try {
// //       const response = await axios.post('/api/therapist/online-status', { isOnline: true });
      
// //       if (response.data.success) {
// //         setIsOnline(true);
// //         hookToast({
// //           title: "Mise à jour du statut",
// //           description: "Vous êtes maintenant en ligne. Vos patients peuvent vous contacter pour leurs consultations",
// //           variant: "default",
// //         });
// //       }
// //     } catch (error) {
// //       console.error('Error updating online status:', error);
// //       hookToast({
// //         title: "Erreur",
// //         description: "Erreur lors de la mise à jour de votre statut",
// //         variant: "destructive",
// //       });
// //     }
// //   };

// //   const handleGoOffline = async () => {
// //     try {
// //       const response = await axios.post('/api/therapist/online-status', { isOnline: false });
      
// //       if (response.data.success) {
// //         setIsOnline(false);
// //         hookToast({
// //           title: "Mise à jour du statut",
// //           description: "Vous êtes maintenant hors ligne. Vos patients ne peuvent plus vous contacter pour leurs consultations",
// //           variant: "destructive",
// //         });
// //       }
// //     } catch (error) {
// //       console.error('Error updating online status:', error);
// //       hookToast({
// //         title: "Erreur",
// //         description: "Erreur lors de la mise à jour de votre statut",
// //         variant: "destructive",
// //       });
// //     }
// //   };

// //   const handleStartCall = async (patient: Patient, type: 'video' | 'phone') => {
// //     try {
// //       const response = await axios.post(`/api/therapist/appointments/${patient.id}/start-call`, {
// //         callType: type
// //       });
      
// //       if (response.data.success || response.data.call_link) {
// //         setSelectedPatient(patient);
// //         setCallType(type);
// //         setShowCallDialog(true);
        
// //         // Update patient status in local state
// //         setPatients(prevPatients => 
// //           prevPatients.map(p => 
// //             p.id === patient.id ? {...p, status: 'active' as const} : p
// //           )
// //         );
// //       }
// //     } catch (error) {
// //       console.error('Error starting call:', error);
// //       hookToast({
// //         title: "Erreur",
// //         description: "Erreur lors du démarrage de l'appel",
// //         variant: "destructive",
// //       });
// //     }
// //   };

// //   const handleEndCall = async () => {
// //     if (!selectedPatient) return;
    
// //     try {
// //       const response = await axios.post(`/api/therapist/appointments/${selectedPatient.id}/end-call`);
      
// //       if (response.data.success) {
// //         hookToast({
// //           title: "Consultation terminée",
// //           description: `La consultation avec ${selectedPatient.name} a été terminée`,
// //           variant: "default",
// //         });
        
// //         // Update patient status in local state
// //         setPatients(prevPatients => 
// //           prevPatients.map(p => 
// //             p.id === selectedPatient.id ? {...p, status: 'completed' as const} : p
// //           )
// //         );
        
// //         setShowCallDialog(false);
// //         setSelectedPatient(null);
// //         setCallType(null);
// //       }
// //     } catch (error) {
// //       console.error('Error ending call:', error);
// //       hookToast({
// //         title: "Erreur",
// //         description: "Erreur lors de la fin de l'appel",
// //         variant: "destructive",
// //       });
// //     }
// //   };

// //   // Format timer display as MM:SS
// //   const formatTime = (seconds: number) => {
// //     const mins = Math.floor(seconds / 60);
// //     const secs = seconds % 60;
// //     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex flex-col">
// //         <Header />
// //         <div className="flex-grow flex items-center justify-center">
// //           <p>Chargement du tableau de bord...</p>
// //         </div>
// //         <Footer />
// //       </div>
// //     );
// //   }

// //   if (!user || !user.isTherapist) {
// //     return (
// //       <div className="min-h-screen flex flex-col">
// //         <Header />
// //         <div className="flex-grow flex items-center justify-center">
// //           <p>Vérification des autorisations...</p>
// //         </div>
// //         <Footer />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen flex flex-col">
// //       <Header />
// //       <main className="flex-grow">
// //         <section className="bg-serenity-50 dark:bg-serenity-900 py-12">
// //           <div className="container mx-auto px-6">
// //             <div className="max-w-3xl mx-auto text-center">
// //               <h1 className="text-4xl md:text-5xl font-bold text-serenity-900 dark:text-white mb-6">
// //                 Tableau de bord Thérapeute
// //               </h1>
// //               <p className="text-lg text-serenity-700 dark:text-serenity-200 mb-8">
// //                 Gérez vos rendez-vous et consultations en ligne
// //               </p>
// //               <div className="flex justify-center gap-4">
// //                 {!isOnline ? (
// //                   <Button 
// //                     onClick={handleGoOnline}
// //                     className="bg-green-600 hover:bg-green-700"
// //                   >
// //                     Se mettre en ligne
// //                   </Button>
// //                 ) : (
// //                   <Button 
// //                     onClick={handleGoOffline}
// //                     variant="destructive"
// //                   >
// //                     Se mettre hors ligne
// //                   </Button>
// //                 )}
// //               </div>
// //               {isOnline && (
// //                 <Badge className="mt-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
// //                   En ligne
// //                 </Badge>
// //               )}
              
// //               {/* Stats section */}
// //               <div className="mt-8 flex justify-center gap-8">
// //                 <div className="text-center">
// //                   <p className="text-3xl font-bold">{stats.total_appointments}</p>
// //                   <p className="text-sm text-serenity-600">Rendez-vous totaux</p>
// //                 </div>
// //                 <div className="text-center">
// //                   <p className="text-3xl font-bold">{stats.completed_sessions}</p>
// //                   <p className="text-sm text-serenity-600">Consultations terminées</p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </section>
        
// //         <section className="py-12 bg-white dark:bg-serenity-900">
// //           <div className="container mx-auto px-6">
// //             <h2 className="text-2xl font-bold text-serenity-900 dark:text-white mb-6">
// //               Mes patients
// //             </h2>
            
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //               {patients.length === 0 ? (
// //                 <p className="text-serenity-600 col-span-full text-center py-12">
// //                   Aucun rendez-vous programmé pour le moment.
// //                 </p>
// //               ) : (
// //                 patients.map(patient => (
// //                   <Card key={patient.id} className={`
// //                     ${patient.status === 'in-waiting-room' ? 'border-2 border-amber-500' : ''}
// //                     ${patient.status === 'active' ? 'border-2 border-green-500' : ''}
// //                     ${patient.status === 'completed' ? 'opacity-70' : ''}
// //                   `}>
// //                     <CardHeader>
// //                       <div className="flex justify-between items-center">
// //                         <CardTitle className="text-xl">{patient.name}</CardTitle>
// //                         {patient.status === 'in-waiting-room' && (
// //                           <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
// //                             En salle d'attente
// //                           </Badge>
// //                         )}
// //                         {patient.status === 'active' && (
// //                           <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
// //                             En cours
// //                           </Badge>
// //                         )}
// //                         {patient.status === 'completed' && (
// //                           <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
// //                             Terminé
// //                           </Badge>
// //                         )}
// //                       </div>
// //                       <CardDescription>
// //                         <div className="flex items-center gap-2 mt-2">
// //                           <Calendar className="h-4 w-4" />
// //                           <span>{patient.appointmentDate}</span>
// //                         </div>
// //                         <div className="flex items-center gap-2 mt-1">
// //                           <Clock className="h-4 w-4" />
// //                           <span>{patient.appointmentTime}</span>
// //                         </div>
// //                       </CardDescription>
// //                     </CardHeader>
// //                     <CardContent>
// //                       <div className="flex items-center gap-2 mb-4">
// //                         <User className="h-4 w-4 text-serenity-600" />
// //                         <span className="text-sm text-serenity-800 dark:text-serenity-200">
// //                           {patient.appointmentType}
// //                         </span>
// //                       </div>
// //                     </CardContent>
// //                     <CardFooter className="flex justify-between">
// //                       {patient.status !== 'completed' && isOnline && (
// //                         <>
// //                           <Button 
// //                             onClick={() => handleStartCall(patient, 'video')}
// //                             variant="outline" 
// //                             className="flex-1 mr-2"
// //                           >
// //                             <VideoIcon className="mr-2 h-4 w-4" />
// //                             Vidéo
// //                           </Button>
// //                           <Button 
// //                             onClick={() => handleStartCall(patient, 'phone')}
// //                             variant="outline" 
// //                             className="flex-1"
// //                           >
// //                             <Phone className="mr-2 h-4 w-4" />
// //                             Téléphone
// //                           </Button>
// //                         </>
// //                       )}
// //                       {patient.status === 'completed' && (
// //                         <Button 
// //                           variant="outline" 
// //                           className="flex-1"
// //                           disabled
// //                         >
// //                           Consultation terminée
// //                         </Button>
// //                       )}
// //                     </CardFooter>
// //                   </Card>
// //                 ))
// //               )}
// //             </div>
// //           </div>
// //         </section>
// //       </main>
// //       <Footer />
      
// //       {/* Dialog pour l'appel vidéo/téléphone */}
// //       <Dialog open={showCallDialog} onOpenChange={() => {}}>
// //         <DialogContent className="sm:max-w-md">
// //           <DialogHeader>
// //             <DialogTitle>
// //               {callType === 'video' ? 'Consultation vidéo' : 'Consultation téléphonique'} avec {selectedPatient?.name}
// //             </DialogTitle>
// //             <DialogDescription>
// //               Consultation en cours...
// //             </DialogDescription>
// //           </DialogHeader>
// //           <div className="flex flex-col items-center justify-center p-6">
// //             {callType === 'video' ? (
// //               <div className="w-full aspect-video bg-slate-800 rounded-lg flex items-center justify-center mb-4">
// //                 <VideoIcon className="h-16 w-16 text-white opacity-50" />
// //               </div>
// //             ) : (
// //               <div className="w-full py-12 flex items-center justify-center mb-4">
// //                 <Phone className="h-16 w-16 text-serenity-600" />
// //               </div>
// //             )}
// //             <p className="text-center text-serenity-700 dark:text-serenity-300">
// //               Durée de la consultation: <span id="call-timer">{formatTime(callTimer)}</span>
// //             </p>
// //           </div>
// //           <DialogFooter className="flex flex-col sm:flex-row sm:justify-between">
// //             <Button
// //               type="button"
// //               variant="outline"
// //               className="mb-2 sm:mb-0"
// //             >
// //               <MessageSquare className="w-4 h-4 mr-2" />
// //               Chat
// //             </Button>
// //             <Button
// //               type="button"
// //               variant="destructive"
// //               onClick={handleEndCall}
// //             >
// //               Terminer la consultation
// //             </Button>
// //           </DialogFooter>
// //         </DialogContent>
// //       </Dialog>
// //     </div>
// //   );
// // };

// // export default TherapistDashboard;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from '@/components/ui/badge';
// import { VideoIcon, Phone, Calendar, Clock, User, MessageSquare } from 'lucide-react';
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
// import { toast } from 'sonner';
// import { fetchDashboardData, updateOnlineStatus, startCall, endCall } from '../components/Service/therapistService';

// // Types
// interface Patient {
//   id: number;
//   name: string;
//   appointmentType: string;
//   appointmentDate: string;
//   appointmentTime: string;
//   status: 'scheduled' | 'in-waiting-room' | 'active' | 'completed';
//   patient_id: number;
//   notes?: string;
// }

// interface TherapistData {
//   id: number;
//   name: string;
//   isOnline: boolean;
//   specialty: string;
// }

// interface Stats {
//   total_appointments: number;
//   completed_sessions: number;
// }

// const TherapistDashboard = () => {
//   const navigate = useNavigate();
  
//   const [isOnline, setIsOnline] = useState(false);
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [showCallDialog, setShowCallDialog] = useState(false);
//   const [callType, setCallType] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [patients, setPatients] = useState([]);
//   const [stats, setStats] = useState({ total_appointments: 0, completed_sessions: 0 });
//   const [therapistData, setTherapistData] = useState(null);
//   const [callTimer, setCallTimer] = useState(0);
//   const [timerInterval, setTimerInterval] = useState(null);
// const [authUser, setAuthUser] = useState<{ role: string } | null>(null);


//     useEffect(() => {
//       // Vérifier si l'utilisateur est connecté
//       const currentUser = localStorage.getItem('therapist');
//       if (currentUser) {
//         const userData = JSON.parse(currentUser);
//         setAuthUser(userData);
        
//         // Rediriger les thérapeutes vers leur tableau de bord
//         if (userData.formData.email.toLowerCase().endsWith('@therapist.com')) {
//           window.location.href = '/therapist-dashboard';
//         }
//       }
//     }, []);
  
//   // Démarrer le chronomètre pour la durée de l'appel
//   useEffect(() => {
//     if (showCallDialog && selectedPatient) {
//       const interval = setInterval(() => {
//         setCallTimer(prev => prev + 1);
//       }, 1000);
      
//       setTimerInterval(interval);
      
//       return () => {
//         if (interval) clearInterval(interval);
//       };
//     } else {
//       setCallTimer(0);
//       if (timerInterval) clearInterval(timerInterval);
//     }
//   }, [showCallDialog, selectedPatient, timerInterval]);

//   // Récupérer les données du tableau de bord
//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
      
//       // Appeler l'API pour récupérer les données
//       const response = await axios.get('/api/therapist/dashboard');
      
//       if (response.data) {
//         setPatients(response.data.patients || []);
//         setStats(response.data.stats || { total_appointments: 0, completed_sessions: 0 });
//         setTherapistData(response.data.therapist || null);
        
//         // Définir le statut en ligne depuis l'API
//         if (response.data.therapist) {
//           setIsOnline(response.data.therapist.isOnline);
//         }
//       }
      
//       setLoading(false);
//     } catch (error) {
//       console.error('Erreur lors du chargement des données:', error);
//       toast.error("Erreur lors du chargement des données");
//       setLoading(false);
//     }
//   };

//   // Gérer la mise en ligne du thérapeute
//   const handleGoOnline = async () => {
//     try {
//       const response = await axios.post('/api/therapist/online-status', { isOnline: true });
      
//       if (response.data.success) {
//         setIsOnline(true);
//       toast.error("Erreur lors du mise des données");

//       }
//     } catch (error) {
//       console.error('Erreur lors de la mise à jour du statut:', error);
//       toast.error("Erreur lors de la mise à jour de votre statut");
//     }
//   };

//   // Gérer la mise hors ligne du thérapeute
//   const handleGoOffline = async () => {
//     try {
//       const response = await axios.post('/api/therapist/online-status', { isOnline: false });
      
//       if (response.data.success) {
//         setIsOnline(false);
//         toast.error("Erreur lors du mise des données");
//       }
//     } catch (error) {
//       console.error('Erreur lors de la mise à jour du statut:', error);
//       toast.error("Erreur lors de la mise à jour de votre statut");
//     }
//   };

//   // Démarrer un appel avec un patient
//   const handleStartCall = async (patient, type) => {
//     try {
//       const response = await axios.post(`/api/therapist/appointments/${patient.id}/start-call`, {
//         callType: type
//       });
      
//       if (response.data.success || response.data.call_link) {
//         setSelectedPatient(patient);
//         setCallType(type);
//         setShowCallDialog(true);
        
//         // Mettre à jour le statut du patient dans l'état local
//         setPatients(prevPatients => 
//           prevPatients.map(p => 
//             p.id === patient.id ? {...p, status: 'active'} : p
//           )
//         );
        
//         toast(
//           <>
//             <strong>Appel démarré</strong>
//             <div>Consultation avec {patient.name} commencée</div>
//           </>
//         );
//       }
//     } catch (error) {
//       console.error('Erreur lors du démarrage de l\'appel:', error);
//       toast(
//         <div>
//           <strong>Erreur</strong>
//           <div>Erreur lors du démarrage de l'appel</div>
//         </div>
//       );
//     }
//   };

//   // Terminer un appel
//   const handleEndCall = async () => {
//     if (!selectedPatient) return;
    
//     try {
//       const response = await axios.post(`/api/therapist/appointments/${selectedPatient.id}/end-call`);
      
//       if (response.data.success) {
//         toast(
//           <>
//             <strong>Consultation terminée</strong>
//             <div>La consultation avec {selectedPatient.name} a été terminée</div>
//           </>
//         );
        
//         // Mettre à jour le statut du patient dans l'état local
//         setPatients(prevPatients => 
//           prevPatients.map(p => 
//             p.id === selectedPatient.id ? {...p, status: 'completed'} : p
//           )
//         );
        
//         setShowCallDialog(false);
//         setSelectedPatient(null);
//         setCallType(null);
//       }
//     } catch (error) {
//       toast(
//         <div>
//           <strong>Erreur</strong>
//           <div>Erreur lors de la fin de l'appel</div>
//         </div>
//       );
//     }
//   };

//   // Formater l'affichage du chronomètre en MM:SS
//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   // Afficher un indicateur de chargement pendant le chargement des données
//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col">
//         <Header />
//         <div className="flex-grow flex items-center justify-center">
//           <p>Chargement du tableau de bord...</p>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
//       <main className="flex-grow">
//         <section className="bg-serenity-50 dark:bg-serenity-900 py-12">
//           <div className="container mx-auto px-6">
//             <div className="max-w-3xl mx-auto text-center">
//               <h1 className="text-4xl md:text-5xl font-bold text-serenity-900 dark:text-white mb-6">
//                 Tableau de bord Thérapeute
//               </h1>
//               <p className="text-lg text-serenity-700 dark:text-serenity-200 mb-8">
//                 Gérez vos rendez-vous et consultations en ligne
//               </p>
//               <div className="flex justify-center gap-4">
//                 {!isOnline ? (
//                   <Button 
//                     onClick={handleGoOnline}
//                     className="bg-green-600 hover:bg-green-700"
//                   >
//                     Se mettre en ligne
//                   </Button>
//                 ) : (
//                   <Button 
//                     onClick={handleGoOffline}
//                     variant="destructive"
//                   >
//                     Se mettre hors ligne
//                   </Button>
//                 )}
//               </div>
//               {isOnline && (
//                 <Badge className="mt-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
//                   En ligne
//                 </Badge>
//               )}
              
//               {/* Section statistiques */}
//               <div className="mt-8 flex justify-center gap-8">
//                 <div className="text-center">
//                   <p className="text-3xl font-bold">{stats.total_appointments}</p>
//                   <p className="text-sm text-serenity-600">Rendez-vous totaux</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-3xl font-bold">{stats.completed_sessions}</p>
//                   <p className="text-sm text-serenity-600">Consultations terminées</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
        
//         <section className="py-12 bg-white dark:bg-serenity-900">
//           <div className="container mx-auto px-6">
//             <h2 className="text-2xl font-bold text-serenity-900 dark:text-white mb-6">
//               Mes patients
//             </h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {patients.length === 0 ? (
//                 <p className="text-serenity-600 col-span-full text-center py-12">
//                   Aucun rendez-vous programmé pour le moment.
//                 </p>
//               ) : (
//                 patients.map(patient => (
//                   <Card key={patient.id} className={`
//                     ${patient.status === 'in-waiting-room' ? 'border-2 border-amber-500' : ''}
//                     ${patient.status === 'active' ? 'border-2 border-green-500' : ''}
//                     ${patient.status === 'completed' ? 'opacity-70' : ''}
//                   `}>
//                     <CardHeader>
//                       <div className="flex justify-between items-center">
//                         <CardTitle className="text-xl">{patient.name}</CardTitle>
//                         {patient.status === 'in-waiting-room' && (
//                           <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
//                             En salle d'attente
//                           </Badge>
//                         )}
//                         {patient.status === 'active' && (
//                           <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
//                             En cours
//                           </Badge>
//                         )}
//                         {patient.status === 'completed' && (
//                           <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
//                             Terminé
//                           </Badge>
//                         )}
//                       </div>
//                       <CardDescription>
//                         <div className="flex items-center gap-2 mt-2">
//                           <Calendar className="h-4 w-4" />
//                           <span>{patient.appointmentDate}</span>
//                         </div>
//                         <div className="flex items-center gap-2 mt-1">
//                           <Clock className="h-4 w-4" />
//                           <span>{patient.appointmentTime}</span>
//                         </div>
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="flex items-center gap-2 mb-4">
//                         <User className="h-4 w-4 text-serenity-600" />
//                         <span className="text-sm text-serenity-800 dark:text-serenity-200">
//                           {patient.appointmentType}
//                         </span>
//                       </div>
//                     </CardContent>
//                     <CardFooter className="flex justify-between">
//                       {patient.status !== 'completed' && isOnline && (
//                         <>
//                           <Button 
//                             onClick={() => handleStartCall(patient, 'video')}
//                             variant="outline" 
//                             className="flex-1 mr-2"
//                           >
//                             <VideoIcon className="mr-2 h-4 w-4" />
//                             Vidéo
//                           </Button>
//                           <Button 
//                             onClick={() => handleStartCall(patient, 'phone')}
//                             variant="outline" 
//                             className="flex-1"
//                           >
//                             <Phone className="mr-2 h-4 w-4" />
//                             Téléphone
//                           </Button>
//                         </>
//                       )}
//                       {patient.status === 'completed' && (
//                         <Button 
//                           variant="outline" 
//                           className="flex-1"
//                           disabled
//                         >
//                           Consultation terminée
//                         </Button>
//                       )}
//                     </CardFooter>
//                   </Card>
//                 ))
//               )}
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
      
//       {/* Dialog pour l'appel vidéo/téléphone */}
//       <Dialog open={showCallDialog} onOpenChange={setShowCallDialog}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle>
//               {callType === 'video' ? 'Consultation vidéo' : 'Consultation téléphonique'} avec {selectedPatient?.name}
//             </DialogTitle>
//             <DialogDescription>
//               Consultation en cours...
//             </DialogDescription>
//           </DialogHeader>
//           <div className="flex flex-col items-center justify-center p-6">
//             {callType === 'video' ? (
//               <div className="w-full aspect-video bg-slate-800 rounded-lg flex items-center justify-center mb-4">
//                 <VideoIcon className="h-16 w-16 text-white opacity-50" />
//               </div>
//             ) : (
//               <div className="w-full py-12 flex items-center justify-center mb-4">
//                 <Phone className="h-16 w-16 text-serenity-600" />
//               </div>
//             )}
//             <p className="text-center text-serenity-700 dark:text-serenity-300">
//               Durée de la consultation: <span id="call-timer">{formatTime(callTimer)}</span>
//             </p>
//           </div>
//           <DialogFooter className="flex flex-col sm:flex-row sm:justify-between">
//             <Button
//               type="button"
//               variant="outline"
//               className="mb-2 sm:mb-0"
//             >
//               <MessageSquare className="w-4 h-4 mr-2" />
//               Chat
//             </Button>
//             <Button
//               type="button"
//               variant="destructive"
//               onClick={handleEndCall}
//             >
//               Terminer la consultation
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default TherapistDashboard;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { VideoIcon, Phone, Calendar, Clock, User, MessageSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';

// Import des services API
import { fetchDashboardData, updateOnlineStatus, startVideoCall, endCall } from '../components/Service/therapistService';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';

// Types
interface Patient {
  id: number;
  name: string;
  appointmentType: string;
  appointmentDate: string;
  appointmentTime: string;
  status: 'scheduled' | 'in-waiting-room' | 'active' | 'completed';
  patient_id: number;
  notes?: string;
}

interface TherapistData {
  id: number;
  name: string;
  isOnline: boolean;
  specialty: string;
}

interface Stats {
  total_appointments: number;
  completed_sessions: number;
}

const TherapistDashboard = () => {
  const navigate = useNavigate();
  
  const [isOnline, setIsOnline] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [callType, setCallType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);
  const [stats, setStats] = useState({ total_appointments: 0, completed_sessions: 0 });
  const [therapistData, setTherapistData] = useState(null);
  const [callTimer, setCallTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [authUser, setAuthUser] = useState({ role: "" });

  // Charger les données du tableau de bord au chargement du composant
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const dashboardData = await fetchDashboardData() as { patients?: Patient[]; stats?: Stats; therapist?: TherapistData } || {};
        const { patients = [], stats = { total_appointments: 0, completed_sessions: 0 }, therapist = null } = dashboardData;
        
        setPatients(patients);
        setStats(stats);
        setTherapistData(therapist);
        
        // Définir le statut en ligne depuis l'API
        if (therapist) {
          setIsOnline(therapist.isOnline);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        toast.error("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };

    // Vérifier si l'utilisateur est connecté
    const currentUser = localStorage.getItem('therapist');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      setAuthUser(userData);
    }

    loadDashboardData();
  }, []);
  
  // Démarrer le chronomètre pour la durée de l'appel
  useEffect(() => {
    if (showCallDialog && selectedPatient) {
      const interval = setInterval(() => {
        setCallTimer(prev => prev + 1);
      }, 1000);
      
      setTimerInterval(interval);
      
      return () => {
        if (interval) clearInterval(interval);
      };
    } else {
      setCallTimer(0);
      if (timerInterval) clearInterval(timerInterval);
    }
  }, [showCallDialog, selectedPatient, timerInterval]);

  // // Gérer la mise en ligne du thérapeute
  // const handleGoOnline = async () => {
  //   try {
  //     const response = await updateOnlineStatus(true);
      
  //     if (response && response.success) {
  //       setIsOnline(true);
  //       toast.success("Vous êtes maintenant en ligne");
  //     }
  //   } catch (error) {
  //     console.error('Erreur lors de la mise à jour du statut:', error);
  //     toast.error("Erreur lors de la mise à jour de votre statut");
  //   }
  // };

  // // Gérer la mise hors ligne du thérapeute
  // const handleGoOffline = async () => {
  //   try {
  //     const response: { success: boolean } = await updateOnlineStatus(false);
      
  //     if (response && response.success) {
  //       setIsOnline(false);
  //       toast.success("Vous êtes maintenant hors ligne");
  //     }
  //   } catch (error) {
  //     console.error('Erreur lors de la mise à jour du statut:', error);
  //     toast.error("Erreur lors de la mise à jour de votre statut");
  //   }
  // };

  // // Démarrer un appel avec un patient
  // const handleStartCall = async (patient, type) => {
  //   try {
  //     const response = await startCall(patient.id, type);
      
  //     if (response.success || response.call_link) {
  //       setSelectedPatient(patient);
  //       setCallType(type);
  //       setShowCallDialog(true);
        
  //       // Mettre à jour le statut du patient dans l'état local
  //       setPatients(prevPatients => 
  //         prevPatients.map(p => 
  //           p.id === patient.id ? {...p, status: 'active'} : p
  //         )
  //       );
        
  //       toast.success(`Consultation avec ${patient.name} commencée`);
  //     }
  //   } catch (error) {
  //     console.error('Erreur lors du démarrage de l\'appel:', error);
  //     toast.error("Erreur lors du démarrage de l'appel");
  //   }
  // };

  // // Terminer un appel
  // const handleEndCall = async () => {
  //   if (!selectedPatient) return;
    
  //   try {
  //     const response = await endCall(selectedPatient.id);
      
  //     if (response.success) {
  //       toast.success(`La consultation avec ${selectedPatient.name} a été terminée`);
        
  //       // Mettre à jour le statut du patient dans l'état local
  //       setPatients(prevPatients => 
  //         prevPatients.map(p => 
  //           p.id === selectedPatient.id ? {...p, status: 'completed'} : p
  //         )
  //       );
        
  //       setShowCallDialog(false);
  //       setSelectedPatient(null);
  //       setCallType(null);
  //     }
  //   } catch (error) {
  //     toast.error("Erreur lors de la fin de l'appel");
  //   }
  // };

  // // Formater l'affichage du chronomètre en MM:SS
  // const formatTime = (seconds) => {
  //   const mins = Math.floor(seconds / 60);
  //   const secs = seconds % 60;
  //   return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  // };

  // // Afficher un indicateur de chargement pendant le chargement des données
  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex flex-col">
  //       <Header />
  //       <div className="flex-grow flex items-center justify-center">
  //         <div className="animate-pulse flex flex-col items-center">
  //           <div className="h-12 w-12 rounded-full bg-serenity-400 mb-4"></div>
  //           <p>Chargement du tableau de bord...</p>
  //         </div>
  //       </div>
  //       <Footer />
  //     </div>
  //   );
  // }
// Mettre en ligne le thérapeute
const handleGoOnline = async () => {
  try {
    const response = await updateOnlineStatus(true);

    if (response?.success) {
      setIsOnline(true);
      toast.success("Vous êtes maintenant en ligne");
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut:", error);
    toast.error("Erreur lors de la mise à jour de votre statut");
  }
};

// Mettre hors ligne le thérapeute
const handleGoOffline = async () => {
  try {
    const response = await updateOnlineStatus(false);

    if (response?.success) {
      setIsOnline(false);
      toast.success("Vous êtes maintenant hors ligne");
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut:", error);
    toast.error("Erreur lors de la mise à jour de votre statut");
  }
};

// Démarrer un appel
const handleStartCall = async (appointment, type) => {
  try {
    const response = await startVideoCall(appointment.id, type);

    if (response?.call_link) {
      setSelectedPatient(appointment);
      setCallType(type);
      setShowCallDialog(true);

      // Mettre à jour le statut local
      setPatients(prev => prev.map(p =>
        p.id === appointment.id ? { ...p, status: 'active' } : p
      ));

      toast.success(`Consultation avec ${appointment.name} commencée`);
    }
  } catch (error) {
    console.error("Erreur lors du démarrage de l'appel:", error);
    toast.error("Erreur lors du démarrage de l'appel");
  }
};

// Terminer un appel
const handleEndCall = async () => {
  if (!selectedPatient) return;

  try {
    const response = await endCall(selectedPatient.id);

    if (response?.success) {
      toast.success(`Consultation avec ${selectedPatient.name} terminée`);

      setPatients(prev => prev.map(p =>
        p.id === selectedPatient.id ? { ...p, status: 'completed' } : p
      ));

      setShowCallDialog(false);
      setSelectedPatient(null);
      setCallType(null);
    }
  } catch (error) {
    toast.error("Erreur lors de la fin de l'appel");
  }
};

// Format minute:seconde
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

  // Afficher un message si aucune donnée n'est disponible
  if (!patients || patients.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center max-w-lg px-6">
            <h2 className="text-2xl font-bold mb-4">Aucun rendez-vous programmé</h2>
            <p className="mb-8">Votre emploi du temps est vide pour le moment. Les rendez-vous s'afficheront ici lorsqu'ils seront programmés.</p>
            <Button onClick={() => navigate('/')}>Retour à l'accueil</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="bg-serenity-50 dark:bg-serenity-900 py-12">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-serenity-900 dark:text-white mb-6">
                Tableau de bord Thérapeute
              </h1>
              <p className="text-lg text-serenity-700 dark:text-serenity-200 mb-8">
                Gérez vos rendez-vous et consultations en ligne
              </p>
              <div className="flex justify-center gap-4">
                {!isOnline ? (
                  <Button 
                    onClick={handleGoOnline}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Se mettre en ligne
                  </Button>
                ) : (
                  <Button 
                    onClick={handleGoOffline}
                    variant="destructive"
                  >
                    Se mettre hors ligne
                  </Button>
                )}
              </div>
              {isOnline && (
                <Badge className="mt-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                  En ligne
                </Badge>
              )}
              
              {/* Section statistiques */}
              <div className="mt-8 flex justify-center gap-8">
                <div className="text-center">
                  <p className="text-3xl font-bold">{stats.total_appointments}</p>
                  <p className="text-sm text-serenity-600">Rendez-vous totaux</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold">{stats.completed_sessions}</p>
                  <p className="text-sm text-serenity-600">Consultations terminées</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-white dark:bg-serenity-900">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-serenity-900 dark:text-white mb-6">
              Mes patients
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {patients.length === 0 ? (
                <p className="text-serenity-600 col-span-full text-center py-12">
                  Aucun rendez-vous programmé pour le moment.
                </p>
              ) : (
                patients.map(patient => (
                  <Card key={patient.id} className={`
                    ${patient.status === 'in-waiting-room' ? 'border-2 border-amber-500' : ''}
                    ${patient.status === 'active' ? 'border-2 border-green-500' : ''}
                    ${patient.status === 'completed' ? 'opacity-70' : ''}
                  `}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-xl">{patient.name}</CardTitle>
                        {patient.status === 'in-waiting-room' && (
                          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
                            En salle d'attente
                          </Badge>
                        )}
                        {patient.status === 'active' && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                            En cours
                          </Badge>
                        )}
                        {patient.status === 'completed' && (
                          <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
                            Terminé
                          </Badge>
                        )}
                      </div>
                      <CardDescription>
                        <div className="flex items-center gap-2 mt-2">
                          <Calendar className="h-4 w-4" />
                          <span>{patient.appointmentDate}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-4 w-4" />
                          <span>{patient.appointmentTime}</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 mb-4">
                        <User className="h-4 w-4 text-serenity-600" />
                        <span className="text-sm text-serenity-800 dark:text-serenity-200">
                          {patient.appointmentType}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      {patient.status !== 'completed' && isOnline && (
                        <>
                          <Button 
                            onClick={() => handleStartCall(patient, 'video')}
                            variant="outline" 
                            className="flex-1 mr-2"
                          >
                            <VideoIcon className="mr-2 h-4 w-4" />
                            Vidéo
                          </Button>
                          <Button 
                            onClick={() => handleStartCall(patient, 'phone')}
                            variant="outline" 
                            className="flex-1"
                          >
                            <Phone className="mr-2 h-4 w-4" />
                            Téléphone
                          </Button>
                        </>
                      )}
                      {patient.status === 'completed' && (
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          disabled
                        >
                          Consultation terminée
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Dialog pour l'appel vidéo/téléphone */}
      <Dialog open={showCallDialog} onOpenChange={setShowCallDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {callType === 'video' ? 'Consultation vidéo' : 'Consultation téléphonique'} avec {selectedPatient?.name}
            </DialogTitle>
            <DialogDescription>
              Consultation en cours...
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-6">
            {callType === 'video' ? (
              <div className="w-full aspect-video bg-slate-800 rounded-lg flex items-center justify-center mb-4">
                <VideoIcon className="h-16 w-16 text-white opacity-50" />
              </div>
            ) : (
              <div className="w-full py-12 flex items-center justify-center mb-4">
                <Phone className="h-16 w-16 text-serenity-600" />
              </div>
            )}
            <p className="text-center text-serenity-700 dark:text-serenity-300">
              Durée de la consultation: <span id="call-timer">{formatTime(callTimer)}</span>
            </p>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between">
            <Button
              type="button"
              variant="outline"
              className="mb-2 sm:mb-0"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleEndCall}
            >
              Terminer la consultation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TherapistDashboard;