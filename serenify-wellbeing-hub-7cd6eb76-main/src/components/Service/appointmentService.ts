
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


export const patientEndCall = async (appointmentId) => {
  try {
    const response = await api.post(`/appointments/${appointmentId}/patient-end-call`);
    return response.data;
  } catch (error) {
    console.error('Error ending call:', error);
    throw error;
  }
};


export const getVideoToken = async (appointmentId) => {
  try {
    const response = await api.get(`/appointments/${appointmentId}/video-token`);
    return response.data;
  } catch (error) {
    console.error('Error getting video token:', error);
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
 