

export type AppointmentType = 'video' | 'phone' | 'chat';
export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface AppointmentData {
    therapist_id: number; // Added therapist_id to match the expected type

  date: string;
  time: string;
    duration: number;     // En minutes

  type: AppointmentType;
  status?: AppointmentStatus;
  notes?: string;
  id?: number; // Ajout de l'id optionnel pour la création et mise à jour
}

export interface Appointment {
  id: number;
  therapist_id: number;  // For API compatibility
  therapistId?: number;  // For component compatibility
  patient_id?: number;
  date: string;
  time: string;
  status: string;
  type: string;
  notes?: string;
  therapist?: Therapist;
    onInitiateCall: (therapistId: number, type: 'video' | 'phone') => void;
  onEndCall: (appointmentId: number) => void;
}


export interface Therapist {
  id: number;
  name: string;
  specialty: string;
experience: string; 
  avatarUrl?: string;  // Rendre optionnel si pas toujours présent
  availability?: string[];  // Rendre optionnel
  bio: string;
  phone?: string;
}

// Interface pour la réponse de l'API après création d'un rendez-vous
export interface AppointmentResponse {
  id: number;
  therapist_id: number;
  appointment_date: string;
  type: string;
  status: string;
}
