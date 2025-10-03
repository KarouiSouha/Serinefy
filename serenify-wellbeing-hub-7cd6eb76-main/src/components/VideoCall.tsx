
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Video, Mic, MicOff, VideoOff, PhoneOff, MessageSquare, RefreshCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface VideoCallProps {
  appointmentId: number;
  isTherapist?: boolean;
  onEndCall: () => void;
  participantName?: string;
  callType?: 'video' | 'phone';
}

export const VideoCall: React.FC<VideoCallProps> = ({
  appointmentId,
  isTherapist = false,
  onEndCall,
  participantName = '',
  callType = 'video'
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();
  const [callDuration, setCallDuration] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [showChatDialog, setShowChatDialog] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{
    id: number;
    sender: string;
    text: string;
    time: string;
  }>>([]);
  const [currentMessage, setCurrentMessage] = useState('');

  const initializeCall = React.useCallback(async () => {
    const initializeLocalStream = async () => {
      try {
        const constraints = {
          video: callType === 'video' ? {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: 'user'
          } : false,
          audio: true
        };

        // Demander explicitement les permissions
        await navigator.mediaDevices.getUserMedia({ audio: true, video: callType === 'video' });

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        localStreamRef.current = stream;
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          localVideoRef.current.muted = true;
        }

        return true;
      } catch (err) {
        console.error("Erreur initialisation flux local:", err);
        toast({
          title: "Erreur caméra/micro",
          description: "Impossible d'accéder à vos périphériques. Vérifiez que vous avez autorisé l'accès à votre caméra et microphone.",
          variant: "destructive",
        });
        return false;
      }
    };

    const initializeRemoteStream = async () => {
      try {
        // Simulation du flux distant
        const constraints = {
          video: callType === 'video',
          audio: true
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        remoteStreamRef.current = stream;
        
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = stream;
        }

        return true;
      } catch (err) {
        console.error("Erreur simulation flux distant:", err);
        return false;
      }
    };

    setLoading(true);
    
    // Démarrer le timer
    timerRef.current = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    // Initialiser le flux local
    const localSuccess = await initializeLocalStream();
    
    if (!localSuccess) {
      setError("Erreur d'accès aux périphériques");
      setLoading(false);
      return;
    }

    // Simuler le flux distant après un délai
    setTimeout(async () => {
      await initializeRemoteStream();
      setLoading(false);
      
      toast({
        title: "Connexion établie",
        description: `Vous êtes connecté avec ${participantName}`,
      });
    }, 2000);
  }, [participantName, toast, callType]);

  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTracks = localStreamRef.current.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current && callType === 'video') {
      const videoTracks = localStreamRef.current.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  const handleEndCall = React.useCallback(() => {
    // Arrêter les flux
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
    if (remoteStreamRef.current) {
      remoteStreamRef.current.getTracks().forEach(track => track.stop());
    }
    
    // Arrêter le timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    onEndCall();
  }, [onEndCall]);

  const handleSendMessage = () => {
    if (currentMessage.trim() === '') return;
    
    const newMessage = {
      id: Date.now(),
      sender: isTherapist ? 'Thérapeute' : 'Patient',
      text: currentMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setCurrentMessage('');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // Vérifier d'abord si le navigateur supporte mediaDevices
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError("Votre navigateur ne prend pas en charge l'accès à la caméra et au microphone");
      setLoading(false);
      return;
    }
    
    initializeCall();

    return () => {
      handleEndCall();
    };
  }, [handleEndCall, initializeCall]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <div className="w-16 h-16 border-4 border-serenity-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-serenity-700 dark:text-serenity-300">
          Connexion en cours...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <div className="w-16 h-16 text-red-500 mb-4">❌</div>
        <p className="text-red-500 mb-2 font-bold">Erreur</p>
        <p className="text-serenity-700 dark:text-serenity-300 mb-4 text-center">{error}</p>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onEndCall}>
            Quitter
          </Button>
          <Button onClick={initializeCall}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-lg overflow-hidden">
      {/* Affichage de la durée */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full z-10">
        {formatTime(callDuration)}
      </div>

      {/* Flux vidéo distant */}
      <div className="flex-grow relative">
        {callType === 'video' ? (
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-32 h-32 rounded-full bg-serenity-700 flex items-center justify-center mb-4">
              <span className="text-white text-4xl">
                {participantName.charAt(0).toUpperCase()}
              </span>
            </div>
            <p className="text-white text-xl">{participantName}</p>
          </div>
        )}
      </div>

      {/* Flux vidéo local (picture-in-picture) */}
      {callType === 'video' && (
        <div className={`absolute bottom-20 right-4 w-32 h-24 rounded-lg border-2 ${
          isTherapist ? 'border-blue-500' : 'border-green-500'
        } overflow-hidden bg-black`}>
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${!isVideoEnabled ? 'hidden' : ''}`}
          />
          {!isVideoEnabled && (
            <div className="w-full h-full flex items-center justify-center bg-gray-800">
              <VideoOff className="h-8 w-8 text-gray-400" />
            </div>
          )}
        </div>
      )}

      {/* Contrôles */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4 p-4">
        <Button
          variant="outline"
          className={`rounded-full p-3 ${isMuted ? 'bg-red-600' : 'bg-serenity-700'} text-white`}
          onClick={toggleAudio}
        >
          {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>

        {callType === 'video' && (
          <Button
            variant="outline"
            className={`rounded-full p-3 ${!isVideoEnabled ? 'bg-red-600' : 'bg-serenity-700'} text-white`}
            onClick={toggleVideo}
          >
            {isVideoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </Button>
        )}

        <Button
          variant="outline"
          className="rounded-full p-3 bg-serenity-700 text-white"
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

      {/* Chat */}
      <Dialog open={showChatDialog} onOpenChange={setShowChatDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Chat avec {participantName}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-64 rounded-md border p-4">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-2 max-w-[80%] p-2 rounded-lg ${
                  msg.sender === (isTherapist ? 'Thérapeute' : 'Patient')
                    ? 'ml-auto bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <div className="text-xs opacity-80 mb-1">{msg.sender} • {msg.time}</div>
                <div>{msg.text}</div>
              </div>
            ))}
          </ScrollArea>
          <div className="flex gap-2 mt-4">
            <Input
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Tapez votre message..."
            />
            <Button onClick={handleSendMessage}>Envoyer</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VideoCall;
