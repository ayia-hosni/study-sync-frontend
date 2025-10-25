import React from 'react';

interface ActivityItem {
  id: string;
  icon: string;
  title: string;
  timeAgo: string;
  subject: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <section className="bg-white dark:bg-zinc-900 border flex flex-col items-stretch mt-6 p-[21px] rounded-2xl border-[rgba(240,240,240,1)] dark:border-zinc-800 border-solid max-md:max-w-full max-md:px-5">
      <h3 className="text-[rgba(32,32,32,1)] dark:text-white text-lg font-bold mb-4">
        Recent Activity
      </h3>
      <div className="space-y-3">
        {activities.map((activity) => (
          <article
            key={activity.id}
            className="bg-gradient-to-r from-[rgba(249,249,249,1)] to-[rgba(252,252,252,1)] dark:from-zinc-800 dark:to-zinc-900 flex w-full flex-col p-5 rounded-xl border border-[rgba(245,245,245,1)] dark:border-zinc-700 hover:shadow-md hover:border-[rgba(112,45,255,0.2)] dark:hover:border-violet-700 transition-all duration-200 cursor-pointer group max-md:max-w-full"
          >
            <div className="flex items-center gap-4">
              <div className="bg-white dark:bg-zinc-900 w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-sm border border-[rgba(240,240,240,1)] dark:border-zinc-700 group-hover:shadow-md transition-all duration-200">
                {activity.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-[rgba(32,32,32,1)] dark:text-white text-sm font-semibold group-hover:text-[rgba(112,45,255,1)] dark:group-hover:text-violet-400 transition-colors duration-200 truncate">
                    {activity.title}
                  </h4>
                  <time className="text-[rgba(126,126,126,1)] dark:text-zinc-400 text-xs font-normal whitespace-nowrap ml-2">
                    {activity.timeAgo}
                  </time>
                </div>
                <div className="flex items-center justify-between">
                  <div className="bg-[rgba(112,45,255,0.08)] dark:bg-violet-900/30 flex items-center text-[10px] text-[rgba(112,45,255,1)] dark:text-violet-300 font-semibold uppercase px-2.5 py-1 rounded-full border border-[rgba(112,45,255,0.1)] dark:border-violet-900 group-hover:bg-[rgba(112,45,255,0.12)] dark:group-hover:bg-violet-900/40 transition-colors duration-200">
                    <span>{activity.subject}</span>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <svg className="w-4 h-4 text-[rgba(126,126,126,1)] dark:text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-[rgba(240,240,240,1)] dark:border-zinc-800">
        <button className="text-[rgba(112,45,255,1)] dark:text-violet-300 text-sm font-semibold hover:text-[rgba(112,45,255,0.8)] dark:hover:text-violet-400 transition-colors duration-200 flex items-center gap-2 mx-auto">
          <span>View All Activities</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </section>
  );
};
