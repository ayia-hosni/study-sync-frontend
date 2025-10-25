import React from 'react';

interface ActivityItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  time: string;
  type: 'session' | 'match' | 'achievement' | 'study';
}

interface RecentActivityProps {
  activities?: ActivityItem[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({
  activities = [
    {
      id: '1',
      icon: '📚',
      title: 'Completed Physics Session',
      description: 'Studied wave mechanics with Sarah',
      time: '2 hours ago',
      type: 'session'
    },
    {
      id: '2',
      icon: '🎯',
      title: 'Achievement Unlocked',
      description: 'Completed 5 consecutive study sessions',
      time: '4 hours ago',
      type: 'achievement'
    },
    {
      id: '3',
      icon: '👥',
      title: 'New Study Match',
      description: 'Matched with Alex for Chemistry',
      time: '6 hours ago',
      type: 'match'
    },
    {
      id: '4',
      icon: '📖',
      title: 'Study Material Added',
      description: 'New calculus practice problems available',
      time: '1 day ago',
      type: 'study'
    }
  ]
}) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'session': return 'text-green-400';
      case 'achievement': return 'text-yellow-400';
      case 'match': return 'text-blue-400';
      case 'study': return 'text-purple-400';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">
        📈 Recent Activity
      </h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-lg">{activity.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className={`font-medium text-sm ${getTypeColor(activity.type)}`}>
                  {activity.title}
                </h4>
                <time className="text-xs text-muted-foreground">
                  {activity.time}
                </time>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {activity.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};