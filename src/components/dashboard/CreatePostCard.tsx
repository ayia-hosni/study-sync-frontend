import React, { useState, useEffect } from 'react';

export const CreatePostCard: React.FC = () => {
  const [postText, setPostText] = useState('');
  const [mode, setMode] = useState<'share' | 'habit-choice' | 'create-habit' | 'share-progress'>('share');
  const [habitTitle, setHabitTitle] = useState('');
  const [habitDesc, setHabitDesc] = useState('');
  const [progressText, setProgressText] = useState('');

  // Mocked list of existing habits for demo
  const [existingHabits, setExistingHabits] = useState([
    { name: 'Read 10 pages', streak: 5 },
    { name: 'Morning Run', streak: 12 },
    { name: 'Meditate', streak: 8 },
    { name: 'Write Journal', streak: 3 },
    { name: 'Code Every Day', streak: 30 }
  ]);
  const [selectedHabit, setSelectedHabit] = useState('Read 10 pages');
  const [streakInput, setStreakInput] = useState(5);

  // Update streakInput when selectedHabit changes
  useEffect(() => {
    const found = existingHabits.find(h => h.name === selectedHabit);
    setStreakInput(found ? found.streak : 0);
  }, [selectedHabit, existingHabits]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle post submission
    console.log('Post submitted:', postText);
    setPostText('');
  };

  const handleHabitSubmit = (share: boolean) => {
    // Handle habit creation, optionally share
    if (share) {
      console.log('Habit created and shared:', habitTitle, habitDesc);
    } else {
      console.log('Habit created (not shared):', habitTitle, habitDesc);
    }
    setHabitTitle('');
    setHabitDesc('');
    setMode('share');
  };

  // For simple check/uncheck, use a local checked state
  const [checked, setChecked] = useState(false);
  useEffect(() => { setChecked(false); }, [mode, selectedHabit]);

  const handleProgressSubmit = (eOrOptions: React.FormEvent | { share: boolean }) => {
    if ('preventDefault' in eOrOptions) {
      // fallback for form submit (default to share)
      eOrOptions.preventDefault();
      if (!checked) return;
      setExistingHabits(habits => habits.map(h =>
        h.name === selectedHabit ? { ...h, streak: h.streak + 1 } : h
      ));
      const found = existingHabits.find(h => h.name === selectedHabit);
      const newStreak = found ? found.streak + 1 : 1;
      console.log('Progress shared (default):', selectedHabit, progressText, 'Streak:', newStreak);
      setProgressText('');
      setChecked(false);
      setMode('share');
    } else {
      // called with { share: boolean }
      if (!checked) return;
      setExistingHabits(habits => habits.map(h =>
        h.name === selectedHabit ? { ...h, streak: h.streak + 1 } : h
      ));
      const found = existingHabits.find(h => h.name === selectedHabit);
      const newStreak = found ? found.streak + 1 : 1;
      if (eOrOptions.share) {
        console.log('Progress shared in feed:', selectedHabit, progressText, 'Streak:', newStreak);
      } else {
        console.log('Progress updated (not shared):', selectedHabit, progressText, 'Streak:', newStreak);
      }
      setProgressText('');
      setChecked(false);
      setMode('share');
    }
  };

  return (
    <div className="w-full border shadow-[0px_14px_42px_0px_rgba(8,15,52,0.06)] bg-white dark:bg-[#232329] mb-6 p-6 rounded-[20px] border-solid border-[#F0F0F0] dark:border-[#232329]">
      {mode === 'share' ? (
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-4 mb-6">
            {/* Avatar and input are now side by side, with input taking remaining space */}
            <div className="flex items-center w-full gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-[#702DFF] rounded-[50%]">
                <span className="text-white text-sm font-bold leading-5">
                  A
                </span>
              </div>
              <input
                type="text"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="What's on your mind? Share your growth journey..."
                className="flex-1 h-[50px] border flex items-center bg-[#F8F9FA] dark:bg-neutral-800 px-4 py-0 rounded-xl border-solid border-[#E9ECEF] dark:border-neutral-700 text-sm font-normal leading-5 focus:outline-none focus:ring-2 focus:ring-[#702DFF] focus:border-transparent dark:text-white"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="flex items-center gap-2 h-8 bg-[#F8F9FA] dark:bg-neutral-800 px-4 py-0 rounded-xl hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 2C8.55228 2 9 2.44772 9 3V7H13C13.5523 7 14 7.44772 14 8C14 8.55228 13.5523 9 13 9H9V13C9 13.5523 8.55228 14 8 14C7.44772 14 7 13.5523 7 13V9H3C2.44772 9 2 8.55228 2 8C2 7.44772 2.44772 7 3 7H7V3C7 2.44772 7.44772 2 8 2Z" fill="#7E7E7E" />
              </svg>
              <span className="text-[#7E7E7E] dark:text-neutral-300 text-xs font-normal leading-4">
                Share Update
              </span>
            </button>
            <button type="button" onClick={() => setMode('habit-choice')} className="flex items-center gap-2 h-8 bg-[#F8F9FA] dark:bg-neutral-800 px-4 py-0 rounded-xl hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 2V14M2 8H14" stroke="#7E7E7E" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="text-[#7E7E7E] dark:text-neutral-300 text-xs font-normal leading-4">
                Add Habit
              </span>
            </button>
          </div>
        </form>
      ) : mode === 'habit-choice' ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 flex items-center justify-center bg-[#702DFF] rounded-full shadow-md">
              <span className="text-white text-sm font-bold leading-5">A</span>
            </div>
            <span className="text-base font-bold text-[#202020] dark:text-white">What would you like to do?</span>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setMode('create-habit')} className="flex-1 h-10 bg-[#702DFF] hover:bg-violet-700 text-white rounded-xl font-bold transition-colors">Create New Habit</button>
            <button onClick={() => setMode('share-progress')} className="flex-1 h-10 bg-[#F8F9FA] dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 text-[#7E7E7E] dark:text-neutral-300 rounded-xl font-bold transition-colors">Share Progress</button>
          </div>
          <div className="flex gap-3 self-end mt-2">
            <button onClick={() => setMode('share')} className="text-xs text-[#7E7E7E] dark:text-neutral-300 hover:underline">Cancel</button>
            <button
              type="button"
              onClick={() => window.location.href = '/habits'}
              className="text-xs text-[#702DFF] dark:text-[#A259FF] font-semibold hover:underline focus:outline-none"
              title="Go to Habit Page"
            >
              Go to Habit Page
            </button>
          </div>
        </div>
      ) : mode === 'create-habit' ? (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 flex items-center justify-center bg-[#702DFF] rounded-[50%]">
              <span className="text-white text-sm font-bold leading-5">A</span>
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={habitTitle}
                onChange={e => setHabitTitle(e.target.value)}
                placeholder="Habit title (e.g. Read 10 pages)"
                className="w-full h-[40px] border flex items-center bg-[#F8F9FA] dark:bg-neutral-800 px-4 py-0 rounded-xl border-solid border-[#E9ECEF] dark:border-neutral-700 text-sm font-normal leading-5 focus:outline-none focus:ring-2 focus:ring-[#702DFF] focus:border-transparent dark:text-white mb-2"
              />
              <input
                type="text"
                value={habitDesc}
                onChange={e => setHabitDesc(e.target.value)}
                placeholder="Description (optional)"
                className="w-full h-[40px] border flex items-center bg-[#F8F9FA] dark:bg-neutral-800 px-4 py-0 rounded-xl border-solid border-[#E9ECEF] dark:border-neutral-700 text-sm font-normal leading-5 focus:outline-none focus:ring-2 focus:ring-[#702DFF] focus:border-transparent dark:text-white"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => handleHabitSubmit(true)} className="flex items-center gap-2 h-8 bg-[#702DFF] hover:bg-violet-700 text-white px-4 py-0 rounded-xl transition-colors">
              <span className="text-xs font-bold leading-4">Share in Feed</span>
            </button>
            <button onClick={() => handleHabitSubmit(false)} className="flex items-center gap-2 h-8 bg-[#F8F9FA] dark:bg-neutral-800 px-4 py-0 rounded-xl hover:bg-gray-200 dark:hover:bg-neutral-700 text-[#7E7E7E] dark:text-neutral-300 text-xs font-normal leading-4 transition-colors">
              Just Create
            </button>
            <button onClick={() => setMode('habit-choice')} className="flex items-center gap-2 h-8 bg-transparent px-4 py-0 rounded-xl text-[#7E7E7E] dark:text-neutral-300 text-xs font-normal leading-4 hover:underline">
              Back
            </button>
          </div>
        </div>
      ) : mode === 'share-progress' ? (
        <form onSubmit={handleProgressSubmit}>
          {/* Select and check row with better spacing and background */}
          <div className="flex items-center gap-4 mb-3 px-3 py-2 rounded-xl bg-[#F8F9FA] dark:bg-neutral-800 border border-[#E9ECEF] dark:border-neutral-700">
            <select
              value={selectedHabit}
              onChange={e => setSelectedHabit(e.target.value)}
              className="h-9 min-w-[140px] border-none bg-transparent text-sm font-normal leading-5 focus:outline-none focus:ring-2 focus:ring-[#702DFF] dark:text-white"
            >
              {existingHabits.map(habit => (
                <option key={habit.name} value={habit.name}>{habit.name}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setChecked(c => !c)}
              className={`flex items-center justify-center w-9 h-9 rounded-full border-2 ${checked ? 'border-[#702DFF] bg-[#702DFF]' : 'border-gray-300 bg-white dark:bg-neutral-900'} transition-colors focus:outline-none ml-2`}
              title="Mark as completed and increment streak"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="9" stroke={checked ? '#702DFF' : '#d1d5db'} strokeWidth="2" fill={checked ? '#702DFF' : '#fff'} />
                {checked && (
                  <path d="M6 10.5L9 13.5L14 8.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                )}
              </svg>
            </button>
            <span className="ml-auto text-xs text-gray-400 dark:text-neutral-400">Streak: {existingHabits.find(h => h.name === selectedHabit)?.streak ?? 0}</span>
          </div>
          {/* Progress input row with margin and balance */}
          <div className="flex flex-col flex-1 gap-1 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 flex items-center justify-center bg-[#702DFF] rounded-[50%]">
                <span className="text-white text-sm font-bold leading-5">A</span>
              </div>
              <input
                type="text"
                value={progressText}
                onChange={e => {
                  if (e.target.value.length <= 120) setProgressText(e.target.value);
                }}
                maxLength={120}
                placeholder="Share your progress on this habit..."
                className="flex-1 h-[40px] border flex items-center bg-white dark:bg-neutral-900 px-4 py-0 rounded-xl border-solid border-[#E9ECEF] dark:border-neutral-700 text-sm font-normal leading-5 focus:outline-none focus:ring-2 focus:ring-[#702DFF] focus:border-transparent dark:text-white"
              />
            </div>
            <span className="text-xs text-gray-400 ml-2 self-end">{progressText.length}/120</span>
          </div>
          <div className="flex gap-4 mt-2">
            <button
              type="button"
              onClick={() => handleProgressSubmit({ share: true })}
              className="flex-1 h-11 rounded-full bg-gradient-to-r from-[#702DFF] to-[#A259FF] shadow-md text-white font-bold text-base transition-colors hover:from-[#5a23c8] hover:to-[#8436d1] focus:outline-none focus:ring-2 focus:ring-[#702DFF]"
            >
              Share in Feed
            </button>
            <button
              type="button"
              onClick={() => handleProgressSubmit({ share: false })}
              className="flex-1 h-11 rounded-full border border-[#E9ECEF] dark:border-neutral-700 bg-[#F8F9FA] dark:bg-neutral-800 text-[#702DFF] dark:text-[#A259FF] font-bold text-base shadow-sm transition-colors hover:bg-gray-100 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#702DFF]"
            >
              Just Update
            </button>
            <button
              onClick={() => setMode('habit-choice')}
              className="h-11 px-5 rounded-full border border-transparent bg-transparent text-[#7E7E7E] dark:text-neutral-300 text-sm font-normal hover:underline focus:outline-none"
            >
              Back
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
};
