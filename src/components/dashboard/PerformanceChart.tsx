import React from 'react';

interface PerformanceData {
  day: string;
  hours: number;
  sessions: number;
}

interface PerformanceChartProps {
  data?: PerformanceData[];
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  data = [
    { day: 'Mon', hours: 3, sessions: 2 },
    { day: 'Tue', hours: 4, sessions: 3 },
    { day: 'Wed', hours: 2, sessions: 1 },
    { day: 'Thu', hours: 5, sessions: 4 },
    { day: 'Fri', hours: 3, sessions: 2 },
    { day: 'Sat', hours: 6, sessions: 4 },
    { day: 'Sun', hours: 4, sessions: 3 }
  ]
}) => {
  const maxHours = Math.max(...data.map(d => d.hours));

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">
          📊 Weekly Performance
        </h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-muted-foreground">Study Hours</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-end justify-between h-32 gap-2">
          {data.map((item, index) => {
            const height = (item.hours / maxHours) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col items-end justify-end h-24">
                  <div 
                    className="w-full bg-gradient-to-t from-primary to-purple-500 rounded-t-lg transition-all duration-500 hover:opacity-80"
                    style={{ height: `${height}%`, minHeight: '8px' }}
                  />
                </div>
                <div className="text-center">
                  <div className="text-xs text-card-foreground font-medium">
                    {item.day}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {item.hours}h
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="pt-4 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-card-foreground">
                {data.reduce((sum, d) => sum + d.hours, 0)}
              </div>
              <div className="text-xs text-muted-foreground">Total Hours</div>
            </div>
            <div>
              <div className="text-xl font-bold text-card-foreground">
                {data.reduce((sum, d) => sum + d.sessions, 0)}
              </div>
              <div className="text-xs text-muted-foreground">Sessions</div>
            </div>
            <div>
              <div className="text-xl font-bold text-card-foreground">
                {Math.round(data.reduce((sum, d) => sum + d.hours, 0) / data.length * 10) / 10}
              </div>
              <div className="text-xs text-muted-foreground">Avg/Day</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};