import React from 'react';
import { NotificationItem } from './NotificationItem';

interface Notification {
  id: string;
  emoji: string;
  message: string;
  time: string;
  isRead: boolean;
}

interface NotificationsSectionProps {
  notifications?: Notification[];
  onSeeAll?: () => void;
  onMarkRead?: (notificationId: string) => void;
}

export const NotificationsSection: React.FC<NotificationsSectionProps> = ({
  notifications = [
    {
      id: '1',
      emoji: '✅',
      message: "You've been matched with Ali in Physics",
      time: '5 mins ago',
      isRead: false
    },
    {
      id: '2',
      emoji: '⏰',
      message: 'Math session starts in 30 minutes',
      time: '25 mins ago',
      isRead: false
    },
    {
      id: '3',
      emoji: '📚',
      message: 'New study materials available for Chemistry',
      time: '1 hour ago',
      isRead: true
    }
  ],
  onSeeAll,
  onMarkRead
}) => {
  return (
    <section className="mt-0 mb-8 mx-[15px] max-sm:mt-0 max-sm:mb-8 max-sm:mx-0">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold leading-[27px] text-[#202020] max-sm:text-base max-sm:leading-6">
          Notifications
        </h2>
        <button 
          className="text-xs font-normal leading-[18px] text-[#36C] cursor-pointer hover:underline"
          onClick={onSeeAll}
        >
          See All
        </button>
      </div>
      <div className="border shadow-[0px_14px_42px_0px_rgba(8,15,52,0.06)] bg-white p-[17px] rounded-[20px] border-solid border-[#F0F0F0]">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            emoji={notification.emoji}
            message={notification.message}
            time={notification.time}
            onMarkRead={!notification.isRead ? () => onMarkRead?.(notification.id) : undefined}
          />
        ))}
      </div>
    </section>
  );
};
