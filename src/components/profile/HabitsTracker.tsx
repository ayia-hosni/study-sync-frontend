import React from 'react';

interface Habit {
  id: string;
  name: string;
  icon: string;
  streak: number;
  completedToday: boolean;
  weekProgress: boolean[]; // 7 days, true if completed
}

interface HabitsTrackerProps {
  habits: Habit[];
  onToggleHabit?: (habitId: string) => void;
}

export const HabitsTracker: React.FC<HabitsTrackerProps> = ({
  habits,
  onToggleHabit,
}) => {
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
                    <section className="bg-white dark:bg-zinc-900 border flex flex-col text-[rgba(32,32,32,1)] dark:text-white pl-[21px] pr-20 py-5 rounded-2xl border-[rgba(240,240,240,1)] dark:border-zinc-800 border-solid max-md:max-w-full max-md:px-5 hover:border-[rgba(112,45,255,0.2)] dark:hover:border-violet-700 transition-all duration-200">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-foreground text-lg font-bold">
          Study Habits
        </h3>
        <button className="text-primary text-sm font-semibold hover:text-primary/80 transition-colors">
          Add Habit
        </button>
      </div>
      
      <div className="space-y-4">
        {habits.map((habit) => (
          <article
            key={habit.id}
            className="bg-muted/30 flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-all duration-300"
          >
            <div className="text-2xl">{habit.icon}</div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-foreground text-sm font-semibold">
                  {habit.name}
                </h4>
                <span className="text-primary text-xs font-bold">
                  {habit.streak} day streak
                </span>
              </div>
              
              <div className="flex gap-1">
                {weekDays.map((day, index) => (
                  <div
                    key={index}
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                      habit.weekProgress[index]
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>
            
            <button
              onClick={() => onToggleHabit?.(habit.id)}
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                habit.completedToday
                  ? 'bg-primary border-primary text-primary-foreground'
                  : 'border-muted-foreground hover:border-primary'
              }`}
            >
              {habit.completedToday && (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};