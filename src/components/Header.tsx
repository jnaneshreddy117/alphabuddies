
import React from 'react';
import { useLearning } from '@/contexts/LearningContext';
import { Button } from '@/components/ui/button';
import { Book, BookOpen, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const { currentSection, setCurrentSection, progress } = useLearning();
  
  return (
    <motion.header 
      className="w-full bg-white shadow-md rounded-xl mb-6 overflow-hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <motion.div 
            className="mr-2 text-2xl"
            animate={{ rotate: [0, 10, 0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            📚
          </motion.div>
          <h1 className="text-xl md:text-2xl font-bold text-alphabuddies-primary">
            Alpha<span className="text-alphabuddies-secondary">Buddies</span>
          </h1>
        </div>
        
        <div className="flex items-center bg-alphabuddies-card px-3 py-1 rounded-full">
          <motion.span 
            className="text-yellow-500 mr-1"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            ⭐
          </motion.span>
          <span className="font-bold">{progress.stars}</span>
        </div>
      </div>
      
      <div className="flex divide-x border-t">
        <Button
          variant="ghost"
          className={`flex-1 rounded-none py-3 ${
            currentSection === 'alphabet' ? 'bg-alphabuddies-card' : ''
          }`}
          onClick={() => setCurrentSection('alphabet')}
        >
          <Book className="h-4 w-4 mr-2" />
          <span>Letters</span>
        </Button>
        <Button
          variant="ghost"
          className={`flex-1 rounded-none py-3 ${
            currentSection === 'words' ? 'bg-alphabuddies-card' : ''
          }`}
          onClick={() => setCurrentSection('words')}
        >
          <BookOpen className="h-4 w-4 mr-2" />
          <span>Words</span>
        </Button>
        <Button
          variant="ghost"
          className={`flex-1 rounded-none py-3 ${
            currentSection === 'progress' ? 'bg-alphabuddies-card' : ''
          }`}
          onClick={() => setCurrentSection('progress')}
        >
          <Star className="h-4 w-4 mr-2" />
          <span>Progress</span>
        </Button>
      </div>
    </motion.header>
  );
};

export default Header;
