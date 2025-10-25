import React, { useState } from 'react';
import { Navbar } from '@/components/dashboard/Navbar';
import { WelcomeSection } from '@/components/study-room/WelcomeSection';
import { NavigationTabs } from '@/components/study-room/NavigationTabs';
import { PostCreator } from '@/components/study-room/PostCreator';
import { CallToAction } from '@/components/study-room/CallToAction';
import { StudyRooms } from '@/components/study-room/StudyRooms';
import { Resources } from '@/components/study-room/Resources';
import { Members } from '@/components/study-room/Members';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchRoom } from '@/graphql/roomApi';
import { FeedCard } from '@/components/dashboard/FeedCard';

const StudyRoom = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['room', id],
    queryFn: () => fetchRoom(id!),
    enabled: !!id,
  });

  // Default tab is now 'sessions'
  const [activeTab, setActiveTab] = useState('sessions');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'feed':
        return (
          <>
            <PostCreator />
            <CallToAction />
            <FeedCard
              type="user-post"
              emoji="💻"
              roomName="Code Every Day"
              timeAgo="2h ago"
              userInitial="S"
              userName="Sarah Chen"
              userAction="shared in room"
              content="Just completed my 30-day coding streak! 🎉 Building a habit tracker app has been incredible for my consistency."
              category="Coding"
              likes={24}
              comments={8}
              hasSupport={true}
            />
          </>
        );
      case 'sessions':
        return <StudyRooms />;
      case 'resources':
        return <Resources />;
      case 'members':
        return <Members />;
      default:
        return <StudyRooms />;
    }
  };

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] w-full bg-white dark:bg-[#18181b]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#702DFF] mb-4"></div>
        <span className="text-lg font-semibold text-[#702DFF] dark:text-fuchsia-400">
          Loading Room...
        </span>
        <span className="text-xs text-gray-400 mt-2">
          Please wait while we fetch your study room.
        </span>
      </div>
    );
  if (isError || !data) return <div>Room not found.</div>;

  return (
    <div className="w-full min-h-[875px] relative bg-white dark:bg-[#18181b]">
      <Navbar />
      <div className="pt-20">
        <WelcomeSection
          name={data.name}
          subject={data.subject}
          level={data.level}
          max_members={data.max_members}
          visibility={data.visibility}
          thumbnail_url={data.thumbnail_url}
          status={data.status}
          created_at={data.created_at}
          updated_at={data.updated_at}
          description={data.description}
        />
        <main className="p-6">
          <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default StudyRoom;
