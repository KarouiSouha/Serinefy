import axios from 'axios';
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
  date: string;
  time: string;
  patientName: string;
  status: string; // 'scheduled', 'completed', 'canceled'
}


export const fetchDashboardData = async (): Promise<Therapist[]> => {
  try {
    // Log the token to verify it's being included
    console.log('Token:', localStorage.getItem('token'));
    
    const response = await api.get('/therapist/dashboard');
    console.log('Appointments response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

export const updateOnlineStatus = async (isOnline) => {
  try {
    const response = await api.post('/therapist/online-status', { isOnline });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut en ligne:", error);
    throw error;
  }
};

// API : démarrer un appel
export const startVideoCall = async (appointmentId, callType) => {
  try {
    const response = await api.post(`/therapist/appointments/${appointmentId}/start-call`, { callType });
    return response.data;
  } catch (error) {
    console.error("Erreur lors du démarrage de l'appel:", error);
    throw error;
  }
};

// API : terminer un appel
export const endCall = async (appointmentId) => {
  try {
    const response = await api.post(`/therapist/appointments/${appointmentId}/end-call`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la fin de l'appel:", error);
    throw error;
  }
};

// API : mise à jour d’un rendez-vous (si jamais utilisée plus tard)
export const updateAppointment = async (appointmentId, updates) => {
  try {
    const response = await api.put(`/therapist/appointments/${appointmentId}`, updates);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du rendez-vous:", error);
    throw error;
  }
};