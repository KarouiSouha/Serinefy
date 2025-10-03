
import React,{useState} from 'react';
import AppointmentCard from './AppointmentCard';
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";


interface Appointment {
  id: number;
  therapistId: number;
  therapist_id?: number; // Pour compatibilité
  date: string;  
  appointment_date?: string; // Pour compatibilité
  duration: number;
  notes?: string;
  status: string;
  type: string;
  video_call_link?: string;
  therapist?: Therapist; // Pour compatibilité avec la structure reçue du backend
}

interface Therapist {
  id: number;
  name: string;
  email?: string;
  specialty?: string;
  avatarUrl?: string;
  role?: string;
}

interface AppointmentListProps {
  appointments: Appointment[];
  therapists?: Therapist[]; // Make optional since we might use the therapist from within appointment
  onReschedule?: (appointmentId: number, newDate: string, newTime?: string) => void;
  onCancel?: (appointmentId: number) => void;
  therapistStatus?: {[key: number]: string};
  loading?: boolean;
    onInitiateCall: (therapistId: number, type: 'video' | 'phone') => void;
  onEndCall: (appointmentId: number) => void;
}

const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
  therapists = [],
  onReschedule,
  onCancel,
  therapistStatus = {},
  loading = false,
    onInitiateCall

}) => {
    const [activeReschedule, setActiveReschedule] = useState<number | null>(null);

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array(3).fill(0).map((_, index) => (
          <div key={index} className="bg-white dark:bg-serenity-800 rounded-lg shadow-md p-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium mb-2">Aucun rendez-vous</h3>
        <p className="text-gray-600 dark:text-gray-400">Vous n'avez pas encore de rendez-vous programmés.</p>
      </div>
    );
  }


  const formatAppointmentDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {appointments.map(appointment => {
        const therapist = appointment.therapist || 
          therapists.find(t => t.id === (appointment.therapist_id || appointment.therapist?.id));
          
        if (!therapist) {
          console.error('Therapist not found for appointment:', appointment);
          return null;
        }

        const formattedAppointment = {
          id: appointment.id,
          therapistId: therapist.id,
          date: formatAppointmentDate(appointment.appointment_date),
          duration: appointment.duration,
          notes: appointment.notes,
          status: appointment.status,
          type: appointment.type || "Consultation",
          video_call_link: appointment.video_call_link
        };

        const formattedTherapist = {
          id: therapist.id,
          name: therapist.name,
          specialty: therapist.specialty || "Thérapeute",
          avatarUrl: therapist.avatarUrl || ""
        };

       
        function setActiveReschedule(id: number) {
          throw new Error('Function not implemented.');
        }

        return (
          <AppointmentCard 
    key={appointment.id} 
    appointment={formattedAppointment} 
    therapist={formattedTherapist}
    onReschedule={(oldAppointment, newDate, newTime) => {
      if (onReschedule) {
        onReschedule(oldAppointment.id, newDate, newTime);
      }
    }}
    onCancel={onCancel}
    therapistStatus={therapistStatus}
    showReschedule={activeReschedule === appointment.id}
    setShowReschedule={(show) => {
      if (show) {
        setActiveReschedule(appointment.id);
      } else {
        setActiveReschedule(null);
      }
    }}
    onRescheduleConfirm={(date, time) => {
      if (onReschedule) {
        const formattedDate = format(date, 'yyyy-MM-dd');
        onReschedule(appointment.id, formattedDate, time);
      }

            }}
          />
        );
      })}
    </div>
  );
};

export default AppointmentList;
