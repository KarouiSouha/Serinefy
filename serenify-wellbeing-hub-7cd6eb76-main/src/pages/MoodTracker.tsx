// // // import React, { useState } from 'react';
// // // import Header from '@/components/Header';
// // // import Footer from '@/components/Footer';
// // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // // import { Button } from "@/components/ui/button";
// // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // // import { Smile, Frown, Calendar, X } from "lucide-react";
// // // import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// // // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
// // // import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// // // import { Label } from "@/components/ui/label";
// // // import { Textarea } from "@/components/ui/textarea";
// // // import { useToast } from "@/hooks/use-toast";
// // // import { format } from "date-fns";
// // // import { fr } from "date-fns/locale/fr";
// // // import { Input } from "@/components/ui/input";

// // // interface MoodEntry {
// // //   date: string;
// // //   mood: number;
// // //   notes?: string;
// // //   activities: string[];
// // // }

// // // const MoodTracker: React.FC = () => {
// // //   const { toast } = useToast();
// // //   const [moodDialogOpen, setMoodDialogOpen] = useState(false);
// // //   const [selectedMood, setSelectedMood] = useState<number | null>(null);
// // //   const [notes, setNotes] = useState("");
// // //   const [activity, setActivity] = useState("");
// // //   const [activities, setActivities] = useState<string[]>([]);

// // //   // État initial avec des données factices
// // //   const [moodData, setMoodData] = useState<MoodEntry[]>([
// // //     { date: '1 Mai', mood: 3, notes: "", activities: ["Lecture"] },
// // //     { date: '2 Mai', mood: 4, notes: "", activities: ["Sport", "Méditation"] },
// // //     { date: '3 Mai', mood: 2, notes: "Journée difficile", activities: [] },
// // //     { date: '4 Mai', mood: 5, notes: "Très bonne journée", activities: ["Sortie", "Amis"] },
// // //     { date: '5 Mai', mood: 4, notes: "", activities: ["Travail productif"] },
// // //     { date: '6 Mai', mood: 3, notes: "", activities: ["Marche"] },
// // //     { date: '7 Mai', mood: 4, notes: "Journée positive", activities: ["Exercice", "Méditation"] },
// // //   ]);

// // //   const moodLevels = [
// // //     { value: 1, label: "Très bas", icon: <Frown className="w-8 h-8" />, color: "bg-red-500" },
// // //     { value: 2, label: "Bas", icon: <Frown className="w-8 h-8" />, color: "bg-orange-500" },
// // //     { value: 3, label: "Neutre", icon: <Frown className="w-8 h-8" />, color: "bg-yellow-500" },
// // //     { value: 4, label: "Bon", icon: <Smile className="w-8 h-8" />, color: "bg-green-400" },
// // //     { value: 5, label: "Excellent", icon: <Smile className="w-8 h-8" />, color: "bg-green-600" },
// // //   ];

// // //   // Récupère les entrées de journal à partir des données d'humeur
// // //   const journalEntries = [...moodData]
// // //     .sort((a, b) => {
// // //       // Trie par date décroissante (dernières entrées en premier)
// // //       return new Date(b.date).getTime() - new Date(a.date).getTime();
// // //     })
// // //     .slice(0, 5); // Prend seulement les 5 dernières entrées

// // //   const handleOpenMoodDialog = () => {
// // //     setMoodDialogOpen(true);
// // //     setSelectedMood(null);
// // //     setNotes("");
// // //     setActivities([]);
// // //     setActivity("");
// // //   };

// // //   const handleAddActivity = () => {
// // //     if (activity.trim() !== "" && !activities.includes(activity.trim())) {
// // //       setActivities([...activities, activity.trim()]);
// // //       setActivity("");
// // //     }
// // //   };

// // //   const handleRemoveActivity = (activityToRemove: string) => {
// // //     setActivities(activities.filter(act => act !== activityToRemove));
// // //   };

// // //   const handleSaveMood = () => {
// // //     if (selectedMood === null) {
// // //       toast({
// // //         title: "Sélection requise",
// // //         description: "Veuillez sélectionner votre niveau d'humeur",
// // //         variant: "destructive"
// // //       });
// // //       return;
// // //     }

// // //     // Crée une nouvelle entrée d'humeur
// // //     const today = format(new Date(), "d MMM", { locale: fr });
// // //     const newMoodEntry: MoodEntry = {
// // //       date: today,
// // //       mood: selectedMood,
// // //       notes: notes.trim() || undefined,
// // //       activities: [...activities]
// // //     };

// // //     // Met à jour les données d'humeur
// // //     const updatedMoodData = [newMoodEntry, ...moodData];
// // //     if (updatedMoodData.length > 30) { // Limite à 30 jours
// // //       updatedMoodData.pop();
// // //     }
    
// // //     setMoodData(updatedMoodData);
// // //     setMoodDialogOpen(false);
    
// // //     toast({
// // //       title: "Humeur enregistrée",
// // //       description: `Votre humeur du jour a été enregistrée avec succès.`,
// // //     });
// // //   };

// // //   return (
// // //     <div className="min-h-screen flex flex-col">
// // //       <Header />
// // //       <main className="flex-grow">
// // //         {/* Hero section */}
// // //         <section className="bg-serenity-50 dark:bg-serenity-900 py-12">
// // //           <div className="container mx-auto px-6">
// // //             <div className="max-w-3xl mx-auto text-center">
// // //               <h1 className="text-4xl md:text-5xl font-bold text-serenity-900 dark:text-white mb-6">
// // //                 Suivi d'humeur
// // //               </h1>
// // //               <p className="text-lg text-serenity-700 dark:text-serenity-200 mb-8">
// // //                 Suivez votre humeur quotidienne et identifiez les tendances pour mieux comprendre votre santé mentale.
// // //               </p>
// // //               <Button 
// // //                 onClick={handleOpenMoodDialog} 
// // //                 className="rounded-full"
// // //               >
// // //                 Enregistrer mon humeur aujourd'hui
// // //               </Button>
// // //             </div>
// // //           </div>
// // //         </section>
        
// // //         {/* Mood Tracker Interface */}
// // //         <section className="py-12 bg-white dark:bg-serenity-900">
// // //           <div className="container mx-auto px-6">
// // //             <Tabs defaultValue="chart" className="w-full">
// // //               <TabsList className="grid grid-cols-2 mb-8">
// // //                 <TabsTrigger value="chart">Graphique</TabsTrigger>
// // //                 <TabsTrigger value="journal">Journal</TabsTrigger>
// // //               </TabsList>
              
// // //               <TabsContent value="chart" className="space-y-8">
// // //                 <Card>
// // //                   <CardHeader>
// // //                     <CardTitle>Tendances de l'humeur</CardTitle>
// // //                     <CardDescription>Votre humeur sur les derniers jours</CardDescription>
// // //                   </CardHeader>
// // //                   <CardContent>
// // //                     <div className="h-80">
// // //                       <ResponsiveContainer width="100%" height="100%">
// // //                         <LineChart
// // //                           data={moodData.slice().reverse()}
// // //                           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
// // //                         >
// // //                           <CartesianGrid strokeDasharray="3 3" />
// // //                           <XAxis dataKey="date" />
// // //                           <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
// // //                           <Tooltip />
// // //                           <Line
// // //                             type="monotone"
// // //                             dataKey="mood"
// // //                             stroke="#8b5cf6"
// // //                             strokeWidth={2}
// // //                             activeDot={{ r: 8 }}
// // //                           />
// // //                         </LineChart>
// // //                       </ResponsiveContainer>
// // //                     </div>
// // //                   </CardContent>
// // //                 </Card>
                
// // //                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
// // //                   {moodLevels.map((level) => (
// // //                     <Card key={level.value} className="text-center hover-lift">
// // //                       <CardHeader className="pb-2">
// // //                         <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center text-white ${level.color}`}>
// // //                           {level.value}
// // //                         </div>
// // //                       </CardHeader>
// // //                       <CardContent>
// // //                         <h3 className="font-medium">{level.label}</h3>
// // //                       </CardContent>
// // //                     </Card>
// // //                   ))}
// // //                 </div>
// // //               </TabsContent>
              
// // //               <TabsContent value="journal" className="space-y-6">
// // //                 {journalEntries.length > 0 ? (
// // //                   journalEntries.map((entry, index) => (
// // //                     <Card key={index} className="hover-lift">
// // //                       <CardHeader>
// // //                         <div className="flex justify-between items-center">
// // //                           <div className="flex items-center gap-2">
// // //                             <Calendar className="w-4 h-4 text-serenity-500" />
// // //                             <CardTitle className="text-lg">{entry.date}</CardTitle>
// // //                           </div>
// // //                           <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${moodLevels[entry.mood - 1].color}`}>
// // //                             {entry.mood}
// // //                           </div>
// // //                         </div>
// // //                       </CardHeader>
// // //                       <CardContent className="space-y-4">
// // //                         {entry.notes && (
// // //                           <div>
// // //                             <h4 className="font-medium text-sm mb-1 text-serenity-700 dark:text-serenity-300">Notes</h4>
// // //                             <p className="text-serenity-800 dark:text-serenity-200">{entry.notes}</p>
// // //                           </div>
// // //                         )}
// // //                         {entry.activities && entry.activities.length > 0 && (
// // //                           <div>
// // //                             <h4 className="font-medium text-sm mb-2 text-serenity-700 dark:text-serenity-300">Activités</h4>
// // //                             <div className="flex flex-wrap gap-2">
// // //                               {entry.activities.map((activity, actIndex) => (
// // //                                 <span 
// // //                                   key={actIndex}
// // //                                   className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-serenity-100 dark:bg-serenity-800 text-serenity-800 dark:text-serenity-200"
// // //                                 >
// // //                                   {activity}
// // //                                 </span>
// // //                               ))}
// // //                             </div>
// // //                           </div>
// // //                         )}
// // //                       </CardContent>
// // //                     </Card>
// // //                   ))
// // //                 ) : (
// // //                   <div className="text-center py-12">
// // //                     <p className="text-serenity-600 dark:text-serenity-400">Aucune entrée de journal pour le moment</p>
// // //                   </div>
// // //                 )}
// // //               </TabsContent>
// // //             </Tabs>
// // //           </div>
// // //         </section>
// // //       </main>
// // //       <Footer />

// // //       {/* Dialog pour enregistrer l'humeur */}
// // //       <Dialog open={moodDialogOpen} onOpenChange={setMoodDialogOpen}>
// // //         <DialogContent className="sm:max-w-md">
// // //           <DialogHeader>
// // //             <DialogTitle>Comment vous sentez-vous aujourd'hui ?</DialogTitle>
// // //             <DialogDescription>
// // //               Sélectionnez votre niveau d'humeur et ajoutez des notes si vous le souhaitez.
// // //             </DialogDescription>
// // //           </DialogHeader>
          
// // //           <div className="space-y-6 py-4">
// // //             <div className="space-y-3">
// // //               <h3 className="text-sm font-medium text-serenity-700 dark:text-serenity-300">Votre humeur</h3>
// // //               <RadioGroup 
// // //                 value={selectedMood?.toString() || ""} 
// // //                 onValueChange={(value) => setSelectedMood(parseInt(value))}
// // //                 className="flex flex-wrap gap-4 justify-between"
// // //               >
// // //                 {moodLevels.map((level) => (
// // //                   <div key={level.value} className="flex flex-col items-center gap-1">
// // //                     <div className={`${selectedMood === level.value ? 'ring-2 ring-primary' : ''} rounded-full p-1`}>
// // //                       <div className={`w-14 h-14 rounded-full ${level.color} flex items-center justify-center cursor-pointer`}>
// // //                         <RadioGroupItem 
// // //                           value={level.value.toString()} 
// // //                           id={`mood-${level.value}`} 
// // //                           className="sr-only"
// // //                         />
// // //                         <label 
// // //                           htmlFor={`mood-${level.value}`} 
// // //                           className="cursor-pointer flex items-center justify-center h-full w-full text-white text-xl font-bold"
// // //                         >
// // //                           {level.value}
// // //                         </label>
// // //                       </div>
// // //                     </div>
// // //                     <Label htmlFor={`mood-${level.value}`} className="text-xs">
// // //                       {level.label}
// // //                     </Label>
// // //                   </div>
// // //                 ))}
// // //               </RadioGroup>
// // //             </div>
            
// // //             <div className="space-y-2">
// // //               <Label htmlFor="notes">Notes (optionnel)</Label>
// // //               <Textarea 
// // //                 id="notes" 
// // //                 placeholder="Comment s'est passée votre journée ? Qu'est-ce qui a influencé votre humeur ?" 
// // //                 value={notes}
// // //                 onChange={(e) => setNotes(e.target.value)}
// // //               />
// // //             </div>
            
// // //             <div className="space-y-3">
// // //               <Label htmlFor="activities">Activités du jour (optionnel)</Label>
// // //               <div className="flex gap-2">
// // //                 <Input 
// // //                   id="activities"
// // //                   placeholder="Ex: Méditation, Sport, Lecture..." 
// // //                   value={activity}
// // //                   onChange={(e) => setActivity(e.target.value)}
// // //                   onKeyDown={(e) => {
// // //                     if (e.key === 'Enter') {
// // //                       e.preventDefault();
// // //                       handleAddActivity();
// // //                     }
// // //                   }}
// // //                 />
// // //                 <Button type="button" onClick={handleAddActivity} size="sm">
// // //                   Ajouter
// // //                 </Button>
// // //               </div>
              
// // //               {activities.length > 0 && (
// // //                 <div className="flex flex-wrap gap-2 mt-2">
// // //                   {activities.map((act, index) => (
// // //                     <span 
// // //                       key={index} 
// // //                       className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-serenity-100 dark:bg-serenity-800 text-serenity-800 dark:text-serenity-200"
// // //                     >
// // //                       {act}
// // //                       <button 
// // //                         type="button" 
// // //                         onClick={() => handleRemoveActivity(act)}
// // //                         className="text-serenity-600 hover:text-serenity-800 dark:text-serenity-400 dark:hover:text-serenity-200"
// // //                       >
// // //                         <X className="h-3 w-3" />
// // //                       </button>
// // //                     </span>
// // //                   ))}
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>
          
// // //           <DialogFooter className="gap-2 sm:gap-0">
// // //             <DialogClose asChild>
// // //               <Button variant="outline">Annuler</Button>
// // //             </DialogClose>
// // //             <Button onClick={handleSaveMood}>Enregistrer</Button>
// // //           </DialogFooter>
// // //         </DialogContent>
// // //       </Dialog>
// // //     </div>
// // //   );
// // // };

// // // export default MoodTracker;
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios'; // Assurez-vous d'installer axios: npm install axios
// // import Header from '@/components/Header';
// // import Footer from '@/components/Footer';
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // import { Smile, Frown, Calendar, X, Info } from "lucide-react";
// // import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
// // import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// // import { Label } from "@/components/ui/label";
// // import { Textarea } from "@/components/ui/textarea";
// // import { useToast } from "@/hooks/use-toast";
// // import { format } from "date-fns";
// // import { fr } from "date-fns/locale/fr";
// // import { Input } from "@/components/ui/input";

// // interface MoodEntry {
// //   date: string;
// //   mood: number;
// //   notes?: string;
// //   activities: string[];
// // }

// // interface MoodStats {
// //   avg_mood: number;
// //   total_entries: number;
// //   weekly_data: MoodEntry[];
// // }

// // // API URL de base - ajustez selon votre configuration
// // const API_BASE_URL = '/api';

// // // Configuration axios avec le token CSRF pour Laravel
// // axios.defaults.withCredentials = true;
// // axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// // const MoodTracker: React.FC = () => {
// //   const { toast } = useToast();
// //   const [moodDialogOpen, setMoodDialogOpen] = useState(false);
// //   const [selectedMood, setSelectedMood] = useState<number | null>(null);
// //   const [notes, setNotes] = useState("");
// //   const [activity, setActivity] = useState("");
// //   const [activities, setActivities] = useState<string[]>([]);
// //   const [moodData, setMoodData] = useState<MoodEntry[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [stats, setStats] = useState<MoodStats | null>(null);

// //   // Charger les données au montage du composant
// //   useEffect(() => {
// //     fetchMoodEntries();
// //     fetchMoodStats();
// //   }, []);

// //   // Récupérer les entrées d'humeur depuis l'API
// //   const fetchMoodEntries = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await axios.get(`${API_BASE_URL}/mood-entries`);
// //       // Vérifier que la réponse est bien un tableau
// //       if (Array.isArray(response.data)) {
// //         setMoodData(response.data);
// //       } else {
// //         console.error('Les données ne sont pas au format attendu:', response.data);
// //         setMoodData([]);
// //       }
// //     } catch (error) {
// //       console.error('Erreur lors du chargement des entrées:', error);
// //       toast({
// //         title: "Erreur",
// //         description: "Impossible de charger vos données d'humeur.",
// //         variant: "destructive"
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Récupérer les statistiques d'humeur
// //   const fetchMoodStats = async () => {
// //     try {
// //       const response = await axios.get(`${API_BASE_URL}/mood-stats`);
// //       setStats(response.data);
// //     } catch (error) {
// //       console.error('Erreur lors du chargement des statistiques:', error);
// //     }
// //   };

// //   const moodLevels = [
// //     { value: 1, label: "Très bas", icon: <Frown className="w-8 h-8" />, color: "bg-red-500" },
// //     { value: 2, label: "Bas", icon: <Frown className="w-8 h-8" />, color: "bg-orange-500" },
// //     { value: 3, label: "Neutre", icon: <Frown className="w-8 h-8" />, color: "bg-yellow-500" },
// //     { value: 4, label: "Bon", icon: <Smile className="w-8 h-8" />, color: "bg-green-400" },
// //     { value: 5, label: "Excellent", icon: <Smile className="w-8 h-8" />, color: "bg-green-600" },
// //   ];

// //   // Récupère les entrées de journal à partir des données d'humeur
// //   const journalEntries = moodData.length > 0 
// //     ? [...moodData]
// //       .sort((a, b) => {
// //         // Convertir les dates au format "d MMM" en dates comparables
// //         // Pour simplifier la comparaison, on utilise une fonction de parsing basique
// //         const parseDate = (dateStr: string) => {
// //           try {
// //             const [day, month] = dateStr.split(' ');
// //             const monthMap: { [key: string]: number } = {
// //               'Jan': 0, 'Fév': 1, 'Mar': 2, 'Avr': 3, 'Mai': 4, 'Juin': 5,
// //               'Juil': 6, 'Aoû': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Déc': 11,
// //               'Feb': 1, 'Apr': 3, 'May': 4, 'Jun': 5, 'Jul': 6, 'Aug': 7, 'Dec': 11
// //             };
            
// //             // Créer une date avec l'année courante (puisqu'on ne la stocke pas)
// //             const date = new Date();
// //             date.setDate(parseInt(day, 10));
// //             date.setMonth(monthMap[month] || 0);
// //             return date.getTime();
// //           } catch (e) {
// //             console.error("Erreur de parsing de date:", dateStr, e);
// //             return 0;
// //           }
// //         };
        
// //         return parseDate(b.date) - parseDate(a.date);
// //       })
// //       .slice(0, 5) // Prend seulement les 5 dernières entrées
// //     : [];

// //   const handleOpenMoodDialog = () => {
// //     setMoodDialogOpen(true);
// //     setSelectedMood(null);
// //     setNotes("");
// //     setActivities([]);
// //     setActivity("");
// //   };

// //   const handleAddActivity = () => {
// //     if (activity.trim() !== "" && !activities.includes(activity.trim())) {
// //       setActivities([...activities, activity.trim()]);
// //       setActivity("");
// //     }
// //   };

// //   const handleRemoveActivity = (activityToRemove: string) => {
// //     setActivities(activities.filter(act => act !== activityToRemove));
// //   };

// //   const handleSaveMood = async () => {
// //     if (selectedMood === null) {
// //       toast({
// //         title: "Sélection requise",
// //         description: "Veuillez sélectionner votre niveau d'humeur",
// //         variant: "destructive"
// //       });
// //       return;
// //     }

// //     try {
// //       // Envoyer les données au backend
// //       const response = await axios.post(`${API_BASE_URL}/mood-entries`, {
// //         mood: selectedMood,
// //         notes: notes.trim() || null,
// //         activities: activities.length > 0 ? activities : null
// //       });

// //       // Mettre à jour les données localement
// //       setMoodData([response.data.entry, ...moodData]);
      
// //       // Rafraîchir les statistiques
// //       fetchMoodStats();
      
// //       setMoodDialogOpen(false);
      
// //       toast({
// //         title: "Humeur enregistrée",
// //         description: response.data.message || "Votre humeur du jour a été enregistrée avec succès.",
// //       });
// //     } catch (error) {
// //       console.error('Erreur lors de l\'enregistrement:', error);
// //       toast({
// //         title: "Erreur",
// //         description: "Impossible d'enregistrer votre humeur. Veuillez réessayer.",
// //         variant: "destructive"
// //       });
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex flex-col">
// //       <Header />
// //       <main className="flex-grow">
// //         {/* Hero section */}
// //         <section className="bg-serenity-50 dark:bg-serenity-900 py-12">
// //           <div className="container mx-auto px-6">
// //             <div className="max-w-3xl mx-auto text-center">
// //               <h1 className="text-4xl md:text-5xl font-bold text-serenity-900 dark:text-white mb-6">
// //                 Suivi d'humeur
// //               </h1>
// //               <p className="text-lg text-serenity-700 dark:text-serenity-200 mb-8">
// //                 Suivez votre humeur quotidienne et identifiez les tendances pour mieux comprendre votre santé mentale.
// //               </p>
// //               <Button 
// //                 onClick={handleOpenMoodDialog} 
// //                 className="rounded-full"
// //               >
// //                 Enregistrer mon humeur aujourd'hui
// //               </Button>
// //             </div>
// //           </div>
// //         </section>
        
// //         {/* Mood Tracker Interface */}
// //         <section className="py-12 bg-white dark:bg-serenity-900">
// //           <div className="container mx-auto px-6">
// //             {loading ? (
// //               <div className="text-center py-12">
// //                 <p className="text-serenity-600 dark:text-serenity-400">Chargement de vos données...</p>
// //               </div>
// //             ) : (
// //               <>
// //                 {/* Stats Summary */}
// //                 {stats && (
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
// //                     <Card>
// //                       <CardHeader>
// //                         <CardTitle className="text-lg">Moyenne d'humeur</CardTitle>
// //                       </CardHeader>
// //                       <CardContent className="flex items-center gap-2">
// //                         <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${moodLevels[Math.round(stats.avg_mood) - 1]?.color || 'bg-serenity-500'}`}>
// //                           {stats.avg_mood}
// //                         </div>
// //                         <span className="text-xl font-medium">{stats.avg_mood}/5</span>
// //                       </CardContent>
// //                     </Card>
// //                     <Card>
// //                       <CardHeader>
// //                         <CardTitle className="text-lg">Entrées totales</CardTitle>
// //                       </CardHeader>
// //                       <CardContent className="flex items-center gap-2">
// //                         <div className="w-12 h-12 rounded-full bg-serenity-100 dark:bg-serenity-800 flex items-center justify-center">
// //                           <Calendar className="w-6 h-6 text-serenity-700 dark:text-serenity-300" />
// //                         </div>
// //                         <span className="text-xl font-medium">{stats.total_entries} jour{stats.total_entries > 1 ? 's' : ''}</span>
// //                       </CardContent>
// //                     </Card>
// //                   </div>
// //                 )}

// //                 <Tabs defaultValue="chart" className="w-full">
// //                   <TabsList className="grid grid-cols-2 mb-8">
// //                     <TabsTrigger value="chart">Graphique</TabsTrigger>
// //                     <TabsTrigger value="journal">Journal</TabsTrigger>
// //                   </TabsList>
                  
// //                   <TabsContent value="chart" className="space-y-8">
// //                     <Card>
// //                       <CardHeader>
// //                         <CardTitle>Tendances de l'humeur</CardTitle>
// //                         <CardDescription>Votre humeur sur les derniers jours</CardDescription>
// //                       </CardHeader>
// //                       <CardContent>
// //                         {moodData.length > 0 ? (
// //                           <div className="h-80">
// //                             <ResponsiveContainer width="100%" height="100%">
// //                               <LineChart
// //                                 data={[...moodData].reverse()}
// //                                 margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
// //                               >
// //                                 <CartesianGrid strokeDasharray="3 3" />
// //                                 <XAxis dataKey="date" />
// //                                 <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
// //                                 <Tooltip />
// //                                 <Line
// //                                   type="monotone"
// //                                   dataKey="mood"
// //                                   stroke="#8b5cf6"
// //                                   strokeWidth={2}
// //                                   activeDot={{ r: 8 }}
// //                                 />
// //                               </LineChart>
// //                             </ResponsiveContainer>
// //                           </div>
// //                         ) : (
// //                           <div className="text-center py-12 flex flex-col items-center gap-4">
// //                             <Info className="w-10 h-10 text-serenity-400" />
// //                             <div>
// //                               <p className="text-serenity-600 dark:text-serenity-400">Aucune donnée disponible</p>
// //                               <p className="text-serenity-500 dark:text-serenity-500 text-sm">Enregistrez votre première humeur pour commencer à voir des tendances</p>
// //                             </div>
// //                           </div>
// //                         )}
// //                       </CardContent>
// //                     </Card>
                    
// //                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
// //                       {moodLevels.map((level) => (
// //                         <Card key={level.value} className="text-center hover-lift">
// //                           <CardHeader className="pb-2">
// //                             <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center text-white ${level.color}`}>
// //                               {level.value}
// //                             </div>
// //                           </CardHeader>
// //                           <CardContent>
// //                             <h3 className="font-medium">{level.label}</h3>
// //                           </CardContent>
// //                         </Card>
// //                       ))}
// //                     </div>
// //                   </TabsContent>
                  
// //                   <TabsContent value="journal" className="space-y-6">
// //                     {journalEntries.length > 0 ? (
// //                       journalEntries.map((entry, index) => (
// //                         <Card key={index} className="hover-lift">
// //                           <CardHeader>
// //                             <div className="flex justify-between items-center">
// //                               <div className="flex items-center gap-2">
// //                                 <Calendar className="w-4 h-4 text-serenity-500" />
// //                                 <CardTitle className="text-lg">{entry.date}</CardTitle>
// //                               </div>
// //                               <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${moodLevels[entry.mood - 1].color}`}>
// //                                 {entry.mood}
// //                               </div>
// //                             </div>
// //                           </CardHeader>
// //                           <CardContent className="space-y-4">
// //                             {entry.notes && (
// //                               <div>
// //                                 <h4 className="font-medium text-sm mb-1 text-serenity-700 dark:text-serenity-300">Notes</h4>
// //                                 <p className="text-serenity-800 dark:text-serenity-200">{entry.notes}</p>
// //                               </div>
// //                             )}
// //                             {entry.activities && entry.activities.length > 0 && (
// //                               <div>
// //                                 <h4 className="font-medium text-sm mb-2 text-serenity-700 dark:text-serenity-300">Activités</h4>
// //                                 <div className="flex flex-wrap gap-2">
// //                                   {entry.activities.map((activity, actIndex) => (
// //                                     <span 
// //                                       key={actIndex}
// //                                       className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-serenity-100 dark:bg-serenity-800 text-serenity-800 dark:text-serenity-200"
// //                                     >
// //                                       {activity}
// //                                     </span>
// //                                   ))}
// //                                 </div>
// //                               </div>
// //                             )}
// //                           </CardContent>
// //                         </Card>
// //                       ))
// //                     ) : (
// //                       <div className="text-center py-12">
// //                         <p className="text-serenity-600 dark:text-serenity-400">Aucune entrée de journal pour le moment</p>
// //                       </div>
// //                     )}
// //                   </TabsContent>
// //                 </Tabs>
// //               </>
// //             )}
// //           </div>
// //         </section>
// //       </main>
// //       <Footer />

// //       {/* Dialog pour enregistrer l'humeur */}
// //       <Dialog open={moodDialogOpen} onOpenChange={setMoodDialogOpen}>
// //         <DialogContent className="sm:max-w-md">
// //           <DialogHeader>
// //             <DialogTitle>Comment vous sentez-vous aujourd'hui ?</DialogTitle>
// //             <DialogDescription>
// //               Sélectionnez votre niveau d'humeur et ajoutez des notes si vous le souhaitez.
// //             </DialogDescription>
// //           </DialogHeader>
          
// //           <div className="space-y-6 py-4">
// //             <div className="space-y-3">
// //               <h3 className="text-sm font-medium text-serenity-700 dark:text-serenity-300">Votre humeur</h3>
// //               <RadioGroup 
// //                 value={selectedMood?.toString() || ""} 
// //                 onValueChange={(value) => setSelectedMood(parseInt(value))}
// //                 className="flex flex-wrap gap-4 justify-between"
// //               >
// //                 {moodLevels.map((level) => (
// //                   <div key={level.value} className="flex flex-col items-center gap-1">
// //                     <div className={`${selectedMood === level.value ? 'ring-2 ring-primary' : ''} rounded-full p-1`}>
// //                       <div className={`w-14 h-14 rounded-full ${level.color} flex items-center justify-center cursor-pointer`}>
// //                         <RadioGroupItem 
// //                           value={level.value.toString()} 
// //                           id={`mood-${level.value}`} 
// //                           className="sr-only"
// //                         />
// //                         <label 
// //                           htmlFor={`mood-${level.value}`} 
// //                           className="cursor-pointer flex items-center justify-center h-full w-full text-white text-xl font-bold"
// //                         >
// //                           {level.value}
// //                         </label>
// //                       </div>
// //                     </div>
// //                     <Label htmlFor={`mood-${level.value}`} className="text-xs">
// //                       {level.label}
// //                     </Label>
// //                   </div>
// //                 ))}
// //               </RadioGroup>
// //             </div>
            
// //             <div className="space-y-2">
// //               <Label htmlFor="notes">Notes (optionnel)</Label>
// //               <Textarea 
// //                 id="notes" 
// //                 placeholder="Comment s'est passée votre journée ? Qu'est-ce qui a influencé votre humeur ?" 
// //                 value={notes}
// //                 onChange={(e) => setNotes(e.target.value)}
// //               />
// //             </div>
            
// //             <div className="space-y-3">
// //               <Label htmlFor="activities">Activités du jour (optionnel)</Label>
// //               <div className="flex gap-2">
// //                 <Input 
// //                   id="activities"
// //                   placeholder="Ex: Méditation, Sport, Lecture..." 
// //                   value={activity}
// //                   onChange={(e) => setActivity(e.target.value)}
// //                   onKeyDown={(e) => {
// //                     if (e.key === 'Enter') {
// //                       e.preventDefault();
// //                       handleAddActivity();
// //                     }
// //                   }}
// //                 />
// //                 <Button type="button" onClick={handleAddActivity} size="sm">
// //                   Ajouter
// //                 </Button>
// //               </div>
              
// //               {activities.length > 0 && (
// //                 <div className="flex flex-wrap gap-2 mt-2">
// //                   {activities.map((act, index) => (
// //                     <span 
// //                       key={index} 
// //                       className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-serenity-100 dark:bg-serenity-800 text-serenity-800 dark:text-serenity-200"
// //                     >
// //                       {act}
// //                       <button 
// //                         type="button" 
// //                         onClick={() => handleRemoveActivity(act)}
// //                         className="text-serenity-600 hover:text-serenity-800 dark:text-serenity-400 dark:hover:text-serenity-200"
// //                       >
// //                         <X className="h-3 w-3" />
// //                       </button>
// //                     </span>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>
// //           </div>
          
// //           <DialogFooter className="gap-2 sm:gap-0">
// //             <DialogClose asChild>
// //               <Button variant="outline">Annuler</Button>
// //             </DialogClose>
// //             <Button onClick={handleSaveMood}>Enregistrer</Button>
// //           </DialogFooter>
// //         </DialogContent>
// //       </Dialog>
// //     </div>
// //   );
// // };

// // export default MoodTracker;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Smile, Frown, Calendar, X, Info } from "lucide-react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { useToast } from "@/hooks/use-toast";
// import { Input } from "@/components/ui/input";

// // Import de l'API mock
// import { fetchMoodEntries, fetchMoodStats, addMoodEntry } from '../mock/moodTrackerApi';

// interface MoodEntry {
//   date: string;
//   mood: number;
//   notes?: string;
//   activities: string[];
// }

// interface MoodStats {
//   avg_mood: number;
//   total_entries: number;
//   weekly_data: MoodEntry[];
// }

// const MoodTracker: React.FC = () => {
//   const { toast } = useToast();
//   const [moodDialogOpen, setMoodDialogOpen] = useState(false);
//   const [selectedMood, setSelectedMood] = useState<number | null>(null);
//   const [notes, setNotes] = useState("");
//   const [activity, setActivity] = useState("");
//   const [activities, setActivities] = useState<string[]>([]);
//   const [moodData, setMoodData] = useState<MoodEntry[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState<MoodStats | null>(null);

//   // Fonction pour charger toutes les données
//   const loadAllData = async () => {
//     try {
//       setLoading(true);
//       const entries = await fetchMoodEntries();
//       setMoodData(entries);
      
//       const statsData = await fetchMoodStats();
//       setStats(statsData);
//     } catch (error) {
//       console.error('Erreur lors du chargement des données:', error);
//       toast({
//         title: "Erreur",
//         description: "Impossible de charger vos données d'humeur.",
//         variant: "destructive"
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Charger les données au montage du composant
//   useEffect(() => {
//     loadAllData();
//   }, []);

//   const moodLevels = [
//     { value: 1, label: "Très bas", icon: <Frown className="w-8 h-8" />, color: "bg-red-500" },
//     { value: 2, label: "Bas", icon: <Frown className="w-8 h-8" />, color: "bg-orange-500" },
//     { value: 3, label: "Neutre", icon: <Frown className="w-8 h-8" />, color: "bg-yellow-500" },
//     { value: 4, label: "Bon", icon: <Smile className="w-8 h-8" />, color: "bg-green-400" },
//     { value: 5, label: "Excellent", icon: <Smile className="w-8 h-8" />, color: "bg-green-600" },
//   ];

//   // Récupère les entrées de journal à partir des données d'humeur
//   const journalEntries = moodData.length > 0 
//     ? [...moodData].slice(0, 5) // Prend seulement les 5 dernières entrées (déjà triées)
//     : [];

//   const handleOpenMoodDialog = () => {
//     setMoodDialogOpen(true);
//     setSelectedMood(null);
//     setNotes("");
//     setActivities([]);
//     setActivity("");
//   };

//   const handleAddActivity = () => {
//     if (activity.trim() !== "" && !activities.includes(activity.trim())) {
//       setActivities([...activities, activity.trim()]);
//       setActivity("");
//     }
//   };

//   const handleRemoveActivity = (activityToRemove: string) => {
//     setActivities(activities.filter(act => act !== activityToRemove));
//   };

//  const handleSaveMood = async () => {
//   if (selectedMood === null) {
//     toast({
//       title: "Sélection requise",
//       description: "Veuillez sélectionner votre niveau d'humeur",
//       variant: "destructive"
//     });
//     return;
//   }

//   try {
//     // Envoyer les données au backend
//     const response = await axios.post(`http://localhost:8000/api/mood-entries`, {
//       mood: selectedMood,
//       notes: notes.trim() || null,
//       activities: activities.length > 0 ? activities : null
//     });

//     // Vérifiez si la réponse contient les données attendues
//     if (response.data && response.data.entry) {
//       // Mettre à jour les données localement
//       setMoodData([response.data.entry, ...moodData]);

//       // Rafraîchir les statistiques
//       fetchMoodStats();

//       setMoodDialogOpen(false);

//       toast({
//         title: "Humeur enregistrée",
//         description: response.data.message || "Votre humeur du jour a été enregistrée avec succès.",
//       });
//     } else {
//       throw new Error("Réponse inattendue de l'API");
//     }
//   } catch (error) {
//     console.error('Erreur lors de l\'enregistrement:', error);
//     toast({
//       title: "Erreur",
//       description: "Impossible d'enregistrer votre humeur. Veuillez réessayer.",
//       variant: "destructive"
//     });
//   }
// };
//   // Préparer les données pour le graphique (ordre chronologique)
//   const chartData = [...moodData].reverse();

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
//       <main className="flex-grow">
//         {/* Hero section */}
//         <section className="bg-purple-50 dark:bg-purple-900 py-12">
//           <div className="container mx-auto px-6">
//             <div className="max-w-3xl mx-auto text-center">
//               <h1 className="text-4xl md:text-5xl font-bold text-purple-900 dark:text-white mb-6">
//                 Suivi d'humeur
//               </h1>
//               <p className="text-lg text-purple-700 dark:text-purple-200 mb-8">
//                 Suivez votre humeur quotidienne et identifiez les tendances pour mieux comprendre votre santé mentale.
//               </p>
//               <Button 
//                 onClick={handleOpenMoodDialog} 
//                 className="rounded-full bg-purple-600 hover:bg-purple-700"
//               >
//                 Enregistrer mon humeur aujourd'hui
//               </Button>
//             </div>
//           </div>
//         </section>
        
//         {/* Mood Tracker Interface */}
//         <section className="py-12 bg-white dark:bg-gray-900">
//           <div className="container mx-auto px-6">
//             {loading ? (
//               <div className="text-center py-12">
//                 <p className="text-gray-600 dark:text-gray-400">Chargement de vos données...</p>
//               </div>
//             ) : (
//               <>
//                 {/* Stats Summary */}
//                 {stats && (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                     <Card>
//                       <CardHeader>
//                         <CardTitle className="text-lg">Moyenne d'humeur</CardTitle>
//                       </CardHeader>
//                       <CardContent className="flex items-center gap-2">
//                         <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${stats.avg_mood > 0 ? moodLevels[Math.round(stats.avg_mood) - 1]?.color || 'bg-purple-500' : 'bg-gray-400'}`}>
//                           {stats.avg_mood > 0 ? stats.avg_mood : '-'}
//                         </div>
//                         <span className="text-xl font-medium">{stats.avg_mood > 0 ? `${stats.avg_mood}/5` : 'Aucune donnée'}</span>
//                       </CardContent>
//                     </Card>
//                     <Card>
//                       <CardHeader>
//                         <CardTitle className="text-lg">Entrées totales</CardTitle>
//                       </CardHeader>
//                       <CardContent className="flex items-center gap-2">
//                         <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
//                           <Calendar className="w-6 h-6 text-gray-700 dark:text-gray-300" />
//                         </div>
//                         <span className="text-xl font-medium">{stats.total_entries} jour{stats.total_entries > 1 ? 's' : ''}</span>
//                       </CardContent>
//                     </Card>
//                   </div>
//                 )}

//                 <Tabs defaultValue="chart" className="w-full">
//                   <TabsList className="grid grid-cols-2 mb-8">
//                     <TabsTrigger value="chart">Graphique</TabsTrigger>
//                     <TabsTrigger value="journal">Journal</TabsTrigger>
//                   </TabsList>
                  
//                   <TabsContent value="chart" className="space-y-8">
//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Tendances de l'humeur</CardTitle>
//                         <CardDescription>Votre humeur sur les derniers jours</CardDescription>
//                       </CardHeader>
//                       <CardContent>
//                         {moodData.length > 0 ? (
//                           <div className="h-80">
//                             <ResponsiveContainer width="100%" height="100%">
//                               <LineChart
//                                 data={chartData}
//                                 margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//                               >
//                                 <CartesianGrid strokeDasharray="3 3" />
//                                 <XAxis dataKey="date" />
//                                 <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
//                                 <Tooltip />
//                                 <Line
//                                   type="monotone"
//                                   dataKey="mood"
//                                   stroke="#8b5cf6"
//                                   strokeWidth={2}
//                                   activeDot={{ r: 8 }}
//                                   name="Niveau d'humeur"
//                                 />
//                               </LineChart>
//                             </ResponsiveContainer>
//                           </div>
//                         ) : (
//                           <div className="text-center py-12 flex flex-col items-center gap-4">
//                             <Info className="w-10 h-10 text-gray-400" />
//                             <div>
//                               <p className="text-gray-600 dark:text-gray-400">Aucune donnée disponible</p>
//                               <p className="text-gray-500 dark:text-gray-500 text-sm">Enregistrez votre première humeur pour commencer à voir des tendances</p>
//                             </div>
//                           </div>
//                         )}
//                       </CardContent>
//                     </Card>
                    
//                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//                       {moodLevels.map((level) => (
//                         <Card key={level.value} className="text-center">
//                           <CardHeader className="pb-2">
//                             <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center text-white ${level.color}`}>
//                               {level.value}
//                             </div>
//                           </CardHeader>
//                           <CardContent>
//                             <h3 className="font-medium">{level.label}</h3>
//                           </CardContent>
//                         </Card>
//                       ))}
//                     </div>
//                   </TabsContent>
                  
//                   <TabsContent value="journal" className="space-y-6">
//                     {journalEntries.length > 0 ? (
//                       journalEntries.map((entry, index) => (
//                         <Card key={index}>
//                           <CardHeader>
//                             <div className="flex justify-between items-center">
//                               <div className="flex items-center gap-2">
//                                 <Calendar className="w-4 h-4 text-gray-500" />
//                                 <CardTitle className="text-lg">{entry.date}</CardTitle>
//                               </div>
//                               <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${moodLevels[entry.mood - 1].color}`}>
//                                 {entry.mood}
//                               </div>
//                             </div>
//                           </CardHeader>
//                           <CardContent className="space-y-4">
//                             {entry.notes && (
//                               <div>
//                                 <h4 className="font-medium text-sm mb-1 text-gray-700 dark:text-gray-300">Notes</h4>
//                                 <p className="text-gray-800 dark:text-gray-200">{entry.notes}</p>
//                               </div>
//                             )}
//                             {entry.activities && entry.activities.length > 0 && (
//                               <div>
//                                 <h4 className="font-medium text-sm mb-2 text-gray-700 dark:text-gray-300">Activités</h4>
//                                 <div className="flex flex-wrap gap-2">
//                                   {entry.activities.map((activity, actIndex) => (
//                                     <span 
//                                       key={actIndex}
//                                       className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200"
//                                     >
//                                       {activity}
//                                     </span>
//                                   ))}
//                                 </div>
//                               </div>
//                             )}
//                           </CardContent>
//                         </Card>
//                       ))
//                     ) : (
//                       <div className="text-center py-12">
//                         <p className="text-gray-600 dark:text-gray-400">Aucune entrée de journal pour le moment</p>
//                       </div>
//                     )}
//                   </TabsContent>
//                 </Tabs>
//               </>
//             )}
//           </div>
//         </section>
//       </main>
//       <Footer />

//       {/* Dialog pour enregistrer l'humeur */}
//       <Dialog open={moodDialogOpen} onOpenChange={setMoodDialogOpen}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle>Comment vous sentez-vous aujourd'hui ?</DialogTitle>
//             <DialogDescription>
//               Sélectionnez votre niveau d'humeur et ajoutez des notes si vous le souhaitez.
//             </DialogDescription>
//           </DialogHeader>
          
//           <div className="space-y-6 py-4">
//             <div className="space-y-3">
//               <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Votre humeur</h3>
//               <RadioGroup 
//                 value={selectedMood?.toString() || ""} 
//                 onValueChange={(value) => setSelectedMood(parseInt(value))}
//                 className="flex flex-wrap gap-4 justify-between"
//               >
//                 {moodLevels.map((level) => (
//                   <div key={level.value} className="flex flex-col items-center gap-1">
//                     <div className={`${selectedMood === level.value ? 'ring-2 ring-primary' : ''} rounded-full p-1`}>
//                       <div className={`w-14 h-14 rounded-full ${level.color} flex items-center justify-center cursor-pointer`}>
//                         <RadioGroupItem 
//                           value={level.value.toString()} 
//                           id={`mood-${level.value}`} 
//                           className="sr-only"
//                         />
//                         <label 
//                           htmlFor={`mood-${level.value}`} 
//                           className="cursor-pointer flex items-center justify-center h-full w-full text-white text-xl font-bold"
//                         >
//                           {level.value}
//                         </label>
//                       </div>
//                     </div>
//                     <Label htmlFor={`mood-${level.value}`} className="text-xs">
//                       {level.label}
//                     </Label>
//                   </div>
//                 ))}
//               </RadioGroup>
//             </div>
            
//             <div className="space-y-2">
//               <Label htmlFor="notes">Notes (optionnel)</Label>
//               <Textarea 
//                 id="notes" 
//                 placeholder="Comment s'est passée votre journée ? Qu'est-ce qui a influencé votre humeur ?" 
//                 value={notes}
//                 onChange={(e) => setNotes(e.target.value)}
//               />
//             </div>
            
//             <div className="space-y-3">
//               <Label htmlFor="activities">Activités du jour (optionnel)</Label>
//               <div className="flex gap-2">
//                 <Input 
//                   id="activities"
//                   placeholder="Ex: Méditation, Sport, Lecture..." 
//                   value={activity}
//                   onChange={(e) => setActivity(e.target.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === 'Enter') {
//                       e.preventDefault();
//                       handleAddActivity();
//                     }
//                   }}
//                 />
//                 <Button type="button" onClick={handleAddActivity} size="sm">
//                   Ajouter
//                 </Button>
//               </div>
              
//               {activities.length > 0 && (
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {activities.map((act, index) => (
//                     <span 
//                       key={index} 
//                       className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200"
//                     >
//                       {act}
//                       <button 
//                         type="button" 
//                         onClick={() => handleRemoveActivity(act)}
//                         className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200"
//                       >
//                         <X className="h-3 w-3" />
//                       </button>
//                     </span>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
          
//           <DialogFooter className="gap-2 sm:gap-0">
//             <DialogClose asChild>
//               <Button variant="outline">Annuler</Button>
//             </DialogClose>
//             <Button onClick={handleSaveMood} className="bg-purple-600 hover:bg-purple-700">Enregistrer</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default MoodTracker;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smile, Frown, Calendar, X, Info } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

// Remarque : nous n'utilisons plus l'API mock mais directement l'API Laravel
// import { fetchMoodEntries, fetchMoodStats, addMoodEntry } from '../mock/moodTrackerApi';

interface MoodEntry {
  date: string;
  mood: number;
  notes?: string;
  activities: string[];
}

interface MoodStats {
  avg_mood: number;
  total_entries: number;
  weekly_data: MoodEntry[];
}

const MoodTracker: React.FC = () => {
  const { toast } = useToast();
  const [moodDialogOpen, setMoodDialogOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [activity, setActivity] = useState("");
  const [activities, setActivities] = useState<string[]>([]);
  const [moodData, setMoodData] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<MoodStats | null>(null);

  // Fonction pour charger toutes les données depuis l'API Laravel
  const loadAllData = async () => {
    try {
      setLoading(true);
      
      // Charger les entrées d'humeur directement depuis l'API Laravel
      const entriesResponse = await axios.get('http://localhost:8000/api/mood-entries');
      setMoodData(entriesResponse.data);
      
      // Charger les statistiques depuis l'API Laravel
      const statsResponse = await axios.get('http://localhost:8000/api/mood-stats');
      setStats(statsResponse.data);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger vos données d'humeur.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Charger les données au montage du composant
  useEffect(() => {
    loadAllData();
  }, []);

  const moodLevels = [
    { value: 1, label: "Très bas", icon: <Frown className="w-8 h-8" />, color: "bg-red-500" },
    { value: 2, label: "Bas", icon: <Frown className="w-8 h-8" />, color: "bg-orange-500" },
    { value: 3, label: "Neutre", icon: <Frown className="w-8 h-8" />, color: "bg-yellow-500" },
    { value: 4, label: "Bon", icon: <Smile className="w-8 h-8" />, color: "bg-green-400" },
    { value: 5, label: "Excellent", icon: <Smile className="w-8 h-8" />, color: "bg-green-600" },
  ];

  // Récupère les entrées de journal à partir des données d'humeur
  const journalEntries = moodData.length > 0 
    ? [...moodData].slice(0, 5) // Prend seulement les 5 dernières entrées (déjà triées)
    : [];

  const handleOpenMoodDialog = () => {
    setMoodDialogOpen(true);
    setSelectedMood(null);
    setNotes("");
    setActivities([]);
    setActivity("");
  };

  const handleAddActivity = () => {
    if (activity.trim() !== "" && !activities.includes(activity.trim())) {
      setActivities([...activities, activity.trim()]);
      setActivity("");
    }
  };

  const handleRemoveActivity = (activityToRemove: string) => {
    setActivities(activities.filter(act => act !== activityToRemove));
  };

  const handleSaveMood = async () => {
    if (selectedMood === null) {
      toast({
        title: "Sélection requise",
        description: "Veuillez sélectionner votre niveau d'humeur",
        variant: "destructive"
      });
      return;
    }

    try {
      // Envoyer les données au backend Laravel
      const response = await axios.post('http://localhost:8000/api/mood-entries', {
        mood: selectedMood,
        notes: notes.trim() || null,
        activities: activities.length > 0 ? activities : null
      });

      // Vérifiez si la réponse contient les données attendues
      if (response.data && response.data.entry) {
        // Fermer le dialogue
        setMoodDialogOpen(false);
        
        // Recharger toutes les données pour avoir les données à jour
        await loadAllData();

        toast({
          title: "Humeur enregistrée",
          description: response.data.message || "Votre humeur du jour a été enregistrée avec succès.",
        });
      } else {
        throw new Error("Réponse inattendue de l'API");
      }
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer votre humeur. Veuillez réessayer.",
        variant: "destructive"
      });
    }
  };

  // Préparer les données pour le graphique (ordre chronologique)
  const chartData = [...moodData].reverse();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-purple-50 dark:bg-purple-900 py-12">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-purple-900 dark:text-white mb-6">
                Suivi d'humeur
              </h1>
              <p className="text-lg text-purple-700 dark:text-purple-200 mb-8">
                Suivez votre humeur quotidienne et identifiez les tendances pour mieux comprendre votre santé mentale.
              </p>
              <Button 
                onClick={handleOpenMoodDialog} 
                className="rounded-full bg-purple-600 hover:bg-purple-700"
              >
                Enregistrer mon humeur aujourd'hui
              </Button>
            </div>
          </div>
        </section>
        
        {/* Mood Tracker Interface */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">Chargement de vos données...</p>
              </div>
            ) : (
              <>
                {/* Stats Summary */}
                {stats && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Moyenne d'humeur</CardTitle>
                      </CardHeader>
                      <CardContent className="flex items-center gap-2">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${stats.avg_mood > 0 ? moodLevels[Math.round(stats.avg_mood) - 1]?.color || 'bg-purple-500' : 'bg-gray-400'}`}>
                          {stats.avg_mood > 0 ? stats.avg_mood : '-'}
                        </div>
                        <span className="text-xl font-medium">{stats.avg_mood > 0 ? `${stats.avg_mood}/5` : 'Aucune donnée'}</span>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Entrées totales</CardTitle>
                      </CardHeader>
                      <CardContent className="flex items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                        </div>
                        <span className="text-xl font-medium">{stats.total_entries} jour{stats.total_entries > 1 ? 's' : ''}</span>
                      </CardContent>
                    </Card>
                  </div>
                )}

                <Tabs defaultValue="chart" className="w-full">
                  <TabsList className="grid grid-cols-2 mb-8">
                    <TabsTrigger value="chart">Graphique</TabsTrigger>
                    <TabsTrigger value="journal">Journal</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="chart" className="space-y-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Tendances de l'humeur</CardTitle>
                        <CardDescription>Votre humeur sur les derniers jours</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {moodData.length > 0 ? (
                          <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart
                                data={chartData}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
                                <Tooltip />
                                <Line
                                  type="monotone"
                                  dataKey="mood"
                                  stroke="#8b5cf6"
                                  strokeWidth={2}
                                  activeDot={{ r: 8 }}
                                  name="Niveau d'humeur"
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        ) : (
                          <div className="text-center py-12 flex flex-col items-center gap-4">
                            <Info className="w-10 h-10 text-gray-400" />
                            <div>
                              <p className="text-gray-600 dark:text-gray-400">Aucune donnée disponible</p>
                              <p className="text-gray-500 dark:text-gray-500 text-sm">Enregistrez votre première humeur pour commencer à voir des tendances</p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {moodLevels.map((level) => (
                        <Card key={level.value} className="text-center">
                          <CardHeader className="pb-2">
                            <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center text-white ${level.color}`}>
                              {level.value}
                            </div>
                          </CardHeader>
                          <CardContent>
                            <h3 className="font-medium">{level.label}</h3>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="journal" className="space-y-6">
                    {journalEntries.length > 0 ? (
                      journalEntries.map((entry, index) => (
                        <Card key={index}>
                          <CardHeader>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <CardTitle className="text-lg">{entry.date}</CardTitle>
                              </div>
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${moodLevels[entry.mood - 1].color}`}>
                                {entry.mood}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {entry.notes && (
                              <div>
                                <h4 className="font-medium text-sm mb-1 text-gray-700 dark:text-gray-300">Notes</h4>
                                <p className="text-gray-800 dark:text-gray-200">{entry.notes}</p>
                              </div>
                            )}
                            {entry.activities && entry.activities.length > 0 && (
                              <div>
                                <h4 className="font-medium text-sm mb-2 text-gray-700 dark:text-gray-300">Activités</h4>
                                <div className="flex flex-wrap gap-2">
                                  {entry.activities.map((activity, actIndex) => (
                                    <span 
                                      key={actIndex}
                                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200"
                                    >
                                      {activity}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-600 dark:text-gray-400">Aucune entrée de journal pour le moment</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />

      {/* Dialog pour enregistrer l'humeur */}
      <Dialog open={moodDialogOpen} onOpenChange={setMoodDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Comment vous sentez-vous aujourd'hui ?</DialogTitle>
            <DialogDescription>
              Sélectionnez votre niveau d'humeur et ajoutez des notes si vous le souhaitez.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Votre humeur</h3>
              <RadioGroup 
                value={selectedMood?.toString() || ""} 
                onValueChange={(value) => setSelectedMood(parseInt(value))}
                className="flex flex-wrap gap-4 justify-between"
              >
                {moodLevels.map((level) => (
                  <div key={level.value} className="flex flex-col items-center gap-1">
                    <div className={`${selectedMood === level.value ? 'ring-2 ring-primary' : ''} rounded-full p-1`}>
                      <div className={`w-14 h-14 rounded-full ${level.color} flex items-center justify-center cursor-pointer`}>
                        <RadioGroupItem 
                          value={level.value.toString()} 
                          id={`mood-${level.value}`} 
                          className="sr-only"
                        />
                        <label 
                          htmlFor={`mood-${level.value}`} 
                          className="cursor-pointer flex items-center justify-center h-full w-full text-white text-xl font-bold"
                        >
                          {level.value}
                        </label>
                      </div>
                    </div>
                    <Label htmlFor={`mood-${level.value}`} className="text-xs">
                      {level.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optionnel)</Label>
              <Textarea 
                id="notes" 
                placeholder="Comment s'est passée votre journée ? Qu'est-ce qui a influencé votre humeur ?" 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="activities">Activités du jour (optionnel)</Label>
              <div className="flex gap-2">
                <Input 
                  id="activities"
                  placeholder="Ex: Méditation, Sport, Lecture..." 
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddActivity();
                    }
                  }}
                />
                <Button type="button" onClick={handleAddActivity} size="sm">
                  Ajouter
                </Button>
              </div>
              
              {activities.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {activities.map((act, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200"
                    >
                      {act}
                      <button 
                        type="button" 
                        onClick={() => handleRemoveActivity(act)}
                        className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button onClick={handleSaveMood} className="bg-purple-600 hover:bg-purple-700">Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MoodTracker;