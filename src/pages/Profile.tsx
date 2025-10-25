import React, { useState } from 'react';
import { Navbar } from '@/components/dashboard/Navbar';
import { ProfileCard } from '@/components/profile/ProfileCard';
import { QuickStats } from '@/components/profile/QuickStats';
import { TabNavigation } from '@/components/profile/TabNavigation';
import { StudySubjects } from '@/components/profile/StudySubjects';
import { RecentActivity } from '@/components/profile/RecentActivity';
import { HabitsTracker } from '@/components/profile/HabitsTracker';
import { ConnectionsList } from '@/components/profile/ConnectionsList';
import { FeedCard } from '@/components/dashboard/FeedCard';

const profile = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [aboutText, setAboutText] = useState(
    'Passionate about mathematics and physics. Looking for study partners to tackle challenging problems together! I have 3+ years of experience tutoring high school students and love collaborative learning.'
  );
  const [subjects, setSubjects] = useState(['Mathematics', 'Physics', 'Chemistry']);

  const userProfile = {
    name: 'Aya Johnson',
    email: 'aya.johnson@email.com',
    aboutText: 'Passionate about mathematics and physics. Looking for study partners to tackle challenging problems together! I have 3+ years of experience tutoring high school students and love collaborative learning',
    avatar: 'A',
    dayStreak: 7,
    sessions: 24
  };

  const quickStats = {
    memberSince: 'March 2024',
    activeSubjects: 3,
    availability: 'Weekday evenings'
  };

  const recentActivities = [
    {
      id: '1',
      icon: '📐',
      title: 'Mathematics Study Session',
      timeAgo: '2 hours ago',
      subject: 'Mathematics'
    },
    {
      id: '2',
      icon: '⚡',
      title: 'New Match with Sarah',
      timeAgo: '4 hours ago',
      subject: 'Physics'
    },
    {
      id: '3',
      icon: '🧪',
      title: 'Chemistry Lab Review',
      timeAgo: '1 day ago',
      subject: 'Chemistry'
    },
    {
      id: '4',
      icon: '🎯',
      title: 'Goal Achievement: 50 Hours',
      timeAgo: '2 days ago',
      subject: 'Milestone'
    }
  ];

  const habits = [
    {
      id: '1',
      name: 'Daily Math Practice',
      icon: '🧮',
      streak: 7,
      completedToday: true,
      weekProgress: [true, true, false, true, true, true, true]
    },
    {
      id: '2',
      name: 'Read Physics Articles',
      icon: '📚',
      streak: 3,
      completedToday: false,
      weekProgress: [true, false, true, true, false, false, false]
    },
    {
      id: '3',
      name: 'Chemistry Flashcards',
      icon: '🧪',
      streak: 12,
      completedToday: true,
      weekProgress: [true, true, true, true, true, false, true]
    }
  ];

  const connections: {
    id: string;
    name: string;
    avatar: string;
    subject: string;
    status: "online" | "offline";
  }[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      avatar: 'S',
      subject: 'Physics & Mathematics',
      status: 'online'
    },
    {
      id: '2',
      name: 'Mike Rodriguez',
      avatar: 'M',
      subject: 'Chemistry',
      status: 'offline'
    }
  ];

  const handleEditProfile = () => {
    console.log('Edit profile clicked');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleAboutSave = (text: string) => {
    setAboutText(text);
  };

  const handleSubjectsChange = (newSubjects: string[]) => {
    setSubjects(newSubjects);
  };

  return (
    <div className="bg-gradient-to-br from-[rgba(249,249,249,1)] to-white dark:from-[#18181b] dark:to-[#09090b] min-h-screen">
      <Navbar />
      <main className="bg-transparent flex w-full flex-col px-[50px] py-8 pt-[88px] max-md:max-w-full max-md:px-5">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[rgba(32,32,32,1)] dark:text-white text-[32px] font-bold flex items-center gap-3">
                Profile Settings
                <span className="text-2xl">⚙️</span>
              </h1>
              <p className="text-[rgba(126,126,126,1)] dark:text-zinc-400 text-base font-normal mt-2">
                Manage your account information and preferences
              </p>
            </div>
            <div className="bg-gradient-to-r from-[rgba(112,45,255,0.1)] to-[rgba(147,51,234,0.1)] dark:from-violet-900/30 dark:to-fuchsia-900/30 px-4 py-2 rounded-full">
              <span className="text-[rgba(112,45,255,1)] dark:text-violet-300 text-sm font-semibold">✨ Profile 95% Complete</span>
            </div>
          </div>
        </header>

        <div className="self-stretch mt-8 max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <div className="w-[29%] max-md:w-full max-md:ml-0">
              <div className="w-full max-md:mt-8">
                <ProfileCard
                  name={userProfile.name}
                  email={userProfile.email}
                  avatar={userProfile.avatar}
                  dayStreak={userProfile.dayStreak}
                  sessions={userProfile.sessions}
                  onEditProfile={handleEditProfile}
                  aboutText={userProfile.aboutText || aboutText}
                />
                <ConnectionsList connections={connections} />
                <QuickStats
                  memberSince={quickStats.memberSince}
                  activeSubjects={quickStats.activeSubjects}
                  availability={quickStats.availability}
                />
                <StudySubjects
                      subjects={subjects}
                      onSubjectsChange={handleSubjectsChange}
                    />
              </div>
            </div>

            <div className="w-[71%] ml-5 max-md:w-full max-md:ml-0">
              <div className="bg-white dark:bg-zinc-900 shadow-[0px_14px_42px_rgba(8,15,52,0.06)] border flex w-full flex-col items-stretch mx-auto p-[25px] rounded-[20px] border-[rgba(240,240,240,1)] dark:border-zinc-800 border-solid max-md:max-w-full max-md:mt-8 max-md:px-5 hover:shadow-xl transition-shadow duration-300">
                <TabNavigation onTabChange={handleTabChange} />

                {activeTab === 'Profile' && (
                  <div>
                    {/* Profile tab content */}
                    <section className="bg-white dark:bg-zinc-900 border mt-6 pl-6 pr-8 py-6 rounded-2xl border-[rgba(240,240,240,1)] dark:border-zinc-800 hover:border-[rgba(112,45,255,0.2)] dark:hover:border-violet-700 transition-all duration-200">
      <div className="flex justify-between items-start flex-wrap gap-3 mb-4">
        <FeedCard
          type="user-post"
          userInitial="E"
          userName="Emma Thompson"
          userAction="shared publicly"
          timeAgo="4h ago"
          content="Just finished reading Atomic Habits - the compound effect of small changes is mind-blowing! Anyone else implementing the 1% rule?"
          category="Personal Growth"
          likes={31}
          comments={12}
          hasSupport={true}
          images={[
            '/slides/science.webp',
            '/slides/science-education.webp',
            '/slides/sci.webp'
          ]}
        />
        <FeedCard
          type="user-post"
          emoji="🏃‍♀️"
          roomName="Fitness Warriors"
          timeAgo="5h ago"
          userInitial="J"
          userName="Jake Wilson"
          userAction="completed workout"
          content="Crushed a 45-minute HIIT session this morning! 💪 The endorphins are real. Who else is getting their sweat on today?"
          category="Fitness"
          categoryColor="green"
          likes={18}
          comments={5}
          hasSupport={true}
        />
      </div>
    </section>
                  </div>
                )}

                {activeTab === 'Habits' && (
                  <div className="mt-[58px]">
                    {/* Habits tab content */}
                      <HabitsTracker habits={habits} />
                  </div>
                )}

                {activeTab === 'Activity' && (
                  <div className="mt-[58px]">
                    {/* Activity tab content */}
                    <section className="bg-white dark:bg-zinc-900 border flex flex-col text-[rgba(32,32,32,1)] dark:text-white pl-[21px] pr-20 py-5 rounded-2xl border-[rgba(240,240,240,1)] dark:border-zinc-800 border-solid max-md:max-w-full max-md:px-5 hover:border-[rgba(112,45,255,0.2)] dark:hover:border-violet-700 transition-all duration-200">
                       <RecentActivity activities={recentActivities} />
                    </section>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default profile;
