import React from 'react';

const tabs = [
  { id: 'sessions', label: 'Study Sessions' }, // updated value and label
  { id: 'feed', label: 'Study Feed' },
  { id: 'resources', label: 'Resources' },
  { id: 'members', label: 'Members' }
];

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="flex gap-3 mb-6" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`h-[34px] flex items-center justify-center px-4 rounded-lg transition-colors ${
            activeTab === tab.id
              ? 'bg-[#702DFF] text-white'
              : 'bg-neutral-100 text-[#7E7E7E]'
          }`}
        >
          <span className="text-center text-xs font-bold leading-[18px]">
            {tab.label}
          </span>
        </button>
      ))}
    </nav>
  );
};
