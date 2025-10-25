import React from 'react';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={`bg-white shadow-[0px_2px_8px_rgba(8,15,52,0.06)] flex w-full items-stretch gap-5 whitespace-nowrap flex-wrap justify-between px-4 py-2.5 ${className}`}>
      <div className="flex items-stretch gap-3 text-base text-[rgba(32,32,32,1)] font-bold my-auto">
        <img
          src="https://api.builder.io/api/v1/image/assets/f16bc7bb09694689bc28cb8eb3e754f2/e9caaf8c04cd34946e3e621c5dbad39d1b72e3f7?placeholderIfAbsent=true"
          alt="StudySync Logo"
          className="aspect-[1] object-contain w-8 shrink-0 rounded-[29826200px]"
        />
        <div className="my-auto">
          StudySync
        </div>
      </div>
      <nav className="flex items-stretch gap-3 text-sm text-white font-semibold">
        <img
          src="https://api.builder.io/api/v1/image/assets/f16bc7bb09694689bc28cb8eb3e754f2/fc7ab4192b6dc4967d986c05c043a4cc504581c2?placeholderIfAbsent=true"
          alt="User Profile"
          className="aspect-[1] object-contain w-[38px] shrink-0 rounded-[29826200px]"
        />
        <div className="bg-[rgba(112,45,255,1)] flex flex-col items-center w-8 justify-center h-8 mt-[5px] px-[11px] rounded-[29826200px]">
          <div>A</div>
        </div>
      </nav>
    </header>
  );
};
