import React, { useState } from "react";

interface StudySubjectsProps {
  subjects: string[];
  onSubjectsChange: (subjects: string[]) => void;
}

const subjectIcons: Record<string, string> = {
  Mathematics: "📐",
  Physics: "⚡",
  Chemistry: "🧪",
  Biology: "🧬",
  History: "📚",
  Literature: "📖",
  Geography: "🌍",
  Psychology: "🧠",
  Economics: "💰",
  Art: "🎨"
};

export const StudySubjects: React.FC<StudySubjectsProps> = ({
  subjects,
  onSubjectsChange
}) => {
  const [newSubject, setNewSubject] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAddSubject = () => {
    const trimmed = newSubject.trim();
    if (trimmed && !subjects.map(s => s.toLowerCase()).includes(trimmed.toLowerCase())) {
      onSubjectsChange([...subjects, trimmed]);
      setNewSubject("");
      setIsAdding(false);
    }
  };

  const handleRemoveSubject = (subjectToRemove: string) => {
    onSubjectsChange(subjects.filter(subject => subject !== subjectToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAddSubject();
    if (e.key === "Escape") {
      setNewSubject("");
      setIsAdding(false);
    }
  };

  return (
    <section className="bg-white dark:bg-zinc-900 border mt-6 pl-6 pr-8 py-6 rounded-2xl border-[rgba(240,240,240,1)] dark:border-zinc-800 hover:border-[rgba(112,45,255,0.2)] dark:hover:border-violet-700 transition-all duration-200">
      <div className="flex justify-between items-start flex-wrap gap-3 mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold text-[rgba(32,32,32,1)] dark:text-white">Study Subjects</h3>
          <span className="bg-gradient-to-r from-[rgba(112,45,255,0.1)] to-[rgba(147,51,234,0.1)] dark:from-violet-900/30 dark:to-fuchsia-900/30 px-2 py-1 rounded-full text-xs font-semibold text-[rgba(112,45,255,1)] dark:text-violet-300">
            {subjects.length} Active
          </span>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="text-sm font-semibold flex items-center gap-1 bg-gradient-to-r from-[rgba(112,45,255,0.05)] to-[rgba(147,51,234,0.05)] dark:from-violet-900/10 dark:to-fuchsia-900/10 px-3 py-1 rounded-full hover:from-[rgba(112,45,255,0.1)] hover:to-[rgba(147,51,234,0.1)] dark:hover:from-violet-900/20 dark:hover:to-fuchsia-900/20 text-[rgba(112,45,255,1)] dark:text-violet-300 hover:text-[rgba(112,45,255,0.8)] dark:hover:text-violet-400 transition"
          >
            ➕ Add Subject
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mt-2 text-xs font-semibold uppercase">
        {subjects.map(subject => (
          <div
            key={subject}
            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-[rgba(112,45,255,0.08)] to-[rgba(147,51,234,0.08)] dark:from-violet-900/20 dark:to-fuchsia-900/20 rounded-lg border border-[rgba(112,45,255,0.1)] dark:border-violet-900 hover:border-[rgba(112,45,255,0.2)] dark:hover:border-violet-700 group transition"
          >
            <span>{subjectIcons[subject] || "📚"}</span>
            <span>{subject}</span>
            <button
              onClick={() => handleRemoveSubject(subject)}
              aria-label={`Remove ${subject}`}
              className="text-[rgba(112,45,255,1)] dark:text-violet-300 hover:text-red-500 dark:hover:text-red-400 transition-opacity opacity-0 group-hover:opacity-100 ml-1 bg-white dark:bg-zinc-900 rounded-full w-4 h-4 flex items-center justify-center text-xs"
            >
              ×
            </button>
          </div>
        ))}

        {isAdding && (
          <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-900 border border-[rgba(112,45,255,1)] dark:border-violet-700 rounded-lg">
            <input
              type="text"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Subject name"
              className="bg-transparent text-xs text-[rgba(112,45,255,1)] dark:text-violet-300 uppercase font-semibold focus:outline-none min-w-[100px]"
              autoFocus
            />
            <button
              onClick={handleAddSubject}
              aria-label="Confirm subject"
              className="text-[rgba(112,45,255,1)] dark:text-violet-300 hover:text-[rgba(112,45,255,0.8)] dark:hover:text-violet-400 transition-colors w-5 h-5 rounded-full flex items-center justify-center text-xs bg-[rgba(112,45,255,0.1)] dark:bg-violet-900/20"
            >
              ✓
            </button>
            <button
              onClick={() => {
                setNewSubject("");
                setIsAdding(false);
              }}
              aria-label="Cancel"
              className="text-[rgba(126,126,126,1)] dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-400 transition-colors w-5 h-5 rounded-full flex items-center justify-center text-xs bg-[rgba(240,240,240,1)] dark:bg-zinc-800"
            >
              ×
            </button>
          </div>
        )}
      </div>

      {/* Progress Chart */}
      <div className="mt-6 p-3 bg-gradient-to-br from-[rgba(249,249,249,1)] to-white dark:from-zinc-800 dark:to-zinc-900 rounded-lg border border-[rgba(245,245,245,1)] dark:border-zinc-700">
        <div className="text-xs text-[rgba(126,126,126,1)] dark:text-zinc-400 mb-2">Study Progress</div>
        <div className="space-y-2">
          {subjects.slice(0, 3).map((subject, i) => {
            const progress = 65 + i * 15;
            return (
              <div key={subject} className="flex items-center justify-between">
                <span className="text-xs font-medium text-[rgba(32,32,32,1)] dark:text-white">{subject}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1 bg-[rgba(240,240,240,1)] dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[rgba(112,45,255,1)] to-[rgba(147,51,234,1)]"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-[rgba(126,126,126,1)] dark:text-zinc-400">{progress}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
