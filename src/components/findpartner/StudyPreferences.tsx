import React, { useState, forwardRef, useImperativeHandle } from 'react';
import TimezoneSelect from 'react-timezone-select';

export interface StudyPreferencesRef {
  getValues: () => {
    study_mode: 'Solo' | 'Group';
    group_size: number;
    communication: 'Audio' | 'Video' | 'Chat';
    preferred_language: string;
    timezone: string;
    level: string;
  };
}

export const StudyPreferences = forwardRef<StudyPreferencesRef>((_, ref) => {
  const [studyMode, setStudyMode] = useState<'Solo' | 'Group'>('Solo');
  const [customGroupSize, setCustomGroupSize] = useState<number>(2);
  const [communication, setCommunication] = useState<'Audio' | 'Video' | 'Chat'>('Video');
  const [preferredLanguage, setPreferredLanguage] = useState<string>('en');
  const [timezone, setTimezone] = useState<string>(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [level, setLevel] = useState<string>('Beginner');

  useImperativeHandle(ref, () => ({
    getValues: () => ({
      study_mode: studyMode,
      group_size: studyMode === 'Solo' ? 1 : customGroupSize,
      communication,
      preferred_language: preferredLanguage,
      timezone,
      level,
    }),
  }));

  return (
    <section className="bg-card shadow-card border border-border w-full p-6 rounded-2xl space-y-6">
      <h2 className="text-sm font-medium text-foreground">Study Preferences</h2>

      {/* Study Mode */}
      <fieldset>
        <legend className="text-xs text-muted-foreground mb-2">Study Mode</legend>
        <div className="flex gap-3 flex-wrap">
          {['Solo', 'Group'].map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setStudyMode(mode as 'Solo' | 'Group')}
              className={`flex flex-col p-4 rounded-xl w-[48%] border transition-all ${
                studyMode === mode
                  ? 'bg-primary/10 border-primary text-primary'
                  : 'bg-muted border-input hover:bg-muted-foreground/10'
              }`}
            >
              <span className="text-sm font-semibold">
                {mode === 'Solo' ? '🧍' : '👥'} {mode}
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                {mode === 'Solo' ? '1-on-1 focus' : 'Small group session (2-4)'}
              </span>
            </button>
          ))}
        </div>
      </fieldset>

      {/* Group Size */}
      {studyMode === 'Group' && (
        <fieldset>
          <label className="text-xs text-muted-foreground mb-1 block">Group Size</label>
          <input
            type="number"
            min={2}
            max={4}
            value={customGroupSize}
            onChange={(e) =>
              setCustomGroupSize(Math.max(2, Math.min(4, parseInt(e.target.value) || 2)))
            }
            className="border border-input bg-background rounded-md px-3 py-2 text-sm w-24"
          />
        </fieldset>
      )}

      {/* Communication */}
      <fieldset>
        <legend className="text-xs text-muted-foreground mb-2">Communication</legend>
        <div className="flex gap-3 flex-wrap">
          {[
            { id: 'Video', emoji: '🎥' },
            { id: 'Audio', emoji: '🎧' },
            { id: 'Chat', emoji: '💬' },
          ].map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setCommunication(option.id as 'Audio' | 'Video' | 'Chat')}
              className={`flex flex-col items-center p-4 rounded-xl w-[30%] border transition-all ${
                communication === option.id
                  ? 'bg-primary/10 border-primary text-primary'
                  : 'bg-muted border-input hover:bg-muted-foreground/10'
              }`}
            >
              <span className="text-lg">{option.emoji}</span>
              <span className="text-xs font-medium mt-1">{option.id}</span>
            </button>
          ))}
        </div>
      </fieldset>

      {/* Preferred Language */}
      <fieldset>
        <label className="text-xs text-muted-foreground mb-1 block">Preferred Language</label>
        <select
          value={preferredLanguage}
          onChange={(e) => setPreferredLanguage(e.target.value)}
          className="border border-input bg-background rounded-md px-3 py-2 text-sm w-full"
        >
          <option value="en">English</option>
          <option value="ar">Arabic</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
      </fieldset>

      {/* Level */}
      <fieldset>
        <label className="text-xs text-muted-foreground mb-1 block">Your Level</label>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="border border-input bg-background rounded-md px-3 py-2 text-sm w-full"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </fieldset>

      {/* Timezone Selector */}
      <fieldset>
        <label className="text-xs text-muted-foreground mb-2 block">Preferred Timezone</label>
        <TimezoneSelect
          value={timezone}
          onChange={(tz) => setTimezone(typeof tz === 'string' ? tz : tz.value)}
          className="text-sm"
        />
      </fieldset>
    </section>
  );
});

StudyPreferences.displayName = 'StudyPreferences';
