
// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { CalendarCheck, Video, PhoneCall } from "lucide-react";
// import { format } from "date-fns";
// import { Calendar } from "@/components/ui/calendar";
// import { useToast } from "@/hooks/use-toast";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
//   DialogDescription,
// } from "@/components/ui/dialog";

// // interface Appointment {
// //   id: number;
// //   therapistId: number;
// //   date: string;
// //   time: string;
// //   type: string;
// //   status: string;
// // }
// // Update your Appointment interface to match API response
// interface Appointment {
//   id: number;
//   therapistId: number;
//   appointment_date: string;  // From API
//   duration: number;         // From API
//   notes?: string;           // From API
//   status: string;
//   type: string;
//   video_call_link?: string;  // From API
//   // Add any other fields from API
// }
// interface Therapist {
//   id: number;
//   name: string;
//   specialty: string;
//   avatarUrl: string;
// }

// interface AppointmentCardProps {
//   appointment: Appointment;
//   therapist: Therapist;
//   onReschedule?: (oldAppointment: Appointment, newDate: string) => void;
//   onCancel?: (appointmentId: number) => void;
//   therapistStatus?: {[key: number]: string};
// }

// const AppointmentCard: React.FC<AppointmentCardProps> = ({ 
//   appointment, 
//   therapist, 
//   onReschedule,
//   onCancel,
//   therapistStatus = {}
// }) => {
//   const [showVideoCall, setShowVideoCall] = useState(false);
//   const [showPhoneCall, setShowPhoneCall] = useState(false);
//   const [showReschedule, setShowReschedule] = useState(false);
//   const [showCancelConfirm, setShowCancelConfirm] = useState(false);
//   const [showWaitingRoom, setShowWaitingRoom] = useState(false);
//   const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
//   const { toast } = useToast();
//   const [videoEnabled, setVideoEnabled] = useState(true);
//   const [audioEnabled, setAudioEnabled] = useState(true);
//   const [therapistJoined, setTherapistJoined] = useState(false);
//   const [waitingTime, setWaitingTime] = useState(0);

//   // Check if therapist is online based on status
//   const isTherapistOnline = therapistStatus[appointment.therapistId] === "online";

//   useEffect(() => {
//     // If therapist comes online while in waiting room, auto join the call
//     if (isTherapistOnline && showWaitingRoom) {
//       setTimeout(() => {
//         setShowWaitingRoom(false);
//         setShowVideoCall(true);
//         setTherapistJoined(true);
//       }, 1500);
//     }
//   }, [isTherapistOnline, showWaitingRoom]);

//   useEffect(() => {
//     // Increment waiting time counter
//     let interval: number | undefined;
//     if (showWaitingRoom) {
//       interval = window.setInterval(() => {
//         setWaitingTime(prev => prev + 1);
//       }, 1000);
//     } else {
//       setWaitingTime(0);
//     }
    
//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [showWaitingRoom]);

//   const handleJoin = () => {
//     if (isTherapistOnline) {
//       setShowVideoCall(true);
//       setTherapistJoined(true);
//     } else {
//       setShowWaitingRoom(true);
//       toast({
//         title: "Salle d'attente",
//         description: "Votre thérapeute n'est pas encore en ligne. Vous êtes dans la salle d'attente virtuelle.",
//       });
//     }
//   };

//   const handlePhoneCall = () => {
//     if (isTherapistOnline) {
//       setShowPhoneCall(true);
//     } else {
//       toast({
//         title: "Thérapeute indisponible",
//         description: "Votre thérapeute n'est pas encore en ligne. Veuillez réessayer plus tard.",
//       });
//     }
//   };

//   const handleReschedule = () => {
//     setShowReschedule(true);
//   };

//   const handleRescheduleConfirm = () => {
//     if (selectedDate && onReschedule) {
//       const formattedDate = format(selectedDate, 'PP');
//       onReschedule(appointment, formattedDate);
//       toast({
//         title: "Rendez-vous reprogrammé",
//         description: `Votre rendez-vous avec ${therapist.name} a été reprogrammé pour le ${formattedDate}.`,
//       });
//       setShowReschedule(false);
//     }
//   };

//   const handleCancel = () => {
//     setShowCancelConfirm(true);
//   };

//   const handleCancelConfirm = () => {
//     if (onCancel) {
//       onCancel(appointment.id);
//       toast({
//         title: "Rendez-vous annulé",
//         description: `Votre rendez-vous avec ${therapist.name} a été annulé.`,
//         variant: "destructive"
//       });
//       setShowCancelConfirm(false);
//     }
//   };

//   const toggleVideo = () => {
//     setVideoEnabled(!videoEnabled);
//   };

//   const toggleAudio = () => {
//     setAudioEnabled(!audioEnabled);
//   };

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   return (
//     <>
//       <Card className="hover-lift">
//         <CardHeader className="pb-2">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center gap-2">
//               <CalendarCheck className="w-5 h-5 text-serenity-500" />
//               <CardTitle className="text-lg">{appointment.appointment_date}</CardTitle>
//             </div>
//             <span 
//               className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                 appointment.status === "Confirmé" 
//                   ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
//                   : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
//               }`}
//             >
//               {appointment.status}
//             </span>
//           </div>
//         </CardHeader>
//         <CardContent className="space-y-3">
//           <div className="flex items-center gap-3">
//             <Avatar className="w-10 h-10">
//               <AvatarImage src={therapist.avatarUrl} alt={therapist.name} />
//               <AvatarFallback className="bg-serenity-200 dark:bg-serenity-700 text-serenity-800 dark:text-serenity-200">
//                 {therapist.name.split(' ').map(n => n[0]).join('')}
//               </AvatarFallback>
//             </Avatar>
//             <div>
//               <div className="flex items-center gap-2">
//                 <p className="font-medium text-serenity-800 dark:text-serenity-200">{therapist.name}</p>
//                 {isTherapistOnline && (
//                   <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
//                     En ligne
//                   </span>
//                 )}
//               </div>
//               <p className="text-sm text-serenity-600 dark:text-serenity-400">{therapist.specialty}</p>
//             </div>
//           </div>
//           <div className="flex justify-between text-sm">
//             <p className="text-serenity-600 dark:text-serenity-400">Durée: {appointment.duration} minutes</p>
//             <p className="text-serenity-600 dark:text-serenity-400">Type: {appointment.type}</p>
//           </div>
//         </CardContent>
//         <CardFooter>
//           <div className="flex gap-2 w-full">
//             <Button variant="outline" className="flex-1" onClick={handleReschedule}>
//               Reprogrammer
//             </Button>
//             <Button 
//               className="flex-1 flex items-center gap-2" 
//               onClick={handleJoin}
//             >
//               <Video className="h-4 w-4" />
//               Vidéo
//             </Button>
//             <Button 
//               variant="secondary" 
//               className="flex-1 flex items-center gap-2" 
//               onClick={handlePhoneCall}
//             >
//               <PhoneCall className="h-4 w-4" />
//               Téléphone
//             </Button>
//           </div>
//         </CardFooter>
//       </Card>
      
//       {/* Virtual Waiting Room */}
//       <Dialog open={showWaitingRoom} onOpenChange={setShowWaitingRoom}>
//         <DialogContent className="max-w-md">
//           <DialogHeader>
//             <DialogTitle>Salle d'attente virtuelle</DialogTitle>
//             <DialogDescription>
//               En attente que votre thérapeute rejoigne la consultation
//             </DialogDescription>
//           </DialogHeader>
//           <div className="py-8 flex flex-col items-center justify-center">
//             <div className="w-20 h-20 rounded-full bg-serenity-100 flex items-center justify-center mb-4 animate-pulse">
//               <Video className="h-10 w-10 text-serenity-600" />
//             </div>
//             <h3 className="text-xl font-medium mb-1">{therapist.name}</h3>
//             <p className="text-serenity-600 mb-2">Temps d'attente: {formatTime(waitingTime)}</p>
//             <p className="text-sm text-serenity-500 text-center max-w-xs mb-6">
//               Votre thérapeute sera bientôt disponible. Vous serez automatiquement connecté dès qu'il rejoindra l'appel.
//             </p>
//             <Button variant="outline" onClick={() => setShowWaitingRoom(false)}>
//               Quitter la salle d'attente
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
      
//       {/* Video Call Dialog */}
//       <Dialog open={showVideoCall} onOpenChange={setShowVideoCall}>
//         <DialogContent className="max-w-3xl h-[80vh]">
//           <DialogHeader>
//             <DialogTitle>Consultation vidéo avec {therapist.name}</DialogTitle>
//             <DialogDescription>
//               Séance de thérapie en cours
//             </DialogDescription>
//           </DialogHeader>
//           <div className="flex flex-col items-center justify-center h-full bg-black rounded-md">
//             <div className="relative w-full h-full">
//               <div className="w-full h-full bg-gray-900 flex items-center justify-center">
//                 {!videoEnabled || !therapistJoined ? (
//                   <div className="flex flex-col items-center justify-center">
//                     <Video className="h-16 w-16 text-gray-600" />
//                     <p className="text-white mt-4">
//                       {!videoEnabled ? "Vidéo désactivée" : !therapistJoined ? "En attente du thérapeute..." : "Connexion en cours..."}
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center">
//                     <div className="text-center">
//                       <Avatar className="w-32 h-32 mx-auto mb-4">
//                         <AvatarFallback className="bg-serenity-700 text-serenity-200 text-4xl">
//                           {therapist.name.split(' ').map(n => n[0]).join('')}
//                         </AvatarFallback>
//                       </Avatar>
//                       <p className="text-white text-xl">{therapist.name}</p>
//                       <p className="text-gray-400">{therapist.specialty}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//               <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 rounded border border-gray-700">
//                 <div className="w-full h-full flex items-center justify-center">
//                   <p className="text-white text-xs">{videoEnabled ? 'Vous' : 'Vidéo désactivée'}</p>
//                 </div>
//               </div>
//               <div className="absolute bottom-4 left-0 right-0 mx-auto w-fit flex gap-2">
//                 <Button variant="destructive" size="sm" onClick={() => setShowVideoCall(false)}>
//                   Terminer l'appel
//                 </Button>
//                 <Button 
//                   variant={audioEnabled ? "outline" : "secondary"} 
//                   size="sm"
//                   onClick={toggleAudio}
//                 >
//                   {audioEnabled ? 'Couper le micro' : 'Activer le micro'}
//                 </Button>
//                 <Button 
//                   variant={videoEnabled ? "outline" : "secondary"} 
//                   size="sm"
//                   onClick={toggleVideo}
//                 >
//                   {videoEnabled ? 'Couper la vidéo' : 'Activer la vidéo'}
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
      
//       {/* Phone Call Dialog */}
//       <Dialog open={showPhoneCall} onOpenChange={setShowPhoneCall}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Appel téléphonique avec {therapist.name}</DialogTitle>
//             <DialogDescription>
//               Vous êtes en cours d'appel téléphonique
//             </DialogDescription>
//           </DialogHeader>
//           <div className="py-8 flex flex-col items-center justify-center">
//             <div className="w-20 h-20 rounded-full bg-serenity-100 flex items-center justify-center mb-4">
//               <PhoneCall className="h-10 w-10 text-serenity-600" />
//             </div>
//             <h3 className="text-xl font-medium mb-1">{therapist.name}</h3>
//             <p className="text-serenity-600 mb-6">Appel en cours...</p>
//             <div className="flex space-x-4">
//               <Button 
//                 variant={audioEnabled ? "outline" : "secondary"}
//                 onClick={toggleAudio}
//               >
//                 {audioEnabled ? 'Couper le micro' : 'Activer le micro'}
//               </Button>
//               <Button variant="destructive" onClick={() => setShowPhoneCall(false)}>
//                 Raccrocher
//               </Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
      
//       {/* Reschedule Dialog */}
//       <Dialog open={showReschedule} onOpenChange={setShowReschedule}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Reprogrammer votre rendez-vous</DialogTitle>
//             <DialogDescription>
//               Sélectionnez une nouvelle date pour votre rendez-vous avec {therapist.name}
//             </DialogDescription>
//           </DialogHeader>
//           <div className="flex justify-center py-4">
//             <Calendar
//               mode="single"
//               selected={selectedDate}
//               onSelect={setSelectedDate}
//               className="rounded-md border"
//             />
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setShowReschedule(false)}>
//               Annuler
//             </Button>
//             <Button onClick={handleRescheduleConfirm} disabled={!selectedDate}>
//               Confirmer la nouvelle date
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Cancel Confirmation Dialog */}
//       <Dialog open={showCancelConfirm} onOpenChange={setShowCancelConfirm}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Annuler votre rendez-vous</DialogTitle>
//             <DialogDescription>
//               Êtes-vous sûr de vouloir annuler votre rendez-vous avec {therapist.name} le {appointment.appointment_date} ?
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setShowCancelConfirm(false)}>
//               Retour
//             </Button>
//             <Button variant="destructive" onClick={handleCancelConfirm}>
//               Confirmer l'annulation
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default AppointmentCard;
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Video, PhoneCall } from "lucide-react";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

// // Updated interface to match API structure while ensuring compatibility
// interface Appointment {
//   id: number;
//   therapistId: number;
//   date: string;  // This can be either formatted or ISO string
//   duration: number;
//   notes?: string;
//   status: string;
//   type: string;
//   video_call_link?: string;
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
  specialty: string;
  avatarUrl: string;
}

interface AppointmentCardProps {
  appointment: Appointment;
  therapist: Therapist;
  onReschedule?: (oldAppointment: Appointment, newDate: string, newTime: string) => void;
    showReschedule: boolean;
  setShowReschedule: (show: boolean) => void;
  onRescheduleConfirm: (date: Date, time: string) => void;
  onCancel?: (appointmentId: number) => void;
  therapistStatus?: {[key: number]: string};
}

  // Set default time slots
  const timeSlots = [
    '09:00:00',
    '10:00:00',
    '11:00:00',
    '14:00:00',
    '15:00:00',
    '16:00:00',
    '17:00:00',
  ];
  
const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  therapist,
 
  onReschedule,
  onCancel,
  therapistStatus = {}
}) => {
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showPhoneCall, setShowPhoneCall] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showWaitingRoom, setShowWaitingRoom] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  const { toast } = useToast();
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [therapistJoined, setTherapistJoined] = useState(false);
  const [waitingTime, setWaitingTime] = useState(0);

  // Check if therapist is online based on status
  const isTherapistOnline = therapistStatus[appointment.therapistId] === "online";

  useEffect(() => {
    // If therapist comes online while in waiting room, auto join the call
    if (isTherapistOnline && showWaitingRoom) {
      setTimeout(() => {
        setShowWaitingRoom(false);
        setShowVideoCall(true);
        setTherapistJoined(true);
      }, 1500);
    }
  }, [isTherapistOnline, showWaitingRoom]);

  useEffect(() => {
    // Increment waiting time counter
    let interval: number | undefined;
    if (showWaitingRoom) {
      interval = window.setInterval(() => {
        setWaitingTime(prev => prev + 1);
      }, 1000);
    } else {
      setWaitingTime(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showWaitingRoom]);

  const handleJoin = () => {
    if (isTherapistOnline) {
      setShowVideoCall(true);
      setTherapistJoined(true);
    } else {
      setShowWaitingRoom(true);
      toast({
        title: "Salle d'attente",
        description: "Votre thérapeute n'est pas encore en ligne. Vous êtes dans la salle d'attente virtuelle.",
      });
    }
  };

  const handlePhoneCall = () => {
    if (isTherapistOnline) {
      setShowPhoneCall(true);
    } else {
      toast({
        title: "Thérapeute indisponible",
        description: "Votre thérapeute n'est pas encore en ligne. Veuillez réessayer plus tard.",
      });
    }
  };


  const handleOpenReschedule = () => {
    setShowReschedule(true);
  };
const handleTimeSelect = (time: string) => {
  console.log('Heure sélectionnée:', time); // Ajout de log pour déboguer
  setSelectedTime(time);
};

// const handleReschedule = (oldAppointment: Appointment, newDate: string) => {
//   if (onReschedule) {
//     onReschedule(oldAppointment, newDate); // Pass the full Appointment object and newDate
//   }
// };

// const handleRescheduleConfirm = () => {
//   if (selectedDate && onReschedule) {
//     // Format date in YYYY-MM-DD format for API
//     const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    
//     // Get time from existing appointment if no specific time was selected
//     const time = selectedTime || format(parseISO(appointment.date), 'HH:mm:ss');
    
//     // Call onReschedule with the appointment ID, new date AND time
//     onReschedule(appointment, formattedDate, time);
    
//     toast({
//       title: "Rendez-vous reprogrammé",
//       description: `Votre rendez-vous avec ${therapist.name} a été reprogrammé pour le ${format(selectedDate, 'PP', { locale: fr })}.`,
//     });
    
//     setShowReschedule(false);
//   }
// };

const handleRescheduleConfirm = () => {
  if (selectedDate && onReschedule) {
    // Format date in YYYY-MM-DD format for API
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    
    // Get time from existing appointment if no specific time was selected
    // Important: ajouter HH:mm:ss à l'heure sélectionnée si elle ne contient pas de secondes
    let timeToUse = selectedTime;
    
    // Si l'heure sélectionnée existe mais ne contient pas de secondes, ajoutez-les
    if (timeToUse && !timeToUse.includes(':')) {
      timeToUse = `${timeToUse}:00`;
    } else if (timeToUse && timeToUse.split(':').length === 2) {
      timeToUse = `${timeToUse}:00`;
    }
    
    console.log('Date formatée:', formattedDate);
    console.log('Heure à utiliser:', timeToUse);
    
    // Call onReschedule with the appointment, newDate, and explicitly the time
    onReschedule(appointment, formattedDate, timeToUse);
    
    toast({
      title: "Rendez-vous reprogrammé",
      description: `Votre rendez-vous avec ${therapist.name} a été reprogrammé pour le ${format(selectedDate, 'PP', { locale: fr })} à ${timeToUse?.substring(0, 5) || '14:00'}.`,
    });
    
    setShowReschedule(false);
  }
};
  const handleCancel = () => {
    setShowCancelConfirm(true);
  };

  const handleCancelConfirm = () => {
    if (onCancel) {
      onCancel(appointment.id);
      toast({
        title: "Rendez-vous annulé",
        description: `Votre rendez-vous avec ${therapist.name} a été annulé.`,
        variant: "destructive"
      });
      setShowCancelConfirm(false);
    }
  };

  const toggleVideo = () => {
    setVideoEnabled(!videoEnabled);
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Define status classes for styling
  const getStatusClass = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === "confirmed" || statusLower === "confirmé") {
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    } else {
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"; 
    }
  };

  return (
    <>
      <Card className="hover-lift">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-serenity-500" />
              <CardTitle className="text-lg">{appointment.date}</CardTitle>
            </div>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                getStatusClass(appointment.status)
              }`}
            >
              {appointment.status}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={therapist.avatarUrl} alt={therapist.name} />
              <AvatarFallback className="bg-serenity-200 dark:bg-serenity-700 text-serenity-800 dark:text-serenity-200">
                {therapist.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium text-serenity-800 dark:text-serenity-200">{therapist.name}</p>
                {isTherapistOnline && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    En ligne
                  </span>
                )}
              </div>
              <p className="text-sm text-serenity-600 dark:text-serenity-400">{therapist.specialty}</p>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <p className="text-serenity-600 dark:text-serenity-400">Durée: {appointment.duration} minutes</p>
            <p className="text-serenity-600 dark:text-serenity-400">Type: {appointment.type || "Consultation"}</p>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex gap-2 w-full">
            <Button variant="outline" className="flex-1" onClick={handleCancel}>
              Annuler
            </Button>
               <Button variant="outline" className="flex-1" onClick={handleOpenReschedule}>
              Reprogrammer
            </Button>
            <Button 
              className="flex-1 flex items-center gap-2" 
              onClick={handleJoin}
            >
              <Video className="h-4 w-4" />
              Vidéo
            </Button>

          </div>
        </CardFooter>
      </Card>

      {/* Virtual Waiting Room */}
      <Dialog open={showWaitingRoom} onOpenChange={setShowWaitingRoom}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Salle d'attente virtuelle</DialogTitle>
            <DialogDescription>
              En attente que votre thérapeute rejoigne la consultation
            </DialogDescription>
          </DialogHeader>
          <div className="py-8 flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-serenity-100 flex items-center justify-center mb-4 animate-pulse">
              <Video className="h-10 w-10 text-serenity-600" />
            </div>
            <h3 className="text-xl font-medium mb-1">{therapist.name}</h3>
            <p className="text-serenity-600 mb-2">Temps d'attente: {formatTime(waitingTime)}</p>
            <p className="text-sm text-serenity-500 text-center max-w-xs mb-6">
              Votre thérapeute sera bientôt disponible. Vous serez automatiquement connecté dès qu'il rejoindra l'appel.
            </p>
            <Button variant="outline" onClick={() => setShowWaitingRoom(false)}>
              Quitter la salle d'attente
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Video Call Dialog */}
      <Dialog open={showVideoCall} onOpenChange={setShowVideoCall}>
        <DialogContent className="max-w-3xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>Consultation vidéo avec {therapist.name}</DialogTitle>
            <DialogDescription>
              Séance de thérapie en cours
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center h-full bg-black rounded-md">
            <div className="relative w-full h-full">
              <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                {!videoEnabled || !therapistJoined ? (
                  <div className="flex flex-col items-center justify-center">
                    <Video className="h-16 w-16 text-gray-600" />
                    <p className="text-white mt-4">
                      {!videoEnabled ? "Vidéo désactivée" : !therapistJoined ? "En attente du thérapeute..." : "Connexion en cours..."}
                    </p>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <Avatar className="w-32 h-32 mx-auto mb-4">
                        <AvatarFallback className="bg-serenity-700 text-serenity-200 text-4xl">
                          {therapist.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-white text-xl">{therapist.name}</p>
                      <p className="text-gray-400">{therapist.specialty}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 rounded border border-gray-700">
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-white text-xs">{videoEnabled ? 'Vous' : 'Vidéo désactivée'}</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-0 right-0 mx-auto w-fit flex gap-2">
                <Button variant="destructive" size="sm" onClick={() => setShowVideoCall(false)}>
                  Terminer l'appel
                </Button>
                <Button 
                  variant={audioEnabled ? "outline" : "secondary"} 
                  size="sm"
                  onClick={toggleAudio}
                >
                  {audioEnabled ? 'Couper le micro' : 'Activer le micro'}
                </Button>
                <Button 
                  variant={videoEnabled ? "outline" : "secondary"} 
                  size="sm"
                  onClick={toggleVideo}
                >
                  {videoEnabled ? 'Couper la vidéo' : 'Activer la vidéo'}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Phone Call Dialog */}
      <Dialog open={showPhoneCall} onOpenChange={setShowPhoneCall}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Appel téléphonique avec {therapist.name}</DialogTitle>
            <DialogDescription>
              Vous êtes en cours d'appel téléphonique
            </DialogDescription>
          </DialogHeader>
          <div className="py-8 flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-serenity-100 flex items-center justify-center mb-4">
              <PhoneCall className="h-10 w-10 text-serenity-600" />
            </div>
            <h3 className="text-xl font-medium mb-1">{therapist.name}</h3>
            <p className="text-serenity-600 mb-6">Appel en cours...</p>
            <div className="flex space-x-4">
              <Button 
                variant={audioEnabled ? "outline" : "secondary"}
                onClick={toggleAudio}
              >
                {audioEnabled ? 'Couper le micro' : 'Activer le micro'}
              </Button>
              <Button variant="destructive" onClick={() => setShowPhoneCall(false)}>
                Raccrocher
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      

{/* Reschedule Dialog - Avec logs pour débogage */}
<Dialog open={showReschedule} onOpenChange={setShowReschedule}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Reprogrammer votre rendez-vous</DialogTitle>
      <DialogDescription>
        Sélectionnez une nouvelle date et heure pour votre rendez-vous avec {therapist.name}
      </DialogDescription>
    </DialogHeader>
    <div className="flex flex-col space-y-4">
      <div className="flex justify-center py-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            console.log('Date sélectionnée:', date);
            setSelectedDate(date);
          }}
          className="rounded-md border"
          disabled={(date) => {
            // Disable past dates and weekends
            return date < new Date() || date.getDay() === 0 || date.getDay() === 6;
          }}
        />
      </div>
      
      {selectedDate && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Choisissez un horaire :</p>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  console.log('Clic sur l\'horaire:', time);
                  setSelectedTime(time);
                }}
                className="text-xs"
              >
                {time.substring(0, 5)}
              </Button>
            ))}
          </div>
          <div className="mt-4">
            <p className="text-sm text-serenity-600">
              Horaire sélectionné: <strong>{selectedTime || 'Aucun'}</strong>
            </p>
          </div>
        </div>
      )}
    </div>
    <DialogFooter>
      <Button variant="outline" onClick={() => setShowReschedule(false)}>
        Annuler
      </Button>
      <Button 
        onClick={() => {
          console.log('Confirmation avec date:', selectedDate);
          console.log('Confirmation avec heure:', selectedTime);
          handleRescheduleConfirm();
        }} 
        disabled={!selectedDate}
      >
        Confirmer la nouvelle date
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
      {/* Cancel Confirmation Dialog */}
      <Dialog open={showCancelConfirm} onOpenChange={setShowCancelConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Annuler votre rendez-vous</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir annuler votre rendez-vous avec {therapist.name} le {appointment.date} ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelConfirm(false)}>
              Retour
            </Button>
            <Button variant="destructive" onClick={handleCancelConfirm}>
              Confirmer l'annulation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppointmentCard;