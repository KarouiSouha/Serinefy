// export type AppointmentType = 'video' | 'phone' | 'chat';
// export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

// export interface AppointmentData {
//   therapistId: number;
//   date: string;
//   time: string;
//   type: AppointmentType;
//   status?: AppointmentStatus;
//   notes?: string;
// }
// export interface Appointment extends AppointmentData {
//   id: number;
// }
// export interface Therapist {
//   id: number;
//   name: string;
//   specialty: string;
//   experience?: string;
//   availability: string[];
//   avatarUrl: string;
//   bio: string;
//   phone?: string;
// }
// @/components/type.ts

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
}
// export interface Appointment extends AppointmentData {
//   id: number; // id est obligatoire pour un rendez-vous existant
// }

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
// export type AppointmentType = 'video' | 'phone' | 'chat';
// export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

// export interface AppointmentData {
//   therapistId: number;
//   date: string;
//   time: string;
//   type: AppointmentType;
//   status?: AppointmentStatus;
//   notes?: string;
// }

// export interface Appointment extends AppointmentData {
//   id: number;

// }
// // interface Appointment {
// //   id: number;
// //   therapistId: number;
// //   date: string;
// //   time: string;
// //   type: string;
// //   status: string;
// // }
// export interface Therapist {
//   id: number;
//   name: string;
//   specialty: string;
//   experience?: string;
//   availability: string[];
//   avatarUrl: string;
//   bio: string;
//   phone?: string;
// }
