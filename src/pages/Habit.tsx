import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bell, User, Plus, Trash2 } from "lucide-react";
import { HabitHeatmap } from "@/components/habit/HabitHeatmap";
import { StatisticsCard } from "@/components/habit/StatisticsCard";
import { HabitList } from "@/components/habit/HabitList";
import { WeeklyProgress } from "@/components/habit/WeeklyProgress";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [activeTab, setActiveTab] = useState("today");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}


      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Habit Tracker</h1>
          <p className="text-muted-foreground">Build consistent habits and track your progress</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-1 p-1 bg-muted rounded-lg">
            <Button
              variant={activeTab === "today" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("today")}
              className="px-6"
            >
              Today
            </Button>
            <Button
              variant={activeTab === "history" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("history")}
              className="px-6"
            >
              History
            </Button>
          </div>
          
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add New Habit
          </Button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Activity Heatmap */}
            <Card className="p-6">
              <HabitHeatmap />
            </Card>

            {/* Today's Habits */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Today's Habits</h2>
              <HabitList />
            </Card>

            {/* Weekly Progress */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Weekly Progress</h2>
              <WeeklyProgress />
            </Card>
          </div>

          {/* Right Column - Statistics */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Statistics</h2>
              <StatisticsCard />
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
