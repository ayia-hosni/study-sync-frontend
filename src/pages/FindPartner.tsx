import React, { useState, useRef } from 'react';
import { Navbar } from '@/components/dashboard/Navbar';
import { MatchResultModal } from '@/components/result/MatchResultModal';
import { SubjectSelector } from '@/components/findpartner/SubjectSelector';
import { StudyScheduler } from '@/components/findpartner/StudyScheduler';
import { StudyPreferences } from '@/components/findpartner/StudyPreferences';
import { useMatchPartner } from '@/hooks/useMatchPartner';

const FindPartner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [matchState, setMatchState] = useState<'loading' | 'success' | 'no-match'>('loading');
  const [matchResult, setMatchResult] = useState(null);

  const subjectRef = useRef(null);
  const schedulerRef = useRef(null);
  const preferencesRef = useRef(null);

  const { retryMatch } = useMatchPartner();

  const collectFormData = () => {
    const subjectData = subjectRef.current?.getValues?.(); // subject
    const schedulerData = schedulerRef.current?.getValues?.(); // time_slot
    const preferencesData = preferencesRef.current?.getValues?.(); // rest

    return {
      ...subjectData,
      ...schedulerData,
      ...preferencesData,
    };
  };

  const handleOpenModal = async () => {
    setIsModalOpen(true);
    setMatchState('loading');
    setMatchResult(null);

    try {
      const input = collectFormData();
      const result = await retryMatch(input);
      const data = result.retryMatch;

      if (data.matched) {
        setMatchResult(data);
        setMatchState('success');
      } else {
        setMatchState('no-match');
      }
    } catch (error) {
      console.error('Matching error:', error);
      setMatchState('no-match');
    }
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Navbar />
      <main className="flex flex-col items-center w-full max-w-[640px] mx-auto px-4 pt-[100px] pb-12">
        <section className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            StudySync
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Connect with like-minded students and find your perfect study companion.
          </p>
        </section>

        <section className="w-full bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            🧑‍🤝‍🧑 Find a Study Partner
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Select your preferences and we'll find the best match for you.
          </p>

          <form className="space-y-6">
            <SubjectSelector ref={subjectRef} />
            <StudyScheduler ref={schedulerRef} />
            <StudyPreferences ref={preferencesRef} />

            <button
              onClick={(e) => {
                e.preventDefault();
                handleOpenModal();
              }}
              type="submit"
              className="w-full bg-[#702DFF] hover:bg-[#5a24cc] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#702DFF]"
            >
              🔍 Find Partner
            </button>
          </form>
        </section>
      </main>

      <MatchResultModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        matchState={matchState}
        matchResult={matchResult}
        onJoinSession={(id) => console.log('Joining session with partner:', id)}
        onViewDetails={(id) => console.log('Viewing details for partner:', id)}
        onEditPreferences={() => setIsModalOpen(false)}
        onJoinPublicRoom={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default FindPartner;
