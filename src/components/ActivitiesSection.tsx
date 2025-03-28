
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { activitiesData } from '@/data/activitiesData';
import ActivityCard from './ActivityCard';
import { useLearning } from '@/contexts/LearningContext';
import { Clock, Trophy } from 'lucide-react';

const ActivitiesSection: React.FC = () => {
  const { progress } = useLearning();
  const [filter, setFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  
  const filteredActivities = filter === 'all' 
    ? activitiesData 
    : activitiesData.filter(activity => activity.difficulty === filter);
  
  const completedCount = progress.completedActivities.length;
  const totalActivities = activitiesData.length;
  
  return (
    <div className="container mx-auto px-4 pb-16">
      <motion.h2 
        className="text-2xl font-bold mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Fun Learning Activities
      </motion.h2>
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Trophy className="text-yellow-500 mr-2 h-5 w-5" />
            <span className="text-sm font-medium">
              {completedCount} of {totalActivities} completed
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="text-blue-500 mr-2 h-5 w-5" />
            <span className="text-sm">Keep learning!</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mb-6 gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-full text-sm ${
            filter === 'all'
              ? 'bg-alphabuddies-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('easy')}
          className={`px-3 py-1 rounded-full text-sm ${
            filter === 'easy'
              ? 'bg-green-500 text-white'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          Easy
        </button>
        <button
          onClick={() => setFilter('medium')}
          className={`px-3 py-1 rounded-full text-sm ${
            filter === 'medium'
              ? 'bg-yellow-500 text-white'
              : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
          }`}
        >
          Medium
        </button>
        <button
          onClick={() => setFilter('hard')}
          className={`px-3 py-1 rounded-full text-sm ${
            filter === 'hard'
              ? 'bg-red-500 text-white'
              : 'bg-red-100 text-red-700 hover:bg-red-200'
          }`}
        >
          Hard
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map((activity, index) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ActivitiesSection;
