
import React from 'react';


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