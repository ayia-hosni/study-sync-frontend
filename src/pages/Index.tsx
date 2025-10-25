import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from '@/components/dashboard/Navbar';
import { WelcomeSection } from '@/components/dashboard/WelcomeSection';
import { CreatePostCard } from '@/components/dashboard/CreatePostCard';
import { HabitCard } from '@/components/dashboard/HabitCard';
import { FeedCard } from '@/components/dashboard/FeedCard';
import { StudyRoomsSection } from '@/components/dashboard/StudyRoomsSection';
import { Badge } from '@/components/ui/badge';
import { useInfinitePosts } from '@/hooks/usePosts';

const Index = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'habits' | 'community'>('all');
  const [showSidebar, setShowSidebar] = useState(false);

  const feedFilters = [
    { key: 'all' as const, label: 'All', active: true },
    { key: 'habits' as const, label: 'My Habits', active: false },
    { key: 'community' as const, label: 'Community', active: false }
  ];

  // Use posts hook
  const {
    data: postsData,
    isLoading: postsLoading,
    isError: postsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePosts({ limit: 5 });

  // Infinite scroll logic
  const feedEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const handleScroll = () => {
      if (!feedEndRef.current) return;
      const { top } = feedEndRef.current.getBoundingClientRect();
      if (top < window.innerHeight + 100) {
        fetchNextPage();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="w-full min-h-screen relative bg-white dark:bg-[#18181b]">
      <Navbar onToggleSidebar={() => setShowSidebar(!showSidebar)} showSidebar={showSidebar} />
      <div className="max-w-[1272px] mx-auto my-0 pt-[58px] px-6">
        <WelcomeSection />
        <div className="flex gap-8 w-full relative">
          <main className={`flex-1 transition-all duration-300 ${showSidebar ? 'lg:max-w-[829px]' : 'w-full'} bg-white dark:bg-[#18181b]`}>
            <CreatePostCard />

            {/* Feed Navbar */}
            <Navbar className="flex items-center justify-between mb-6 bg-transparent">
              <h2 className="text-[#202020] dark:text-white text-lg font-bold leading-7">
                Your Growth Feed
              </h2>
              <nav className="flex gap-2">
                {feedFilters.map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setActiveFilter(filter.key)}
                    className={`h-6 flex items-center px-3 py-0 rounded-lg transition-colors ${
                      activeFilter === filter.key
                        ? 'bg-[#702DFF] dark:bg-violet-600'
                        : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700'
                    }`}
                  >
                    <span className={`text-xs font-bold leading-4 ${
                      activeFilter === filter.key
                        ? 'text-white'
                        : 'text-[#7E7E7E] dark:text-neutral-300'
                    }`}>
                      {filter.label}
                    </span>
                  </button>
                ))}
              </nav>
            </Navbar>

            {/* Feed Content */}
            <section className="space-y-3">
              {/* Static posts */}
              <HabitCard
                emoji="✍️"
                roomName="Daily Writing Club"
                timeAgo="Today"
                habitTitle="Write for 10 mins"
                habitSubtitle="Your habit"
                streakDays={5}
              />
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
              <HabitCard
                emoji=""
                roomName=""
                timeAgo="Today"
                habitTitle="Apply to 1 job"
                habitSubtitle="Your habit"
                streakDays={3}
                isCompleted={true}
                completionMessage="🎉 Great job! Your completion will be shared with your growth community."
              />
              <FeedCard
                type="habit-completion"
                emoji="🌅"
                roomName="Morning Routine Masters"
                timeAgo="3h ago"
                userInitial="M"
                userName="Mike Rodriguez"
                userAction="completed"
                category="Wellness"
                likes={12}
                comments={3}
                habitDetails={{
                  title: "Morning Meditation",
                  streak: 21
                }}
              />
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

              {/* Dynamic posts from useInfinitePosts */}
              {postsLoading && (
                <div className="flex justify-center py-6">
                  <span className="animate-spin h-6 w-6 border-4 border-[#702DFF] rounded-full border-t-transparent"></span>
                  <span className="ml-3 text-[#702DFF] font-semibold">Loading posts...</span>
                </div>
              )}
              {postsError && (
                <div className="text-red-500 text-center py-6">Failed to load posts.</div>
              )}
              {postsData?.flat.map((post) => (
                <FeedCard
                  key={post.id}
                  type={post.type === 'habit-completion' ? 'habit-completion' : 'user-post'}
                  roomName={post.room?.id ? `Room ${post.room.id}` : ''}
                  timeAgo={post.created_at}
                  userInitial={post.author?.id?.[0] || 'U'}
                  userName={post.author?.id || 'Unknown'}
                  userAction={post.type === 'habit-completion' ? 'completed' : 'shared in room'}
                  content={post.content}
                  category={post.type}
                  images={post.media_urls || []}
                  likes={18}
                comments={0}
                />
              ))}
              {/* Infinite scroll anchor */}
              <div ref={feedEndRef}></div>
              {isFetchingNextPage && (
                <div className="flex justify-center py-4">
                  <span className="animate-spin h-6 w-6 border-4 border-[#702DFF] rounded-full border-t-transparent"></span>
                  <span className="ml-3 text-[#702DFF] font-semibold">Loading more...</span>
                </div>
              )}
            </section>
          </main>

          {/* Sidebar - Hidden on mobile unless toggled */}
          <div className={`${showSidebar ? 'fixed inset-0 bg-black bg-opacity-50 z-40 lg:relative lg:bg-transparent lg:inset-auto dark:bg-black/70' : 'hidden'} lg:block`}>
            <div className={`${showSidebar ? 'fixed right-0 top-0 h-full w-[387px] bg-white dark:bg-[#232329] z-50 pt-[58px] overflow-y-auto shadow-2xl' : ''} lg:relative lg:pt-0 lg:w-[387px] lg:bg-transparent lg:h-auto lg:overflow-visible lg:shadow-none`}>
              {showSidebar && (
                <div className="lg:hidden flex items-center justify-between p-4 border-b border-[#F0F0F0] dark:border-[#232329]">
                  <h3 className="text-[#202020] dark:text-white text-lg font-bold">Study Rooms</h3>
                  <button 
                    onClick={() => setShowSidebar(false)}
                    className="w-8 h-8 bg-gray-100 dark:bg-neutral-800 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              )}
              <div className="p-6 lg:p-0">
                <StudyRoomsSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
