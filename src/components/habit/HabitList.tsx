import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Habit {
  id: string;
  name: string;
  streak: number;
  completed: boolean;
}

export const HabitList = () => {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: "1",
      name: "Morning Exercise",
      streak: 12,
      completed: true
    },
    {
      id: "2", 
      name: "Read 30 Minutes",
      streak: 8,
      completed: false
    },
    {
      id: "3",
      name: "Drink 8 Glasses Water", 
      streak: 15,
      completed: true
    },
    {
      id: "4",
      name: "Meditate",
      streak: 5,
      completed: false
    },
    {
      id: "5",
      name: "Write Journal",
      streak: 3,
      completed: true
    }
  ]);

  const toggleHabit = (id: string) => {
    setHabits(habits.map(habit => 
      habit.id === id 
        ? { ...habit, completed: !habit.completed }
        : habit
    ));
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  return (
    <div className="space-y-4">
      {habits.map((habit) => (
        <div key={habit.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 bg-primary rounded-sm"></div>
            <div>
              <p className="font-medium">{habit.name}</p>
              <p className="text-sm text-muted-foreground">{habit.streak}day streak</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteHabit(habit.id)}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            
            <Checkbox
              checked={habit.completed}
              onCheckedChange={() => toggleHabit(habit.id)}
              className="w-6 h-6 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
          </div>
        </div>
      ))}
    </div>
  );
};