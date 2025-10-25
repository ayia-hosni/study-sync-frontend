import React, { useState } from 'react';
import { Navbar } from '@/components/dashboard/Navbar';
import { ProfileCard } from '@/components/profile/ProfileCard';
import { QuickStats } from '@/components/profile/QuickStats';
import { TabNavigation } from '@/components/profile/TabNavigation';
import { AboutSection } from '@/components/profile/AboutSection';
import { StudySubjects } from '@/components/profile/StudySubjects';
import { RecentActivity } from '@/components/profile/RecentActivity';
import { HabitsTracker } from '@/components/profile/HabitsTracker';
import { ConnectionsList } from '@/components/profile/ConnectionsList';

const profile = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [aboutText, setAboutText] = useState(
    'Passionate about mathematics and physics. Looking for study partners to tackle challenging problems together! I have 3+ years of experience tutoring high school students and love collaborative learning.'
  );
  const [subjects, setSubjects] = useState(['Mathematics', 'Physics', 'Chemistry']);

  const userProfile = {
    name: 'Aya Johnson',
    email: 'aya.johnson@email.com',
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
                />
                <ConnectionsList connections={connections} />
                <QuickStats
                  memberSince={quickStats.memberSince}
                  activeSubjects={quickStats.activeSubjects}
                  availability={quickStats.availability}
                />
              </div>
            </div>

            <div className="w-[71%] ml-5 max-md:w-full max-md:ml-0">
              <div className="bg-white dark:bg-zinc-900 shadow-[0px_14px_42px_rgba(8,15,52,0.06)] border flex w-full flex-col items-stretch mx-auto p-[25px] rounded-[20px] border-[rgba(240,240,240,1)] dark:border-zinc-800 border-solid max-md:max-w-full max-md:mt-8 max-md:px-5 hover:shadow-xl transition-shadow duration-300">
                <TabNavigation onTabChange={handleTabChange} />

                {activeTab === 'Overview' && (
                  <div>
                    <AboutSection
                      initialText={aboutText}
                      onSave={handleAboutSave}
                    />
                    <StudySubjects
                      subjects={subjects}
                      onSubjectsChange={handleSubjectsChange}
                    />
                    <HabitsTracker habits={habits} />
                    <RecentActivity activities={recentActivities} />
                  </div>
                )}

                {activeTab === 'Preferences' && (
                  <div className="mt-[58px]">
                    <section className="bg-white dark:bg-zinc-900 border flex flex-col text-[rgba(32,32,32,1)] dark:text-white pl-[21px] pr-20 py-5 rounded-2xl border-[rgba(240,240,240,1)] dark:border-zinc-800 border-solid max-md:max-w-full max-md:px-5 hover:border-[rgba(112,45,255,0.2)] dark:hover:border-violet-700 transition-all duration-200">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-lg font-bold">Notification Preferences</h3>
                        <span className="text-xl">🔔</span>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-gradient-to-br from-[rgba(249,249,249,1)] to-white dark:from-zinc-800 dark:to-zinc-900 p-4 rounded-lg border border-[rgba(245,245,245,1)] dark:border-zinc-700">
                          <label className="flex items-center justify-between group cursor-pointer">
                            <div className="flex items-center gap-3">
                              <span className="text-sm">📧</span>
                              <div>
                                <span className="text-sm font-medium">Email notifications for new matches</span>
                                <p className="text-xs text-[rgba(126,126,126,1)] dark:text-zinc-400">Get notified when someone wants to study with you</p>
                              </div>
                            </div>
                            <input
                              type="checkbox"
                              defaultChecked
                              className="w-4 h-4 text-[rgba(112,45,255,1)] dark:text-violet-400 bg-gray-100 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 rounded focus:ring-[rgba(112,45,255,1)] dark:focus:ring-violet-700 focus:ring-2"
                            />
                          </label>
                        </div>
                        <div className="bg-gradient-to-br from-[rgba(249,249,249,1)] to-white dark:from-zinc-800 dark:to-zinc-900 p-4 rounded-lg border border-[rgba(245,245,245,1)] dark:border-zinc-700">
                          <label className="flex items-center justify-between group cursor-pointer">
                            <div className="flex items-center gap-3">
                              <span className="text-sm">⏰</span>
                              <div>
                                <span className="text-sm font-medium">Study session reminders</span>
                                <p className="text-xs text-[rgba(126,126,126,1)] dark:text-zinc-400">Receive reminders 15 minutes before sessions</p>
                              </div>
                            </div>
                            <input
                              type="checkbox"
                              defaultChecked
                              className="w-4 h-4 text-[rgba(112,45,255,1)] dark:text-violet-400 bg-gray-100 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 rounded focus:ring-[rgba(112,45,255,1)] dark:focus:ring-violet-700 focus:ring-2"
                            />
                          </label>
                        </div>
                        <div className="bg-gradient-to-br from-[rgba(249,249,249,1)] to-white dark:from-zinc-800 dark:to-zinc-900 p-4 rounded-lg border border-[rgba(245,245,245,1)] dark:border-zinc-700">
                          <label className="flex items-center justify-between group cursor-pointer">
                            <div className="flex items-center gap-3">
                              <span className="text-sm">📊</span>
                              <div>
                                <span className="text-sm font-medium">Weekly progress reports</span>
                                <p className="text-xs text-[rgba(126,126,126,1)] dark:text-zinc-400">Get your weekly study summary every Sunday</p>
                              </div>
                            </div>
                            <input
                              type="checkbox"
                              className="w-4 h-4 text-[rgba(112,45,255,1)] dark:text-violet-400 bg-gray-100 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 rounded focus:ring-[rgba(112,45,255,1)] dark:focus:ring-violet-700 focus:ring-2"
                            />
                          </label>
                        </div>
                      </div>
                    </section>
                  </div>
                )}

                {activeTab === 'Security' && (
                  <div className="mt-[58px]">
                    <section className="bg-white dark:bg-zinc-900 border flex flex-col text-[rgba(32,32,32,1)] dark:text-white pl-[21px] pr-20 py-5 rounded-2xl border-[rgba(240,240,240,1)] dark:border-zinc-800 border-solid max-md:max-w-full max-md:px-5 hover:border-[rgba(112,45,255,0.2)] dark:hover:border-violet-700 transition-all duration-200">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-lg font-bold">Security Settings</h3>
                        <span className="text-xl">🔒</span>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-gradient-to-br from-[rgba(249,249,249,1)] to-white dark:from-zinc-800 dark:to-zinc-900 p-4 rounded-lg border border-[rgba(245,245,245,1)] dark:border-zinc-700">
                          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                            <span>🔑</span>
                            Current Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-3 py-2 border border-[rgba(240,240,240,1)] dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgba(112,45,255,0.3)] dark:focus:ring-violet-700 focus:border-[rgba(112,45,255,1)] dark:focus:border-violet-700 bg-white dark:bg-zinc-900 text-[rgba(32,32,32,1)] dark:text-white"
                            placeholder="Enter current password"
                          />
                        </div>
                        <div className="bg-gradient-to-br from-[rgba(249,249,249,1)] to-white dark:from-zinc-800 dark:to-zinc-900 p-4 rounded-lg border border-[rgba(245,245,245,1)] dark:border-zinc-700">
                          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                            <span>🆕</span>
                            New Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-3 py-2 border border-[rgba(240,240,240,1)] dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgba(112,45,255,0.3)] dark:focus:ring-violet-700 focus:border-[rgba(112,45,255,1)] dark:focus:border-violet-700 bg-white dark:bg-zinc-900 text-[rgba(32,32,32,1)] dark:text-white"
                            placeholder="Enter new password"
                          />
                          <div className="mt-2 text-xs text-[rgba(126,126,126,1)] dark:text-zinc-400">
                            Password must be at least 8 characters with numbers and symbols
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-[rgba(249,249,249,1)] to-white dark:from-zinc-800 dark:to-zinc-900 p-4 rounded-lg border border-[rgba(245,245,245,1)] dark:border-zinc-700">
                          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                            <span>✅</span>
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-3 py-2 border border-[rgba(240,240,240,1)] dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgba(112,45,255,0.3)] dark:focus:ring-violet-700 focus:border-[rgba(112,45,255,1)] dark:focus:border-violet-700 bg-white dark:bg-zinc-900 text-[rgba(32,32,32,1)] dark:text-white"
                            placeholder="Confirm new password"
                          />
                        </div>
                        <div className="flex items-center justify-between pt-4">
                          <div className="text-xs text-[rgba(126,126,126,1)] dark:text-zinc-400">
                            Last password change: March 15, 2024
                          </div>
                          <button className="bg-gradient-to-r from-[rgba(112,45,255,1)] to-[rgba(147,51,234,1)] dark:from-violet-700 dark:to-fuchsia-700 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:from-[rgba(112,45,255,0.9)] hover:to-[rgba(147,51,234,0.9)] dark:hover:from-violet-800 dark:hover:to-fuchsia-800 transition-all duration-200 shadow-md hover:shadow-lg">
                            Update Password
                          </button>
                        </div>
                      </div>
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
