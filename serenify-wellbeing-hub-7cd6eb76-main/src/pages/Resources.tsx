
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, Heart, MessageSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ResourceContent from '@/components/resources/ResourceContent';
import ForumDiscussion from '@/components/resources/ForumDiscussion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Resources: React.FC = () => {
  const [selectedResource, setSelectedResource] = useState<null | {
    title: string;
    type: string;
    content?: React.ReactNode;
    subtopics?: Array<{title: string, content: string | React.ReactNode}>;
  }>(null);

  const resourceCategories = [
    {
      title: "Articles",
      description: "Articles informatifs sur divers aspects de la santé mentale",
      icon: <BookOpen className="h-6 w-6" />,
      resources: [
        { 
          title: "Comprendre l'anxiété", 
          type: "Article",
          content: "L'anxiété est une réaction normale face à des situations stressantes ou menaçantes. Cependant, lorsqu'elle devient chronique ou disproportionnée, elle peut affecter significativement votre qualité de vie.",
          subtopics: [
            { 
              title: "Les différents types d'anxiété", 
              content: "Il existe plusieurs formes d'anxiété, chacune avec ses propres caractéristiques. Le trouble d'anxiété généralisée (TAG) se caractérise par des inquiétudes excessives concernant divers aspects de la vie. Les attaques de panique provoquent des sensations intenses de peur accompagnées de symptômes physiques. Les phobies consistent en une peur irrationnelle d'objets ou de situations spécifiques. Le trouble d'anxiété sociale implique une peur intense des situations sociales. Le trouble obsessionnel-compulsif (TOC) se manifeste par des pensées intrusives et des comportements répétitifs." 
            },
            { 
              title: "Symptômes physiques et émotionnels", 
              content: "L'anxiété se manifeste par de nombreux symptômes physiques comme les palpitations cardiaques, la transpiration excessive, les tremblements, les tensions musculaires, et les troubles digestifs. Sur le plan émotionnel, elle peut provoquer une inquiétude constante, une irritabilité, des difficultés de concentration, et des troubles du sommeil. Reconnaître ces symptômes est la première étape pour mieux gérer l'anxiété." 
            },
            { 
              title: "Facteurs déclenchants et causes", 
              content: "L'anxiété peut être déclenchée par des facteurs génétiques, des déséquilibres chimiques dans le cerveau, des traumatismes passés, du stress chronique, ou des problèmes de santé sous-jacents. Certains événements de vie stressants comme un changement professionnel, un déménagement, ou des problèmes relationnels peuvent également provoquer ou aggraver l'anxiété. Identifier vos déclencheurs personnels est essentiel pour développer des stratégies de gestion efficaces." 
            },
            { 
              title: "Stratégies d'auto-gestion", 
              content: "Plusieurs techniques peuvent vous aider à gérer votre anxiété au quotidien. La respiration profonde, la méditation pleine conscience, et l'exercice physique régulier sont particulièrement efficaces. Limiter la consommation de caféine, d'alcool et maintenir un sommeil de qualité contribuent également à réduire l'anxiété. Il est aussi important d'apprendre à reconnaître et à remettre en question vos pensées anxieuses." 
            },
            { 
              title: "Quand consulter un professionnel", 
              content: "Si votre anxiété persiste malgré vos efforts d'auto-gestion, interfère avec votre fonctionnement quotidien, ou s'accompagne de pensées suicidaires, il est temps de consulter un professionnel. Les psychologues, psychiatres et psychothérapeutes peuvent vous proposer des approches thérapeutiques efficaces comme la thérapie cognitive-comportementale, la thérapie d'exposition, et parfois des médicaments si nécessaire." 
            }
          ]
        },
        { 
          title: "Les bases de la méditation pleine conscience", 
          type: "Article",
          content: "La méditation pleine conscience est une pratique qui consiste à porter intentionnellement son attention sur le moment présent, sans jugement.",
          subtopics: [
            { 
              title: "Origines et principes fondamentaux", 
              content: "La pleine conscience trouve ses racines dans les traditions bouddhistes vieilles de 2500 ans, mais a été adaptée à un contexte laïc et scientifique par Jon Kabat-Zinn dans les années 1970. Le principe central est de développer une attention intentionnelle au moment présent, sans jugement ni réaction. Cette pratique nous invite à observer nos pensées, émotions et sensations comme des phénomènes transitoires plutôt que comme des vérités absolues." 
            },
            { 
              title: "Bienfaits validés scientifiquement", 
              content: "De nombreuses études scientifiques ont démontré les bénéfices de la méditation pleine conscience. Elle contribue à réduire le stress, l'anxiété et les symptômes dépressifs. Elle améliore la concentration, la mémoire et les fonctions cognitives. Sur le plan physique, elle peut diminuer la pression artérielle, améliorer le sommeil et renforcer le système immunitaire. La pleine conscience favorise également une plus grande régulation émotionnelle et une meilleure qualité des relations interpersonnelles." 
            },
            { 
              title: "Pratiques formelles et informelles", 
              content: "La méditation pleine conscience peut être pratiquée de façon formelle, en consacrant un moment spécifique chaque jour à méditer assis, allongé ou en marchant. Les pratiques informelles consistent à intégrer la pleine conscience dans vos activités quotidiennes, comme manger en pleine conscience, marcher en pleine conscience ou simplement prêter attention à vos sens lors de tâches routinières. Les deux approches sont complémentaires et renforcent votre capacité à être présent." 
            },
            { 
              title: "Surmonter les obstacles courants", 
              content: "Les débutants rencontrent souvent des difficultés comme l'agitation mentale, l'ennui, la somnolence ou l'impatience face aux résultats. Il est important de comprendre que ces obstacles font partie intégrante du processus d'apprentissage. La clé est de les observer sans jugement et de revenir doucement à votre objet d'attention, généralement la respiration. La constance dans la pratique est plus importante que la durée des séances." 
            },
            { 
              title: "Intégrer la pleine conscience au quotidien", 
              content: "Pour tirer pleinement profit de la méditation pleine conscience, il est recommandé de la pratiquer quotidiennement, même brièvement. Commencez par des séances courtes de 5-10 minutes et augmentez progressivement. Utilisez des rappels dans votre environnement pour vous inciter à des moments de pleine conscience. Des applications mobiles, des groupes de méditation ou des retraites peuvent soutenir votre pratique et approfondir votre expérience." 
            }
          ]
        },
        { 
          title: "Comment gérer le stress au quotidien", 
          type: "Article",
          content: "Le stress chronique peut avoir un impact négatif sur votre santé physique et mentale.",
          subtopics: [
            { 
              title: "Comprendre les mécanismes du stress", 
              content: "Le stress est une réaction naturelle de l'organisme face à une menace ou un défi. Il déclenche la production d'hormones comme le cortisol et l'adrénaline qui préparent le corps à réagir. À court terme, le stress peut être bénéfique en améliorant les performances et la concentration. Cependant, lorsqu'il devient chronique, il peut causer de nombreux problèmes de santé comme les maladies cardiovasculaires, les troubles digestifs, l'affaiblissement du système immunitaire et divers troubles psychologiques." 
            },
            { 
              title: "Identifier vos sources de stress", 
              content: "Pour gérer efficacement votre stress, il est essentiel d'en identifier les causes. Tenez un journal de stress pendant quelques semaines en notant les situations stressantes, vos réactions physiques et émotionnelles, et vos stratégies d'adaptation. Analysez ensuite ces informations pour repérer des schémas récurrents. Les sources de stress peuvent être externes (travail, relations, finances) ou internes (perfectionnisme, autocritique excessive, pensées catastrophiques)." 
            },
            { 
              title: "Techniques de relaxation rapide", 
              content: "Plusieurs techniques peuvent vous aider à réduire rapidement votre niveau de stress. La respiration diaphragmatique consiste à respirer profondément par le ventre pendant quelques minutes. La relaxation musculaire progressive implique de contracter puis relâcher successivement différents groupes musculaires. La visualisation positive vous invite à imaginer un lieu ou une situation apaisante. Ces techniques peuvent être pratiquées discrètement, même dans un environnement professionnel." 
            },
            { 
              title: "Organisation et gestion du temps", 
              content: "Une mauvaise organisation est souvent source de stress. Apprenez à établir des priorités en distinguant l'urgent de l'important. Découpez les grands projets en tâches plus petites et plus gérables. N'hésitez pas à déléguer quand c'est possible. Prévoyez des pauses régulières dans votre journée pour vous ressourcer. Enfin, apprenez à dire non et à fixer des limites saines pour éviter la surcharge de travail et les responsabilités excessives." 
            },
            { 
              title: "Mode de vie anti-stress", 
              content: "Adoptez un mode de vie qui renforce votre résilience face au stress. L'activité physique régulière est l'un des meilleurs anti-stress naturels. Une alimentation équilibrée, riche en fruits, légumes et oméga-3, contribue à votre bien-être. Limitez la consommation d'excitants comme la caféine et l'alcool. Accordez une attention particulière à votre sommeil en établissant une routine régulière. Enfin, cultivez des relations sociales positives et des activités qui vous procurent du plaisir et de la détente." 
            }
          ]
        },
        { 
          title: "Le sommeil et la santé mentale", 
          type: "Article",
          content: "Le sommeil joue un rôle crucial dans notre santé mentale et émotionnelle.",
          subtopics: [
            { 
              title: "Les cycles du sommeil et leur importance", 
              content: "Le sommeil se compose de plusieurs cycles d'environ 90 minutes, chacun comprenant différentes phases : l'endormissement, le sommeil léger, le sommeil profond et le sommeil paradoxal (REM). Chaque phase remplit des fonctions spécifiques : le sommeil profond favorise la récupération physique et la consolidation de la mémoire, tandis que le sommeil paradoxal est essentiel pour l'équilibre émotionnel et la créativité. Un cycle complet de sommeil permet une récupération optimale tant sur le plan physique que mental." 
            },
            { 
              title: "La relation bidirectionnelle entre sommeil et santé mentale", 
              content: "Les troubles du sommeil peuvent être à la fois une cause et une conséquence des problèmes de santé mentale. L'insomnie chronique augmente significativement le risque de développer une dépression ou un trouble anxieux. Inversement, l'anxiété et la dépression perturbent souvent la qualité et la quantité de sommeil. Cette relation crée parfois un cercle vicieux difficile à briser. Des recherches récentes suggèrent également que le manque de sommeil affecte notre capacité à réguler nos émotions et à faire face au stress." 
            },
            { 
              title: "Signes d'un trouble du sommeil", 
              content: "Plusieurs symptômes peuvent indiquer un trouble du sommeil : difficulté à s'endormir (plus de 30 minutes), réveils nocturnes fréquents ou prolongés, réveil précoce sans pouvoir se rendormir, sensation de fatigue au réveil malgré une durée de sommeil suffisante, somnolence diurne excessive, irritabilité ou difficultés de concentration. Si ces symptômes persistent pendant plus d'un mois et affectent votre fonctionnement quotidien, il est recommandé de consulter un professionnel de santé." 
            },
            { 
              title: "Créer un environnement propice au sommeil", 
              content: "L'environnement dans lequel vous dormez influence considérablement la qualité de votre sommeil. Votre chambre devrait être fraîche (entre 16 et 19°C), calme et sombre. Investissez dans une literie confortable adaptée à vos besoins. Limitez les sources de lumière bleue (écrans) au moins une heure avant le coucher, car elles inhibent la production de mélatonine, l'hormone du sommeil. Des bouchons d'oreilles, un masque de sommeil ou un appareil à bruit blanc peuvent aider à créer des conditions optimales." 
            },
            { 
              title: "Rituels et habitudes pour un sommeil réparateur", 
              content: "Établir une routine régulière aide votre corps à reconnaître le moment du coucher. Couchez-vous et levez-vous à des heures fixes, même le week-end. Avant de dormir, pratiquez des activités relaxantes comme la lecture, un bain chaud, ou des exercices de respiration. Évitez les repas lourds, l'alcool, la caféine et l'exercice intense dans les heures précédant le coucher. Si vous n'arrivez pas à vous endormir après 20 minutes, levez-vous et faites une activité calme jusqu'à ce que vous ressentiez la somnolence." 
            }
          ]
        }
      ]
    },
    {
      title: "Vidéos",
      description: "Vidéos éducatives et exercices guidés",
      icon: <Video className="h-6 w-6" />,
      resources: [
        { 
          title: "Méditation guidée pour débutants", 
          type: "Vidéo",
          content: <div className="space-y-4">
            <div className="aspect-video bg-black rounded-md">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/xoYnqvadurg"
                title="Méditation guidée pour débutants"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Cette méditation guidée de 10 minutes est parfaite pour les débutants qui souhaitent découvrir la pratique de la pleine conscience.
            </p>
          </div>,
          subtopics: [
            { 
              title: "Méditation pour l'anxiété", 
              content: <div className="aspect-video bg-black rounded-md">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/O-6f5wQXSu8"
                  title="Méditation pour l'anxiété"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            },
            { 
              title: "Méditation du soir pour bien dormir", 
              content: <div className="aspect-video bg-black rounded-md">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/MR57rug8NsM"
                  title="Méditation du soir pour bien dormir"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            },
            { 
              title: "Méditation de gratitude", 
              content: <div className="aspect-video bg-black rounded-md">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/UEbuKJX_xqE"
                  title="Méditation de gratitude"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            }
          ]
        },
        { 
          title: "Exercices de respiration pour l'anxiété", 
          type: "Vidéo",
          content: <div className="space-y-4">
            <div className="aspect-video bg-black rounded-md">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/uxayUBd6T7M"
                title="Exercices de respiration pour l'anxiété"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Apprenez des techniques de respiration simples et efficaces pour calmer rapidement l'anxiété et le stress.
            </p>
          </div>,
          subtopics: [
            { 
              title: "Respiration carrée (4-4-4-4)", 
              content: <div className="aspect-video bg-black rounded-md">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/n8s-8KtfgFM"
                  title="Respiration carrée (4-4-4-4)"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            },
            { 
              title: "Respiration 4-7-8", 
              content: <div className="aspect-video bg-black rounded-md">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/1Dv-ldGLnIY"
                  title="Respiration 4-7-8"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            },
            { 
              title: "Cohérence cardiaque", 
              content: <div className="aspect-video bg-black rounded-md">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/X3Wgy8JVdko"
                  title="Cohérence cardiaque"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            }
          ]
        },
        { 
          title: "Yoga doux pour la relaxation", 
          type: "Vidéo",
          content: <div className="space-y-4">
            <div className="aspect-video bg-black rounded-md">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/X3Wgy8JVdko"
                title="Yoga doux pour la relaxation"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Une séance de yoga douce, accessible à tous, pour détendre le corps et l'esprit après une journée stressante.
            </p>
          </div>,
          subtopics: [
            { 
              title: "Yoga pour débutants", 
              content: <div className="aspect-video bg-black rounded-md">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/0o0kNeOyH98"
                  title="Yoga pour débutants"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            },
            { 
              title: "Yoga du soir", 
              content: <div className="aspect-video bg-black rounded-md">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/AsJLeuA-L14"
                  title="Yoga du soir"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            },
            { 
              title: "Yoga pour le mal de dos", 
              content: <div className="aspect-video bg-black rounded-md">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/XBaThglHLlE"
                  title="Yoga pour le mal de dos"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            }
          ]
        },
        { 
          title: "Comment pratiquer la pleine conscience", 
          type: "Vidéo",
          content: <div className="space-y-4">
            <div className="aspect-video bg-black rounded-md">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/PY9AcOCqUss"
                title="Comment pratiquer la pleine conscience"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Découvrez comment intégrer la pleine conscience dans votre quotidien pour réduire le stress et améliorer votre bien-être.
            </p>
          </div>,
          subtopics: [
            { 
              title: "Pleine conscience au quotidien", 
              content: <div className="aspect-video bg-black rounded-md">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/sz-JgzlUEDo"
                  title="Pleine conscience au quotidien"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            },
            { 
              title: "Body scan guidé", 
              content: <div className="aspect-video bg-black rounded-md">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/9FourBEpQ9I"
                  title="Body scan guidé"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            },
            { 
              title: "Méditation de pleine conscience en marchant", 
              content: <div className="aspect-video bg-black rounded-md">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/QJAcZKBfPIk"
                  title="Méditation de pleine conscience en marchant"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            }
          ]
        }
      ]
    },
    {
      title: "Exercices pratiques",
      description: "Activités et exercices pour améliorer votre bien-être",
      icon: <Heart className="h-6 w-6" />,
      resources: [
        { 
          title: "Journal de gratitude", 
          type: "Exercice",
          content: <div className="space-y-4">
            <p>Le journal de gratitude est un outil simple mais puissant pour améliorer votre bien-être mental. En prenant l'habitude de noter régulièrement les choses pour lesquelles vous êtes reconnaissant, vous entraînez votre cerveau à remarquer davantage les aspects positifs de votre vie.</p>
          </div>,
          subtopics: [
            { 
              title: "Comment démarrer un journal de gratitude", 
              content: <div className="space-y-4">
                <p>Pour commencer un journal de gratitude efficacement :</p>
                <ol className="list-decimal list-inside space-y-2 pl-4">
                  <li>Choisissez un carnet dédié ou une application de journal</li>
                  <li>Définissez un moment précis de la journée pour cette pratique (matin ou soir)</li>
                  <li>Commencez par noter 3 choses pour lesquelles vous êtes reconnaissant</li>
                  <li>Soyez spécifique et détaillé dans vos descriptions</li>
                  <li>Variez entre les grandes et petites sources de gratitude</li>
                  <li>Incluez une réflexion sur vos émotions associées à ces expériences</li>
                </ol>
                <p className="mt-4">La constance est plus importante que la quantité. Une pratique régulière, même brève, apportera davantage de bénéfices qu'une longue réflexion occasionnelle.</p>
              </div>
            },
            { 
              title: "Exercices complémentaires de gratitude", 
              content: <div className="space-y-4">
                <h4 className="font-medium mb-2">Lettre de gratitude :</h4>
                <p>Écrivez une lettre détaillée à quelqu'un qui a eu un impact positif dans votre vie. Exprimez précisément ce qu'il a fait pour vous et comment cela vous a affecté. Vous pouvez choisir d'envoyer cette lettre ou simplement l'écrire pour vous-même.</p>
                
                <h4 className="font-medium mb-2 mt-4">Méditation de gratitude :</h4>
                <p>Consacrez 5-10 minutes à méditer sur ce qui vous apporte de la gratitude. Commencez par vous concentrer sur votre respiration, puis visualisez des personnes, des expériences ou des choses pour lesquelles vous êtes reconnaissant. Remarquez les sensations physiques et émotionnelles qui accompagnent ce sentiment.</p>
                
                <h4 className="font-medium mb-2 mt-4">Jar de gratitude :</h4>
                <p>Placez un bocal dans un endroit visible de votre maison. Chaque jour, écrivez une chose pour laquelle vous êtes reconnaissant sur un petit morceau de papier et placez-le dans le bocal. Dans les moments difficiles, vous pourrez relire ces notes pour vous rappeler les aspects positifs de votre vie.</p>
              </div>
            },
            { 
              title: "Bénéfices scientifiquement prouvés", 
              content: <div className="space-y-4">
                <p>Des recherches scientifiques ont démontré que la pratique régulière de la gratitude procure de nombreux bienfaits :</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Augmentation du niveau de bonheur et réduction des symptômes dépressifs</li>
                  <li>Amélioration de la qualité du sommeil et diminution du temps d'endormissement</li>
                  <li>Renforcement du système immunitaire et réduction des douleurs physiques</li>
                  <li>Développement de relations interpersonnelles plus positives</li>
                  <li>Réduction du stress et amélioration de la résilience face aux difficultés</li>
                  <li>Augmentation de l'estime de soi et diminution des comparaisons sociales négatives</li>
                </ul>
                <p className="mt-4">Ces effets s'expliquent notamment par des changements neurochimiques et par une modification progressive de notre attention, qui devient plus sensible aux aspects positifs de notre expérience.</p>
              </div>
            }
          ]
        },
        { 
          title: "Technique 5-4-3-2-1 contre l'anxiété", 
          type: "Exercice",
          content: <div className="space-y-4">
            <p>La technique 5-4-3-2-1 est une méthode efficace de pleine conscience pour vous aider à vous ancrer dans le moment présent lorsque vous ressentez de l'anxiété ou des pensées envahissantes.</p>
          </div>,
          subtopics: [
            { 
              title: "Guide pas à pas de la technique", 
              content: <div className="space-y-4">
                <p>Voici comment pratiquer cette technique d'ancrage sensoriel :</p>
                <ol className="list-decimal list-inside space-y-4 pl-4">
                  <li>
                    <strong>5 choses que vous pouvez voir</strong>
                    <p className="mt-1">Regardez autour de vous et identifiez cinq objets distincts. Nommez-les mentalement et observez leurs détails (couleur, texture, forme).</p>
                  </li>
                  <li>
                    <strong>4 choses que vous pouvez toucher</strong>
                    <p className="mt-1">Concentrez-vous sur quatre sensations tactiles différentes. Cela peut être le contact de vos vêtements sur votre peau, la texture d'un objet à proximité, ou la sensation de l'air sur votre visage.</p>
                  </li>
                  <li>
                    <strong>3 choses que vous pouvez entendre</strong>
                    <p className="mt-1">Écoutez attentivement et identifiez trois sons distincts dans votre environnement, des plus évidents aux plus subtils.</p>
                  </li>
                  <li>
                    <strong>2 choses que vous pouvez sentir</strong>
                    <p className="mt-1">Remarquez deux odeurs présentes autour de vous. Si nécessaire, vous pouvez vous rapprocher d'un objet ayant une odeur identifiable.</p>
                  </li>
                  <li>
                    <strong>1 chose que vous pouvez goûter</strong>
                    <p className="mt-1">Identifiez une saveur dans votre bouche. Si nécessaire, vous pouvez prendre une petite collation ou une boisson.</p>
                  </li>
                </ol>
                <p className="mt-4">Cette technique fonctionne en redirigeant votre attention vers vos sens, ce qui interrompt le cycle des pensées anxieuses et vous ramène dans l'instant présent.</p>
              </div>
            },
            { 
              title: "Quand et comment l'utiliser", 
              content: <div className="space-y-4">
                <p>Cette technique est particulièrement utile dans les situations suivantes :</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Pendant une crise d'anxiété ou une attaque de panique</li>
                  <li>Lorsque votre esprit est submergé par des inquiétudes</li>
                  <li>Pour vous aider à vous endormir quand les pensées tournent en boucle</li>
                  <li>Dans des situations de stress aigu (avant une présentation, un examen, etc.)</li>
                  <li>Pour revenir au moment présent après une dissociation</li>
                </ul>
                
                <p className="mt-4">Pour une efficacité optimale :</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Pratiquez lentement et délibérément, en prenant le temps d'explorer chaque sens</li>
                  <li>Respirez profondément entre chaque étape</li>
                  <li>Si possible, verbalisez à haute voix ce que vous observez pour renforcer l'ancrage</li>
                  <li>Personnalisez la technique si certains sens sont moins accessibles pour vous</li>
                </ul>
              </div>
            },
            { 
              title: "Variations et adaptations", 
              content: <div className="space-y-4">
                <p>La technique 5-4-3-2-1 peut être adaptée selon vos besoins et contextes :</p>
                
                <h4 className="font-medium mb-2">Version simplifiée pour les enfants :</h4>
                <p>Réduisez le nombre d'éléments à identifier pour chaque sens (par exemple, 3-2-1) et utilisez un langage adapté à l'âge de l'enfant.</p>
                
                <h4 className="font-medium mb-2 mt-4">Version discrète pour les lieux publics :</h4>
                <p>Concentrez-vous uniquement sur la vue et le toucher si vous êtes dans un endroit où vous ne pouvez pas facilement explorer tous vos sens.</p>
                
                <h4 className="font-medium mb-2 mt-4">Version approfondie pour la pratique régulière :</h4>
                <p>Augmentez le nombre d'éléments à identifier pour chaque sens et prenez le temps d'explorer chaque sensation en détail.</p>
                
                <h4 className="font-medium mb-2 mt-4">Intégration avec la respiration :</h4>
                <p>Combinez cette technique avec des exercices de respiration profonde entre chaque étape pour amplifier l'effet calmant.</p>
                
                <p className="mt-4">L'objectif principal reste toujours le même : interrompre le cycle des pensées anxieuses en ramenant votre attention vers l'expérience sensorielle du moment présent.</p>
              </div>
            }
          ]
        },
        { 
          title: "Exercice de restructuration cognitive", 
          type: "Exercice",
          content: <div className="space-y-4">
            <p>La restructuration cognitive est une technique issue de la thérapie cognitive comportementale (TCC) qui permet d'identifier et de modifier les pensées négatives irrationnelles qui influencent nos émotions et nos comportements.</p>
          </div>,
          subtopics: [
            { 
              title: "Identifier les distorsions cognitives", 
              content: <div className="space-y-4">
                <p>Les distorsions cognitives sont des schémas de pensée biaisés qui déforment notre perception de la réalité. Voici les plus courantes :</p>
                
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li><strong>Pensée du tout ou rien</strong> : Voir les situations en termes absolus (parfait/échec)</li>
                  <li><strong>Surgénéralisation</strong> : Tirer une conclusion générale d'un événement isolé</li>
                  <li><strong>Filtrage mental</strong> : Se concentrer uniquement sur les aspects négatifs</li>
                  <li><strong>Disqualification du positif</strong> : Rejeter les expériences positives</li>
                  <li><strong>Conclusions hâtives</strong> : Faire des interprétations négatives sans preuves</li>
                  <li><strong>Amplification/minimisation</strong> : Exagérer l'importance des échecs et minimiser les réussites</li>
                  <li><strong>Raisonnement émotionnel</strong> : Croire que ce que l'on ressent reflète la réalité</li>
                  <li><strong>Fausses obligations</strong> : Utiliser des "je dois" ou "je devrais" rigides</li>
                  <li><strong>Étiquetage</strong> : S'attribuer des étiquettes globales négatives</li>
                  <li><strong>Personnalisation</strong> : S'attribuer la responsabilité d'événements extérieurs</li>
                </ul>
                
                <p className="mt-4">Apprendre à identifier ces distorsions dans vos propres pensées est la première étape de la restructuration cognitive.</p>
              </div>
            },
            { 
              title: "Journal de restructuration cognitive", 
              content: <div className="space-y-4">
                <p>Voici un exercice pratique de restructuration cognitive en 5 étapes :</p>
                
                <div className="border p-4 rounded-md bg-serenity-50 dark:bg-serenity-900">
                  <h4 className="font-medium mb-4">Journal de restructuration cognitive</h4>
                  <ol className="list-decimal list-inside space-y-6 pl-4">
                    <li>
                      <strong>Situation</strong>
                      <p className="mt-1">Décrivez objectivement la situation qui a déclenché votre détresse émotionnelle (qui, quoi, où, quand).</p>
                      <p className="italic text-gray-600 dark:text-gray-400 mt-1">Exemple : "Mon collègue n'a pas répondu à mon email après 24 heures."</p>
                    </li>
                    <li>
                      <strong>Pensées automatiques</strong>
                      <p className="mt-1">Notez les pensées qui vous sont venues spontanément et évaluez votre degré de croyance (0-100%).</p>
                      <p className="italic text-gray-600 dark:text-gray-400 mt-1">Exemple : "Il m'ignore délibérément. Mon travail ne doit pas être important pour lui." (Croyance : 80%)</p>
                    </li>
                    <li>
                      <strong>Émotions et sensations</strong>
                      <p className="mt-1">Identifiez les émotions ressenties et leur intensité (0-100%), ainsi que les sensations physiques associées.</p>
                      <p className="italic text-gray-600 dark:text-gray-400 mt-1">Exemple : "Anxiété (70%), frustration (85%). Tension dans les épaules, rythme cardiaque accéléré."</p>
                    </li>
                    <li>
                      <strong>Pensées alternatives</strong>
                      <p className="mt-1">Générez des interprétations plus équilibrées et réalistes de la situation.</p>
                      <p className="italic text-gray-600 dark:text-gray-400 mt-1">Exemple : "Il est peut-être très occupé. Mon email n'était pas urgent. Il m'a toujours répondu dans le passé."</p>
                    </li>
                    <li>
                      <strong>Résultat</strong>
                      <p className="mt-1">Réévaluez votre croyance dans la pensée initiale et notez comment vos émotions ont changé.</p>
                      <p className="italic text-gray-600 dark:text-gray-400 mt-1">Exemple : "Croyance dans la pensée initiale : 30%. Anxiété : 40%, frustration : 35%."</p>
                    </li>
                  </ol>
                </div>
                
                <p className="mt-4">Pratiquez cet exercice régulièrement pour développer l'habitude d'examiner vos pensées de manière critique et objective.</p>
              </div>
            },
            { 
              title: "Questions pour défier les pensées négatives", 
              content: <div className="space-y-4">
                <p>Voici des questions puissantes pour remettre en question vos pensées négatives irrationnelles :</p>
                
                <ul className="list-disc list-inside space-y-3 pl-4">
                  <li><strong>Preuve</strong> : Quelles preuves soutiennent cette pensée ? Quelles preuves la contredisent ?</li>
                  <li><strong>Alternatives</strong> : Y a-t-il d'autres explications ou interprétations possibles ?</li>
                  <li><strong>Perspective</strong> : Que dirais-je à un ami qui aurait cette même pensée ?</li>
                  <li><strong>Utilité</strong> : Cette pensée m'aide-t-elle à résoudre le problème ou à me sentir mieux ?</li>
                  <li><strong>Conséquences</strong> : Quelles sont les conséquences de croire à cette pensée versus une pensée plus équilibrée ?</li>
                  <li><strong>Nuances</strong> : Est-ce que je pense en termes de "tout ou rien" ? Y a-t-il des nuances que j'ignore ?</li>
                  <li><strong>Contexte</strong> : Comment mon état d'esprit actuel (fatigue, stress, etc.) influence-t-il ma perception ?</li>
                  <li><strong>Futur</strong> : Cette situation sera-t-elle encore importante dans une semaine, un mois, un an ?</li>
                </ul>
                
                <p className="mt-4">Gardez ces questions à portée de main (par exemple dans votre téléphone) pour les consulter lorsque vous remarquez des pensées négatives.</p>
              </div>
            }
          ]
        },
        { 
          title: "Établir une routine de sommeil saine", 
          type: "Exercice",
          content: <div className="space-y-4">
            <p>Une bonne hygiène de sommeil est essentielle pour votre santé mentale et physique. Voici un programme pour établir une routine de sommeil plus saine en 7 jours.</p>
          </div>,
          subtopics: [
            { 
              title: "Évaluation de votre sommeil actuel", 
              content: <div className="space-y-4">
                <p>Avant de modifier vos habitudes, prenez le temps d'évaluer votre sommeil actuel :</p>
                
                <div className="border p-4 rounded-md bg-serenity-50 dark:bg-serenity-900">
                  <h4 className="font-medium mb-4">Journal de sommeil</h4>
                  <p>Pendant 7 jours, notez les informations suivantes :</p>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>Heure du coucher</li>
                    <li>Temps estimé pour s'endormir</li>
                    <li>Nombre et durée des réveils nocturnes</li>
                    <li>Heure du réveil final</li>
                    <li>Qualité perçue du sommeil (1-10)</li>
                    <li>Niveau d'énergie durant la journée (1-10)</li>
                    <li>Consommation de caféine, d'alcool et activité physique</li>
                    <li>Activités réalisées avant le coucher</li>
                  </ul>
                </div>
                
                <p className="mt-4">Cette évaluation initiale vous permettra d'identifier vos problèmes spécifiques et de mesurer vos progrès après avoir mis en place de nouvelles habitudes.</p>
              </div>
            },
            { 
              title: "Programme de 7 jours pour améliorer votre sommeil", 
              content: <div className="space-y-4">
                <div className="border p-4 rounded-md bg-serenity-50 dark:bg-serenity-900">
                  <h4 className="font-medium mb-4">Programme sur 7 jours</h4>
                  <div className="space-y-6">
                    <div>
                      <h5 className="font-medium">Jour 1 : Établir un horaire régulier</h5>
                      <ul className="list-disc list-inside pl-4 mt-2">
                        <li>Déterminez votre heure idéale de coucher et de réveil (visant 7-9h de sommeil)</li>
                        <li>Programmez des alarmes pour ces horaires</li>
                        <li>Respectez ces horaires même le week-end (± 30 minutes)</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium">Jour 2 : Optimiser votre environnement</h5>
                      <ul className="list-disc list-inside pl-4 mt-2">
                        <li>Assurez-vous que votre chambre est fraîche (16-19°C)</li>
                        <li>Éliminez les sources de lumière (utilisez des rideaux occultants ou un masque)</li>
                        <li>Réduisez les bruits (utilisez des bouchons d'oreilles ou un appareil à bruit blanc)</li>
                        <li>Vérifiez le confort de votre matelas et oreiller</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium">Jour 3 : Développer une routine de relaxation</h5>
                      <ul className="list-disc list-inside pl-4 mt-2">
                        <li>Commencez une routine de 30 minutes avant le coucher</li>
                        <li>Incluez des activités relaxantes (lecture, étirements doux, méditation)</li>
                        <li>Prenez un bain chaud (la baisse de température corporelle après favorise l'endormissement)</li>
                        <li>Pratiquez une technique de respiration profonde au lit</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium">Jour 4 : Gérer l'exposition aux écrans</h5>
                      <ul className="list-disc list-inside pl-4 mt-2">
                        <li>Arrêtez tous les écrans au moins 1h avant le coucher</li>
                        <li>Activez les filtres de lumière bleue sur vos appareils après le coucher du soleil</li>
                        <li>Éloignez votre téléphone de votre lit (utilisez une alarme traditionnelle si nécessaire)</li>
                        <li>Remplacez la navigation sur internet par des activités non stimulantes</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium">Jour 5 : Ajuster votre alimentation et activité physique</h5>
                      <ul className="list-disc list-inside pl-4 mt-2">
                        <li>Évitez la caféine après midi</li>
                        <li>Ne consommez pas d'alcool dans les 3h avant le coucher</li>
                        <li>Évitez les repas lourds en soirée</li>
                        <li>Pratiquez une activité physique modérée durant la journée (pas dans les 3h avant le coucher)</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium">Jour 6 : Gérer les pensées intrusives</h5>
                      <ul className="list-disc list-inside pl-4 mt-2">
                        <li>Tenez un journal de préoccupations avant le coucher pour "décharger" votre esprit</li>
                        <li>Préparez votre journée du lendemain pour réduire l'anxiété</li>
                        <li>Pratiquez une technique de visualisation positive au coucher</li>
                        <li>Si vous n'arrivez pas à dormir après 20 minutes, levez-vous et faites une activité calme</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium">Jour 7 : Évaluer et ajuster</h5>
                      <ul className="list-disc list-inside pl-4 mt-2">
                        <li>Comparez votre sommeil actuel avec votre évaluation initiale</li>
                        <li>Identifiez les stratégies qui ont le mieux fonctionné pour vous</li>
                        <li>Ajustez votre routine en fonction de ces observations</li>
                        <li>Prévoyez de maintenir ces nouvelles habitudes sur le long terme</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            },
            { 
              title: "Techniques spécifiques pour l'endormissement", 
              content: <div className="space-y-4">
                <p>Si vous avez des difficultés spécifiques à vous endormir, essayez ces techniques :</p>
                
                <h4 className="font-medium mb-2">Technique de relaxation musculaire progressive</h4>
                <ol className="list-decimal list-inside space-y-1 pl-4">
                  <li>Allongez-vous confortablement sur le dos</li>
                  <li>Contractez fortement les muscles de vos pieds pendant 5 secondes</li>
                  <li>Relâchez complètement et remarquez la différence pendant 10 secondes</li>
                  <li>Répétez avec chaque groupe musculaire en remontant (mollets, cuisses, abdomen, poitrine, mains, bras, épaules, cou et visage)</li>
                </ol>
                
                <h4 className="font-medium mb-2 mt-4">Technique de visualisation du lieu sûr</h4>
                <ol className="list-decimal list-inside space-y-1 pl-4">
                  <li>Fermez les yeux et respirez profondément</li>
                  <li>Imaginez un lieu où vous vous sentez parfaitement en sécurité et détendu</li>
                  <li>Enrichissez cette image avec des détails sensoriels (ce que vous voyez, entendez, sentez, touchez)</li>
                  <li>Explorez calmement ce lieu en visualisant chaque détail</li>
                </ol>
                
                <h4 className="font-medium mb-2 mt-4">Méthode militaire d'endormissement rapide</h4>
                <ol className="list-decimal list-inside space-y-1 pl-4">
                  <li>Détendez tous les muscles de votre visage, y compris la langue, la mâchoire et les muscles autour des yeux</li>
                  <li>Laissez tomber vos épaules pour libérer la tension, puis détendez vos bras</li>
                  <li>Expirez et détendez votre poitrine</li>
                  <li>Détendez vos jambes, cuisses et mollets</li>
                  <li>Libérez votre esprit de toute pensée pendant 10 secondes</li>
                  <li>Imaginez une scène relaxante (comme être allongé dans un canot sur un lac calme avec un ciel bleu au-dessus de vous)</li>
                </ol>
                
                <p className="mt-4">Si une technique ne fonctionne pas immédiatement, ne vous découragez pas. L'efficacité s'améliore avec la pratique régulière.</p>
              </div>
            }
          ]
        }
      ]
    },
    {
      title: "Forums de discussion",
      description: "Échangez avec d'autres utilisateurs sur des sujets spécifiques",
      icon: <MessageSquare className="h-6 w-6" />,
      resources: [
        { title: "Gérer l'anxiété sociale", type: "Discussion" },
        { title: "Équilibre vie professionnelle et personnelle", type: "Discussion" },
        { title: "Soutien pour les aidants", type: "Discussion" },
        { title: "Pratiques de self-care", type: "Discussion" }
      ]
    }
  ];

  const handleResourceClick = (resource: { title: string; type: string; content?: React.ReactNode; subtopics?: Array<{title: string, content: string | React.ReactNode}> }) => {
    setSelectedResource(resource);
  };

  const closeResource = () => {
    setSelectedResource(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-serenity-50 dark:bg-serenity-900 py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-serenity-900 dark:text-white mb-6">
                Ressources éducatives
              </h1>
              <p className="text-lg text-serenity-700 dark:text-serenity-200 mb-8">
                Explorez notre bibliothèque de ressources pour mieux comprendre la santé mentale et apprendre des techniques pratiques pour améliorer votre bien-être.
              </p>
            </div>
          </div>
        </section>
        
        {/* Resources section */}
        <section className="py-16 bg-white dark:bg-serenity-900">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {resourceCategories.map((category, index) => (
                <div key={index} className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-serenity-100 dark:bg-serenity-800 flex items-center justify-center text-serenity-600 dark:text-serenity-300">
                      {category.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-serenity-900 dark:text-white">{category.title}</h2>
                      <p className="text-serenity-600 dark:text-serenity-300">{category.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid gap-4">
                    {category.resources.map((resource, resourceIndex) => (
                      <Card key={resourceIndex} className="hover-lift">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{resource.title}</CardTitle>
                          <CardDescription>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-serenity-100 dark:bg-serenity-800 text-serenity-800 dark:text-serenity-200">
                              {resource.type}
                            </span>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => handleResourceClick(resource)}
                          >
                            Accéder
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Resource Content Dialog */}
      {selectedResource && selectedResource.type !== "Discussion" && (
        <Dialog open={!!selectedResource} onOpenChange={closeResource}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedResource.title}</DialogTitle>
              <DialogDescription>
                {selectedResource.type}
              </DialogDescription>
            </DialogHeader>
            
            {selectedResource.subtopics ? (
              <Tabs defaultValue="main" className="w-full">
                <TabsList className="mb-4 flex flex-wrap">
                  <TabsTrigger value="main">Aperçu</TabsTrigger>
                  {selectedResource.subtopics.map((subtopic, index) => (
                    <TabsTrigger key={index} value={`subtopic-${index}`}>
                      {subtopic.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsContent value="main">
                  <ResourceContent content={selectedResource.content || "Contenu en cours de chargement..."} type={selectedResource.type} />
                </TabsContent>
                {selectedResource.subtopics.map((subtopic, index) => (
                  <TabsContent key={index} value={`subtopic-${index}`}>
                    <h3 className="text-lg font-semibold mb-4">{subtopic.title}</h3>
                    <ResourceContent content={subtopic.content} type={selectedResource.type} />
                  </TabsContent>
                ))}
              </Tabs>
            ) : (
              <ResourceContent content={selectedResource.content || "Contenu en cours de chargement..."} type={selectedResource.type} />
            )}
          </DialogContent>
        </Dialog>
      )}

      {/* Forum Discussion Dialog */}
      {selectedResource && selectedResource.type === "Discussion" && (
        <Dialog open={!!selectedResource} onOpenChange={closeResource}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedResource.title}</DialogTitle>
              <DialogDescription>
                Forum de discussion
              </DialogDescription>
            </DialogHeader>
            <ForumDiscussion topic={selectedResource.title} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Resources;
