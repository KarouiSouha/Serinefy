
import React from 'react';
import ServiceCard from './ServiceCard';
import { Calendar, BookOpen, Heart, User } from 'lucide-react';

const ServiceSection: React.FC = () => {
  const services = [
    {
      title: 'Consultations',
      description: 'Prenez rendez-vous avec nos psychologues certifiés pour des séances en ligne.',
      icon: <Calendar className="w-6 h-6" />,
      link: '/appointments',
      linkText: 'Prendre rendez-vous'
    },
    {
      title: 'Ressources éducatives',
      description: 'Accédez à des articles, vidéos et guides sur différents aspects de la santé mentale.',
      icon: <BookOpen className="w-6 h-6" />,
      link: '/resources',
      linkText: 'Explorer les ressources'
    },
    {
      title: 'Suivi d\'humeur',
      description: 'Suivez votre humeur quotidienne et identifiez des tendances pour mieux vous comprendre.',
      icon: <Heart className="w-6 h-6" />,
      link: '/mood-tracker',
      linkText: 'Commencer le suivi'
    },
    {
      title: 'Communauté',
      description: 'Rejoignez une communauté bienveillante pour partager vos expériences et vous soutenir mutuellement.',
      icon: <User className="w-6 h-6" />,
      link: '/community',
      linkText: 'Rejoindre la communauté'
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-serenity-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-serenity-900 dark:text-white mb-4">
            Nos Services
          </h2>
          <p className="text-serenity-600 dark:text-serenity-300 max-w-2xl mx-auto">
            Découvrez nos services conçus pour vous accompagner dans votre parcours vers une meilleure santé mentale.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              link={service.link}
              linkText={service.linkText}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
