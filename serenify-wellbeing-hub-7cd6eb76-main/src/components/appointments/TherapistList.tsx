
// // import React from 'react';
// // import TherapistCard from './TherapistCard';

// // interface Therapist {
// //   id: number;
// //   name: string;
// //   specialty: string;
// //   experience: string;
// //   availability: string[];
// //   avatarUrl: string;
// //   bio: string;
// // }

// // interface TherapistListProps {
// //   therapists: Therapist[];
// //   onAppointmentAdded?: (appointment: {
// //     id: number;
// //     therapistId: number;
// //     date: string;
// //     time: string;
// //     type: string;
// //     status: string;
// //   }) => void;
// // }

// // const TherapistList: React.FC<TherapistListProps> = ({ therapists, onAppointmentAdded }) => {
// //   return (
// //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //       {therapists.map((therapist) => (
// //         <TherapistCard 
// //           key={therapist.id} 
// //           therapist={therapist}
// //           onAppointmentAdded={onAppointmentAdded}
// //         />
// //       ))}
// //     </div>
// //   );
// // };

// // export default TherapistList;
// import React from 'react';
// import TherapistCard from './TherapistCard';
// interface AppointmentData {
//   therapistId: number;
//   date: string;
//   time: string;
//   type: 'video' | 'phone' | 'chat';
//   status?: string;
// }

// interface Therapist {
//   id: number;
//   name: string;
//   specialty: string;
//   experience: string;
//   availability: string[];
//   avatarUrl: string;
//   bio: string;
// }

// interface TherapistListProps {
//   therapists: Therapist[];
//   onAppointmentAdded?: (appointment: AppointmentData) => void;
//   loading?: boolean;
// }
// // interface Therapist {
// //   id: number;
// //   name: string;
// //   specialty: string;
// //   experience: string;
// //   availability: string[];
// //   avatarUrl: string;
// //   bio: string;
// // }
// // interface AppointmentData {
// //   therapistId: number;
// //   date: string;
// //   time: string;
// //   type: 'video' | 'phone' | 'chat';
// //   status?: string;
// // }

// // interface TherapistListProps {
// //   therapists: Therapist[];
// //   onAppointmentAdded?: (appointment: AppointmentData) => void;
// //   loading?: boolean; // ajout optionnel
// // }

// const TherapistList: React.FC<TherapistListProps> = ({ 
//   therapists, 
//   onAppointmentAdded,
//   loading = false 
// }) => {
//   if (loading) {
//     return <div>Chargement des thérapeutes...</div>;
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {therapists.map((therapist) => (
//         <TherapistCard 
//           key={therapist.id} 
//           therapist={therapist}
//           onAppointmentAdded={onAppointmentAdded}
//         />
//       ))}
//     </div>
//   );
// };

// export default TherapistList;


// src/components/appointments/TherapistList.tsx
import React from 'react';
import TherapistCard from './TherapistCard';
import { Therapist, AppointmentData } from '@/components/type';

interface TherapistListProps {
  therapists: Therapist[];
  onAppointmentAdded?: (appointment: AppointmentData) => void;
  loading?: boolean;
}
// interface TherapistListProps {
//   therapists: Therapist[]; // ✅ Accepte therapists
//   onAppointmentAdded: (appointmentData: AppointmentData) => void; // ✅ Accepte onAppointmentAdded
//   loading: boolean; // ✅ Accepte loading aussi
// }
const TherapistList: React.FC<TherapistListProps> = ({ 
  therapists, 
  onAppointmentAdded,
  loading = false 
}) => {
  if (loading) {
    return <div>Chargement des thérapeutes...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {therapists.map((therapist) => (
        <TherapistCard 
          key={therapist.id} 
          therapist={therapist}
          
          onAppointmentAdded={onAppointmentAdded}
        />
      ))}
    </div>
  );
};

export default TherapistList;