import React, { useEffect, useState } from 'react';
import { CloseButton } from './CloseButton';
import { ProgressIndicator } from './ProgressIndicator';
import { ProgressBar } from './ProgressBar';

interface StudyPartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditPreferences?: () => void;
}

export const StudyPartnerModal: React.FC<StudyPartnerModalProps> = ({
  isOpen,
  onClose,
  onEditPreferences
}) => {
  const [progress, setProgress] = useState(57);
  const [timeRemaining, setTimeRemaining] = useState(6);

  useEffect(() => {
    if (!isOpen) return;

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 5;
      });
    }, 500);

    const timeInterval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timeInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(timeInterval);
    };
  }, [isOpen]);

  const handleEditPreferences = () => {
    if (onEditPreferences) {
      onEditPreferences();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
      />
      <div 
        className="w-screen h-screen fixed flex items-center justify-center bg-[rgba(0,0,0,0.4)] left-0 top-0 z-50"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <div className="w-[480px] h-[500px] shadow-[0px_14px_42px_0px_rgba(8,15,52,0.06)] relative bg-white rounded-[20px] max-md:w-[90%] max-md:max-w-[480px] max-md:mx-5 max-md:my-0 max-sm:w-[95%] max-sm:h-auto max-sm:min-h-[500px] max-sm:mx-2.5 max-sm:my-0">
          <div className="w-full h-full relative">
            <div className="absolute right-6 top-6">
              <CloseButton onClick={onClose} />
            </div>
            
            <div className="relative w-20 h-20 mt-[91px] mb-0 mx-auto">
              <ProgressIndicator progress={progress} />
            </div>
            
            <h1
              id="modal-title"
              className="text-[#202020] text-center text-2xl font-bold leading-9 mt-[23px] px-8 py-0 max-sm:text-xl max-sm:leading-[30px] max-sm:px-5 max-sm:py-0"
            >
              Finding Your Perfect Study Partner
            </h1>
            
            <p
              id="modal-description"
              className="text-[#7E7E7E] text-center text-sm font-normal leading-[21px] mt-[13px] px-8 py-0 max-sm:px-5 max-sm:py-0"
            >
              Looking for the best partner based on your preferences...
            </p>
            
            <div className="w-[416px] h-2 relative mt-6 mb-0 mx-auto max-md:w-[calc(100%_-_64px)] max-sm:w-[calc(100%_-_40px)]">
              <ProgressBar progress={progress} />
            </div>
            
            <div className="text-[#7E7E7E] text-center text-xs font-normal leading-[18px] mt-1.5">
              ~{timeRemaining} seconds remaining
            </div>
            
            <button
              onClick={handleEditPreferences}
              className="w-[416px] h-12 flex items-center justify-center cursor-pointer bg-neutral-100 mt-8 mb-0 mx-auto rounded-xl max-md:w-[calc(100%_-_64px)] max-sm:w-[calc(100%_-_40px)] hover:bg-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-[#702DFF] focus:ring-offset-2"
              type="button"
              aria-label="Edit your study partner preferences"
            >
              <span className="text-[#7E7E7E] text-center text-sm font-semibold leading-[21px]">
                Edit Preferences
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
