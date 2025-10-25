import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const HabitHeatmap = () => {
  // Generate calendar heatmap data organized by weeks
  const generateHeatmapData = () => {
    const weeks = [];
    const startDate = new Date(new Date().getFullYear(), 0, 1);
    const endDate = new Date(new Date().getFullYear(), 11, 31);
    
    // Start from the Sunday before January 1st to create complete weeks
    const startOfCalendar = new Date(startDate);
    startOfCalendar.setDate(startDate.getDate() - startDate.getDay());
    
    let currentDate = new Date(startOfCalendar);
    
    while (currentDate <= endDate) {
      const week = [];
      for (let day = 0; day < 7; day++) {
        const isInCurrentYear = currentDate.getFullYear() === new Date().getFullYear();
        const isCompleted = isInCurrentYear && Math.random() > 0.3; // Random completion for demo
        
        week.push({
          date: new Date(currentDate),
          completed: isCompleted,
          isInCurrentYear,
          dayOfWeek: currentDate.getDay()
        });
        
        currentDate.setDate(currentDate.getDate() + 1);
      }
      weeks.push(week);
    }
    
    return weeks;
  };

  const heatmapData = generateHeatmapData();
  const months = ['Jan', 'Apr', 'Jul', 'Oct'];
  const completedDays = heatmapData.flat().filter(d => d.completed && d.isInCurrentYear).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Activity Heatmap</h2>
        <Select defaultValue="morning-exercise">
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="morning-exercise">Morning Exercise</SelectItem>
            <SelectItem value="reading">Read 30 Minutes</SelectItem>
            <SelectItem value="water">Drink 8 Glasses Water</SelectItem>
            <SelectItem value="meditate">Meditate</SelectItem>
            <SelectItem value="journal">Write Journal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>No Activity</span>
            <div className="w-3 h-3 rounded-sm bg-muted border"></div>
          </div>
          <div className="flex items-center gap-2">
            <span>Completed</span>
            <div className="w-3 h-3 rounded-sm bg-primary"></div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="relative overflow-x-auto">
          {/* Month labels */}
          <div className="flex justify-between text-sm text-muted-foreground mb-2 pl-8 min-w-max">
            {months.map(month => (
              <span key={month} className="flex-1 text-center">{month}</span>
            ))}
          </div>

          <div className="flex gap-1 min-w-max">
            {/* Day labels */}
            <div className="flex flex-col gap-1 text-xs text-muted-foreground pr-2 justify-start">
              <div className="h-3"></div>
              <span className="h-3 flex items-center">Mon</span>
              <div className="h-3"></div>
              <span className="h-3 flex items-center">Wed</span>
              <div className="h-3"></div>
              <span className="h-3 flex items-center">Fri</span>
              <div className="h-3"></div>
            </div>

            {/* Heatmap grid - organized by weeks */}
            <div className="flex gap-1">
              {heatmapData.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`w-3 h-3 rounded-sm border transition-colors ${
                        day.isInCurrentYear
                          ? day.completed 
                            ? 'bg-primary border-primary hover:bg-primary/80' 
                            : 'bg-muted border-border hover:bg-muted/80'
                          : 'bg-transparent border-transparent'
                      }`}
                      title={day.isInCurrentYear ? `${day.date.toDateString()}: ${day.completed ? 'Completed' : 'No activity'}` : ''}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{completedDays} days</span> with completed habits this year
        </p>
      </div>
    </div>
  );
};