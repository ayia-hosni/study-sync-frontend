import React from 'react';

interface QuickAction {
  emoji: string;
  label: string;
  onClick?: () => void;
}

interface QuickActionsProps {
  actions?: QuickAction[];
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  actions = [
    {
      emoji: '🔍',
      label: 'Find Study Partner',
      onClick: () => console.log('Find Study Partner clicked')
    },
    {
      emoji: '📅',
      label: 'Schedule Session',
      onClick: () => console.log('Schedule Session clicked')
    },
    {
      emoji: '📖',
      label: 'Browse Materials',
      onClick: () => console.log('Browse Materials clicked')
    }
  ]
}) => {
  return (
    <article className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-xl transition-all duration-500 hover:scale-[1.03] animate-fade-in">
      <h3 className="text-lg font-semibold text-card-foreground mb-4 hover:text-primary transition-colors duration-300">
        ⭐ Quick Actions
      </h3>
      <div className="flex flex-col gap-3 max-sm:gap-2">
        {actions.map((action, index) => (
          <button
            key={index}
            className="w-full h-12 flex items-center gap-4 cursor-pointer bg-secondary/50 px-4 py-0 rounded-xl max-sm:h-11 hover:bg-secondary hover:shadow-lg transition-all duration-300 hover:scale-[1.05] hover:-translate-y-1 group animate-scale-in"
            onClick={action.onClick}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <span 
              className="text-lg shrink-0 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" 
              role="img" 
              aria-label={action.label}
            >
              {action.emoji}
            </span>
            <span className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors duration-300">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </article>
  );
};
