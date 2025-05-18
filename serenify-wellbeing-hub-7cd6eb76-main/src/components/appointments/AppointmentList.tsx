// import React from 'react';
// import AppointmentCard from './AppointmentCard';
// import { Skeleton } from "@/components/ui/skeleton";

// interface Appointment {
//   id: number;
//   therapistId: number;
//   date: string;
//   time: string;
//   type: string;
//   status: string;
//   appointment_date: string; // Added property
//   duration: number; // Added property
// }

// interface Therapist {
//   id: number;
//   name: string;
//   specialty: string;
//   avatarUrl: string;
//   experience?: string;
//   availability?: string[];
//   bio?: string;
//   phone?: string;
// }

// interface AppointmentListProps {
//   appointments: Appointment[];
//   therapists: Therapist[];
//   onReschedule?: (appointmentId: number, newDate: string) => void;
//   onCancel?: (appointmentId: number) => void;
//   therapistStatus?: {[key: number]: string};
//   loading?: boolean;
// }

// const AppointmentList: React.FC<AppointmentListProps> = ({ 
//   appointments, 
//   therapists,
//   onReschedule,
//   onCancel,
//   therapistStatus = {},
//   loading = false
// }) => {
//   if (loading) {
//     return (
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {Array(3).fill(0).map((_, index) => (
//           <div key={index} className="bg-white dark:bg-serenity-800 rounded-lg shadow-md p-4">
//             <div className="flex justify-between items-center mb-4">
//               <Skeleton className="h-6 w-24" />
//               <Skeleton className="h-5 w-16 rounded-full" />
//             </div>
//             <div className="space-y-4">
//               <div className="flex items-center gap-3">
//                 <Skeleton className="h-10 w-10 rounded-full" />
//                 <div className="space-y-2">
//                   <Skeleton className="h-5 w-32" />
//                   <Skeleton className="h-4 w-24" />
//                 </div>
//               </div>
//               <div className="flex justify-between">
//                 <Skeleton className="h-4 w-20" />
//                 <Skeleton className="h-4 w-20" />
//               </div>
//             </div>
//             <div className="mt-6">
//               <Skeleton className="h-10 w-full" />
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   if (appointments.length === 0) {
//     return (
//       <div className="text-center py-10">
//         <h3 className="text-lg font-medium mb-2">Aucun rendez-vous</h3>
//         <p className="text-gray-600 dark:text-gray-400">Vous n'avez pas encore de rendez-vous programmés.</p>
//       </div>
//     );
//   }

//   const handleReschedule = (oldAppointment: Appointment, newDate: string) => {
//     if (onReschedule) {
//       onReschedule(oldAppointment.id, newDate);
//     }
//   };

//   return (
//     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//       {appointments.map(appointment => {
//         const therapist = therapists.find(t => t.id === appointment.therapistId);
//         if (!therapist) return null;
        
//         return (
//           <AppointmentCard 
//             key={appointment.id} 
//             appointment={appointment} 
//             therapist={therapist}
//             onReschedule={handleReschedule}
//             onCancel={onCancel}
//             therapistStatus={therapistStatus}
//           />
//         );
//       })}
//     </div>
//   );
// };

// export default AppointmentList;
import React,{useState} from 'react';
import AppointmentCard from './AppointmentCard';
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

// // Updated to match the API response structure
// interface Appointment {
//   id: number;
//   therapist_id: number;  // Match API naming (snake_case)
//   appointment_date: string;
//   duration: number;
//   notes?: string;
//   status: string;
//   type: string;
//   video_call_link?: string;
//   therapist?: Therapist; // Include the therapist object from API
// }
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

// interface AppointmentListProps {
//   appointments: Appointment[];
//   therapists?: Therapist[]; // Make optional since we might use the therapist from within appointment
//   onReschedule?: (appointment: { id: number; therapistId: number; appointment_date: string; duration: number; notes?: string; status: string; type: string; video_call_link?: string; }, newDate: string) => void;
//   onCancel?: (appointmentId: number) => void;
//   therapistStatus?: {[key: number]: string};
//   loading?: boolean;
// }
interface AppointmentListProps {
  appointments: Appointment[];
  therapists?: Therapist[]; // Make optional since we might use the therapist from within appointment
  onReschedule?: (appointmentId: number, newDate: string, newTime?: string) => void;
  onCancel?: (appointmentId: number) => void;
  therapistStatus?: {[key: number]: string};
  loading?: boolean;
}

const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
  therapists = [],
  onReschedule,
  onCancel,
  therapistStatus = {},
  loading = false
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

  // const handleReschedule = (oldAppointment: Appointment, newDate: string) => {
  //   if (onReschedule) {
  //     const mappedAppointment = {
  //       id: oldAppointment.id,
  //       therapistId: oldAppointment.therapist_id,
  //       appointment_date: oldAppointment.appointment_date,
  //       duration: oldAppointment.duration,
  //       notes: oldAppointment.notes,
  //       status: oldAppointment.status,
  //       type: oldAppointment.type,
  //       video_call_link: oldAppointment.video_call_link,
  //     };
  //     onReschedule(mappedAppointment, newDate);
  //   }
  // };

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
          // <AppointmentCard 
          //   key={appointment.id} 
          //   appointment={formattedAppointment} 
          //   therapist={formattedTherapist}
          //   onReschedule={(oldAppointment, newDate) => {
          //     if (onReschedule) {
          //       onReschedule(oldAppointment.id, newDate);
          //     }
          //   }}
          //   onCancel={onCancel}
          //   therapistStatus={therapistStatus}
          //   showReschedule={activeReschedule === appointment.id}
          //   setShowReschedule={(show) => {
          //     if (show) {
          //       setActiveReschedule(appointment.id);
          //     } else {
          //       setActiveReschedule(null);
          //     }
          //   }}
          //   onRescheduleConfirm={(date, time) => {
          //     if (onReschedule) {
          //       const formattedDate = format(date, 'yyyy-MM-dd');
          //       onReschedule(appointment.id, formattedDate, time);
          //     }
            }}
          />
        );
      })}
    </div>
  );
};

export default AppointmentList;

//   appointments,
//   therapists = [],
  
//   onReschedule,
//   onCancel,
//   therapistStatus = {},
//   loading = false
  
// }) => {
//   if (loading) {
//     return (
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {Array(3).fill(0).map((_, index) => (
//           <div key={index} className="bg-white dark:bg-serenity-800 rounded-lg shadow-md p-4">
//             <div className="flex justify-between items-center mb-4">
//               <Skeleton className="h-6 w-24" />
//               <Skeleton className="h-5 w-16 rounded-full" />
//             </div>
//             <div className="space-y-4">
//               <div className="flex items-center gap-3">
//                 <Skeleton className="h-10 w-10 rounded-full" />
//                 <div className="space-y-2">
//                   <Skeleton className="h-5 w-32" />
//                   <Skeleton className="h-4 w-24" />
//                 </div>
//               </div>
//               <div className="flex justify-between">
//                 <Skeleton className="h-4 w-20" />
//                 <Skeleton className="h-4 w-20" />
//               </div>
//             </div>
//             <div className="mt-6">
//               <Skeleton className="h-10 w-full" />
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   if (appointments.length === 0) {
//     return (
//       <div className="text-center py-10">
//         <h3 className="text-lg font-medium mb-2">Aucun rendez-vous</h3>
//         <p className="text-gray-600 dark:text-gray-400">Vous n'avez pas encore de rendez-vous programmés.</p>
//       </div>
//     );
//   }

//   const handleReschedule = (oldAppointment: Appointment, newDate: string) => {
//     if (onReschedule) {
//       onReschedule(oldAppointment.id, newDate);
//     }
//   };

//   // Format dates for display if needed (replace with your format logic)
//   const formatAppointmentDate = (dateString: string) => {
//     try {
//       return new Date(dateString).toLocaleString('fr-FR', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch (e) {
//       return dateString;
//     }
//   };

//   return (
//     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//       {appointments.map(appointment => {
//         // Get therapist either from the appointment.therapist or find in the therapists array
//         const therapist = appointment.therapist || 
//           therapists.find(t => t.id === (appointment.therapist_id || appointment.therapist?.id));
          
//         if (!therapist) {
//           console.error('Therapist not found for appointment:', appointment);
//           return null;
//         }

//         // Map the appointment data to match the expected format in AppointmentCard
//         const formattedAppointment = {
//           id: appointment.id,
//           therapistId: therapist.id,
//           appointment_date: formatAppointmentDate(appointment.appointment_date),
//           duration: appointment.duration,
//           notes: appointment.notes,
//           status: appointment.status,
//           type: appointment.type || "Consultation",
//           video_call_link: appointment.video_call_link
//         };

//         // Map therapist data for AppointmentCard
//         const formattedTherapist = {
//           id: therapist.id,
//           name: therapist.name,
//           specialty: therapist.specialty || "Thérapeute",
//           avatarUrl: therapist.avatarUrl || ""
//         };

//         return (
//           <AppointmentCard 
//             key={appointment.id} 
//             appointment={formattedAppointment} 
//             therapist={formattedTherapist}
//             onReschedule={handleReschedule}
//             onCancel={onCancel}
//             therapistStatus={therapistStatus}
//           />
//         );
//       })}
//     </div>
//   );
// };

// export default AppointmentList;
// import React from 'react';
// import AppointmentCard from './AppointmentCard';

// interface Appointment {
//   id: number;
//   therapistId: number;
//   date: string;
//   time: string;
//   type: string;
//   status: string;
// }

// interface Therapist {
//   id: number;
//   name: string;
//   specialty: string;
//   avatarUrl: string;
// }

// interface AppointmentListProps {
//   appointments: Appointment[];
//   therapists: Therapist[];
//   onReschedule?: (oldAppointment: Appointment, newDate: string) => void;
//   onCancel?: (appointmentId: number) => void;
//   therapistStatus?: {[key: number]: string};
// }

// const AppointmentList: React.FC<AppointmentListProps> = ({ 
//   appointments, 
//   therapists,
//   onReschedule,
//   onCancel,
//   therapistStatus = {}
// }) => {
//   if (appointments.length === 0) {
//     return (
//       <div className="text-center py-10">
//         <h3 className="text-lg font-medium mb-2">Aucun rendez-vous</h3>
//         <p className="text-gray-600 dark:text-gray-400">Vous n'avez pas encore de rendez-vous programmés.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//       {appointments.map(appointment => {
//         const therapist = therapists.find(t => t.id === appointment.therapistId);
//         if (!therapist) return null;
        
//         return (
//           <AppointmentCard 
//             key={appointment.id} 
//             appointment={appointment} 
//             therapist={therapist}
//             onReschedule={onReschedule}
//             onCancel={onCancel}
//             therapistStatus={therapistStatus}
//           />
//         );
//       })}
//     </div>
//   );
// };

// export default AppointmentList;
