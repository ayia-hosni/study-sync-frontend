import React from 'react';

interface StudyStreakProps {
  currentStreak?: number;
  goalDays?: number;
}

export const StudyStreak: React.FC<StudyStreakProps> = ({
  currentStreak = 7,
  goalDays = 10
}) => {
  const progressPercentage = Math.min((currentStreak / goalDays) * 100, 100);
  const remainingDays = Math.max(goalDays - currentStreak, 0);

  return (
    <article className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-xl transition-all duration-500 hover:scale-[1.03] animate-fade-in"
    >
      <h3 className="text-lg font-semibold text-card-foreground mb-4 hover:text-primary transition-colors duration-300">
        📚 Study Streak
      </h3>
      <div className="flex items-start gap-6 max-sm:flex-col max-sm:gap-4 max-sm:text-center">
        <div className="flex flex-col items-center max-sm:self-center animate-bounce-gentle">
          <div className="text-4xl font-bold text-primary mb-1 hover:scale-110 transition-transform duration-300">
            {currentStreak}
          </div>
          <div className="text-sm text-muted-foreground">
            Days
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-3 animate-scale-in">
          <p className="text-sm text-card-foreground hover:text-primary transition-colors duration-300">
            Keep it up! You're on a {currentStreak}-day study streak.
          </p>
          <div className="relative w-full h-3 rounded-full hover:scale-105 transition-transform duration-300">
            <div className="w-full h-3 bg-secondary rounded-full" />
            <div 
              className="absolute h-3 bg-gradient-to-r from-primary to-purple-500 rounded-full left-0 top-0 transition-all duration-1000 hover:animate-pulse-glow"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground hover:text-primary transition-colors duration-300">
            {remainingDays > 0 
              ? `${remainingDays} more days to reach your goal!`
              : 'Goal achieved! 🎉'
            }
          </p>
        </div>
      </div>
    </article>
  );
};
