
import { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { AppointmentType } from './TherapistCard';

interface AppointmentButtonProps {
  therapistName: string;
  onAppointmentConfirmed: (details: {
    date: string;
    time: string;
    type: AppointmentType;
  }) => void;
}

const AppointmentButton = ({ therapistName, onAppointmentConfirmed }: AppointmentButtonProps) => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedType, setSelectedType] = useState<AppointmentType>("video");

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      
      onAppointmentConfirmed({
        date: formattedDate,
        time: selectedTime,
        type: selectedType
      });
      
      setOpen(false);
      
      // Reset selections
      setSelectedDate(undefined);
      setSelectedTime("");
      setSelectedType("video");
    }
  };

  // Generate time slots from 9 AM to 5 PM
  const timeSlots = Array.from({ length: 9 }, (_, i) => {
    const hour = i + 9;
    return `${hour}:00`;
  });
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Prendre rendez-vous</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Prendre rendez-vous avec {therapistName}</DialogTitle>
          <DialogDescription>
            Choisissez une date et une heure qui vous conviennent pour votre consultation.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => {
                // Disable past dates and weekends
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const day = date.getDay();
                return date < today || day === 0 || day === 6;
              }}
              locale={fr}
              className="border rounded-md"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="time">Heure</Label>
            <Select 
              value={selectedTime} 
              onValueChange={setSelectedTime}
              disabled={!selectedDate}
            >
              <SelectTrigger id="time">
                <SelectValue placeholder="Sélectionnez une heure" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="type">Type de consultation</Label>
            <Select 
              value={selectedType} 
              onValueChange={(value) => setSelectedType(value as AppointmentType)}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Sélectionnez un type de consultation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="video">Visioconférence</SelectItem>
                <SelectItem value="phone">Téléphone</SelectItem>
                <SelectItem value="chat">Chat</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedTime}
          >
            Confirmer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentButton;