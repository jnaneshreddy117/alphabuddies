
import React, { useState, useEffect } from 'react';
import AudioButton from './AudioButton';
import { useLearning } from '@/contexts/LearningContext';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';

interface WordExerciseProps {
  word: string;
  image: string;
}

const WordExercise: React.FC<WordExerciseProps> = ({ word, image }) => {
  const { completeWordExercise, addStars } = useLearning();
  const [letters, setLetters] = useState<string[]>([]);
  const [shuffledLetters, setShuffledLetters] = useState<string[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    const wordLetters = word.toUpperCase().split('');
    setLetters(wordLetters);
    
    // Create shuffled array with a few extra random letters
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const extraLetters = Array.from({ length: 3 }, () => {
      const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
      return randomLetter;
    });
    
    const allLetters = [...wordLetters, ...extraLetters];
    setShuffledLetters(allLetters.sort(() => Math.random() - 0.5));
  }, [word]);

  const handleLetterClick = (letter: string, index: number) => {
    const newSelectedLetters = [...selectedLetters, letter];
    setSelectedLetters(newSelectedLetters);
    
    // Remove the letter from the shuffled array
    const newShuffledLetters = [...shuffledLetters];
    newShuffledLetters.splice(index, 1);
    setShuffledLetters(newShuffledLetters);
    
    // Check if the word is complete
    if (newSelectedLetters.length === letters.length) {
      const selectedWord = newSelectedLetters.join('');
      const correctWord = letters.join('');
      
      if (selectedWord === correctWord) {
        setIsCorrect(true);
        completeWordExercise(word);
        addStars(2);
        toast.success('Great job! That\'s correct!');
      } else {
        setIsCorrect(false);
        toast.error('Not quite right. Try again!');
      }
    }
  };

  const resetExercise = () => {
    setSelectedLetters([]);
    setIsCorrect(null);
    
    // Reshuffle the letters
    const wordLetters = word.toUpperCase().split('');
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const extraLetters = Array.from({ length: 3 }, () => {
      const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
      return randomLetter;
    });
    
    const allLetters = [...wordLetters, ...extraLetters];
    setShuffledLetters(allLetters.sort(() => Math.random() - 0.5));
  };

  return (
    <motion.div 
      className="bg-white rounded-xl p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-2xl font-bold text-alphabuddies-text">Build the Word</h3>
        <AudioButton text={word} />
      </div>
      
      <div className="flex flex-col items-center mb-6">
        <div className="text-7xl mb-4">{image}</div>
        
        {/* Word display area */}
        <div className="flex justify-center gap-2 mb-8">
          {letters.map((letter, i) => (
            <div 
              key={`space-${i}`} 
              className={`w-12 h-12 border-2 border-dashed flex items-center justify-center text-2xl font-bold rounded-lg 
                ${selectedLetters[i] ? 'border-alphabuddies-primary' : 'border-gray-300'}`}
            >
              {selectedLetters[i] || ''}
            </div>
          ))}
        </div>
        
        {/* Available letters */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {shuffledLetters.map((letter, i) => (
            <motion.button
              key={`letter-${i}`}
              className="w-10 h-10 bg-alphabuddies-card rounded-lg flex items-center justify-center text-xl font-bold shadow"
              onClick={() => handleLetterClick(letter, i)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {letter}
            </motion.button>
          ))}
        </div>
        
        {/* Feedback area */}
        {isCorrect !== null && (
          <div className={`rounded-full px-4 py-2 flex items-center ${
            isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {isCorrect ? (
              <>
                <Check className="h-5 w-5 mr-2" />
                <span>Correct! Well done!</span>
              </>
            ) : (
              <>
                <X className="h-5 w-5 mr-2" />
                <span>Try again!</span>
              </>
            )}
          </div>
        )}
      </div>
      
      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={resetExercise}
          className="px-6 py-2"
        >
          Reset
        </Button>
      </div>
    </motion.div>
  );
};

export default WordExercise;
