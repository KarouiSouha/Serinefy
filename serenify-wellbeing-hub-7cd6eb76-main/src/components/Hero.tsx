
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-serenity-50 to-white dark:from-serenity-900 dark:to-serenity-800">
      <div className="absolute inset-0 wave-pattern opacity-50"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-serenity-900 dark:text-white leading-tight animate-fade-in">
              Prenez soin de votre <span className="text-serenity-600">santé mentale</span> avec des experts
            </h1>
            
            <p className="text-lg md:text-xl text-serenity-700 dark:text-serenity-200 max-w-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Accédez à des consultations en ligne, des ressources personnalisées et des outils de suivi pour améliorer votre bien-être mental.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button asChild size="lg" className="rounded-full bg-serenity-600 hover:bg-serenity-700">
                <Link to="/appointments">Prendre rendez-vous</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-serenity-300 dark:border-serenity-600">
                <Link to="/resources">Découvrir les ressources</Link>
              </Button>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-serenity-600 dark:text-serenity-300 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-serenity-300"></div>
                <div className="w-8 h-8 rounded-full bg-serenity-400"></div>
                <div className="w-8 h-8 rounded-full bg-serenity-500"></div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-serenity-600 text-white text-xs">+</div>
              </div>
              <p>Plus de 1000 utilisateurs nous font confiance</p>
            </div>
          </div>
          
          <div className="flex-1 w-full md:w-auto">
            <div className="relative w-full h-80 md:h-96 lg:h-[450px] bg-serenity-100 dark:bg-serenity-700 rounded-2xl shadow-xl overflow-hidden animate-fade-in" style={{ animationDelay: '0.3s' }}>
              {/* Emplacement pour une image ou illustration */}
              <div className="absolute inset-0 bg-gradient-to-br from-serenity-200/50 via-transparent to-mindful-100/50 dark:from-serenity-600/20 dark:via-transparent dark:to-mindful-900/20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
