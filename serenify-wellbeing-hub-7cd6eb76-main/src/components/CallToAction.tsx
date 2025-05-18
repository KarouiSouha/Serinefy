
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-serenity-600 to-serenity-700 text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              Prêt à améliorer votre bien-être mental ?
            </h2>
            <p className="text-serenity-100 max-w-xl">
              Rejoignez Serenify aujourd'hui et commencez votre parcours vers une santé mentale équilibrée avec le soutien de nos experts.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" variant="secondary" className="rounded-full font-semibold bg-white text-serenity-700 hover:bg-serenity-100">
              <Link to="/appointments">Prendre rendez-vous</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full font-semibold border-white text-white hover:bg-white/10">
              <Link to="/signup">Créer un compte</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
