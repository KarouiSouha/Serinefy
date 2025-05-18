// // import { useState, useEffect } from 'react';
// // import { appointmentService,therapistService } from '../components/Service/appointmentService';
// // import { format, parseISO } from 'date-fns';
// // import { fr } from 'date-fns/locale';
// // import { useToast } from './use-toast';
// // import { Therapist,Appointment, AppointmentData, AppointmentResponse } from '@/components/type';

// // interface FormattedAppointment {
// //   id: number;
// //   therapistId: number;
// //   date: string;
// //   time: string;
// //   type: string;
// //   status: string;
// // }
// // interface ServiceAppointmentData {
// //   therapist_id: number;
// //   appointment_date: string;
// //   type: string;
// //   status: string;
// //   notes?: string;
// //   duration: number; // Rendu obligatoire pour correspondre à l'attente du service
// //   id?: number;
// // }

// // // Déclaration du module mise à jour pour garantir la cohérence
// // declare module '@/components/Service/appointmentService' {
// //   export interface AppointmentService {
// //     createAppointment(data: ServiceAppointmentData): Promise<AppointmentResponse>;
// //     // Autres méthodes au besoin...
// //   }
// // }

// // // Fonction adaptée pour créer un objet ServiceAppointmentData à partir de AppointmentData
// // const adaptAppointmentData = (data: AppointmentData): ServiceAppointmentData => {
// //   return {
// //     therapist_id: data.therapistId,
// //     appointment_date: `${data.date} ${data.time}`,
// //     type: data.type,
// //     status: data.status,   // toujours défini
// //     notes: data.notes,
// //     duration: 60,
// //     id: data.id
// //   };
// // };

// // export const useAppointments = () => {
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [appointments, setAppointments] = useState<FormattedAppointment[]>([]);
// //   const [therapists, setTherapists] = useState<Therapist[]>([]);
// //   const [therapistStatus, setTherapistStatus] = useState<{[key: number]: string}>({});
// //   const { toast } = useToast();

// //   // Charger les rendez-vous et les thérapeutes au chargement du composant
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         setLoading(true);
        
// //         // Récupérer les rendez-vous
// //         const appointmentsData = await appointmentService.getAppointments();
        
// //         // Récupérer les thérapeutes
// //         const therapistsData = await therapistService.getTherapists();
        
// //         // Formater les données des rendez-vous
// //         const formattedAppointments = appointmentsData.map((appointment: AppointmentData) => {
// //           const appointmentDate = parseISO(appointment.date);
// //           return {
// //             id: appointment.id!,
// //             therapistId: appointment.therapistId,
// //             date: format(appointmentDate, 'PP', { locale: fr }),
// //             time: format(appointmentDate, 'HH:mm'),
// //             type: appointment.type === 'video' ? 'Vidéoconférence' : 
// //                  appointment.type === 'phone' ? 'Téléphone' : 
// //                  appointment.type === 'chat' ? 'Chat' : 'En personne',
// //             status: appointment.status === 'confirmed' ? 'Confirmé' : 
// //                    appointment.status === 'pending' ? 'En attente' : 
// //                    appointment.status === 'cancelled' ? 'Annulé' : 'Terminé'
// //           };
// //         });
        
// //         // Générer des statuts aléatoires pour les thérapeutes (pour démonstration)
// //         const statuses = therapistsData.reduce((acc: {[key: number]: string}, therapist: Therapist) => {
// //           acc[therapist.id] = Math.random() > 0.5 ? 'online' : 'offline';
// //           return acc;
// //         }, {});
        
// //         setAppointments(formattedAppointments);
// //         setTherapists(therapistsData);
// //         setTherapistStatus(statuses);
        
// //       } catch (err) {
// //         setError('Erreur lors du chargement des données');
// //         console.error('Error fetching data:', err);
// //         toast({
// //           title: 'Erreur',
// //           description: 'Impossible de charger vos rendez-vous',
// //           variant: 'destructive',
// //         });
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
    
// //     fetchData();
// //   }, []);

// //   // Ajouter un rendez-vous
// // //   const addAppointment = async (appointmentData: AppointmentData) => {
// // //     try {
// // //       const response = await appointmentService.createAppointment(appointmentData);
      
// // //       const appointmentDate = parseISO(response.appointment_date);
// // //       const newAppointment: FormattedAppointment = {
// // //         id: response.id,
// // //         therapistId: response.therapist_id,
// // //         date: format(appointmentDate, 'PP', { locale: fr }),
// // //         time: format(appointmentDate, 'HH:mm'),
// // //         type: response.type === 'video' ? 'Vidéoconférence' : 
// // //              response.type === 'phone' ? 'Téléphone' : 
// // //              response.type === 'chat' ? 'Chat' : 'En personne',
// // //         status: response.status === 'confirmed' ? 'Confirmé' : 'En attente'
// // //       };
      
// // //       setAppointments(prev => [...prev, newAppointment]);
      
// // //       toast({
// // //         title: 'Rendez-vous ajouté',
// // //         description: 'Votre rendez-vous a été planifié avec succès',
// // //       });
      
// // //       return newAppointment;
// // //     } catch (err) {
// // //       console.error('Error adding appointment:', err);
// // //       toast({
// // //         title: 'Erreur',
// // //         description: "Impossible d'ajouter ce rendez-vous",
// // //         variant: 'destructive',
// // //       });
// // //       throw err;
// // //     }
// // //   };
// // const addAppointment = async (appointmentData: AppointmentData) => {
// //   try {
// //     // Adapter les données pour le service
// //     const serviceData = adaptAppointmentData(appointmentData);
    
// //     // Appeler le service avec les données adaptées
// //     const response = await appointmentService.createAppointment(serviceData);
    
// //     const appointmentDate = parseISO(response.appointment_date);
// //     const newAppointment: FormattedAppointment = {
// //       id: response.id,
// //       therapistId: response.therapist_id,
// //       date: format(appointmentDate, 'PP', { locale: fr }),
// //       time: format(appointmentDate, 'HH:mm'),
// //       type: response.type === 'video' ? 'Vidéoconférence' : 
// //            response.type === 'phone' ? 'Téléphone' : 
// //            response.type === 'chat' ? 'Chat' : 'En personne',
// //       status: response.status === 'confirmed' ? 'Confirmé' : 'En attente'
// //     };
    
// //     setAppointments(prev => [...prev, newAppointment]);
    
// //     toast({
// //       title: 'Rendez-vous ajouté',
// //       description: 'Votre rendez-vous a été planifié avec succès',
// //     });
    
// //     return newAppointment;
// //   } catch (err) {
// //     console.error('Error adding appointment:', err);
// //     toast({
// //       title: 'Erreur',
// //       description: "Impossible d'ajouter ce rendez-vous",
// //       variant: 'destructive',
// //     });
// //     throw err;
// //   }
// // };
// // // const addAppointment = async (appointmentData: AppointmentData) => {
// // //     try {
// // //       // Passez l'objet appointmentData ici, pas le type AppointmentData
// // //       const response = await appointmentService.createAppointment(appointmentData);
      
// // //       const appointmentDate = parseISO(response.appointment_date);
// // //       const newAppointment: FormattedAppointment = {
// // //         id: response.id,
// // //         therapistId: response.therapist_id,
// // //         date: format(appointmentDate, 'PP', { locale: fr }),
// // //         time: format(appointmentDate, 'HH:mm'),
// // //         type: response.type === 'video' ? 'Vidéoconférence' : 
// // //              response.type === 'phone' ? 'Téléphone' : 
// // //              response.type === 'chat' ? 'Chat' : 'En personne',
// // //         status: response.status === 'confirmed' ? 'Confirmé' : 'En attente'
// // //       };
      
// // //       setAppointments(prev => [...prev, newAppointment]);
      
// // //       toast({
// // //         title: 'Rendez-vous ajouté',
// // //         description: 'Votre rendez-vous a été planifié avec succès',
// // //       });
      
// // //       return newAppointment;
// // //     } catch (err) {
// // //       console.error('Error adding appointment:', err);
// // //       toast({
// // //         title: 'Erreur',
// // //         description: "Impossible d'ajouter ce rendez-vous",
// // //         variant: 'destructive',
// // //       });
// // //       throw err;
// // //     }
// // //   };
// //   // Reprogrammer un rendez-vous
// //   const rescheduleAppointment = async (appointmentId: number, newDate: string) => {
// //     try {
// //       // Formatage de la date pour l'API
// //       const apiFormattedDate = `${format(parseISO(newDate), 'yyyy-MM-dd')} ${
// //         appointments.find(apt => apt.id === appointmentId)?.time || '00:00:00'
// //       }`;
      
// //       const response = await appointmentService.rescheduleAppointment(appointmentId, apiFormattedDate);
      
// //       // Mettre à jour l'état local
// //       setAppointments(prev => 
// //         prev.map(apt => 
// //           apt.id === appointmentId 
// //             ? {
// //                 ...apt,
// //                 date: format(parseISO(response.appointment_date), 'PP', { locale: fr }),
// //                 status: 'En attente'
// //               }
// //             : apt
// //         )
// //       );
      
// //       toast({
// //         title: 'Rendez-vous reprogrammé',
// //         description: 'La nouvelle date a été enregistrée',
// //       });
      
// //     } catch (err) {
// //       console.error('Error rescheduling appointment:', err);
// //       toast({
// //         title: 'Erreur',
// //         description: 'Impossible de reprogrammer ce rendez-vous',
// //         variant: 'destructive',
// //       });
// //       throw err;
// //     }
// //   };

// //   // Annuler un rendez-vous
// //   const cancelAppointment = async (appointmentId: number) => {
// //     try {
// //       await appointmentService.deleteAppointment(appointmentId);
      
// //       // Supprimer le rendez-vous de l'état local
// //       setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
      
// //       toast({
// //         title: 'Rendez-vous annulé',
// //         description: 'Le rendez-vous a été annulé avec succès',
// //       });
      
// //     } catch (err) {
// //       console.error('Error cancelling appointment:', err);
// //       toast({
// //         title: 'Erreur',
// //         description: 'Impossible d\'annuler ce rendez-vous',
// //         variant: 'destructive',
// //       });
// //       throw err;
// //     }
// //   };

// //   // Simuler un changement de statut du thérapeute (pour démonstration)
// //   const toggleTherapistStatus = (therapistId: number) => {
// //     setTherapistStatus(prev => ({
// //       ...prev,
// //       [therapistId]: prev[therapistId] === 'online' ? 'offline' : 'online'
// //     }));
// //   };
// import { useState, useEffect, useCallback } from 'react';
// import { toast } from 'sonner';
// import { 
//   getAppointments, 
//  getTherapists, 
//   createAppointment, 
//   rescheduleAppointment as rescheduleAppointmentApi, 
//   cancelAppointment,
//   updateTherapistStatus,
//   Appointment,
//   Therapist,
//   AppointmentData
// } from '../components/Service/appointmentService.ts'; // Adjust the import path as necessary
// import { useAuth } from '../context/AuthContext';

// interface AppointmentStatus {
//   [key: number]: string; // therapist ID -> status
// }

// export const useAppointments = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [therapists, setTherapists] = useState<Therapist[]>([]);
//   const [therapistStatus, setTherapistStatus] = useState<AppointmentStatus>({});
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);
//   const { isLoggedIn, currentUser } = useAuth();

//   // Function to fetch appointments and therapists
//   const fetchData = useCallback(async () => {
//     if (!isLoggedIn) {
//       console.log('User not logged in, skipping data fetch');
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);

//       // Fetch appointments
//       const appointmentsData = await getAppointments();
//       setAppointments(appointmentsData);

//       // Fetch therapists
//       const therapistsData = await getTherapists();
//       setTherapists(therapistsData);

//       // Initialize therapist status (mocked for now)
//             const statusMap: AppointmentStatus = {};
//       therapistsData.forEach(therapist => {
//         statusMap[therapist.id] = Math.random() > 0.5 ? 'online' : 'offline';
//       });
//       setTherapistStatus(statusMap);

//       setLoading(false);
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setError(err as Error);
//       setLoading(false);
//     }
//   }, [isLoggedIn]);

//   // Fetch data on mount and when user changes
//   useEffect(() => {
//     fetchData();
//   }, [fetchData, currentUser]);

//   // Function to add a new appointment
//   const addAppointment = async (appointmentData: AppointmentData) => {
//     try {
//       const response = await createAppointment(appointmentData);
      
//       if (response.success && response.appointment) {
//         setAppointments(prev => [...prev, response.appointment!]);
//         toast.success('Rendez-vous créé avec succès');
//         return response.appointment;
//       } else {
//         throw new Error(response.message || 'Failed to create appointment');
//       }
//     } catch (err) {
//       toast.error('Erreur lors de la création du rendez-vous');
//       throw err;
//     }
//   };

//   // Function to reschedule an appointment
//   const rescheduleAppointment = async (appointmentId: number, newDate: string) => {
//     try {
//       const response = await rescheduleAppointmentApi(appointmentId, newDate);
      
//       if (response.success && response.appointment) {
//         setAppointments(prev => 
//           prev.map(apt => apt.id === appointmentId ? response.appointment! : apt)
//         );
//         toast.success('Rendez-vous reprogrammé avec succès');
//         return response.appointment;
//       } else {
//         throw new Error(response.message || 'Failed to reschedule appointment');
//       }
//     } catch (err) {
//       toast.error('Erreur lors de la reprogrammation du rendez-vous');
//       throw err;
//     }
//   };

//   // Function to cancel an appointment
// const cancelAppointment = async (appointmentId: number) => {
//   try {
//     const response = await cancelAppointment(appointmentId);
    
//     if (response) {
//       setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
//       toast.success('Rendez-vous annulé avec succès');
//       return true;
//     } else {
//       throw new Error('Failed to cancel appointment');
//     }
//   } catch (err) {
//     toast.error('Erreur lors de l\'annulation du rendez-vous');
//     throw err;
//   }
// };


//   // Function to toggle therapist online status
//   const toggleTherapistStatus = async (therapistId: number) => {
//     try {
//       const newStatus = therapistStatus[therapistId] === 'online' ? 'offline' : 'online';
      
//       // In a real app, this would call the API
//       await updateTherapistStatus(newStatus === 'online');
      
//       setTherapistStatus(prev => ({
//         ...prev,
//         [therapistId]: newStatus
//       }));
      
//       return true;
//     } catch (err) {
//       toast.error('Erreur lors de la mise à jour du statut');
//       throw err;
//     }
//   };

//   return {
//     loading,
//     error,
//     appointments,
//     therapists,
//     therapistStatus,
//     addAppointment,
//     rescheduleAppointment,
//     cancelAppointment,
    
//     toggleTherapistStatus
//   };
// };
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { 
  getAppointments, 
  getTherapists, 
  createAppointment, 
  rescheduleAppointment as rescheduleAppointmentApi, 
  cancelAppointment as cancelAppointmentApi,
  updateTherapistStatus,
  Appointment,
  Therapist,
  AppointmentData
} from '../components/Service/appointmentService.ts'; // Adjust the import path as necessary
import { useAuth } from '../context/AuthContext';

interface AppointmentStatus {
  [key: number]: string; // therapist ID -> status ('online' | 'offline')
}

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [therapistStatus, setTherapistStatus] = useState<AppointmentStatus>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { isLoggedIn, currentUser } = useAuth();

  // Function to fetch appointments and therapists
  const fetchData = useCallback(async () => {
    if (!isLoggedIn) {
      console.log('User not logged in, skipping data fetch');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch appointments
      const appointmentsData = await getAppointments();
      setAppointments(appointmentsData);

      // Fetch therapists
      const therapistsData = await getTherapists();
      setTherapists(therapistsData);

      // Initialize therapist status (mocked for now)
      const statusMap: AppointmentStatus = {};
      therapistsData.forEach(therapist => {
        statusMap[therapist.id] = Math.random() > 0.5 ? 'online' : 'offline';
      });
      setTherapistStatus(statusMap);

      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err as Error);
      setLoading(false);
    }
  }, [isLoggedIn]);

  // Fetch data on mount and when user changes
  useEffect(() => {
    fetchData();
  }, [fetchData, currentUser]);

  // Function to add a new appointment
//   const addAppointment = async (appointmentData: AppointmentData) => {
//     try {
//       const response = await createAppointment(appointmentData);
      
//       if (response.success && response.appointment) {
//         setAppointments(prev => [...prev, response.appointment!]);
//         toast.success('Rendez-vous créé avec succès');
//         return response.appointment;
//       } else {
//         throw new Error(response.message || 'Failed to create appointment');
//       }
//     } catch (err) {
//       console.error('Error in appointment creation:', err);
//       toast.error('Erreur lors de la création du rendez-vous');
//       throw err;
//     }
//   };
/*const addAppointment = async (appointmentData: AppointmentData) => {
    try {
      // IMPORTANT: Remove test error throwing
      // The line below seems to be intentionally throwing an error for testing
      // throw new Error("Test OK");
      
      const response = await createAppointment(appointmentData);
      
      if (response && response.success && response.appointment) {
        setAppointments(prev => [...prev, response.appointment!]);
        toast.success('Rendez-vous créé avec succès');
        return response.appointment;
      } else {
        throw new Error(response?.message || 'Failed to create appointment');
      }
    } catch (err) {
      // Handle API errors properly
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('Error in appointment creation:', err);
      
      // Don't rethrow the error if it's the test error
      if (errorMessage === 'Test OK') {
        console.warn('Test error caught - this seems to be an intentional test');
        
        // Mock success for testing purposes if needed
        const mockAppointment = {
          id: Date.now(),
          therapist_id: appointmentData.therapist_id,
          patient_id: 1, // Assuming current user is patient 1
          date: appointmentData.date,
          time: appointmentData.time,
          status: 'confirmed',
          type: appointmentData.type,
          notes: appointmentData.notes
        };
        
        setAppointments(prev => [...prev, mockAppointment as Appointment]);
        toast.success('Rendez-vous créé avec succès (mode test)');
        return mockAppointment;
      }
      
      toast.error(`Erreur lors de la création du rendez-vous: ${errorMessage}`);
      throw err;
    }
  };*/
 const addAppointment = async (appointmentData: AppointmentData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await createAppointment(appointmentData);
      
      if (response && response.success && response.appointment) {
        setAppointments(prev => [...prev, response.appointment]);
        toast.success('Rendez-vous créé avec succès');
        return response.appointment;
      } else {
        throw new Error(response?.message || 'Échec lors de la création du rendez-vous');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur inconnue est survenue';
      console.error('Erreur lors de la création du rendez-vous:', err);
      toast.error(`Erreur: ${errorMessage}`);
      setError(new Error(errorMessage));
      throw err;
    } finally {
      setLoading(false);
    }
  };
  // Function to reschedule an appointment
  // Function to reschedule an appointment
const rescheduleAppointment = async (appointmentId: number, newDate: string, newTime?: string) => {
  try {
    const response = await rescheduleAppointmentApi(appointmentId, newDate, newTime);
    
    if (response.success && response.appointment) {
      setAppointments(prev => 
        prev.map(apt => apt.id === appointmentId ? response.appointment! : apt)
      );
      toast.success('Rendez-vous reprogrammé avec succès');
      return response.appointment;
    } else {
      throw new Error(response.message || 'Failed to reschedule appointment');
    }
  } catch (err) {
    console.error('Error in appointment rescheduling:', err);
    toast.error('Erreur lors de la reprogrammation du rendez-vous');
    throw err;
  }
};
  // const rescheduleAppointment = async (appointmentId: number, newDate: string) => {
  //   try {
  //     const response = await rescheduleAppointmentApi(appointmentId, newDate);
      
  //     if (response.success && response.appointment) {
  //       setAppointments(prev => 
  //         prev.map(apt => apt.id === appointmentId ? response.appointment! : apt)
  //       );
  //       toast.success('Rendez-vous reprogrammé avec succès');
  //       return response.appointment;
  //     } else {
  //       throw new Error(response.message || 'Failed to reschedule appointment');
  //     }
  //   } catch (err) {
  //     console.error('Error in appointment rescheduling:', err);
  //     toast.error('Erreur lors de la reprogrammation du rendez-vous');
  //     throw err;
  //   }
  // };

  // Function to cancel an appointment - FIXED: renamed to cancelAppointmentHandler to avoid recursion
  const cancelAppointmentHandler = async (appointmentId: number) => {
    try {
      // Call the API function, not this function itself (avoiding recursion)
      await cancelAppointmentApi(appointmentId);
      
      // Update local state
      setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
      toast.success('Rendez-vous annulé avec succès');
      return true;
    } catch (err) {
      console.error('Error in appointment cancellation:', err);
      toast.error('Erreur lors de l\'annulation du rendez-vous');
      throw err;
    }
  };

  // Function to toggle therapist online status
  const toggleTherapistStatus = async (therapistId: number) => {
    try {
      const newStatus = therapistStatus[therapistId] === 'online' ? 'offline' : 'online';
      
      // In a real app, this would call the API
      await updateTherapistStatus(newStatus === 'online');
      
      setTherapistStatus(prev => ({
        ...prev,
        [therapistId]: newStatus
      }));
      
      return true;
    } catch (err) {
      console.error('Error updating therapist status:', err);
      toast.error('Erreur lors de la mise à jour du statut');
      throw err;
    }
  };

  return {
    loading,
    error,
    appointments,
    therapists,
    therapistStatus,
     
    addAppointment,
    rescheduleAppointment,
    cancelAppointment: cancelAppointmentHandler, // Expose with the expected name
    toggleTherapistStatus,
    fetchData // Expose for manual refresh
  };
};