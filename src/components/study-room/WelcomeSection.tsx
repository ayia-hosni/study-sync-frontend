import React from 'react';

interface WelcomeSectionProps {
  name: string;
  subject: string;
  level: string;
  max_members: number;
  visibility: string;
  thumbnail_url?: string;
  status: string;
  created_at: string;
  updated_at: string;
  description: string;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  name,
  subject,
  level,
  max_members,
  visibility,
  thumbnail_url,
  status,
  created_at,
  updated_at,
  description,
}) => {
  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-between relative p-6 border-b border-b-[#F0F0F0] bg-gradient-to-r from-white to-violet-50 rounded-b-2xl shadow-sm">
      <div className="flex flex-col gap-2 md:gap-3">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-[#202020] text-2xl font-bold leading-9">Welcome to</h2>
          <span className="text-[#702DFF] text-2xl font-bold leading-9">{name}</span>
          <span className="text-2xl">📚</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-1">
          <span className="px-2 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold">{subject}</span>
          <span className="px-2 py-1 rounded-full bg-fuchsia-100 text-fuchsia-700 text-xs font-semibold capitalize">{level}</span>
          <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">{visibility}</span>
          <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">{status}</span>
          <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">Max {max_members}</span>
        </div>
        <p className="text-[#7E7E7E] text-sm font-normal leading-[21px] max-w-2xl mb-1">
          {description}
        </p>
        <div className="text-xs text-[#B0B0B0]">
          Created: {new Date(created_at).toLocaleString()} | Updated: {new Date(updated_at).toLocaleString()}
        </div>
      </div>
      <button 
        className="absolute w-12 h-10 flex items-center justify-center bg-[#702DFF] rounded-xl right-6 top-6 hover:bg-[#5a23c8] transition-colors shadow-lg"
        aria-label="Add new content"
        style={{ zIndex: 2 }}
      >
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html:
                "<svg id=\"101:22\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M8 2C8.55228 2 9 2.44772 9 3V7H13C13.5523 7 14 7.44772 14 8C14 8.55228 13.5523 9 13 9H9V13C9 13.5523 8.55228 14 8 14C7.44772 14 7 13.5523 7 13V9H3C2.44772 9 2 8.55228 2 8C2 7.44772 2.44772 7 3 7H7V3C7 2.44772 7.44772 2 8 2Z\" fill=\"white\"></path> </svg>",
            }}
          />
        </div>
      </button>
    </section>
  );
};
