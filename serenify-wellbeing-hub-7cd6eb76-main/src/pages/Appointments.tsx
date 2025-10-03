
import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TherapistList from '@/components/appointments/TherapistList';
import AppointmentList from '@/components/appointments/AppointmentList';
import { AppointmentData } from '@/components/Service/appointmentService';
import { Therapist } from '@/components/Service/appointmentService';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { VideoIcon, Phone, Calendar, Clock, User, MessageSquare, Mic, MicOff, Video, VideoOff, PhoneOff } from 'lucide-react';

import { useAppointments } from '@/hooks/useAppointments';
import { patientEndCall, getVideoToken } from '../components/Service/appointmentService';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

const Appointments: React.FC = () => {
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  const { 
    loading, 
    appointments, 
    therapists, 
    therapistStatus,
     
    addAppointment, 
    rescheduleAppointment, 
    cancelAppointment,
    toggleTherapistStatus
  } = useAppointments();

  const [showCallDialog, setShowCallDialog] = useState(false);
  const [callType, setCallType] = useState<'video' | 'phone' | null>(null);
  const [inWaitingRoom, setInWaitingRoom] = useState(false);
  const [callTherapist, setCallTherapist] = useState<Therapist | null>(null);
  const [user, setUser] = useState<{ role: string } | null>(null);
  const [callTime, setCallTime] = useState(0);
  const [callAppointmentId, setCallAppointmentId] = useState<number | null>(null);
  const [activeCall, setActiveCall] = useState(false);
  const { toast } = useToast();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [showChatDialog, setShowChatDialog] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [callStatus, setCallStatus] = useState<'idle' | 'initializing' | 'active'>('idle');

  useEffect(() => {
    const currentUser = localStorage.getItem('user');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      setUser(userData);
      
      if (userData.email === 'therapist') {
        window.location.href = '/therapist-dashboard';
      }
    }
  }, []);
useEffect(() => {
    let isMounted = true;
    let remoteStreamTimeout;

    const initialize = async () => {
      try {
        if (callStatus !== 'initializing') return;
        
        console.log("Initialisation de l'appel vidéo...");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        
        if (isMounted) {
          setLocalStream(stream);
          
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
          
          // Simuler la connexion avec le patient
          remoteStreamTimeout = setTimeout(async () => {
            try {
              const fakeRemoteStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
              });
              
              if (isMounted) {
                setRemoteStream(fakeRemoteStream);
                
                if (remoteVideoRef.current) {
                  remoteVideoRef.current.srcObject = fakeRemoteStream;
                }
                
                toast({
                  title: "Succès",
                  description: "Patient connecté à l'appel",
                });
                setCallStatus('active');
              }
            } catch (error) {
              console.error("Erreur simulation flux distant:", error);
              if (isMounted) {
                toast({
                  title: "Erreur",
                  description: "Le patient n'a pas pu rejoindre l'appel",
                  variant: "destructive",
                });
                setCallStatus('active'); // On continue quand même sans flux distant
              }
            }
          }, 2000);
        }
      } catch (error) {
        console.error("Erreur d'accès à la caméra:", error);
        if (isMounted) {
          toast({
            title: "Erreur",
            description: "Impossible d'accéder à votre caméra ou microphone",
            variant: "destructive",
          });
          setCallStatus('idle');
          setShowCallDialog(false);
        }
      }
    };

    if (showCallDialog && callType === 'video' && callStatus === 'initializing') {
      initialize();
    }

    return () => {
      isMounted = false;
      clearTimeout(remoteStreamTimeout);
    };
  }, [showCallDialog, callType, callStatus, toast]);


  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (showCallDialog) {
      timerIntervalRef.current = setInterval(() => {
        setCallTime(prev => prev + 1);
      }, 1000);
      return () => {
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      };
    } else {
      setCallTime(0);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
  }, [showCallDialog]);

  const handleAppointmentAdded = async (appointmentData: AppointmentData) => {
    try {
      await addAppointment(appointmentData);
    } catch (err) {
      console.error('Error in appointment creation:', err);
    }
  };

  const handleAppointmentReschedule = async (appointmentId: number, newDate: string) => {
    try {
      await rescheduleAppointment(appointmentId, newDate);
    } catch (err) {
      console.error('Error in appointment rescheduling:', err);
    }
  };

  const handleAppointmentCancel = async (appointmentId: number) => {
    try {
      await cancelAppointment(appointmentId);
    } catch (err) {
      console.error('Error in appointment cancellation:', err);
    }
  };
 
  // Gestion du timer d'appel
  useEffect(() => {
    if (showCallDialog && callType === 'video' && callStatus === 'active') {
      setCallAppointmentId(appointments.find(appointment => appointment.therapistId === callTherapist?.id)?.id || null);
      setActiveCall(true);
      setInWaitingRoom(false);
      setCallStatus('active');
      setCallTime(0);
      setCallTherapist(callTherapist);
      setCallType(callType);
      setShowCallDialog(true);
      
      const interval = setInterval(() => {
        setCallTime(prev => prev + 1);
      }, 1000);
      
      timerIntervalRef.current = interval;
      
      return () => {
        if (interval) clearInterval(interval);
      };
    } else {
      setCallTime(0);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
  }, [showCallDialog, appointments, callStatus, callTherapist, callType, timerIntervalRef]);

  // Initialisation de l'appel vidéo
  useEffect(() => {
    let isMounted = true;
    let remoteStreamTimeout;

    const initialize = async () => {
      try {
        if (callStatus !== 'initializing') return;
        
        console.log("Initialisation de l'appel vidéo...");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        
        if (isMounted) {
          setLocalStream(stream);
          
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
          
          // Simuler la connexion avec le patient
          remoteStreamTimeout = setTimeout(async () => {
            try {
              const fakeRemoteStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
              });
              
              if (isMounted) {
                setRemoteStream(fakeRemoteStream);
                
                if (remoteVideoRef.current) {
                  remoteVideoRef.current.srcObject = fakeRemoteStream;
                }
                
                toast({
                  title: "Succès",
                  description: "Patient connecté à l'appel",
                });
                setCallStatus('active');
              }
            } catch (error) {
              console.error("Erreur simulation flux distant:", error);
              if (isMounted) {
                toast({
                  title: "Erreur",
                  description: "Le patient n'a pas pu rejoindre l'appel",
                  variant: "destructive",
                });
                setCallStatus('active'); // On continue quand même sans flux distant
              }
            }
          }, 2000);
        }
      } catch (error) {
        console.error("Erreur d'accès à la caméra:", error);
        if (isMounted) {
          toast({
            title: "Erreur",
            description: "Impossible d'accéder à votre caméra ou microphone",
            variant: "destructive",
          });
          setCallStatus('idle');
          setShowCallDialog(false);
        }
      }
    };

    if (showCallDialog && callType === 'video' && callStatus === 'initializing') {
      initialize();
    }

    return () => {
      isMounted = false;
      clearTimeout(remoteStreamTimeout);
    };
  }, [showCallDialog, callType, callStatus]);
  // This is a fixed implementation of the video call functionality

const initializeVideoCall = async () => {
  // Reset and set initial states
  setCallStatus('initializing');
  setLocalStream(null);
  setRemoteStream(null);
  
  // Show a clear user-friendly message before requesting permissions
  toast({
    title: "Permission requise",
    description: "Nous allons vous demander l'accès à votre caméra et microphone",
  });
  
  try {
    // Request with clear constraints
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });
    
    // Make sure we're still in initializing state (user didn't cancel)
    if (callStatus !== 'initializing') {
      stream.getTracks().forEach(track => track.stop());
      return;
    }
    
    // Set local stream
    setLocalStream(stream);
    
    // Connect stream to video element safely
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
      localVideoRef.current.muted = true; // Always mute local video
      
      // Ensure video is playing
      try {
        await localVideoRef.current.play();
      } catch (playError) {
        console.error("Error playing local video:", playError);
        // Handle autoplay restrictions
        toast({
          title: "Problème d'autoplay",
          description: "Veuillez cliquer sur l'écran pour activer votre vidéo",
          variant: "destructive",
        });
      }
    }
    
    // Simulate connecting to remote (in production, this would be your WebRTC connection)
    toast({
      title: "Connexion",
      description: "Connexion au thérapeute en cours...",
    });
    
    // Move to active state
    setCallStatus('active');
    
    setTimeout(async () => {
      try {
        // In a real app, this would be the incoming remote stream
        const fakeRemoteStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        
        setRemoteStream(fakeRemoteStream);
        
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = fakeRemoteStream;
          
          try {
            await remoteVideoRef.current.play();
          } catch (playError) {
            console.error("Error playing remote video:", playError);
            toast({
              title: "Problème d'affichage",
              description: "Cliquez sur l'écran pour afficher la vidéo du thérapeute",
              variant: "destructive",
            });
          }
        }
        
        toast({
          title: "Connecté",
          description: "Le thérapeute a rejoint l'appel",
        });
      } catch (error) {
        console.error("Erreur simulation flux distant:", error);
        toast({
          title: "Connexion partielle",
          description: "Connexion audio uniquement (vidéo indisponible)",
          variant: "destructive",
        });
      }
    }, 2000);
    
  } catch (error) {
    console.error("Erreur d'accès aux périphériques:", error);
    
    // Provide specific error messages based on the error type
    if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
      toast({
        title: "Autorisation refusée",
        description: "Vous avez refusé l'accès à la caméra/microphone. Veuillez autoriser l'accès dans les paramètres de votre navigateur.",
        variant: "destructive",
      });
    } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
      toast({
        title: "Périphériques non trouvés",
        description: "Aucune caméra ou microphone détecté sur votre appareil.",
        variant: "destructive",
      });
    } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
      toast({
        title: "Périphérique occupé",
        description: "Votre caméra ou microphone est utilisé par une autre application.",
        variant: "destructive",
      });
    } else if (error.name === 'OverconstrainedError') {
      toast({
        title: "Configuration non supportée",
        description: "Votre appareil ne supporte pas la configuration demandée.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Erreur technique",
        description: "Une erreur est survenue lors de l'accès à vos périphériques.",
        variant: "destructive",
      });
    }
    
    setCallStatus('idle');
    setShowCallDialog(false);
  }
};

const handleInitiateCall = (therapistId, type) => {
  const therapist = therapists.find(t => t.id === therapistId);
  
  if (!therapist) {
    toast({
      title: "Erreur",
      description: "Thérapeute non trouvé",
      variant: "destructive",
    });
    return;
  }
  
  // Find the corresponding appointment
  const appointment = appointments.find(a => {
    const tId = a.therapistId || a.therapist_id;
    return tId === therapistId;
  });
  
  if (!appointment) {
    toast({
      title: "Erreur",
      description: "Aucun rendez-vous trouvé avec ce thérapeute",
      variant: "destructive",
    });
    return;
  }
  
  // Set call states
  setCallTherapist(therapist);
  setCallType(type);
  setCallAppointmentId(appointment.id);
  setShowCallDialog(true);
  
  // Only initialize video if type is video
  if (type === 'video') {
    initializeVideoCall();
  } else {
    // For audio calls, just set to active
    setCallStatus('active');
  }
};

const handleEndCall = () => {
  // Clean up media streams properly
  if (localStream) {
    localStream.getTracks().forEach(track => {
      track.stop();
    });
  }
  
  if (remoteStream) {
    remoteStream.getTracks().forEach(track => {
      track.stop();
    });
  }
  
  // Reset all states
  setLocalStream(null);
  setRemoteStream(null);
  setShowCallDialog(false);
  setCallTherapist(null);
  setCallType(null);
  setCallStatus('idle');
  setCallAppointmentId(null);
  
  // Notify the user
  toast({
    title: "Appel terminé",
    description: "Votre consultation est terminée",
  });
  
  // In a real app, you would also notify the server
  if (callAppointmentId) {
    try {
      patientEndCall(callAppointmentId);
    } catch (error) {
      console.error("Erreur lors de la notification de fin d'appel:", error);
    }
  }
};

// Properly toggle audio
const toggleAudio = () => {
  if (localStream) {
    const audioTracks = localStream.getAudioTracks();
    if (audioTracks.length > 0) {
      const enabled = !audioTracks[0].enabled;
      audioTracks.forEach(track => {
        track.enabled = enabled;
      });
      setIsMuted(!enabled);
      
      toast({
        title: enabled ? "Micro activé" : "Micro désactivé",
      });
    }
  }
};

// Properly toggle video
const toggleVideo = () => {
  if (localStream) {
    const videoTracks = localStream.getVideoTracks();
    if (videoTracks.length > 0) {
      const enabled = !videoTracks[0].enabled;
      videoTracks.forEach(track => {
        track.enabled = enabled;
      });
      setIsVideoEnabled(enabled);
      
      toast({
        title: enabled ? "Caméra activée" : "Caméra désactivée",
      });
    }
  }
};

  const handleSendMessage = () => {
    if (currentMessage.trim() === '') return;
    
    const newMessage = {
      id: Date.now(),
      sender: 'Patient',
      text: currentMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setCurrentMessage('');
    
    setTimeout(() => {
      const therapistResponse = {
        id: Date.now() + 1,
        sender: callTherapist?.name || 'Thérapeute',
        text: 'Je comprends, pouvez-vous en dire plus?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setChatMessages(prev => [...prev, therapistResponse]);
    }, 3000);
  };

  const formatCallTime = () => {
    const minutes = Math.floor(callTime / 60);
    const seconds = callTime % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  function formatTime(callTimer: number): string {
    const minutes = Math.floor(callTimer / 60);
    const seconds = callTimer % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="bg-serenity-50 dark:bg-serenity-900 py-12">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-serenity-900 dark:text-white mb-6">
                Rendez-vous
              </h1>
              <p className="text-lg text-serenity-700 dark:text-serenity-200 mb-8">
                Consultez nos psychologues certifiés en ligne et recevez le soutien dont vous avez besoin.
              </p>
              {!user && (
                <div className="mt-4 bg-serenity-100 dark:bg-serenity-800 p-4 rounded-lg">
                  <p className="text-serenity-700 dark:text-serenity-300">
                    Pour prendre rendez-vous ou accéder à vos consultations, veuillez vous connecter.
                  </p>
                  <Button 
                    className="mt-2"
                    onClick={() => {
                      const headerAuthButton = document.querySelector('button.rounded-full.hidden.md\\:flex');
                      if (headerAuthButton) {
                        (headerAuthButton as HTMLButtonElement).click();
                      }
                    }}
                  >
                    Se connecter
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-white dark:bg-serenity-900">
          <div className="container mx-auto px-6">
            <Tabs defaultValue="my-appointments" className="w-full">
              <TabsList className="grid grid-cols-2 mb-8">
                <TabsTrigger value="therapists">Psychologues</TabsTrigger>
                <TabsTrigger value="my-appointments">Mes rendez-vous</TabsTrigger>
              </TabsList>
              
              <TabsContent value="therapists" className="space-y-8">
                <TherapistList 
                  therapists={therapists}
                  onAppointmentAdded={handleAppointmentAdded}
                  loading={loading}
                />
              </TabsContent>
                        <TabsContent value="my-appointments" className="space-y-6">
                <AppointmentList 
         appointments={appointments.map(appointment => ({
           ...appointment,
           therapistId: appointment.therapistId ?? appointment.therapist_id, // always set therapistId
           duration: 60 // valeur par défaut
         }))}
                  therapists={therapists}
                  onReschedule={handleAppointmentReschedule}
                  onCancel={handleAppointmentCancel}
                  therapistStatus={therapistStatus}
                  loading={loading}
                  onInitiateCall={handleInitiateCall}
                  onEndCall={handleEndCall}
                />
              </TabsContent>
            </Tabs>   
              
          </div>
        </section>
      </main>
      <Footer />

    
      <Dialog 
        open={showCallDialog} 
        onOpenChange={(open) => {
          if (!open) handleEndCall();
          setShowCallDialog(open);
        }}
      >
        <DialogContent className={callType === 'video' ? "sm:max-w-3xl h-[80vh]" : "sm:max-w-md"}>
          <DialogHeader>
            <DialogTitle>
              {callTherapist 
                ? `${callType === 'video' ? 'Consultation vidéo' : 'Consultation téléphonique'} avec ${callTherapist.name}`
                : "Consultation"
              }
            </DialogTitle>
            <DialogDescription>
              Consultation en cours avec le patient
            </DialogDescription>
          </DialogHeader>

          {callType === 'video' ? (
            <div className="flex flex-col h-full">
              <div className="flex-grow relative bg-gray-900 rounded-lg overflow-hidden">
                <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full z-10">
                  {formatTime(callTime)}
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <video 
                    ref={remoteVideoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="absolute bottom-20 right-4 w-32 h-24 bg-gray-800 rounded-lg border border-gray-700 overflow-hidden shadow-lg">
                  <video 
                    ref={localVideoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className={`w-full h-full object-cover ${!isVideoEnabled ? 'hidden' : ''}`}
                  />
                  {!isVideoEnabled && (
                    <div className="w-full h-full flex items-center justify-center bg-gray-700">
                      <VideoIcon className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>
                
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                  <Button 
                    variant="outline" 
                    className={`rounded-full p-3 ${isMuted ? 'bg-red-600' : 'bg-serenity-700'} text-white hover:bg-serenity-600`}
                    onClick={toggleAudio}
                  >
                    {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className={`rounded-full p-3 ${!isVideoEnabled ? 'bg-red-600' : 'bg-serenity-700'} text-white hover:bg-serenity-600`}
                    onClick={toggleVideo}
                  >
                    {isVideoEnabled ? <VideoIcon className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="rounded-full p-3 bg-serenity-700 text-white hover:bg-serenity-600"
                    onClick={() => setShowChatDialog(true)}
                  >
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                  
                  <Button 
                    variant="destructive" 
                    className="rounded-full p-3"
                    onClick={handleEndCall}
                  >
                    <PhoneOff className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-24 h-24 rounded-full bg-serenity-100 flex items-center justify-center mb-6">
                <Phone className="h-12 w-12 text-serenity-600" />
              </div>
              <h3 className="text-xl font-medium mb-1">{callTherapist?.name}</h3>
              <p className="text-serenity-600 mb-2">Durée : {formatTime(callTime)}</p>
              <Button 
                variant="destructive" 
                className="mt-4"
                onClick={handleEndCall}
              >
                Terminer l'appel
              </Button>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => handleEndCall()}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showChatDialog} onOpenChange={setShowChatDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Chat avec {callTherapist?.name || 'le thérapeute'}</DialogTitle>
            <DialogDescription>
              Échangez des messages pendant la consultation
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-64 rounded border p-4">
            {chatMessages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                Aucun message. Commencez la conversation !
              </div>
            ) : (
              chatMessages.map(msg => (
                <div 
                  key={msg.id} 
                  className={`mb-2 max-w-[80%] p-2 rounded-lg ${
                    msg.sender === 'Patient'
                      ? 'ml-auto bg-blue-100 text-blue-900'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="text-xs text-gray-600 mb-1">{msg.sender} • {msg.time}</div>
                  <div>{msg.text}</div>
                </div>
              ))
            )}
          </ScrollArea>
          
          <div className="flex gap-2 mt-2">
            <Input
              placeholder="Tapez votre message..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>Envoyer</Button>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowChatDialog(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Appointments;
