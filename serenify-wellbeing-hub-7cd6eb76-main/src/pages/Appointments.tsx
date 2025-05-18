import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TherapistList from '@/components/appointments/TherapistList';
import AppointmentList from '@/components/appointments/AppointmentList';
//import { Therapist,Appointment, AppointmentData, AppointmentResponse } from '@/components/type';
//import { Therapist, Appointment } from '@/components/type';
// import { AppointmentData } from '@/components/type';
import { AppointmentData } from '@/components/Service/appointmentService';
import { Therapist } from '@/components/Service/appointmentService'; // Ensure consistent Therapist type
//import { Therapist } from '@/components/type'; 

import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { VideoIcon, Phone } from 'lucide-react';
import { useAppointments } from '@/hooks/useAppointments';
//import { AppointmentData, Therapist } from '@/components/Service/appointmentService';
import { Video, Mic, PhoneOff, Volume2 } from 'lucide-react';
const Appointments: React.FC = () => {
   
  const { 
    loading, 
    appointments, 
    therapists, 
    therapistStatus, 
    addAppointment, 
    rescheduleAppointment, 
    cancelAppointment,
    toggleTherapistStatus
  } = useAppointments();

  // États pour la gestion des appels
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [callType, setCallType] = useState<'video' | 'phone' | null>(null);
//  const [callTherapist, setCallTherapist] = useState<any>(null);
  const [inWaitingRoom, setInWaitingRoom] = useState(false);
  //const [user, setUser] = useState<any>(null);
  const [callTherapist, setCallTherapist] = useState<Therapist | null>(null); // Ensure Therapist type matches the import
const [user, setUser] = useState<{ role: string } | null>(null);
  const [callTime, setCallTime] = useState(0);

  const { toast } = useToast();

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const currentUser = localStorage.getItem('user');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      setUser(userData);
      
      // Rediriger les thérapeutes vers leur tableau de bord
      if (userData.email === 'therapist') {
        window.location.href = '/therapist-dashboard';
      }
    }
  }, []);

  // Timer pour les appels
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    if (showCallDialog && !inWaitingRoom && callTherapist) {
      timer = setInterval(() => {
        setCallTime(prev => prev + 1);
      }, 1000);
    } else {
      setCallTime(0);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [showCallDialog, inWaitingRoom, callTherapist]);

  const handleAppointmentAdded = async (appointmentData: AppointmentData) => {
    try {
      await addAppointment(appointmentData);
    } catch (err) {
      console.error('Error in appointment creation:', err);
    }
  };

  const handleAppointmentReschedule = async (appointmentId: number, newDate: string, newTime?: string) => {
    try {
      await rescheduleAppointment(appointmentId, newDate);
    } catch (err) {
      console.error('Error in appointment rescheduling:', err);
    }
  };

  const handleAppointmentCancel = async (appointmentId: number) => {
    try {
      await cancelAppointment(appointmentId);
    } catch (err) {
      console.error('Error in appointment cancellation:', err);
    }
  };

  // Fonction pour initier un appel avec un thérapeute
  const handleInitiateCall = (therapistId: number, type: 'video' | 'phone') => {
    const therapist = therapists.find(t => t.id === therapistId);
    
    if (!therapist) {
      toast({
        title: "Erreur",
        description: "Thérapeute non trouvé",
        variant: "destructive",
      });
      return;
    }
    
    setCallTherapist(therapist);
    setCallType(type);
    
    if (therapistStatus[therapistId] === "online") {
      // Thérapeute disponible, initier l'appel
      setShowCallDialog(true);
      setInWaitingRoom(false);
      
      toast({
        title: "Connexion en cours",
        description: `Connexion avec ${therapist.name} en cours...`,
      });
    } else {
      // Thérapeute non disponible, patienter en salle d'attente
      setShowCallDialog(true);
      setInWaitingRoom(true);
      
      toast({
        title: "En attente",
        description: `Le thérapeute ${therapist.name} n'est pas en ligne. Vous êtes placé en salle d'attente virtuelle.`,
      });
      
      // Simuler que le thérapeute se connecte après un délai
      setTimeout(() => {
        if (callTherapist && callTherapist.id === therapistId) {
          toggleTherapistStatus(therapistId);
          setInWaitingRoom(false);
          
          toast({
            title: "Thérapeute connecté",
            description: `${therapist.name} vient de rejoindre la consultation.`,
          });
        }
      }, 8000);
    }
  };

  const handleEndCall = () => {
    setShowCallDialog(false);
    setCallTherapist(null);
    setCallType(null);
    setInWaitingRoom(false);
    
    toast({
      title: "Appel terminé",
      description: "Votre consultation est terminée",
    });
  };

  // Formater le temps d'appel
  const formatCallTime = () => {
    const minutes = Math.floor(callTime / 60);
    const seconds = callTime % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="bg-serenity-50 dark:bg-serenity-900 py-12">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-serenity-900 dark:text-white mb-6">
                Rendez-vous
              </h1>
              <p className="text-lg text-serenity-700 dark:text-serenity-200 mb-8">
                Consultez nos psychologues certifiés en ligne et recevez le soutien dont vous avez besoin, quand vous en avez besoin.
              </p>
              {!user && (
                <div className="mt-4 bg-serenity-100 dark:bg-serenity-800 p-4 rounded-lg">
                  <p className="text-serenity-700 dark:text-serenity-300">
                    Pour prendre rendez-vous ou accéder à vos consultations, veuillez vous connecter.
                  </p>
                  <Button 
                    className="mt-2"
                    onClick={() => {
                      const headerAuthButton = document.querySelector('button.rounded-full.hidden.md\\:flex');
                      if (headerAuthButton) {
                        (headerAuthButton as HTMLButtonElement).click();
                      }
                    }}
                  >
                    Se connecter
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-white dark:bg-serenity-900">
          <div className="container mx-auto px-6">
            <Tabs defaultValue="my-appointments" className="w-full">
              <TabsList className="grid grid-cols-2 mb-8">
                <TabsTrigger value="therapists">Psychologues</TabsTrigger>
                <TabsTrigger value="my-appointments">Mes rendez-vous</TabsTrigger>
              </TabsList>
              
              <TabsContent value="therapists" className="space-y-8">
                  {/* <TherapistList 
      therapists={therapists as Therapist[]}
      onAppointmentAdded={handleAppointmentAdded}
      loading={loading}
    /> */}
{/* <TherapistList 
  therapists={therapists}
  onAppointmentAdded={handleAppointmentAdded}
  loading={loading}
/> */}
  <TherapistList 
    therapists={therapists}
    onAppointmentAdded={handleAppointmentAdded}
    loading={loading}
  />

                {/* <TherapistList 
                  therapists={therapists}
                  onAppointmentAdded={handleAppointmentAdded}
                  loading={loading}
                /> */}
              </TabsContent>
              
              <TabsContent value="my-appointments" className="space-y-6">
                <AppointmentList 
                  appointments={appointments.map(appointment => ({
                    ...appointment,
                    therapistId: appointment.therapistId ?? 0, // Ensure therapistId is always defined
                    appointment_date: appointment.date, // Map date to appointment_date
                    duration: 60, // Provide a default duration (e.g., 60 minutes)
                  }))}
                  therapists={therapists}
                  onReschedule={handleAppointmentReschedule}
                  onCancel={handleAppointmentCancel}
                  therapistStatus={therapistStatus}
                  loading={loading}
                />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Dialog pour l'appel vidéo/téléphone */}
      <Dialog open={showCallDialog} onOpenChange={setShowCallDialog}>
        <DialogContent className={callType === 'video' ? "sm:max-w-3xl h-[80vh]" : "sm:max-w-md"}>
          <DialogHeader>
            <DialogTitle>
              {inWaitingRoom 
                ? "Salle d'attente"
                : `${callType === 'video' ? 'Consultation vidéo' : 'Consultation téléphonique'} avec ${callTherapist?.name}`
              }
            </DialogTitle>
            <DialogDescription>
              {inWaitingRoom 
                ? `En attente de la connexion du thérapeute...`
                : `Consultation en cours...`
              }
            </DialogDescription>
          </DialogHeader>
          
          {inWaitingRoom ? (
            <div className="py-8 flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-serenity-100 flex items-center justify-center mb-4 animate-pulse">
                {callType === 'video' ? (
                  <VideoIcon className="h-10 w-10 text-serenity-600" />
                ) : (
                  <Phone className="h-10 w-10 text-serenity-600" />
                )}
              </div>
              <h3 className="text-xl font-medium mb-1">{callTherapist?.name}</h3>
              <p className="text-serenity-600 mb-2">En attente...</p>
              <p className="text-sm text-serenity-500 text-center max-w-xs mb-6">
                Votre thérapeute sera bientôt disponible. Vous serez automatiquement connecté dès qu'il rejoindra l'appel.
              </p>
              <Button variant="outline" onClick={() => setShowCallDialog(false)}>
                Quitter la salle d'attente
              </Button>
            </div>
          ) : callType === 'video' ? (
            <div className="flex flex-col items-center justify-center h-full bg-black rounded-md">
              <div className="relative w-full h-full">
                <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-serenity-700 text-serenity-200 text-4xl flex items-center justify-center">
                        {callTherapist?.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <p className="text-white text-xl">{callTherapist?.name}</p>
                      <p className="text-gray-400">{callTherapist?.specialty}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 rounded border border-gray-700 flex items-center justify-center">
                  <p className="text-white text-xs">Vous</p>
                </div>
                          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                  <Button variant="outline" className="rounded-full p-3 bg-serenity-700 text-white hover:bg-serenity-600">
                    <Mic className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" className="rounded-full p-3 bg-serenity-700 text-white hover:bg-serenity-600">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="rounded-full p-3"
                    onClick={handleEndCall}
                  >
                    <PhoneOff className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-24 h-24 rounded-full bg-serenity-100 flex items-center justify-center mb-6">
                <Phone className="h-12 w-12 text-serenity-600" />
              </div>
              <h3 className="text-xl font-medium mb-1">{callTherapist?.name}</h3>
              <p className="text-serenity-600 mb-2">{callTherapist?.specialty}</p>
              <p className="text-lg font-medium mb-6">{formatCallTime()}</p>
              <div className="flex space-x-4">
                <Button variant="outline" className="rounded-full p-3">
                  <Volume2 className="h-5 w-5" />
                </Button>
                <Button 
                  variant="destructive" 
                  className="rounded-full p-3"
                  onClick={handleEndCall}
                >
                  <PhoneOff className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
          
          <DialogFooter>
            {inWaitingRoom && (
              <Button variant="outline" onClick={() => setShowCallDialog(false)}>
                Quitter
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Appointments;
// import React, { useState, useEffect } from 'react';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import TherapistList from '@/components/appointments/TherapistList';
// import AppointmentList from '@/components/appointments/AppointmentList';
// import { useToast } from "@/hooks/use-toast";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { VideoIcon, Phone } from 'lucide-react';
// import { currentUser } from '@/components/auth/AuthDialog';

// const Appointments: React.FC = () => {
//   const therapists = [
//     {
//       id: 1,
//       name: "Dr. Marie Bernard",
//       specialty: "Thérapie Cognitive Comportementale",
//       experience: "15 ans d'expérience",
//       availability: ["Lundi", "Mercredi", "Vendredi"],
//       avatarUrl: "",
//       bio: "Spécialiste en thérapie cognitive comportementale avec une approche centrée sur les solutions.",
//       phone: "+33 1 23 45 67 89"
//     },
//     {
//       id: 2,
//       name: "Dr. Thomas Dubois",
//       specialty: "Psychothérapie",
//       experience: "10 ans d'expérience",
//       availability: ["Mardi", "Jeudi", "Samedi"],
//       avatarUrl: "",
//       bio: "Psychothérapeute expérimenté spécialisé dans l'anxiété et la dépression.",
//       phone: "+33 1 45 67 89 01"
//     },
//     {
//       id: 3,
//       name: "Dr. Sophie Martin",
//       specialty: "Thérapie familiale",
//       experience: "12 ans d'expérience",
//       availability: ["Lundi", "Mardi", "Jeudi"],
//       avatarUrl: "",
//       bio: "Spécialiste en thérapie familiale et relationnelle, avec une approche holistique du bien-être.",
//       phone: "+33 1 78 90 12 34"
//     }
//   ];

//   const [appointments, setAppointments] = useState([
//     {
//       id: 101,
//       therapistId: 1,
//       date: "12 Mai 2023",
//       time: "14:00",
//       type: "Vidéoconférence",
//       status: "Confirmé"
//     },
//     {
//       id: 102,
//       therapistId: 3,
//       date: "18 Mai 2023",
//       time: "10:30",
//       type: "Chat",
//       status: "En attente"
//     }
//   ]);

//   // Add therapist status tracking - simulate some therapists being online
//   const [therapistStatus, setTherapistStatus] = useState<{[key: number]: string}>({
//     1: "online",  // Set one therapist as online by default for testing
//     2: "offline",
//     3: "offline"
//   });

//   // Add call state
//   const [showCallDialog, setShowCallDialog] = useState(false);
//   const [callType, setCallType] = useState<'video' | 'phone' | null>(null);
//   const [callTherapist, setCallTherapist] = useState<any>(null);
//   const [inWaitingRoom, setInWaitingRoom] = useState(false);
//   const [user, setUser] = useState<any>(null);

//   const { toast } = useToast();

//   useEffect(() => {
//     // Check if user is logged in
//     if (currentUser) {
//       setUser(currentUser);
      
//       // Redirect therapists to their dashboard
//       if (currentUser.isTherapist) {
//         window.location.href = '/therapist-dashboard';
//       }
//     }
//   }, []);

//   const handleAppointmentAdded = (appointment: {
//     // id: number;
//     therapistId: number;
//     date: string;
//     time: string;
//     type: string;
//     status: string;
//   }) => {
//     setAppointments(prev => [...prev, appointment]);
//     toast({
//       title: "Rendez-vous ajouté",
//       description: `Un nouveau rendez-vous a été ajouté à votre agenda.`,
//     });
//   };

//   const handleAppointmentReschedule = (oldAppointment: {
//     id: number;
//     therapistId: number;
//     date: string;
//     time: string;
//     type: string;
//     status: string;
//   }, newDate: string) => {
//     setAppointments(prev => prev.map(appointment => 
//       appointment.id === oldAppointment.id 
//         ? { ...appointment, date: newDate, status: "En attente" } 
//         : appointment
//     ));
//   };

//   const handleAppointmentCancel = (appointmentId: number) => {
//     setAppointments(prev => prev.filter(appointment => appointment.id !== appointmentId));
//   };

//   // Function for initiating call with therapist
//   const handleInitiateCall = (therapistId: number, type: 'video' | 'phone') => {
//     const therapist = therapists.find(t => t.id === therapistId);
    
//     if (!therapist) {
//       toast({
//         title: "Erreur",
//         description: "Thérapeute non trouvé",
//         variant: "destructive",
//       });
//       return;
//     }
    
//     setCallTherapist(therapist);
//     setCallType(type);
    
//     if (therapistStatus[therapistId] === "online") {
//       // Thérapeute disponible, initier l'appel
//       setShowCallDialog(true);
//       setInWaitingRoom(false);
      
//       toast({
//         title: "Connexion en cours",
//         description: `Connexion avec ${therapist.name} en cours...`,
//       });
//     } else {
//       // Thérapeute non disponible, patienter en salle d'attente
//       setShowCallDialog(true);
//       setInWaitingRoom(true);
      
//       toast({
//         title: "En attente",
//         description: `Le thérapeute ${therapist.name} n'est pas en ligne. Vous êtes placé en salle d'attente virtuelle.`,
//       });
//     }
//   };

//   const handleEndCall = () => {
//     setShowCallDialog(false);
//     setCallTherapist(null);
//     setCallType(null);
//     setInWaitingRoom(false);
    
//     toast({
//       title: "Appel terminé",
//       description: "Votre consultation est terminée",
//     });
//   };

//   // Simulated therapist coming online
//   const simulateTherapistJoining = () => {
//     if (callTherapist && inWaitingRoom) {
//       setTimeout(() => {
//         toast({
//           title: "Thérapeute connecté",
//           description: `${callTherapist.name} vient de se connecter et rejoint la consultation.`,
//         });
        
//         setInWaitingRoom(false);
//         // Update therapist status
//         setTherapistStatus(prev => ({
//           ...prev,
//           [callTherapist.id]: "online"
//         }));
//       }, 5000);
//     }
//   };

//   // Call this when waiting room is displayed
//   useEffect(() => {
//     if (inWaitingRoom && callTherapist) {
//       simulateTherapistJoining();
//     }
//   }, [inWaitingRoom, callTherapist]);

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
//       <main className="flex-grow">
//         <section className="bg-serenity-50 dark:bg-serenity-900 py-12">
//           <div className="container mx-auto px-6">
//             <div className="max-w-3xl mx-auto text-center">
//               <h1 className="text-4xl md:text-5xl font-bold text-serenity-900 dark:text-white mb-6">
//                 Rendez-vous
//               </h1>
//               <p className="text-lg text-serenity-700 dark:text-serenity-200 mb-8">
//                 Consultez nos psychologues certifiés en ligne et recevez le soutien dont vous avez besoin, quand vous en avez besoin.
//               </p>
//               {!user && (
//                 <div className="mt-4 bg-serenity-100 dark:bg-serenity-800 p-4 rounded-lg">
//                   <p className="text-serenity-700 dark:text-serenity-300">
//                     Pour prendre rendez-vous ou accéder à vos consultations, veuillez vous connecter.
//                   </p>
//                   <Button 
//                     className="mt-2"
//                     onClick={() => {
//                       const headerAuthButton = document.querySelector('button.rounded-full.hidden.md\\:flex');
//                       if (headerAuthButton) {
//                         (headerAuthButton as HTMLButtonElement).click();
//                       }
//                     }}
//                   >
//                     Se connecter
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>
        
//         <section className="py-12 bg-white dark:bg-serenity-900">
//           <div className="container mx-auto px-6">
//             <Tabs defaultValue="my-appointments" className="w-full">
//               <TabsList className="grid grid-cols-2 mb-8">
//                 <TabsTrigger value="therapists">Psychologues</TabsTrigger>
//                 <TabsTrigger value="my-appointments">Mes rendez-vous</TabsTrigger>
//               </TabsList>
              
//               <TabsContent value="therapists" className="space-y-8">
//                 <TherapistList 
//                   therapists={therapists}
//                   onAppointmentAdded={handleAppointmentAdded}
//                 />
//               </TabsContent>
              
//               <TabsContent value="my-appointments" className="space-y-6">
//                 <AppointmentList 
//                   appointments={appointments}
//                   therapists={therapists}
//                   onReschedule={handleAppointmentReschedule}
//                   onCancel={handleAppointmentCancel}
//                   therapistStatus={therapistStatus}
//                 />
//               </TabsContent>
//             </Tabs>
//           </div>
//         </section>
//       </main>
//       <Footer />
      
//       {/* Dialog pour l'appel vidéo/téléphone */}
//       <Dialog open={showCallDialog} onOpenChange={setShowCallDialog}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle>
//               {inWaitingRoom 
//                 ? "Salle d'attente"
//                 : `${callType === 'video' ? 'Consultation vidéo' : 'Consultation téléphonique'} avec ${callTherapist?.name}`
//               }
//             </DialogTitle>
//             <DialogDescription>
//               {inWaitingRoom 
//                 ? `En attente de la connexion du thérapeute...`
//                 : `Consultation en cours...`
//               }
//             </DialogDescription>
//           </DialogHeader>
//           <div className="flex flex-col items-center justify-center p-6">
//             {inWaitingRoom ? (
//               <div className="w-full py-12 flex flex-col items-center justify-center mb-4">
//                 <div className="w-16 h-16 border-4 border-serenity-600 border-t-transparent rounded-full animate-spin mb-4"></div>
//                 <p className="text-center text-serenity-700 dark:text-serenity-300">
//                   Le thérapeute sera bientôt disponible...
//                 </p>
//               </div>
//             ) : callType === 'video' ? (
//               <div className="w-full aspect-video bg-slate-800 rounded-lg flex items-center justify-center mb-4">
//                 <VideoIcon className="h-16 w-16 text-white opacity-50" />
//               </div>
//             ) : (
//               <div className="w-full py-12 flex items-center justify-center mb-4">
//                 <Phone className="h-16 w-16 text-serenity-600" />
//               </div>
//             )}
//             {!inWaitingRoom && (
//               <p className="text-center text-serenity-700 dark:text-serenity-300">
//                 Durée de la consultation: <span id="call-timer">00:00</span>
//               </p>
//             )}
//           </div>
//           <DialogFooter>
//             <Button
//               type="button"
//               variant="destructive"
//               onClick={handleEndCall}
//             >
//               {inWaitingRoom ? "Annuler" : "Terminer la consultation"}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Appointments;
