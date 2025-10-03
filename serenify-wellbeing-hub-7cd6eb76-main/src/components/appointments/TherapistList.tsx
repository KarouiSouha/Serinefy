
import React from 'react';
import TherapistCard from './TherapistCard';
import { Therapist, AppointmentData } from '@/components/type';

interface TherapistListProps {
  therapists: Therapist[];
  onAppointmentAdded?: (appointment: AppointmentData) => void;
  loading?: boolean;
}

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