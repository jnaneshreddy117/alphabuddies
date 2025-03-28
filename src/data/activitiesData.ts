// This file is kept as a placeholder but is no longer used
// It's maintained for future reference if activities are added back

export interface Activity {
  id: string;
  title: string;
  description: string;
  image: string;
  type: 'matching' | 'memory' | 'puzzle' | 'story';
  difficulty: 'easy' | 'medium' | 'hard';
  completed?: boolean;
}

export const activitiesData: Activity[] = [];
