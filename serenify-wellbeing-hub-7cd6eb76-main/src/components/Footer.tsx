
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 px-6 bg-serenity-50 dark:bg-serenity-900 border-t border-serenity-100 dark:border-serenity-800">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-serenity-800 dark:text-serenity-100">Serenify</h3>
            <p className="text-serenity-600 dark:text-serenity-300 text-sm">
              Votre plateforme de bien-être mental. Nous proposons des ressources et des services pour vous aider à améliorer votre santé mentale.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4 text-serenity-800 dark:text-serenity-100">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/appointments" className="text-serenity-600 dark:text-serenity-300 text-sm hover:text-serenity-800 dark:hover:text-white transition-colors">Consultations</Link></li>
              <li><Link to="/resources" className="text-serenity-600 dark:text-serenity-300 text-sm hover:text-serenity-800 dark:hover:text-white transition-colors">Ressources</Link></li>
              <li><Link to="/mood-tracker" className="text-serenity-600 dark:text-serenity-300 text-sm hover:text-serenity-800 dark:hover:text-white transition-colors">Suivi d'humeur</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4 text-serenity-800 dark:text-serenity-100">Aide</h4>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-serenity-600 dark:text-serenity-300 text-sm hover:text-serenity-800 dark:hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-serenity-600 dark:text-serenity-300 text-sm hover:text-serenity-800 dark:hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/emergency" className="text-serenity-600 dark:text-serenity-300 text-sm hover:text-serenity-800 dark:hover:text-white transition-colors">Urgences</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4 text-serenity-800 dark:text-serenity-100">Légal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-serenity-600 dark:text-serenity-300 text-sm hover:text-serenity-800 dark:hover:text-white transition-colors">Confidentialité</Link></li>
              <li><Link to="/terms" className="text-serenity-600 dark:text-serenity-300 text-sm hover:text-serenity-800 dark:hover:text-white transition-colors">Conditions d'utilisation</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-serenity-200 dark:border-serenity-700">
          <p className="text-center text-serenity-500 dark:text-serenity-400 text-sm">
            © {new Date().getFullYear()} Serenify. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
