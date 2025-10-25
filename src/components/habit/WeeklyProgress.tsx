import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export const WeeklyProgress = () => {
  const progressData = [
    {
      name: "Morning Exercise",
      percentage: 86,
      daysCompleted: 6,
      totalDays: 7,
      trend: "up",
      trendValue: "+14%",
      color: "habit-purple"
    },
    {
      name: "Read 30 Minutes", 
      percentage: 86,
      daysCompleted: 6,
      totalDays: 7,
      trend: "up", 
      trendValue: "+8%",
      color: "habit-purple"
    },
    {
      name: "Drink 8 Glasses Water",
      percentage: 86,
      daysCompleted: 6,
      totalDays: 7,
      trend: "up",
      trendValue: "+12%", 
      color: "habit-purple"
    },
    {
      name: "Meditate",
      percentage: 71,
      daysCompleted: 5,
      totalDays: 7,
      trend: "down",
      trendValue: "-5%",
      color: "habit-warning"
    },
    {
      name: "Write Journal",
      percentage: 86,
      daysCompleted: 6,
      totalDays: 7,
      trend: "up",
      trendValue: "+20%",
      color: "habit-purple"
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-3 h-3 text-habit-success" />;
      case "down":
        return <TrendingDown className="w-3 h-3 text-habit-error" />;
      default:
        return <Minus className="w-3 h-3 text-muted-foreground" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-habit-success";
      case "down":
        return "text-habit-error";
      default:
        return "text-muted-foreground";
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-habit-purple";
    if (percentage >= 60) return "bg-habit-warning";
    return "bg-habit-error";
  };

  return (
    <div className="space-y-6">
      {progressData.map((item, index) => (
        <div key={index} className="group p-4 rounded-lg border hover:bg-accent/50 transition-all duration-200">
          <div className="flex items-center gap-4">
            <div className={`w-4 h-4 rounded-sm flex-shrink-0 ${
              item.percentage >= 80 ? 'bg-habit-purple' : 
              item.percentage >= 60 ? 'bg-habit-warning' : 'bg-habit-error'
            }`}></div>
            
            <div className="flex-1 space-y-3">
              {/* Header with name, percentage, and trend */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-foreground">{item.name}</span>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(item.trend)}
                    <span className={`text-xs font-medium ${getTrendColor(item.trend)}`}>
                      {item.trendValue}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-foreground">{item.percentage}%</span>
                  <div className="text-xs text-muted-foreground">
                    {item.daysCompleted}/{item.totalDays} days
                  </div>
                </div>
              </div>

              {/* Progress bar with custom styling */}
              <div className="relative">
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-700 ease-out ${getProgressColor(item.percentage)}`}
                    style={{ 
                      width: `${item.percentage}%`,
                      background: item.percentage >= 80 
                        ? 'linear-gradient(90deg, hsl(var(--habit-purple)), hsl(var(--habit-purple-light)))' 
                        : item.percentage >= 60
                        ? 'linear-gradient(90deg, hsl(var(--habit-warning)), hsl(var(--habit-warning) / 0.8))'
                        : 'linear-gradient(90deg, hsl(var(--habit-error)), hsl(var(--habit-error) / 0.8))'
                    }}
                  />
                </div>
                
                {/* Gradient overlay for visual enhancement */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Week day indicators */}
              <div className="flex justify-between items-center pt-1">
                <div className="flex gap-1">
                  {Array.from({ length: 7 }, (_, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        dayIndex < item.daysCompleted 
                          ? 'bg-primary' 
                          : 'bg-muted border border-border'
                      }`}
                      title={`Day ${dayIndex + 1}: ${dayIndex < item.daysCompleted ? 'Completed' : 'Not completed'}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">This week</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};