
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
