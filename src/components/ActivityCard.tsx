
import React from 'react';
import { motion } from 'framer-motion';
import { useLearning } from '@/contexts/LearningContext';
import { Star, Trophy } from 'lucide-react';
import { Activity } from '@/data/activitiesData';
import { toast } from '@/components/ui/sonner';

interface ActivityCardProps {
  activity: Activity;
  index: number;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, index }) => {
  const { completeActivity, progress } = useLearning();
  const isCompleted = progress.completedActivities.includes(activity.id);
  
  const handleActivityClick = () => {
    // For now, just mark it as complete since we don't have the actual activities implemented
    if (!isCompleted) {
      completeActivity(activity.id);
    } else {
      toast({
        title: "Already Completed",
        description: "You've already completed this activity!",
      });
    }
  };
  
  const getBadgeColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
          <span className="text-4xl mb-3">{activity.image}</span>
          <span className={`text-xs rounded-full px-2 py-1 ${getBadgeColor(activity.difficulty)}`}>
            {activity.difficulty}
          </span>
        </div>
        
        <h3 className="font-bold text-xl mb-1 text-alphabuddies-primary">{activity.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{activity.description}</p>
        
        <div className="flex justify-between items-center">
          <button
            onClick={handleActivityClick}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isCompleted
                ? 'bg-gray-100 text-gray-500 cursor-default'
                : 'bg-alphabuddies-primary text-white hover:bg-alphabuddies-secondary'
            }`}
          >
            {isCompleted ? (
              <div className="flex items-center">
                <Trophy className="h-4 w-4 mr-1" />
                <span>Completed</span>
              </div>
            ) : (
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1" />
                <span>Start</span>
              </div>
            )}
          </button>
          
          {isCompleted && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              className="bg-green-500 text-white p-1 rounded-full"
            >
              <Trophy className="h-5 w-5" />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityCard;
