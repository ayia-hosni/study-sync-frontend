
import React from 'react';
import { MatchedPartner } from './MatchResultModal';

interface SuccessMatchCardProps {
  partner: MatchedPartner;
  onJoinSession: () => void;
  onViewDetails: () => void;
}

export const SuccessMatchCard: React.FC<SuccessMatchCardProps> = ({
  partner,
  onJoinSession,
  onViewDetails
}) => {
  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🎉</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          You've Been Matched!
        </h1>
        <p className="text-gray-600">
          Your study partner is ready to join.
        </p>
      </div>

      {/* Partner Card */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 mb-6 border border-green-100">
        <div className="flex items-center space-x-4 mb-4">
          {/* Avatar */}
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {partner.initials}
          </div>
          
          {/* Info */}
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900">{partner.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                {partner.subject} {partner.subjectIcon}
              </span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                {partner.compatibilityScore}% match
              </span>
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-white rounded-lg p-3 mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg">⏰</span>
            <span className="font-medium text-gray-900">{partner.scheduledTime}</span>
          </div>
        </div>

        {/* Match Reason */}
        <p className="text-sm text-gray-600 italic">
          {partner.matchReason}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={onJoinSession}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300"
        >
          🚪 Join Study Room
        </button>
        
        <button
          onClick={onViewDetails}
          className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200"
        >
          View Match Details
        </button>
      </div>
    </div>
  );
};
