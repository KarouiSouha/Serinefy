// import axios from 'axios';
// import { AppointmentStatus } from '@/components/type';

// // Définir l'URL de base de l'API
// // Remplacer REACT_APP_API_URL par VITE_API_URL
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// // Ajouter le token d'authentification à toutes les requêtes
// axios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('auth_token');
//     console.log('Token:', token);
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Définir les types
// export interface AppointmentData {
//   id?: number;
//   patient_id?: number;
//   therapist_id: number;
//   appointment_date: string;
//   duration: number;
//   type: string;
//   status: string;
//   notes?: string;
//   video_call_link?: string;
// }

// export interface Therapist {
//   id: number;
//   name: string;
//   specialty: string;
//   avatarUrl: string;
//   experience?: string;
//   availability?: string[];
//   bio?: string;
//   phone?: string;
// }
// export type OnAppointmentAdded = (appointment: Omit<AppointmentData, 'status'> & { status?: AppointmentStatus }) => void;

// // Service pour les rendez-vous
// export const appointmentService = {
//   // Récupérer tous les rendez-vous de l'utilisateur
//   getAppointments: async () => {
//     try {
//       const response = await axios.get(`${API_URL}/appointments`);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching appointments:', error);
//       throw error;
//     }
//   },

//   // Récupérer un rendez-vous spécifique
//   getAppointment: async (id: number) => {
//     try {
//       const response = await axios.get(`${API_URL}/appointments/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching appointment ${id}:`, error);
//       throw error;
//     }
//   },

//   // Créer un nouveau rendez-vous
//   createAppointment: async (appointmentData: AppointmentData) => {
//     try {
//       const response = await axios.post(`${API_URL}/appointments`, appointmentData);
//       return response.data;
//     } catch (error) {
//       console.error('Error creating appointment:', error);
//       throw error;
//     }
//   },

//   // Mettre à jour un rendez-vous
//   updateAppointment: async (id: number, appointmentData: Partial<AppointmentData>) => {
//     try {
//       const response = await axios.put(`${API_URL}/appointments/${id}`, appointmentData);
//       return response.data;
//     } catch (error) {
//       console.error(`Error updating appointment ${id}:`, error);
//       throw error;
//     }
//   },

//   // Supprimer un rendez-vous
//   deleteAppointment: async (id: number) => {
//     try {
//       const response = await axios.delete(`${API_URL}/appointments/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error deleting appointment ${id}:`, error);
//       throw error;
//     }
//   },

//   // Reprogrammer un rendez-vous
//   rescheduleAppointment: async (id: number, newDate: string) => {
//     try {
//       const response = await axios.put(`${API_URL}/appointments/${id}`, {
//         appointment_date: newDate,
//         status: 'pending'
//       });
//       return response.data;
//     } catch (error) {
//       console.error(`Error rescheduling appointment ${id}:`, error);
//       throw error;
//     }
//   }
// };

// // Service pour les thérapeutes
// export const therapistService = {
//   // Récupérer tous les thérapeutes
//   getTherapists: async () => {
//     try {
//       const response = await axios.get(`${API_URL}/therapists`);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching therapists:', error);
//       throw error;
//     }
//   },

//   // Récupérer un thérapeute spécifique
//   getTherapist: async (id: number) => {
//     try {
//       const response = await axios.get(`${API_URL}/therapists/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching therapist ${id}:`, error);
//       throw error;
//     }
//   },

//   // Récupérer les disponibilités d'un thérapeute
//   getTherapistAvailability: async (id: number, date: string) => {
//     try {
//       const response = await axios.get(`${API_URL}/therapists/${id}/availability?date=${date}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching availability for therapist ${id}:`, error);
//       throw error;
//     }
//   }

// };



// src/services/appointmentService.ts
import api from './apiService';

export interface Therapist {
  id: number;
  name: string;
  specialty: string;
experience: string; 
  avatarUrl: string;  // Rendre optionnel si pas toujours présent
  availability?: string[];  // Rendre optionnel
  bio: string;
  phone?: string;
}

export interface Appointment {
  id: number;
  therapist_id: number;
    therapistId?: number; // For component compatibility
  patient_id: number;
  date: string;
  time: string;
  status: string;
  type: string;
  notes?: string;
  therapist?: Therapist;
}


export interface AppointmentData {
  therapist_id: number;
  date: string;
  time: string;
  type: string;
  duration?: number; // Added duration property
  notes?: string;
}

export interface AppointmentResponse {
  success: boolean;
  appointment?: Appointment;
  message?: string;
}

// Get all appointments for the current user
export const getAppointments = async (): Promise<Appointment[]> => {
  try {
    // Log the token to verify it's being included
    console.log('Token:', localStorage.getItem('token'));
    
    const response = await api.get('/appointments');
    console.log('Appointments response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

// Get all therapists
export const getTherapists = async (): Promise<Therapist[]> => {
  try {
    const response = await api.get('/getTherapists');
    return response.data;
  } catch (error) {
    console.error('Error fetching therapists:', error);
    throw error;
  }
};

// Create a new appointment
/*export const createAppointment = async (appointmentData: AppointmentData): Promise<AppointmentResponse> => {
  try {
    const response = await api.post('/appointments', appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};*/
// Create a new appointment
export const createAppointment = async (appointmentData: AppointmentData): Promise<AppointmentResponse> => {
  try {
    // Adapter le format des données si nécessaire pour correspondre à l'API backend
    const formattedData = {
      therapist_id: appointmentData.therapist_id,
      appointment_date: formatDateTime(appointmentData.date, appointmentData.time),
      type: appointmentData.type,
      duration: appointmentData.duration || 60, // Par défaut 60 minutes si non spécifié
      notes: appointmentData.notes || ''
    };
    
    const response = await api.post('/appointments', formattedData);
    return response.data;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

// Helper function to format date and time into the format expected by the backend
function formatDateTime(date: string, time: string): string {
  // Convertit date (YYYY-MM-DD) et time (HH:MM) en format YYYY-MM-DD HH:MM:SS
  return `${date} ${time}:00`;
}

// Autres fonctions pour gérer les rendez-vous
// Removed duplicate getAppointments function to avoid redeclaration error
interface RescheduleAppointmentData {
  date?: string; // Made optional to avoid errors
  time?: string;
  appointment_date?: string; // Added to match the expected property
}
// export const rescheduleAppointment = async (
//   id: number,
//   date: string,
//   time?: string
// ): Promise<AppointmentResponse> => {
//   try {
//     const data: RescheduleAppointmentData = { date };
//     if (time) data.time = time;
    
//     const response = await api.put(`/appointments/${id}/reschedule`, data);
//     return response.data;
//   } catch (error) {
//     console.error('Error rescheduling appointment:', error);
//     throw error;
//   }
// };

// API function
// export const rescheduleAppointment = async (
//   id: number,
//   date: string,
//   time?: string
// ): Promise<AppointmentResponse> => {
//   try {
//     // Format the appointment_date to match backend expectations (YYYY-MM-DD HH:MM:SS)
//     const formattedDate = time 
//       ? `${date} ${time}`
//       : `${date} 00:00:00`;
    
//     const data: RescheduleAppointmentData = { 
//       appointment_date: formattedDate 
//     };
    
//     // Call the API endpoint with the correctly formatted data
//     const response = await api.put(`/appointments/${id}`, data);
    
//     return {
//       success: true,
//       appointment: response.data,
//       message: 'Rendez-vous reprogrammé avec succès'
//     };
//   } catch (error) {
//     console.error('Error rescheduling appointment:', error);
//     return {
//       success: false,
//       message: 'Erreur lors de la reprogrammation du rendez-vous'
//     };
//   }
// };
export const rescheduleAppointment = async (
  id: number,
  date: string,
  time?: string
): Promise<AppointmentResponse> => {
  try {
    // Format the appointment_date to match backend expectations (YYYY-MM-DD HH:MM:SS)
    // Utilisez l'heure fournie ou défaut à une heure visible comme 14:00:00
    const formattedDate = time 
      ? `${date} ${time}`  // Utilisez l'heure sélectionnée si elle est fournie
      : `${date} 14:00:00`; // Par défaut à 14h00 si aucune heure n'est fournie
    
    const data: RescheduleAppointmentData = { 
      appointment_date: formattedDate 
    };
    
    console.log('Sending appointment data:', data); // Log des données envoyées pour débogage
    
    // Call the API endpoint with the correctly formatted data
    const response = await api.put(`/appointments/${id}`, data);
    
    return {
      success: true,
      appointment: response.data,
      message: 'Rendez-vous reprogrammé avec succès'
    };
  } catch (error) {
    console.error('Error rescheduling appointment:', error);
    return {
      success: false,
      message: 'Erreur lors de la reprogrammation du rendez-vous'
    };
  }
};
// export const rescheduleAppointment = async (
//   id: number,
//   date: string,
//   time?: string
// ): Promise<AppointmentResponse> => {
//   try {
//     // Si aucun temps n'est fourni, essayez d'utiliser l'heure actuelle du rendez-vous
//     let formattedDate;
    
//     if (!time) {
//       // Si aucun temps n'est fourni, récupérez d'abord les détails du rendez-vous actuel
//       try {
//         const currentAppointment = await api.get(`/appointments/${id}`);
//         const currentDate = new Date(currentAppointment.data.date || currentAppointment.data.appointment_date);
//         // Extraire l'heure actuelle (HH:MM:SS)
//         const currentTime = currentDate.toTimeString().split(' ')[0];
//         formattedDate = `${date} ${currentTime}`;
//       } catch (error) {
//         console.error('Error fetching current appointment time:', error);
//         // Fallback to noon if we can't get the current time
//         formattedDate = `${date} 12:00:00`;
//       }
//     } else {
//       // Si le temps est fourni, utilisez-le
//       formattedDate = `${date} ${time}`;
//     }
    
//     const data: RescheduleAppointmentData = { 
//       appointment_date: formattedDate 
//     };
    
//     // Call the API endpoint with the correctly formatted data
//     const response = await api.put(`/appointments/${id}`, data);
    
//     return {
//       success: true,
//       appointment: response.data,
//       message: 'Rendez-vous reprogrammé avec succès'
//     };
//   } catch (error) {
//     console.error('Error rescheduling appointment:', error);
//     return {
//       success: false,
//       message: 'Erreur lors de la reprogrammation du rendez-vous'
//     };
//   }
// };
// Fonction pour supprimer un rendez-vous
// ✅ version propre et identique à createAppointment

export const cancelAppointment = async (appointmentId: number): Promise<void> => {
  const token = localStorage.getItem('token');

  try {
    await api.delete(`/appointments/${appointmentId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    throw error;
  }
};




// Update therapist online status
export const updateTherapistStatus = async (
  isOnline: boolean
): Promise<{ success: boolean }> => {
  try {
    const response = await api.post('/therapist/status', { isOnline });
    return response.data;
  } catch (error) {
    console.error('Error updating therapist status:', error);
    throw error;
  }

};



