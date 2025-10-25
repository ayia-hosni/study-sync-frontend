import { TrendingUp, Target, BarChart3 } from "lucide-react";

export const StatisticsCard = () => {
  const stats = [
    {
      label: "Current Streak",
      value: "12",
      icon: TrendingUp,
      color: "bg-primary"
    },
    {
      label: "Best Streak", 
      value: "15",
      icon: Target,
      color: "bg-habit-success"
    },
    {
      label: "Total Habits",
      value: "5", 
      icon: BarChart3,
      color: "bg-habit-purple"
    }
  ];

  return (
    <div className="space-y-6">
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center`}>
            <stat.icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};