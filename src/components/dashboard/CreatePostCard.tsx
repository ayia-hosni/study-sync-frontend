import React, { useState, useRef, useEffect } from 'react';
import { useCreatePost } from '@/hooks/useCreatePost';
import { ImagePlus, Send, X } from 'lucide-react';

interface CreatePostCardProps {
  onPostCreated?: (post: any) => void;
}

export const CreatePostCard: React.FC<CreatePostCardProps> = ({ onPostCreated }) => {
  const { createPost, loading } = useCreatePost();
  const [postText, setPostText] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private' | 'friends' | 'custom'>('public');
  const [customVisibility, setCustomVisibility] = useState('');
  // allow multiple images
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [mode, setMode] = useState<'share' | 'habit-choice' | 'create-habit' | 'update-progress'>('share');
  const fileRef = useRef<HTMLInputElement | null>(null);

  // habit states
  const [existingHabits, setExistingHabits] = useState<{ name: string; streak: number; desc?: string }[]>([
    { name: 'Read 10 pages', streak: 5, desc: 'Daily reading' },
    { name: 'Morning Run', streak: 12, desc: 'Cardio' },
  ]);
  const [selectedHabitIndex, setSelectedHabitIndex] = useState<number | null>(null);
  const [habitTitle, setHabitTitle] = useState('');
  const [habitDesc, setHabitDesc] = useState('');
  // visibility used when publishing a created habit
  const [habitVisibility, setHabitVisibility] = useState<typeof visibility>(visibility);
  const [progressNote, setProgressNote] = useState('');
  // visibility used when publishing an updated progress
  const [progressVisibility, setProgressVisibility] = useState<typeof visibility>(visibility);

  useEffect(() => {
    return () => {
      // revoke all preview URLs on unmount
      previewUrls.forEach(u => URL.revokeObjectURL(u));
    };
  }, [previewUrls]);

  const onBrowse = () => fileRef.current?.click();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    const imageFiles = files.filter(f => f.type.startsWith('image/'));
    if (imageFiles.length !== files.length) {
      alert('Only image files are allowed. Non-image files were ignored.');
    }
    if (imageFiles.length === 0) {
      e.currentTarget.value = '';
      return;
    }

    // append new files (allow multiple)
    const newPreviews = imageFiles.map(f => URL.createObjectURL(f));
    setAttachedFiles(prev => [...prev, ...imageFiles]);
    setPreviewUrls(prev => [...prev, ...newPreviews]);

    // keep input value (cleared to allow re-selecting same files next time)
    e.currentTarget.value = '';
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => {
      const copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });
    setPreviewUrls(prev => {
      const copy = [...prev];
      const [removed] = copy.splice(index, 1);
      if (removed) URL.revokeObjectURL(removed);
      return copy;
    });
    if (fileRef.current) fileRef.current.value = '';
  };

  const submit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!postText.trim() && attachedFiles.length === 0) return;

    const type = attachedFiles.length ? "image" : "text";

    const res = await createPost({
      content: postText,
      visibility,
      type,
      media: attachedFiles.length ? attachedFiles : undefined,
    });

    if (res) {
      onPostCreated?.(res);
      setPostText("");
      setVisibility("public");
      setCustomVisibility("");
      // cleanup previews and files
      previewUrls.forEach(u => URL.revokeObjectURL(u));
      setPreviewUrls([]);
      setAttachedFiles([]);
      if (fileRef.current) fileRef.current.value = '';
    }
  };


  // create habit locally and optionally publish
  const handleCreateHabit = async (publish = false, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!habitTitle.trim()) return;
    const newHabit = { name: habitTitle.trim(), streak: 0, desc: habitDesc.trim() || undefined };
    setExistingHabits(prev => [newHabit, ...prev]);
    if (publish) {
      const content = `Started a new habit: ${newHabit.name}${newHabit.desc ? ` — ${newHabit.desc}` : ''}`;
      await createPost({ content, visibility: habitVisibility, type: 'text' });
    }
    // reset and go back to habit list
    setHabitTitle('');
    setHabitDesc('');
    setHabitVisibility(visibility);
    setMode('habit-choice');
  };

  // update progress (increment streak) and optionally publish
  const handleUpdateProgress = async (publish = false, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (selectedHabitIndex === null) return;
    // increment streak locally
    setExistingHabits(prev => {
      const copy = [...prev];
      copy[selectedHabitIndex] = { ...copy[selectedHabitIndex], streak: copy[selectedHabitIndex].streak + 1 };
      return copy;
    });
    const habit = existingHabits[selectedHabitIndex];
    const newStreak = (habit?.streak ?? 0) + 1;
    if (publish) {
      const content = `Updated progress for "${habit.name}": ${progressNote ? progressNote + ' — ' : ''}Streak: ${newStreak}`;
      await createPost({ content, visibility: progressVisibility, type: 'text' });
    }
    // reset progress inputs and go back to habit list
    setProgressNote('');
    setProgressVisibility(visibility);
    setSelectedHabitIndex(null);
    setMode('habit-choice');
  };

  return (
    <div className="w-full bg-white dark:bg-[#141416] border dark:border-neutral-800 rounded-lg p-4 md:p-5 shadow-sm">
      {mode === 'share' && (
        <form onSubmit={submit} className="space-y-3">
          <textarea
            value={postText}
            onChange={e => setPostText(e.target.value)}
            placeholder="Share a quick update..."
            className="w-full min-h-[70px] resize-none rounded-md p-3 bg-[#F8F9FA] dark:bg-neutral-800 border dark:border-neutral-700 text-sm focus:outline-none"
          />

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <select
                value={visibility}
                onChange={e => setVisibility(e.target.value as any)}
                className="h-9 rounded-md px-2 bg-[#F8F9FA] dark:bg-neutral-800 border dark:border-neutral-700 text-sm"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="friends">Friends</option>
                <option value="custom">Custom</option>
              </select>

              {visibility === 'custom' && (
                <input
                  value={customVisibility}
                  onChange={e => setCustomVisibility(e.target.value)}
                  placeholder="Group or users"
                  className="h-9 rounded-md px-2 bg-[#F8F9FA] dark:bg-neutral-800 border dark:border-neutral-700 text-sm"
                />
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onBrowse}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F3F4F6] dark:bg-neutral-800 text-sm"
              >
                <ImagePlus className="w-4 h-4" /> Attach
              </button>

              <button
                type="submit"
                disabled={loading || (!postText.trim() && attachedFiles.length === 0)}
                className="inline-flex items-center gap-2 px-4 py-1 rounded-md bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] text-white text-sm disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {loading ? 'Sharing...' : 'Share'}
              </button>
            </div>
          </div>

          <input ref={fileRef} type="file" className="hidden" accept="image/*" onChange={onFileChange} multiple />

          {attachedFiles.length > 0 && previewUrls.length > 0 && (
            <div className="mt-2 grid grid-cols-3 gap-2">
              {previewUrls.map((url, i) => (
                <div key={url} className="relative group">
                  <img src={url} alt={`preview-${i}`} className="w-full h-24 object-cover rounded-md border dark:border-neutral-700" />
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="absolute top-1 right-1 bg-white dark:bg-neutral-800 rounded-full p-1 opacity-80 hover:opacity-100"
                    aria-label="Remove image"
                  >
                    <X className="w-3 h-3 text-red-600" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-2 flex items-center justify-between">
            <button type="button" onClick={() => setMode('habit-choice')} className="text-sm px-3 py-1 rounded-md bg-[#F3F4F6] dark:bg-neutral-800">
              Manage Habits
            </button>
            <div className="text-xs text-muted-foreground">Tip: attach images to highlight progress</div>
          </div>
        </form>
      )}

      {mode === 'habit-choice' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-medium">Your Habits</div>
            <div className="flex gap-2">
              <button onClick={() => setMode('create-habit')} className="text-sm px-3 py-1 rounded-md bg-[#F3F4F6] dark:bg-neutral-800">New Habit</button>
              <button onClick={() => setMode('share')} className="text-sm px-3 py-1 rounded-md bg-[#F3F4F6] dark:bg-neutral-800">Back</button>
            </div>
          </div>

          {existingHabits.length === 0 ? (
            <div className="text-sm text-muted-foreground">No habits yet — create one.</div>
          ) : (
            <ul className="space-y-2">
              {existingHabits.map((h, idx) => (
                <li key={h.name} className="flex items-center justify-between bg-[#F8F9FA] dark:bg-neutral-800 rounded-md p-3">
                  <div>
                    <div className="font-medium text-sm">{h.name}</div>
                    <div className="text-xs text-muted-foreground">{h.desc ?? 'No description'}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-muted-foreground">Streak: {h.streak}</div>
                    <button
                      onClick={() => { setSelectedHabitIndex(idx); setMode('update-progress'); }}
                      className="text-sm px-2 py-1 rounded-md bg-[#EFF6FF] dark:bg-neutral-700"
                    >
                      Update
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {mode === 'create-habit' && (
        <form onSubmit={(e) => handleCreateHabit(false, e)} className="space-y-3">
          <div>
            <label className="text-sm font-medium">Habit Title</label>
            <input value={habitTitle} onChange={e => setHabitTitle(e.target.value)} className="w-full mt-1 rounded-md p-2 bg-[#F8F9FA] dark:bg-neutral-800 border dark:border-neutral-700 text-sm" />
          </div>

          <div>
            <label className="text-sm font-medium">Description (optional)</label>
            <input value={habitDesc} onChange={e => setHabitDesc(e.target.value)} className="w-full mt-1 rounded-md p-2 bg-[#F8F9FA] dark:bg-neutral-800 border dark:border-neutral-700 text-sm" />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-sm">Publish as</label>
              <select value={habitVisibility} onChange={e => setHabitVisibility(e.target.value as any)} className="h-9 rounded-md px-2 bg-[#F8F9FA] dark:bg-neutral-800 border dark:border-neutral-700 text-sm">
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="friends">Friends</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            <div className="flex gap-2 ml-auto">
              <button type="button" onClick={() => setMode('habit-choice')} className="text-sm px-3 py-1 rounded-md bg-[#F3F4F6] dark:bg-neutral-800">Back</button>
              <button type="button" onClick={(e) => handleCreateHabit(false, e as unknown as React.FormEvent)} className="text-sm px-3 py-1 rounded-md bg-[#E6E6E9]">Create</button>
              <button type="button" onClick={(e) => handleCreateHabit(true, e as unknown as React.FormEvent)} className="text-sm px-3 py-1 rounded-md bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] text-white">Create & Publish</button>
            </div>
          </div>
       </form>
      )}

      {mode === 'update-progress' && selectedHabitIndex !== null && (
        <form onSubmit={(e) => handleUpdateProgress(false, e)} className="space-y-3">
           <div>
             <div className="font-medium">{existingHabits[selectedHabitIndex].name}</div>
             <div className="text-xs text-muted-foreground">Current streak: {existingHabits[selectedHabitIndex].streak}</div>
           </div>
 
           <div>
             <label className="text-sm">Note (optional)</label>
             <input value={progressNote} onChange={e => setProgressNote(e.target.value)} className="w-full mt-1 rounded-md p-2 bg-[#F8F9FA] dark:bg-neutral-800 border dark:border-neutral-700 text-sm" />
           </div>
 
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-sm">Publish as</label>
              <select value={progressVisibility} onChange={e => setProgressVisibility(e.target.value as any)} className="h-9 rounded-md px-2 bg-[#F8F9FA] dark:bg-neutral-800 border dark:border-neutral-700 text-sm">
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="friends">Friends</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            <div className="flex gap-2 ml-auto">
              <button type="button" onClick={() => { setSelectedHabitIndex(null); setMode('habit-choice'); }} className="text-sm px-3 py-1 rounded-md bg-[#F3F4F6] dark:bg-neutral-800">Back</button>
              <button type="button" onClick={(e) => handleUpdateProgress(false, e as unknown as React.FormEvent)} className="text-sm px-3 py-1 rounded-md bg-[#E6E6E9]">Update</button>
              <button type="button" onClick={(e) => handleUpdateProgress(true, e as unknown as React.FormEvent)} className="text-sm px-3 py-1 rounded-md bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] text-white">Update & Publish</button>
            </div>
           </div>
         </form>
       )}
     </div>
   );
 };
