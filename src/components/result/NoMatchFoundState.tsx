
import React from 'react';

interface NoMatchFoundStateProps {
  onEditPreferences?: () => void;
  onJoinPublicRoom?: () => void;
}

export const NoMatchFoundState: React.FC<NoMatchFoundStateProps> = ({
  onEditPreferences,
  onJoinPublicRoom
}) => {
  return (
    <div className="p-6 md:p-8 text-center">
      {/* Icon */}
      <div className="text-6xl mb-4">😕</div>

      {/* Title and Message */}
      <h1 className="text-2xl font-bold text-gray-900 mb-3">
        No Match Found
      </h1>
      <p className="text-gray-600 mb-6">
        We couldn't find a match right now.
      </p>

      {/* Suggestions */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Suggestions:</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-center space-x-2">
            <span>💡</span>
            <span>Try changing your study time or subject</span>
          </li>
          <li className="flex items-center space-x-2">
            <span>🔔</span>
            <span>We'll notify you when someone becomes available</span>
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {onEditPreferences && (
          <button
            onClick={onEditPreferences}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Edit Preferences
          </button>
        )}
        
        {onJoinPublicRoom && (
          <button
            onClick={onJoinPublicRoom}
            className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200"
          >
            Join a Public Study Room
          </button>
        )}
      </div>
    </div>
  );
};
