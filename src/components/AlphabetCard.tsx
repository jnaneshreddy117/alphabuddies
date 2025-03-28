
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AudioButton from './AudioButton';
import { useLearning } from '@/contexts/LearningContext';
import { Book, Check } from 'lucide-react';

interface AlphabetCardProps {
  letter: string;
  word: string;
  image: string;
  color: string;
  index: number;
}

const AlphabetCard: React.FC<AlphabetCardProps> = ({ letter, word, image, color, index }) => {
  const { completeLetterExercise, progress } = useLearning();
  const [flipped, setFlipped] = useState(false);
  
  const isCompleted = progress.completedLetters.includes(letter);

  const handleComplete = () => {
    completeLetterExercise(letter);
  };
  
  return (
    <motion.div
      className="perspective"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div 
        className={`relative w-full h-64 rounded-xl shadow-lg transform-style cursor-pointer ${
          flipped ? 'rotate-y-180' : ''
        } transition-transform duration-500`}
        onClick={() => setFlipped(!flipped)}
      >
        {/* Front of card */}
        <div 
          className={`absolute w-full h-full rounded-xl bg-gradient-to-br ${color} flex flex-col items-center justify-center p-4 ${
            flipped ? 'hidden' : ''
          }`}
        >
          <div className="text-9xl font-bold text-white mb-2">{letter}</div>
          <AudioButton text={letter} className="absolute top-2 right-2" />
          {isCompleted && (
            <div className="absolute top-2 left-2 bg-green-500 text-white rounded-full p-1">
              <Check className="h-4 w-4" />
            </div>
          )}
        </div>
        
        {/* Back of card */}
        <div 
          className={`absolute w-full h-full rounded-xl bg-white flex flex-col items-center justify-center p-4 ${
            flipped ? '' : 'hidden'
          }`}
        >
          <div className="text-7xl mb-2">{image}</div>
          <div className="text-3xl font-bold text-alphabuddies-text mb-2">{word}</div>
          <AudioButton text={word} className="mt-2" />
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleComplete();
            }}
            className={`absolute bottom-4 right-4 p-2 rounded-full ${
              isCompleted 
                ? 'bg-green-100 text-green-500 cursor-default' 
                : 'bg-alphabuddies-primary text-white hover:bg-alphabuddies-secondary'
            }`}
          >
            {isCompleted ? (
              <Check className="h-5 w-5" />
            ) : (
              <Book className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AlphabetCard;
