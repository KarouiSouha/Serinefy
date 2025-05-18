// import { useState } from 'react';
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { useToast } from "@/hooks/use-toast";
// import AppointmentButton from './AppointmentButton';

// interface Therapist {
//   id: number;
//   name: string;
//   specialty: string;
//   experience: string;
//   availability: string[];
//   avatarUrl: string;
//   bio: string;
// }

// interface TherapistCardProps {
//   therapist: Therapist;
//   onAppointmentAdded?: (appointment: {
//     id: number;
//     therapistId: number;
//     date: string;
//     time: string;
//     type: string;
//     status: string;
//   }) => void;
// }

// const TherapistCard = ({ therapist, onAppointmentAdded }: TherapistCardProps) => {
//   const [appointments, setAppointments] = useState<any[]>([]);
//   const { toast } = useToast();

//   const handleAppointmentConfirmed = (appointmentDetails: {
//     date: string;
//     time: string;
//     type: string;
//   }) => {
//     const newAppointment = {
//       id: Date.now(),
//       therapistId: therapist.id,
//       ...appointmentDetails,
//       status: "En attente"
//     };
    
//     setAppointments(prev => [...prev, newAppointment]);
    
//     if (onAppointmentAdded) {
//       onAppointmentAdded(newAppointment);
//     }
    
//     toast({
//       title: "Rendez-vous confirmé",
//       description: `Votre rendez-vous avec ${therapist.name} le ${appointmentDetails.date} à ${appointmentDetails.time} a été confirmé.`,
//     });
//   };

//   return (
//     <Card className="hover:shadow-lg transition-shadow">
//       <CardContent className="pt-6">
//         <div className="flex flex-col items-center mb-4">
//           <Avatar className="w-24 h-24 mb-4">
//             <AvatarImage src={therapist.avatarUrl} alt={therapist.name} />
//             <AvatarFallback>
//               {therapist.name.split(' ').map(n => n[0]).join('')}
//             </AvatarFallback>
//           </Avatar>
//           <h3 className="text-xl font-semibold text-center mb-2">{therapist.name}</h3>
//           <p className="text-sm text-muted-foreground text-center mb-2">
//             {therapist.specialty}
//           </p>
//           <p className="text-sm text-muted-foreground text-center mb-4">
//             {therapist.experience}
//           </p>
//         </div>
//         <p className="text-sm text-center mb-4">{therapist.bio}</p>
//         <div className="flex flex-wrap gap-2 justify-center">
//           {therapist.availability.map((day) => (
//             <Badge key={day} variant="secondary">
//               {day}
//             </Badge>
//           ))}
//         </div>
//       </CardContent>
//       <CardFooter>
//         <AppointmentButton 
//           therapistName={therapist.name}
//           onAppointmentConfirmed={handleAppointmentConfirmed}
//         />
//       </CardFooter>
//     </Card>
//   );
// };

// export default TherapistCard;
// import { useToast } from "@/hooks/use-toast";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import AppointmentButton from './AppointmentButton';
// import { Therapist, AppointmentData } from '@/components/type';

// // // Types
//  export type AppointmentType = 'video' | 'phone' | 'chat';
//  export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

// // export interface AppointmentData {
// //   therapistId: number;
// //   date: string;
// //   time: string;
// //   type: AppointmentType;
// //   status?: AppointmentStatus;
// //   notes?: string;
// // }

// // export interface Therapist {
// //   id: number;
// //   name: string;
// //   specialty: string;
// //   experience?: string; // Rendre optionnel pour correspondre à votre backend
// //   availability: string[];
// //   avatarUrl: string;
// //   bio: string;
// //   phone?: string;
// // }
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import AppointmentButton from './AppointmentButton';
import { Therapist, AppointmentData } from '@/components/type';

// Types
export type AppointmentType = 'video' | 'phone' | 'chat';
export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

interface TherapistCardProps {
  therapist: Therapist;
  onAppointmentAdded?: (appointment: Omit<AppointmentData, 'status'> & { status?: AppointmentStatus }) => void;
}

const TherapistCard = ({ therapist, onAppointmentAdded }: TherapistCardProps) => {
  const { toast } = useToast();

  const handleAppointmentConfirmed = (details: {
    date: string;
    time: string;
    type: AppointmentType;
  }) => {
    const newAppointment: AppointmentData = {
      therapist_id: therapist.id,
      ...details,
      duration: 60, // Default duration in minutes (adjust as needed)
      status: 'pending' // Statut par défaut
    };

    onAppointmentAdded?.(newAppointment);

    toast({
      title: "Rendez-vous confirmé",
      description: `Consultation avec ${therapist.name} prévue le ${details.date} à ${details.time}`,
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center mb-4">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src={therapist.avatarUrl} alt={therapist.name} />
            <AvatarFallback>
              {therapist.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <h3 className="text-xl font-semibold text-center mb-2">
            {therapist.name}
          </h3>
          
          <Badge variant="secondary" className="mb-2">
            {therapist.specialty}
          </Badge>
          
          <p className="text-sm text-muted-foreground text-center mb-4">
            {therapist.experience}
          </p>
          
          <p className="text-sm text-center mb-4">
            {therapist.bio}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {/* Add null check for availability property */}
          {therapist.availability && therapist.availability.length > 0 ? (
            therapist.availability.map(day => (
              <Badge key={day} variant="outline">
                {day}
              </Badge>
            ))
          ) : (
            <Badge variant="outline">Disponibilité non précisée</Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-center">
        <AppointmentButton
          therapistName={therapist.name}
          onAppointmentConfirmed={handleAppointmentConfirmed}
        />
      </CardFooter>
    </Card>
  );
};

export default TherapistCard;
// interface TherapistCardProps {
//   therapist: Therapist;
//   onAppointmentAdded?: (appointment: Omit<AppointmentData, 'status'> & { status?: AppointmentStatus }) => void;
// }

// const TherapistCard = ({ therapist, onAppointmentAdded }: TherapistCardProps) => {
//   const { toast } = useToast();

//   const handleAppointmentConfirmed = (details: {
//     date: string;
//     time: string;
//     type: AppointmentType;
//   }) => {
//     const newAppointment: AppointmentData = {
//        therapist_id: therapist.id,
//       ...details,
//       status: 'pending' // Statut par défaut
//     };

//    onAppointmentAdded?.(newAppointment);

//     toast({
//       title: "Rendez-vous confirmé",
//       description: `Consultation avec ${therapist.name} prévue le ${details.date} à ${details.time}`,
//     });
//   };

//   return (
//     <Card className="hover:shadow-lg transition-shadow duration-300">
//       <CardContent className="pt-6">
//         <div className="flex flex-col items-center mb-4">
//           <Avatar className="w-24 h-24 mb-4">
//             <AvatarImage src={therapist.avatarUrl} alt={therapist.name} />
//             <AvatarFallback>
//               {therapist.name.split(' ').map(n => n[0]).join('')}
//             </AvatarFallback>
//           </Avatar>
          
//           <h3 className="text-xl font-semibold text-center mb-2">
//             {therapist.name}
//           </h3>
          
//           <Badge variant="secondary" className="mb-2">
//             {therapist.specialty}
//           </Badge>
          
//           <p className="text-sm text-muted-foreground text-center mb-4">
//             {therapist.experience}
//           </p>
          
//           <p className="text-sm text-center mb-4">
//             {therapist.bio}
//           </p>
//         </div>

//         <div className="flex flex-wrap gap-2 justify-center mb-4">
//           {therapist.availability.map(day => (
//             <Badge key={day} variant="outline">
//               {day}
//             </Badge>
//           ))}
//         </div>
//       </CardContent>

//       <CardFooter className="flex justify-center">
//         <AppointmentButton
//           therapistName={therapist.name}
//           onAppointmentConfirmed={handleAppointmentConfirmed}
//         />
//       </CardFooter>
//     </Card>
//   );
// };

// export default TherapistCard;