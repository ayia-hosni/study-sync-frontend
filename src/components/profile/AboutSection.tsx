import React, { useState } from 'react';

interface AboutSectionProps {
  initialText: string;
  onSave: (text: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ initialText, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);

  const handleSave = () => {
    onSave(text);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setText(initialText);
    setIsEditing(false);
  };

  return (
    <section className="bg-white dark:bg-zinc-900 border flex flex-col text-[rgba(32,32,32,1)] dark:text-white mt-[58px] pl-[21px] pr-20 py-5 rounded-2xl border-[rgba(240,240,240,1)] dark:border-zinc-800 border-solid max-md:max-w-full max-md:mt-10 max-md:px-5 hover:border-[rgba(112,45,255,0.2)] dark:hover:border-violet-700 transition-all duration-200">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold">About Me</h3>
          <div className="bg-gradient-to-r from-[rgba(112,45,255,0.1)] to-[rgba(147,51,234,0.1)] dark:from-violet-900/30 dark:to-fuchsia-900/30 px-2 py-1 rounded-full">
            <span className="text-[rgba(112,45,255,1)] dark:text-violet-300 text-xs font-semibold">✨ Featured</span>
          </div>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-[rgba(112,45,255,1)] dark:text-violet-300 text-sm font-semibold hover:text-[rgba(112,45,255,0.8)] dark:hover:text-violet-400 transition-colors flex items-center gap-1"
          >
            <span>✏️</span>
            Edit
          </button>
        )}
      </div>
      {isEditing ? (
        <div className="mt-[18px]">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full text-sm font-normal leading-[21px] p-3 border border-[rgba(240,240,240,1)] dark:border-zinc-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[rgba(112,45,255,0.3)] dark:focus:ring-violet-700 focus:border-[rgba(112,45,255,1)] dark:focus:border-violet-700 bg-gradient-to-br from-white to-[rgba(249,249,249,1)] dark:from-zinc-800 dark:to-zinc-900 text-[rgba(32,32,32,1)] dark:text-white"
            rows={4}
            placeholder="Tell us about yourself..."
          />
          <div className="flex items-center justify-between mt-3">
            <div className="text-xs text-[rgba(126,126,126,1)] dark:text-zinc-400">
              {text.length}/500 characters
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="bg-gradient-to-r from-[rgba(112,45,255,1)] to-[rgba(147,51,234,1)] dark:from-violet-700 dark:to-fuchsia-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-[rgba(112,45,255,0.9)] hover:to-[rgba(147,51,234,0.9)] dark:hover:from-violet-800 dark:hover:to-fuchsia-800 transition-all duration-200 shadow-md"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="bg-[rgba(240,240,240,1)] dark:bg-zinc-800 text-[rgba(32,32,32,1)] dark:text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[rgba(230,230,230,1)] dark:hover:bg-zinc-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-[18px]">
          <p className="text-sm font-normal leading-[21px] max-md:max-w-full bg-gradient-to-br from-[rgba(249,249,249,1)] to-white dark:from-zinc-800 dark:to-zinc-900 p-4 rounded-lg border border-[rgba(245,245,245,1)] dark:border-zinc-700">
            {text}
          </p>
          <div className="flex items-center gap-4 mt-3 text-xs text-[rgba(126,126,126,1)] dark:text-zinc-400">
            <span className="flex items-center gap-1">
              <span>👁️</span> Profile views: 127
            </span>
            <span className="flex items-center gap-1">
              <span>💬</span> Messages: 43
            </span>
            <span className="flex items-center gap-1">
              <span>🤝</span> Connections: 18
            </span>
          </div>
        </div>
      )}
    </section>
  );
};
