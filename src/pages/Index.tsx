
import React from 'react';
import { LearningProvider, useLearning } from '@/contexts/LearningContext';
import Header from '@/components/Header';
import AlphabetCard from '@/components/AlphabetCard';
import WordExercise from '@/components/WordExercise';
import ProgressTracker from '@/components/ProgressTracker';
import { alphabetData, sampleWords } from '@/data/alphabetData';
import { motion } from 'framer-motion';

const MainContent = () => {
  const { currentSection } = useLearning();
  
  return (
    <>
      <Header />
      
      <div className="container mx-auto px-4 pb-16">
        {currentSection === 'alphabet' && (
          <>
            <motion.h2 
              className="text-2xl font-bold mb-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Learn the Alphabet
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {alphabetData.map((item, index) => (
                <AlphabetCard
                  key={item.letter}
                  letter={item.letter}
                  word={item.word}
                  image={item.image}
                  color={item.color}
                  index={index}
                />
              ))}
            </div>
          </>
        )}
        
        {currentSection === 'words' && (
          <>
            <motion.h2 
              className="text-2xl font-bold mb-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Build Words
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sampleWords.map((item, index) => (
                <WordExercise
                  key={`word-${index}`}
                  word={item.word}
                  image={item.image}
                />
              ))}
            </div>
          </>
        )}
        
        {currentSection === 'progress' && (
          <>
            <motion.h2 
              className="text-2xl font-bold mb-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Your Learning Journey
            </motion.h2>
            <div className="max-w-md mx-auto">
              <ProgressTracker />
            </div>
          </>
        )}
      </div>
    </>
  );
};

const Index = () => {
  return (
    <LearningProvider>
      <div className="min-h-screen bg-alphabuddies-background">
        <MainContent />
      </div>
    </LearningProvider>
  );
};

export default Index;
