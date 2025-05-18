
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "Grâce à Serenify, j'ai pu trouver un psychologue qui me correspond vraiment. Les séances en ligne sont pratiques et efficaces.",
      author: "Marie L.",
      position: "Enseignante"
    },
    {
      quote: "Le suivi d'humeur m'a permis de mieux comprendre mes émotions et d'identifier les déclencheurs de mon anxiété.",
      author: "Thomas B.",
      position: "Développeur"
    },
    {
      quote: "Les ressources éducatives sont très bien conçues et m'ont beaucoup aidée à comprendre ce que je traversais.",
      author: "Sophie M.",
      position: "Infirmière"
    }
  ];

  return (
    <section className="py-16 bg-serenity-50 dark:bg-serenity-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-serenity-900 dark:text-white mb-4">
            Témoignages
          </h2>
          <p className="text-serenity-600 dark:text-serenity-300 max-w-2xl mx-auto">
            Découvrez ce que nos utilisateurs disent de leur expérience avec Serenify.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white dark:bg-serenity-900 border-serenity-100 dark:border-serenity-700">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-serenity-700 dark:text-serenity-200 italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-serenity-200 dark:bg-serenity-700 flex items-center justify-center text-serenity-600 dark:text-serenity-300">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-serenity-800 dark:text-white">{testimonial.author}</p>
                    <p className="text-sm text-serenity-500 dark:text-serenity-400">{testimonial.position}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
