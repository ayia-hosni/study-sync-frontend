import React, { useState, useRef, useEffect } from 'react';
import { Moon, Sun, LogOut, Settings, Bell, User, X } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

interface NavbarProps {
  onNotificationClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNotificationClick }) => {
  const { theme, setTheme } = useTheme();

  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

    const logout = async () => {
    try {
      await fetch(import.meta.env.VITE_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // adjust key if different
        },
        body: JSON.stringify({
          query: `mutation { logout }`,
        }),
      });

      localStorage.removeItem('token');
      window.location.href = '/login'; // or '/' if it auto redirects to login
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) setNotifOpen(false);

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) setProfileOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, message: 'Your study session starts in 10 mins', time: '2m ago' },
    { id: 2, message: 'You matched with Lina 🎓', time: '1h ago' },
    { id: 3, message: 'New study goal unlocked 🔥', time: '3h ago' },
  ];

  return (
    <nav className="w-full h-16 backdrop-blur-xl bg-background/80 border-b border-border fixed z-[1000] left-0 top-0">
      <div className="w-full h-full flex items-center justify-between px-6 max-sm:px-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center bg-primary rounded-xl shadow-lg" style={{ boxShadow: 'var(--shadow-glow)' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 4C8 4 8.22 6.06 9.12 6.96C10.02 7.86 12 8 12 8C12 8 10.02 8.14 9.12 9.04C8.22 9.94 8 12 8 12C8 12 7.78 9.94 6.88 9.04C5.98 8.14 4 8 4 8C4 8 5.98 7.86 6.88 6.96C7.78 6.06 8 4 8 4Z" fill="white"/>
            </svg>
          </div>
          <h1 className="text-lg font-bold text-foreground">StudySync</h1>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <button
            className="w-10 h-10 border border-border flex items-center justify-center rounded-xl hover:bg-secondary/50 transition"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notification dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative w-10 h-10 border border-border flex items-center justify-center rounded-xl hover:bg-secondary/50 transition"
            >
              <Bell className="h-4 w-4 text-foreground" />
              {notifications.length > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                  {notifications.length}
                </div>
              )}
            </button>

            {/* Dropdown content */}
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-background border border-border rounded-xl shadow-lg z-50 animate-fade-in">
                <div className="p-4 flex items-center justify-between border-b border-border">
                  <h3 className="text-sm font-bold text-foreground">Notifications</h3>
                  <button className="text-xs text-muted-foreground hover:text-destructive">Mark all as read</button>
                </div>
                <ul className="divide-y divide-border max-h-60 overflow-y-auto">
                  {notifications.map((notif) => (
                    <li key={notif.id} className="px-4 py-3 hover:bg-secondary transition-all">
                      <p className="text-sm text-foreground">{notif.message}</p>
                      <p className="text-xs text-muted-foreground">{notif.time}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Profile dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-10 h-10 flex items-center justify-center bg-primary rounded-xl text-white font-semibold hover:scale-105 transition"
              style={{ boxShadow: 'var(--shadow-glow)' }}
            >
              A
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-xl shadow-lg z-50 animate-fade-in">
                <ul className="py-2 text-sm text-foreground">
                  <li>
                    <button
                      className="flex items-center w-full px-4 py-2 hover:bg-secondary transition"
                      onClick={() => {
                        setProfileOpen(false);
                        window.location.href = '/profile';
                      }}
                    >
                      <User className="w-4 h-4 mr-2" /> Profile
                    </button>
                  </li>
                  <li>
                    <button
                      className="flex items-center w-full px-4 py-2 hover:bg-secondary transition"
                      onClick={() => {
                        setProfileOpen(false);
                        window.location.href = '/settings';
                      }}
                    >
                      <Settings className="w-4 h-4 mr-2" /> Settings
                    </button>
                  </li>
                  <li>
                      <button
                        onClick={logout}
                        className="flex items-center w-full px-4 py-2 text-destructive hover:bg-secondary transition"
                      >
                        <LogOut className="w-4 h-4 mr-2" /> Logout
                      </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
