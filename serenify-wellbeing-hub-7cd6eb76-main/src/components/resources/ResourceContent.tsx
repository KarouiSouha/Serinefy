
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, Bookmark, BookmarkCheck, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ResourceContentProps {
  content: React.ReactNode;
  type: string;
}

const ResourceContent: React.FC<ResourceContentProps> = ({ content, type }) => {
  const { toast } = useToast();
  
  // State to track saved resources
  const [isSaved, setIsSaved] = React.useState(false);
  
  // Function to handle download
  const handleDownload = () => {
    toast({
      title: "Téléchargement démarré",
      description: "Votre fichier sera téléchargé dans quelques instants.",
    });
    
    // In a real app, this would trigger an actual download
    // For demo purposes, we'll just show a toast
    setTimeout(() => {
      toast({
        title: "Téléchargement terminé",
        description: "Votre fichier a été téléchargé avec succès.",
        variant: "default",
      });
    }, 2000);
  };
  
  // Function to save resource
  const handleSave = () => {
    setIsSaved(true);
    toast({
      title: "Ressource sauvegardée",
      description: "Cette ressource a été ajoutée à vos favoris.",
      variant: "default",
    });
  };
  
  return (
    <div className="py-4">
      {typeof content === 'string' ? (
        <div className="prose dark:prose-invert max-w-none">
          {content.split('\n').map((paragraph, index) => {
            // Check if paragraph starts with "Aperçu" or other section headings
            if (paragraph.startsWith("Aperçu") || 
                paragraph.startsWith("Les différents types") ||
                paragraph.startsWith("Symptômes") ||
                paragraph.startsWith("Facteurs") ||
                paragraph.startsWith("Stratégies") ||
                paragraph.startsWith("Quand consulter")) {
              return (
                <h3 key={index} className="text-lg font-display font-semibold text-serenity-700 dark:text-serenity-400 mt-6 mb-3 border-l-4 border-serenity-500 pl-3 py-1 bg-serenity-50 dark:bg-serenity-900/30 rounded-r">
                  {paragraph}
                </h3>
              );
            }
            return <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>;
          })}
        </div>
      ) : (
        content
      )}
      
      {type === 'Vidéo' && (
        <div className="mt-6 flex justify-between">
          <Button 
            variant="outline" 
            size="sm"
            className="hover:bg-primary/10 transition-all duration-300"
            onClick={handleDownload}
          >
            <Download className="mr-2 h-4 w-4" />
            Télécharger
          </Button>
          <Button 
            size="sm"
            className="bg-serenity-600 hover:bg-serenity-700 transition-all duration-300"
            onClick={handleSave}
          >
            {isSaved ? (
              <BookmarkCheck className="mr-2 h-4 w-4 animate-fade-in" />
            ) : (
              <Bookmark className="mr-2 h-4 w-4" />
            )}
            Sauvegarder
          </Button>
        </div>
      )}
      
      {type === 'Article' && (
        <div className="mt-6 flex flex-wrap gap-4">
          <Button 
            className={cn(
              "bg-gradient-to-r from-serenity-500 to-serenity-600",
              "hover:from-serenity-600 hover:to-serenity-700",
              "text-white shadow-md hover:shadow-lg",
              "animate-fade-in transition-all duration-300",
              "relative overflow-hidden group"
            )}
          >
            <span className="absolute inset-0 w-full bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            <ExternalLink className="mr-2 h-4 w-4" />
            Lire l'article complet
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
          </Button>
          <Button 
            variant="outline" 
            className={cn(
              "border-serenity-300 dark:border-serenity-700",
              "hover:bg-serenity-50 dark:hover:bg-serenity-900/50",
              "transition-all duration-300 group"
            )}
            onClick={handleSave}
          >
            {isSaved ? (
              <BookmarkCheck className="mr-2 h-4 w-4 group-hover:text-serenity-600 dark:group-hover:text-serenity-400 transition-colors duration-300" />
            ) : (
              <Bookmark className="mr-2 h-4 w-4 group-hover:text-serenity-600 dark:group-hover:text-serenity-400 transition-colors duration-300" />
            )}
            Sauvegarder pour plus tard
          </Button>
        </div>
      )}
      
      {type === 'Exercice' && (
        <div className="mt-6">
          <Button 
            className={cn(
              "w-full bg-gradient-to-r from-green-500 to-emerald-600",
              "hover:from-green-600 hover:to-emerald-700",
              "text-white font-medium shadow-md hover:shadow-lg",
              "transition-all duration-300 transform hover:-translate-y-1",
              "group relative overflow-hidden"
            )}
          >
            <span className="absolute inset-0 w-1/2 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></span>
            <ExternalLink className="mr-2 h-4 w-4" />
            Commencer l'exercice
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResourceContent;
