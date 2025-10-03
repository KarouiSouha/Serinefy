
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { VideoIcon, Phone, Calendar, Clock, User, MessageSquare, Mic, MicOff, VideoOff, PhoneOff } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

// Import des services API
import { fetchDashboardData, updateOnlineStatus, startVideoCall, endCall } from '../components/Service/therapistService';

// Types
interface Patient {
  id: number;
  name: string;
  appointmentType: string;
  appointmentDate: string;
  appointmentTime: string;
  status: 'scheduled' | 'in-waiting-room' | 'active' | 'completed';
  patient_id: number;
  notes?: string;
}

interface TherapistData {
  id: number;
  name: string;
  isOnline: boolean;
  specialty: string;
}

interface Stats {
  total_appointments: number;
  completed_sessions: number;
}

const TherapistDashboard = () => {
  const navigate = useNavigate();
  
  const [isOnline, setIsOnline] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [callType, setCallType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);
  const [stats, setStats] = useState({ total_appointments: 0, completed_sessions: 0 });
  const [therapistData, setTherapistData] = useState(null);
  const [callTimer, setCallTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [authUser, setAuthUser] = useState({ role: "" });
  const [callStatus, setCallStatus] = useState('idle'); // 'idle' | 'initializing' | 'active' | 'ending'

  // Video call related states
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [showChatDialog, setShowChatDialog] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  
  // Charger les données du tableau de bord au chargement du composant
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const dashboardData = await fetchDashboardData() as { patients?: Patient[]; stats?: Stats; therapist?: TherapistData } || {};
        const { patients = [], stats = { total_appointments: 0, completed_sessions: 0 }, therapist = null } = dashboardData;
        
        setPatients(patients);
        setStats(stats);
        setTherapistData(therapist);
        
        if (therapist) {
          setIsOnline(therapist.isOnline);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        toast.error("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };

    const currentUser = localStorage.getItem('therapist');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      setAuthUser(userData);
    }

    loadDashboardData();
  }, []);
  
  // Gestion du timer d'appel
  useEffect(() => {
    if (showCallDialog && selectedPatient) {
      const interval = setInterval(() => {
        setCallTimer(prev => prev + 1);
      }, 1000);
      
      setTimerInterval(interval);
      
      return () => {
        if (interval) clearInterval(interval);
      };
    } else {
      setCallTimer(0);
      if (timerInterval) clearInterval(timerInterval);
    }
  }, [showCallDialog, selectedPatient, timerInterval]);

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
                
                toast.success("Patient connecté à l'appel");
                setCallStatus('active');
              }
            } catch (error) {
              console.error("Erreur simulation flux distant:", error);
              if (isMounted) {
                toast.error("Le patient n'a pas pu rejoindre l'appel");
                setCallStatus('active'); // On continue quand même sans flux distant
              }
            }
          }, 2000);
        }
      } catch (error) {
        console.error("Erreur d'accès à la caméra:", error);
        if (isMounted) {
          toast.error("Impossible d'accéder à votre caméra ou microphone");
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

  const handleGoOnline = async () => {
    try {
      const response = await updateOnlineStatus(true);

      if (response?.success) {
        setIsOnline(true);
        toast.success("Vous êtes maintenant en ligne");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error);
      toast.error("Erreur lors de la mise à jour de votre statut");
    }
  };

  const handleGoOffline = async () => {
    try {
      const response = await updateOnlineStatus(false);

      if (response?.success) {
        setIsOnline(false);
        toast.success("Vous êtes maintenant hors ligne");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error);
      toast.error("Erreur lors de la mise à jour de votre statut");
    }
  };

  const handleStartCall = async (appointment, type) => {
    try {
      setCallStatus('initializing');
      
      // Nettoyer les streams précédents
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        setLocalStream(null);
      }
      if (remoteStream) {
        remoteStream.getTracks().forEach(track => track.stop());
        setRemoteStream(null);
      }
      
      const response = await startVideoCall(appointment.id, type);
      console.log("Réponse API:", response);
      
      setSelectedPatient(appointment);
      setCallType(type);
      setShowCallDialog(true);
      
      setPatients(prev => prev.map(p =>
        p.id === appointment.id ? { ...p, status: 'active' } : p
      ));
      
      toast.success(`Consultation avec ${appointment.name} commencée`);
    } catch (error) {
      console.error("Erreur lors du démarrage de l'appel:", error);
      toast.error("Erreur lors du démarrage de l'appel");
      setCallStatus('idle');
    }
  };

  const handleEndCall = async () => {
    if (!selectedPatient) return;

    setCallStatus('ending');
    
    try {
      const response = await endCall(selectedPatient.id);

      if (response?.success) {
        toast.success(`Consultation avec ${selectedPatient.name} terminée`);

        setPatients(prev => prev.map(p =>
          p.id === selectedPatient.id ? { ...p, status: 'completed' } : p
        ));
      }
    } catch (error) {
      toast.error("Erreur lors de la fin de l'appel");
    } finally {
      // Nettoyer les streams
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        setLocalStream(null);
      }
      
      if (remoteStream) {
        remoteStream.getTracks().forEach(track => track.stop());
        setRemoteStream(null);
      }

      setShowCallDialog(false);
      setSelectedPatient(null);
      setCallType(null);
      setCallStatus('idle');
    }
  };

  const toggleAudio = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
      toast.success(isMuted ? "Micro activé" : "Micro désactivé");
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
      toast.success(isVideoEnabled ? "Caméra désactivée" : "Caméra activée");
    }
  };

  const handleSendMessage = () => {
    if (currentMessage.trim() === '') return;
    
    const newMessage = {
      id: Date.now(),
      sender: 'Thérapeute',
      text: currentMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setCurrentMessage('');
    
    setTimeout(() => {
      const patientResponse = {
        id: Date.now() + 1,
        sender: selectedPatient?.name || 'Patient',
        text: 'D\'accord, merci pour ces informations.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setChatMessages(prev => [...prev, patientResponse]);
    }, 3000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!patients || patients.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center max-w-lg px-6">
            <h2 className="text-2xl font-bold mb-4">Aucun rendez-vous programmé</h2>
            <p className="mb-8">Votre emploi du temps est vide pour le moment. Les rendez-vous s'afficheront ici lorsqu'ils seront programmés.</p>
            <Button onClick={() => navigate('/')}>Retour à l'accueil</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="bg-serenity-50 dark:bg-serenity-900 py-12">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-serenity-900 dark:text-white mb-6">
                Tableau de bord Thérapeute
              </h1>
              <p className="text-lg text-serenity-700 dark:text-serenity-200 mb-8">
                Gérez vos rendez-vous et consultations en ligne
              </p>
              <div className="flex justify-center gap-4">
                {!isOnline ? (
                  <Button 
                    onClick={handleGoOnline}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Se mettre en ligne
                  </Button>
                ) : (
                  <Button 
                    onClick={handleGoOffline}
                    variant="destructive"
                  >
                    Se mettre hors ligne
                  </Button>
                )}
              </div>
              {isOnline && (
                <Badge className="mt-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                  En ligne
                </Badge>
              )}
              
              <div className="mt-8 flex justify-center gap-8">
                <div className="text-center">
                  <p className="text-3xl font-bold">{stats.total_appointments}</p>
                  <p className="text-sm text-serenity-600">Rendez-vous totaux</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold">{stats.completed_sessions}</p>
                  <p className="text-sm text-serenity-600">Consultations terminées</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-white dark:bg-serenity-900">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-serenity-900 dark:text-white mb-6">
              Mes patients
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {patients.length === 0 ? (
                <p className="text-serenity-600 col-span-full text-center py-12">
                  Aucun rendez-vous programmé pour le moment.
                </p>
              ) : (
                patients.map(patient => (
                  <Card key={patient.id} className={`
                    ${patient.status === 'in-waiting-room' ? 'border-2 border-amber-500' : ''}
                    ${patient.status === 'active' ? 'border-2 border-green-500' : ''}
                    ${patient.status === 'completed' ? 'opacity-70' : ''}
                  `}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-xl">{patient.name}</CardTitle>
                        {patient.status === 'in-waiting-room' && (
                          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
                            En salle d'attente
                          </Badge>
                        )}
                        {patient.status === 'active' && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                            En cours
                          </Badge>
                        )}
                        {patient.status === 'completed' && (
                          <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
                            Terminé
                          </Badge>
                        )}
                      </div>
                      <CardDescription>
                        <div className="flex items-center gap-2 mt-2">
                          <Calendar className="h-4 w-4" />
                          <span>{patient.appointmentDate}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-4 w-4" />
                          <span>{patient.appointmentTime}</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 mb-4">
                        <User className="h-4 w-4 text-serenity-600" />
                        <span className="text-sm text-serenity-800 dark:text-serenity-200">
                          {patient.appointmentType}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      {patient.status !== 'completed' && isOnline && (
                        <>
                          <Button 
                            onClick={() => handleStartCall(patient, 'video')}
                            variant="outline" 
                            className="flex-1 mr-2"
                          >
                            <VideoIcon className="mr-2 h-4 w-4" />
                            Vidéo
                          </Button>
                          <Button 
                            onClick={() => handleStartCall(patient, 'phone')}
                            variant="outline" 
                            className="flex-1"
                          >
                            <Phone className="mr-2 h-4 w-4" />
                            Téléphone
                          </Button>
                        </>
                      )}
                      {patient.status === 'completed' && (
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          disabled
                        >
                          Consultation terminée
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
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
              {selectedPatient 
                ? `${callType === 'video' ? 'Consultation vidéo' : 'Consultation téléphonique'} avec ${selectedPatient.name}`
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
                  {formatTime(callTimer)}
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
              <h3 className="text-xl font-medium mb-1">{selectedPatient?.name}</h3>
              <p className="text-serenity-600 mb-2">Durée : {formatTime(callTimer)}</p>
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
            <DialogTitle>Chat avec {selectedPatient?.name || 'le patient'}</DialogTitle>
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
                    msg.sender === 'Thérapeute'
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

export default TherapistDashboard;