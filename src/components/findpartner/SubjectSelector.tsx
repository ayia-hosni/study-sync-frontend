import React, { forwardRef, useImperativeHandle, useState } from 'react';

type SubjectSelectorProps = {};

export const SubjectSelector = forwardRef((props: SubjectSelectorProps, ref) => {
  const [selected, setSelected] = useState('');
  const [customSubject, setCustomSubject] = useState('');

  useImperativeHandle(ref, () => ({
    getValues: () => {
      const value = selected === 'other' ? customSubject.trim() : selected;
      return {
        subject: value || '', // Always return a string, even if empty
      };
    },
  }));

  return (
    <section className="bg-card shadow-card border border-border w-full p-6 rounded-2xl space-y-4">
      <h2 className="text-sm font-medium text-foreground">Choose a Subject</h2>

      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="w-full p-3 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">Select subject</option>
        <option value="Math">Math</option>
        <option value="Science">Science</option>
        <option value="History">History</option>
        <option value="other">Other...</option>
      </select>

      {selected === 'other' && (
        <input
          type="text"
          value={customSubject}
          onChange={(e) => setCustomSubject(e.target.value)}
          placeholder="Enter your subject"
          className="w-full p-3 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      )}
    </section>
  );
});

SubjectSelector.displayName = 'SubjectSelector';
