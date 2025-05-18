// // Interfaces pour la définition des types
// export interface MoodEntry {
//   date: string;
//   mood: number;
//   notes?: string;
//   activities: string[];
// }

// export interface MoodStats {
//   avg_mood: number;
//   total_entries: number;
//   weekly_data: MoodEntry[];
// }

// // Simulation de la base de données en mémoire - tableau vide au départ
// let moodEntries: MoodEntry[] = [];

// export const fetchMoodEntries = async (): Promise<MoodEntry[]> => {
//   await new Promise(resolve => setTimeout(resolve, 300));
//   return [...moodEntries];
// };

// export const fetchMoodStats = async (): Promise<MoodStats> => {
//   await new Promise(resolve => setTimeout(resolve, 500));

//   if (moodEntries.length === 0) {
//     return {
//       avg_mood: 0,
//       total_entries: 0,
//       weekly_data: []
//     };
//   }

//   const totalMood = moodEntries.reduce((sum, entry) => sum + entry.mood, 0);
//   const avgMood = +(totalMood / moodEntries.length).toFixed(1);
//   const weeklyData = [...moodEntries].reverse();

//   return {
//     avg_mood: avgMood,
//     total_entries: moodEntries.length,
//     weekly_data: weeklyData
//   };
// };

// export const addMoodEntry = async (entry: MoodEntry): Promise<void> => {
//   const response = await fetch('/api/mood', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(entry)
//   });

//   if (!response.ok) {
//     throw new Error('Erreur lors de l’ajout de l’entrée d’humeur');
//   }

//   console.log("Nouvelle entrée d'humeur ajoutée:", entry);
// };

// export const deleteMoodEntry = async (date: string): Promise<{
//   message: string;
//   success: boolean;
// }> => {
//   await new Promise(resolve => setTimeout(resolve, 300));

//   const initialLength = moodEntries.length;
//   moodEntries = moodEntries.filter(entry => entry.date !== date);
//   const success = moodEntries.length < initialLength;

//   return {
//     message: success 
//       ? "Entrée supprimée avec succès" 
//       : "Aucune entrée trouvée à cette date",
//     success
//   };
// };

// export const updateMoodEntry = async (
//   date: string,
//   updates: Partial<Omit<MoodEntry, 'date'>>
// ): Promise<{
//   message: string;
//   entry: MoodEntry | null;
// }> => {
//   await new Promise(resolve => setTimeout(resolve, 500));

//   const entryIndex = moodEntries.findIndex(entry => entry.date === date);
//   if (entryIndex === -1) {
//     return {
//       message: "Entrée non trouvée",
//       entry: null
//     };
//   }

//   moodEntries[entryIndex] = {
//     ...moodEntries[entryIndex],
//     ...updates
//   };

//   return {
//     message: "Entrée mise à jour avec succès",
//     entry: moodEntries[entryIndex]
//   };
// };
import React from 'react';

// Simulation d'une API Laravel
// Ce fichier serait remplacé par de vraies appels d'API à votre backend Laravel

// Interfaces pour la définition des types
export interface MoodEntry {
  date: string;
  mood: number;
  notes?: string;
  activities: string[];
}

export interface MoodStats {
  avg_mood: number;
  total_entries: number;
  weekly_data: MoodEntry[];
}

// ⚠️ IMPORTANT: Cette partie est uniquement pour tester en développement
// Ce module doit être remplacé par de vrais appels d'API à votre backend Laravel

/**
 * ATTENTION: NE PAS UTILISER CE FICHIER DANS VOTRE CODE FINAL
 * 
 * Ce fichier simule une API, mais dans votre application réelle, vous devriez utiliser
 * axios ou fetch pour appeler directement votre API Laravel comme dans l'exemple suivant:
 * 
 * export const fetchMoodEntries = async (): Promise<MoodEntry[]> => {
 *   const response = await axios.get('http://localhost:8000/api/mood-entries');
 *   return response.data;
 * };
 * 
 * export const fetchMoodStats = async (): Promise<MoodStats> => {
 *   const response = await axios.get('http://localhost:8000/api/mood-stats');
 *   return response.data;
 * };
 * 
 * export const addMoodEntry = async (entry: { 
 *   mood: number, 
 *   notes?: string, 
 *   activities?: string[] 
 * }): Promise<any> => {
 *   const response = await axios.post('http://localhost:8000/api/mood-entries', entry);
 *   return response.data;
 * };
 */

// Simulation de la base de données en mémoire - tableau vide au départ
let moodEntries: MoodEntry[] = [];

export const fetchMoodEntries = async (): Promise<MoodEntry[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return [...moodEntries];
};

export const fetchMoodStats = async (): Promise<MoodStats> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  if (moodEntries.length === 0) {
    return {
      avg_mood: 0,
      total_entries: 0,
      weekly_data: []
    };
  }
  
  const totalMood = moodEntries.reduce((sum, entry) => sum + entry.mood, 0);
  const avgMood = +(totalMood / moodEntries.length).toFixed(1);
  const weeklyData = [...moodEntries].reverse();
  
  return {
    avg_mood: avgMood,
    total_entries: moodEntries.length,
    weekly_data: weeklyData
  };
};

export const addMoodEntry = async (entry: { 
  mood: number, 
  notes?: string, 
  activities?: string[] 
}): Promise<{ message: string; entry: MoodEntry }> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Créer une nouvelle entrée de journal
  const newEntry: MoodEntry = {
    date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
    mood: entry.mood,
    notes: entry.notes || undefined,
    activities: entry.activities || []
  };
  
  // Ajouter à notre "base de données" simulée
  moodEntries = [newEntry, ...moodEntries];
  
  return {
    message: "Humeur enregistrée avec succès",
    entry: newEntry
  };
};

export const deleteMoodEntry = async (date: string): Promise<{
  message: string;
  success: boolean;
}> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const initialLength = moodEntries.length;
  moodEntries = moodEntries.filter(entry => entry.date !== date);
  const success = moodEntries.length < initialLength;
  
  return {
    message: success
      ? "Entrée supprimée avec succès"
      : "Aucune entrée trouvée à cette date",
    success
  };
};

export const updateMoodEntry = async (
  date: string,
  updates: Partial<Omit<MoodEntry, 'date'>>
): Promise<{
  message: string;
  entry: MoodEntry | null;
}> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const entryIndex = moodEntries.findIndex(entry => entry.date === date);
  
  if (entryIndex === -1) {
    return {
      message: "Entrée non trouvée",
      entry: null
    };
  }
  
  moodEntries[entryIndex] = {
    ...moodEntries[entryIndex],
    ...updates
  };
  
  return {
    message: "Entrée mise à jour avec succès",
    entry: moodEntries[entryIndex]
  };
};