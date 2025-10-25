
import React from 'react';

interface LoadingMatchStateProps {
  timeRemaining: number;
  onEditPreferences?: () => void;
}

export const LoadingMatchState: React.FC<LoadingMatchStateProps> = ({
  timeRemaining,
  onEditPreferences
}) => {
  return (
    <div className="p-6 md:p-8 text-center">
      {/* Animated Icon */}
      <div className="relative w-20 h-20 mx-auto mb-6">
        <div className="absolute inset-0 border-4 border-purple-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl animate-pulse">🔍</span>
        </div>
      </div>

      {/* Title and Description */}
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Finding Your Perfect Match
      </h1>
      <p className="text-gray-600 mb-6">
        Looking for the best partner based on your preferences...
      </p>

      {/* Progress Dots */}
      <div className="flex justify-center space-x-2 mb-6">
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>

      {/* Time Remaining */}
      <div className="text-sm text-gray-500 mb-8">
        ~{timeRemaining} seconds remaining
      </div>

      {/* Cancel Button */}
      {onEditPreferences && (
        <button
          onClick={onEditPreferences}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors focus:outline-none focus:ring-4 focus:ring-gray-200"
        >
          Edit Preferences
        </button>
      )}
    </div>
  );
};
