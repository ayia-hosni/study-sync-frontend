import React from 'react';

interface Goal {
  id: string;
  title: string;
  progress: number;
  target: number;
  unit: string;
  emoji: string;
}

interface StudyGoalsProps {
  goals?: Goal[];
}

export const StudyGoals: React.FC<StudyGoalsProps> = ({
  goals = [
    {
      id: '1',
      title: 'Weekly Study Hours',
      progress: 12,
      target: 20,
      unit: 'hours',
      emoji: '⏰'
    },
    {
      id: '2',
      title: 'Sessions This Month',
      progress: 8,
      target: 15,
      unit: 'sessions',
      emoji: '📚'
    },
    {
      id: '3',
      title: 'Study Streak',
      progress: 7,
      target: 14,
      unit: 'days',
      emoji: '🔥'
    }
  ]
}) => {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">
        🎯 Study Goals
      </h3>
      <div className="space-y-4">
        {goals.map((goal) => {
          const percentage = Math.min((goal.progress / goal.target) * 100, 100);
          return (
            <div key={goal.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{goal.emoji}</span>
                  <span className="font-medium text-card-foreground text-sm">
                    {goal.title}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {goal.progress}/{goal.target} {goal.unit}
                </span>
              </div>
              <div className="relative">
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent opacity-30 animate-pulse" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};