
import React from 'react';
import { useLearning } from '@/contexts/LearningContext';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { activitiesData } from '@/data/activitiesData';

const ProgressTracker: React.FC = () => {
  const { progress } = useLearning();
  
  const totalLetters = 26; // A-Z
  const totalWords = 10; // from our sample words
  const totalActivities = activitiesData.length;
  
  const letterProgress = Math.floor((progress.completedLetters.length / totalLetters) * 100);
  const wordProgress = Math.floor((progress.completedWords.length / totalWords) * 100);
  const activityProgress = Math.floor((progress.completedActivities.length / totalActivities) * 100);
  
  const starsToNextLevel = 10 - (progress.stars % 10);
  
  return (
    <motion.div 
      className="bg-white rounded-xl p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-alphabuddies-text mb-6">Your Progress</h2>
      
      <div className="grid gap-6">
        {/* Level indicator */}
        <div className="flex justify-between items-center">
          <span className="font-bold text-xl">Level {progress.level}</span>
          <div className="flex items-center">
            <span className="text-xl mr-2">{progress.stars}</span>
            <motion.span 
              className="text-yellow-500 text-xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              ⭐
            </motion.span>
          </div>
        </div>
        
        <div className="text-sm text-gray-600">
          {starsToNextLevel} stars until level {progress.level + 1}
        </div>
        
        {/* Letter progress */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Alphabet</span>
            <span>{progress.completedLetters.length}/{totalLetters}</span>
          </div>
          <Progress value={letterProgress} className="h-2" />
        </div>
        
        {/* Word progress */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Words</span>
            <span>{progress.completedWords.length}/{totalWords}</span>
          </div>
          <Progress value={wordProgress} className="h-2" />
        </div>
        
        {/* Activities progress */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Activities</span>
            <span>{progress.completedActivities.length}/{totalActivities}</span>
          </div>
          <Progress value={activityProgress} className="h-2" />
        </div>
        
        {/* Badges */}
        <div>
          <h3 className="font-medium mb-3">Badges</h3>
          <div className="flex flex-wrap gap-2">
            {progress.completedLetters.length >= 5 && (
              <div className="p-2 bg-blue-100 rounded-full" title="First Steps: Complete 5 letters">
                🚶
              </div>
            )}
            {progress.completedLetters.length >= 10 && (
              <div className="p-2 bg-green-100 rounded-full" title="Explorer: Complete 10 letters">
                🧭
              </div>
            )}
            {progress.completedLetters.length >= 20 && (
              <div className="p-2 bg-purple-100 rounded-full" title="Alphabet Master: Complete 20 letters">
                🔤
              </div>
            )}
            {progress.completedWords.length >= 3 && (
              <div className="p-2 bg-yellow-100 rounded-full" title="Wordsmith: Complete 3 words">
                📝
              </div>
            )}
            {progress.completedWords.length >= 7 && (
              <div className="p-2 bg-pink-100 rounded-full" title="Vocabulary Virtuoso: Complete 7 words">
                📚
              </div>
            )}
            {progress.completedActivities.length >= 3 && (
              <div className="p-2 bg-orange-100 rounded-full" title="Activity Starter: Complete 3 activities">
                🎮
              </div>
            )}
            {progress.completedActivities.length >= 5 && (
              <div className="p-2 bg-indigo-100 rounded-full" title="Activity Champion: Complete 5 activities">
                🏆
              </div>
            )}
            {progress.stars >= 15 && (
              <div className="p-2 bg-amber-100 rounded-full" title="Star Collector: Earn 15 stars">
                ⭐
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressTracker;
