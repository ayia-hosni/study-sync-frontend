import React, { useState } from 'react';

interface TabNavigationProps {
  onTabChange: (tab: string) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('Profile');
  
  // Change tab names here
  const tabs = ['Profile', 'Habits', 'Activity'];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <nav className="flex items-stretch gap-[29px] text-base text-[rgba(126,126,126,1)] font-semibold whitespace-nowrap text-center">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={`grow transition-colors ${
            activeTab === tab
              ? 'text-[rgba(112,45,255,1)]'
              : 'text-[rgba(126,126,126,1)] hover:text-[rgba(112,45,255,0.7)]'
          }`}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
};
