import React, { useState, useEffect } from 'react';
import { useCreatePost } from '@/hooks/useCreatePost';

interface CreatePostCardProps {
  onPostCreated?: (post: any) => void;
}


export const CreatePostCard: React.FC<CreatePostCardProps> = ({ onPostCreated }) => {
  const [postText, setPostText] = useState('');
  const { createPost, loading, error } = useCreatePost();

  const [mode, setMode] = useState<'share' | 'habit-choice' | 'create-habit' | 'share-progress'>('share');
  const [habitTitle, setHabitTitle] = useState('');
  const [habitDesc, setHabitDesc] = useState('');
  const [progressText, setProgressText] = useState('');

  const [existingHabits, setExistingHabits] = useState([
    { name: 'Read 10 pages', streak: 5 },
    { name: 'Morning Run', streak: 12 },
    { name: 'Meditate', streak: 8 },
    { name: 'Write Journal', streak: 3 },
    { name: 'Code Every Day', streak: 30 },
  ]);

  const [selectedHabit, setSelectedHabit] = useState('Read 10 pages');
  const [streakInput, setStreakInput] = useState(5);
  const [checked, setChecked] = useState(false);

  // New visibility state
  const [visibility, setVisibility] = useState<'public' | 'private' | 'friends' | 'custom'>('public');
  const [customVisibilityValue, setCustomVisibilityValue] = useState(''); // optional extra input for custom

  // Update streakInput when selectedHabit changes
  useEffect(() => {
    const found = existingHabits.find(h => h.name === selectedHabit);
    setStreakInput(found ? found.streak : 0);
  }, [selectedHabit, existingHabits]);

  // Reset checked state when mode or selected habit changes
  useEffect(() => {
    setChecked(false);
  }, [mode, selectedHabit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim()) return;

    const result = await createPost({
      content: postText,
      visibility,
      type: 'text',
    });

   if (result) {
  console.log('✅ Post created:', result);
  onPostCreated?.(result);
  setPostText('');
  setVisibility('public');
  setCustomVisibilityValue('');
}
else {
      console.error('❌ Failed to create post:', error);
    }
  };

  const handleHabitSubmit = (share: boolean) => {
    if (share) {
      console.log('Habit created and shared:', habitTitle, habitDesc);
    } else {
      console.log('Habit created (not shared):', habitTitle, habitDesc);
    }
    setHabitTitle('');
    setHabitDesc('');
    setMode('share');
  };

  const handleProgressSubmit = (eOrOptions: React.FormEvent | { share: boolean }) => {
    const shareProgress = 'preventDefault' in eOrOptions ? true : eOrOptions.share;
    if ('preventDefault' in eOrOptions) eOrOptions.preventDefault();
    if (!checked) return;

    setExistingHabits(habits =>
      habits.map(h => (h.name === selectedHabit ? { ...h, streak: h.streak + 1 } : h))
    );

    const found = existingHabits.find(h => h.name === selectedHabit);
    const newStreak = found ? found.streak + 1 : 1;

    console.log(
      shareProgress
        ? 'Progress shared in feed:'
        : 'Progress updated (not shared):',
      selectedHabit,
      progressText,
      'Streak:',
      newStreak
    );

    setProgressText('');
    setChecked(false);
    setMode('share');
  };

  return (
    <div className="w-full border shadow-[0px_14px_42px_0px_rgba(8,15,52,0.06)] bg-white dark:bg-[#232329] mb-6 p-6 rounded-[20px] border-solid border-[#F0F0F0] dark:border-[#232329]">
      {mode === 'share' && (
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center w-full gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-[#702DFF] rounded-full">
                <span className="text-white text-sm font-bold leading-5">A</span>
              </div>
              <input
                type="text"
                value={postText}
                onChange={e => setPostText(e.target.value)}
                placeholder="What's on your mind? Share your growth journey..."
                className="flex-1 h-[50px] border flex items-center bg-[#F8F9FA] dark:bg-neutral-800 px-4 py-0 rounded-xl border-solid border-[#E9ECEF] dark:border-neutral-700 text-sm font-normal leading-5 focus:outline-none focus:ring-2 focus:ring-[#702DFF] focus:border-transparent dark:text-white"
              />
              {/* Visibility selector */}
              <select
                value={visibility}
                onChange={e => setVisibility(e.target.value as 'public' | 'private' | 'friends' | 'custom')}
                className="ml-2 h-[36px] bg-[#F8F9FA] dark:bg-neutral-800 border border-solid border-[#E9ECEF] dark:border-neutral-700 rounded-md px-2 text-sm"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="friends">Friends</option>
                <option value="custom">Custom</option>
              </select>
            </div>
          </div>

          {/* optional input shown only when custom is selected */}
          {visibility === 'custom' && (
            <div className="mb-4">
              <input
                type="text"
                value={customVisibilityValue}
                onChange={e => setCustomVisibilityValue(e.target.value)}
                placeholder="Specify custom visibility (e.g., group name or comma-separated users)"
                className="w-full h-[40px] bg-[#F8F9FA] dark:bg-neutral-800 px-3 rounded-md border border-solid border-[#E9ECEF] dark:border-neutral-700 text-sm focus:outline-none"
              />
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 h-8 bg-[#F8F9FA] dark:bg-neutral-800 px-4 py-0 rounded-xl hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
            >
              <span className="text-[#7E7E7E] dark:text-neutral-300 text-xs font-normal leading-4">
                {loading ? 'Sharing...' : 'Share Update'}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setMode('habit-choice')}
              className="flex items-center gap-2 h-8 bg-[#F8F9FA] dark:bg-neutral-800 px-4 py-0 rounded-xl hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
            >
              <span className="text-[#7E7E7E] dark:text-neutral-300 text-xs font-normal leading-4">
                Add Habit
              </span>
            </button>
          </div>
        </form>
      )}

      {/* habit-choice, create-habit, and share-progress sections remain the same */}
      {/* You can keep your existing JSX for those modes */}
    </div>
  );
};
