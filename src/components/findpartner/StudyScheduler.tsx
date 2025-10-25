import React, { useState, forwardRef, useImperativeHandle } from 'react';

export const StudyScheduler = forwardRef((_, ref) => {
  const [selectedQuickDate, setSelectedQuickDate] = useState<string>('');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const getFormattedDateTime = (): string | null => {
    if (!preferredDate || !selectedTime) return null;

    const dateTime = new Date(`${preferredDate}T${selectedTime}`);
    if (isNaN(dateTime.getTime())) return null;

    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:00`;
  };

  // Expose this to parent via ref
  useImperativeHandle(ref, () => ({
    getValues: () => {
      const time_slot = getFormattedDateTime();
      return time_slot ? { time_slot } : {};
    },
  }));

  return (
    <section className="bg-card shadow-card border border-border w-full p-6 rounded-2xl">
      <h2 className="text-sm font-medium text-foreground mb-3">
        When do you want to study?
      </h2>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {['today', 'tomorrow'].map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => {
              setSelectedQuickDate(label);
              const date = new Date();
              if (label === 'tomorrow') date.setDate(date.getDate() + 1);
              const yyyy = date.getFullYear();
              const mm = String(date.getMonth() + 1).padStart(2, '0');
              const dd = String(date.getDate()).padStart(2, '0');
              setPreferredDate(`${yyyy}-${mm}-${dd}`);
            }}
            className={`py-2 rounded-xl text-sm transition-all ${
              selectedQuickDate === label
                ? 'bg-primary/10 border border-primary text-primary'
                : 'bg-muted hover:bg-muted-foreground/10'
            }`}
          >
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </button>
        ))}
      </div>

      <label className="text-sm block mb-1" htmlFor="preferred-date">Preferred Date</label>
      <input
        id="preferred-date"
        type="date"
        value={preferredDate}
        onChange={(e) => {
          setPreferredDate(e.target.value);
          setSelectedQuickDate('');
        }}
        className="w-full px-4 py-2 rounded-xl border border-input bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all mb-4"
      />

      <label className="text-sm block mb-1" htmlFor="preferred-time">Preferred Time</label>
      <input
        id="preferred-time"
        type="time"
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
        className="w-full px-4 py-2 rounded-xl border border-input bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all mb-4"
      />
    </section>
  );
});

StudyScheduler.displayName = 'StudyScheduler';
