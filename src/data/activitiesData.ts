
export interface Activity {
  id: string;
  title: string;
  description: string;
  image: string;
  type: 'matching' | 'memory' | 'puzzle' | 'story';
  difficulty: 'easy' | 'medium' | 'hard';
  completed?: boolean;
}

export const activitiesData: Activity[] = [
  {
    id: 'match-letters',
    title: 'Match Letters',
    description: 'Match uppercase and lowercase letters',
    image: '🔤',
    type: 'matching',
    difficulty: 'easy',
  },
  {
    id: 'memory-abc',
    title: 'Memory ABC',
    description: 'Find matching letter pairs',
    image: '🧠',
    type: 'memory',
    difficulty: 'medium',
  },
  {
    id: 'word-puzzle',
    title: 'Word Puzzle',
    description: 'Solve simple word puzzles',
    image: '🧩',
    type: 'puzzle',
    difficulty: 'medium',
  },
  {
    id: 'story-time',
    title: 'Story Time',
    description: 'Read along with simple stories',
    image: '📚',
    type: 'story',
    difficulty: 'hard',
  },
  {
    id: 'rhyming-words',
    title: 'Rhyming Words',
    description: 'Match words that rhyme',
    image: '🎵',
    type: 'matching',
    difficulty: 'medium',
  },
  {
    id: 'letter-tracing',
    title: 'Letter Tracing',
    description: 'Practice writing letters',
    image: '✏️',
    type: 'puzzle',
    difficulty: 'easy',
  },
];
