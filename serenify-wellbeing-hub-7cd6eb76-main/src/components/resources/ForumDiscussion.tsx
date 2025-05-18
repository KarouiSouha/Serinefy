
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare } from "lucide-react";

interface Message {
  id: number;
  user: {
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
}

interface ForumDiscussionProps {
  topic: string;
}

const ForumDiscussion: React.FC<ForumDiscussionProps> = ({ topic }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      user: { name: 'Marie Dubois', avatar: '' },
      content: 'Bonjour à tous ! Je voulais partager mon expérience avec la méditation pleine conscience. Ça a vraiment changé ma façon de gérer mon anxiété au quotidien.',
      timestamp: '2 heures'
    },
    {
      id: 2,
      user: { name: 'Thomas Martin', avatar: '' },
      content: 'Merci pour ton témoignage Marie ! Est-ce que tu pourrais nous partager quelques techniques simples pour débuter ?',
      timestamp: '1 heure'
    },
    {
      id: 3,
      user: { name: 'Sophie Bernard', avatar: '' },
      content: 'Je suis également intéressée. J\'essaie la méditation depuis quelques semaines mais j\'ai du mal à rester concentrée plus de quelques minutes.',
      timestamp: '45 min'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now(),
      user: { name: 'Vous', avatar: '' },
      content: newMessage.trim(),
      timestamp: 'à l\'instant'
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
    
    toast({
      title: "Message envoyé",
      description: "Votre message a été publié dans la discussion.",
    });
  };
  
  return (
    <div className="space-y-6 py-4">
      <div className="bg-serenity-50 dark:bg-serenity-800 p-4 rounded-md">
        <h3 className="text-lg font-medium mb-2">À propos de cette discussion</h3>
        <p className="text-sm text-serenity-600 dark:text-serenity-300">
          Ce forum vous permet d'échanger avec d'autres utilisateurs sur le thème "{topic}". 
          Partagez vos expériences, posez vos questions et soutenez-vous mutuellement.
        </p>
      </div>
      
      <div className="space-y-4 max-h-[40vh] overflow-y-auto p-1">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="mx-auto h-12 w-12 text-serenity-300 dark:text-serenity-600 mb-2" />
            <p className="text-serenity-600 dark:text-serenity-300">
              Aucun message dans cette discussion pour l'instant. 
              Soyez le premier à partager votre expérience !
            </p>
          </div>
        ) : (
          messages.map(message => (
            <div key={message.id} className={`flex gap-3 ${message.user.name === 'Vous' ? 'justify-end' : ''}`}>
              {message.user.name !== 'Vous' && (
                <Avatar className="w-10 h-10">
                  <AvatarImage src={message.user.avatar} alt={message.user.name} />
                  <AvatarFallback>
                    {message.user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className={`max-w-[70%] ${message.user.name === 'Vous' ? 'bg-serenity-600 text-white' : 'bg-serenity-100 dark:bg-serenity-800'} rounded-lg p-3`}>
                <div className="flex justify-between items-start mb-1">
                  <p className={`font-medium text-sm ${message.user.name === 'Vous' ? 'text-serenity-100' : 'text-serenity-800 dark:text-serenity-100'}`}>
                    {message.user.name}
                  </p>
                  <span className={`text-xs ${message.user.name === 'Vous' ? 'text-serenity-200' : 'text-serenity-500 dark:text-serenity-400'}`}>
                    {message.timestamp}
                  </span>
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
              {message.user.name === 'Vous' && (
                <Avatar className="w-10 h-10">
                  <AvatarImage src="" alt="Vous" />
                  <AvatarFallback>Vous</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))
        )}
      </div>
      
      <div className="space-y-2">
        <Textarea 
          placeholder="Écrivez votre message ici..." 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="min-h-[100px]"
        />
        <div className="flex justify-end">
          <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
            Envoyer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForumDiscussion;
