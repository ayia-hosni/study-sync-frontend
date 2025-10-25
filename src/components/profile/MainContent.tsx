import React, { useState } from 'react';
import { TabNavigation } from './TabNavigation';
import { AboutSection } from './AboutSection';
import { StudySubjects } from './StudySubjects';
import { RecentActivity } from './RecentActivity';
import { ConnectionsList } from './ConnectionsList';
import { HabitsTracker } from './HabitsTracker';

interface ActivityItem {
  id: string;
  icon: string;
  title: string;
  timeAgo: string;
  subject: string;
}

interface Connection {
  id: string;
  name: string;
  avatar: string;
  subject: string;
  status: 'online' | 'offline';
}

interface Habit {
  id: string;
  name: string;
  icon: string;
  streak: number;
  completedToday: boolean;
  weekProgress: boolean[];
}

interface MainContentProps {
  aboutContent: string;
  subjects: string[];
  activities: ActivityItem[];
  connections: Connection[];
  habits: Habit[];
  onAboutUpdate?: (content: string) => void;
  onSubjectsUpdate?: (subjects: string[]) => void;
  onToggleHabit?: (habitId: string) => void;
}

export const MainContent: React.FC<MainContentProps> = ({
  aboutContent,
  subjects,
  activities,
  connections,
  habits,
  onAboutUpdate,
  onSubjectsUpdate,
  onToggleHabit,
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <AboutSection
              content={aboutContent}
              onUpdate={onAboutUpdate}
            />
            <StudySubjects
              subjects={subjects}
              onSubjectsUpdate={onSubjectsUpdate}
            />
            <ConnectionsList connections={connections} />
            <HabitsTracker habits={habits} onToggleHabit={onToggleHabit} />
            <RecentActivity activities={activities} />
          </>
        );
      case 'preferences':
        return (
          <div className="bg-card border-border border flex flex-col text-foreground mt-12 px-6 py-5 rounded-2xl max-md:max-w-full max-md:mt-10 max-md:px-5 hover:shadow-elegant transition-all duration-300">
            <h3 className="text-lg font-bold">Preferences</h3>
            <p className="text-sm font-normal leading-6 mt-5 max-md:max-w-full text-muted-foreground">
              Preference settings will be available here. Configure your study preferences, notification settings, and more.
            </p>
          </div>
        );
      case 'security':
        return (
          <div className="bg-card border-border border flex flex-col text-foreground mt-12 px-6 py-5 rounded-2xl max-md:max-w-full max-md:mt-10 max-md:px-5 hover:shadow-elegant transition-all duration-300">
            <h3 className="text-lg font-bold">Security</h3>
            <p className="text-sm font-normal leading-6 mt-5 max-md:max-w-full text-muted-foreground">
              Security settings will be available here. Manage your password, two-factor authentication, and privacy settings.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="bg-card shadow-card border-border border flex w-full flex-col items-stretch mx-auto p-6 rounded-2xl max-md:max-w-full max-md:mt-8 max-md:px-5 hover:shadow-elegant transition-all duration-300">
      <TabNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      {renderTabContent()}
    </main>
  );
};
