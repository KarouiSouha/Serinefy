
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