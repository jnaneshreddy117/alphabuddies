
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the types of state and updates
interface ProgressType {
  completedLetters: string[];
  completedWords: string[];
  stars: number;
  level: number;
}

interface LearningContextType {
  currentLetter: string;
  currentSection: 'alphabet' | 'words' | 'progress';
  progress: ProgressType;
  setCurrentLetter: (letter: string) => void;
  setCurrentSection: (section: 'alphabet' | 'words' | 'progress') => void;
  completeLetterExercise: (letter: string) => void;
  completeWordExercise: (word: string) => void;
  addStars: (count: number) => void;
}

// Create the context with a default value
const LearningContext = createContext<LearningContextType | undefined>(undefined);

// Create a provider component
export const LearningProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLetter, setCurrentLetter] = useState<string>('A');
  const [currentSection, setCurrentSection] = useState<'alphabet' | 'words' | 'progress'>('alphabet');
  const [progress, setProgress] = useState<ProgressType>({
    completedLetters: [],
    completedWords: [],
    stars: 0,
    level: 1,
  });

  const completeLetterExercise = (letter: string) => {
    if (!progress.completedLetters.includes(letter)) {
      setProgress(prev => ({
        ...prev,
        completedLetters: [...prev.completedLetters, letter],
        stars: prev.stars + 1,
      }));
    }
  };

  const completeWordExercise = (word: string) => {
    if (!progress.completedWords.includes(word)) {
      setProgress(prev => ({
        ...prev,
        completedWords: [...prev.completedWords, word],
        stars: prev.stars + 2,
      }));
    }
  };

  const addStars = (count: number) => {
    setProgress(prev => ({
      ...prev,
      stars: prev.stars + count,
      level: Math.floor((prev.stars + count) / 10) + 1,
    }));
  };

  return (
    <LearningContext.Provider 
      value={{ 
        currentLetter, 
        currentSection, 
        progress, 
        setCurrentLetter, 
        setCurrentSection, 
        completeLetterExercise, 
        completeWordExercise,
        addStars
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

// Create a custom hook to use the context
export const useLearning = () => {
  const context = useContext(LearningContext);
  if (context === undefined) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
