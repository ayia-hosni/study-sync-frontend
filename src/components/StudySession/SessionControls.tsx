import React, { useState } from 'react';

interface SessionControlsProps {
  onMicrophoneToggle: (enabled: boolean) => void;
  onCameraToggle: (enabled: boolean) => void;
  onScreenShare: () => void;
  onChatToggle: (open: boolean) => void;
}

export const SessionControls: React.FC<SessionControlsProps> = ({
  onMicrophoneToggle,
  onCameraToggle,
  onScreenShare,
  onChatToggle
}) => {
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [chatOpen, setChatOpen] = useState(true);

  const handleMicToggle = () => {
    const newState = !micEnabled;
    setMicEnabled(newState);
    onMicrophoneToggle(newState);
  };

  const handleCameraToggle = () => {
    const newState = !cameraEnabled;
    setCameraEnabled(newState);
    onCameraToggle(newState);
  };

  const handleChatToggle = () => {
    const newState = !chatOpen;
    setChatOpen(newState);
    onChatToggle(newState);
  };

  return (
    <section className="w-[828px] h-[136px] flex flex-col gap-4 bg-neutral-100 p-6 rounded-[20px]">
      <h3 className="text-[#202020] text-base font-bold leading-6">
        <span role="img" aria-label="star">⭐</span> Session Controls
      </h3>
      
      <div className="flex gap-4" role="toolbar" aria-label="Session control buttons">
        <button
          onClick={handleMicToggle}
          className={`w-12 h-12 flex items-center justify-center rounded-xl transition-colors ${
            micEnabled ? 'bg-neutral-100 hover:bg-neutral-200' : 'bg-red-500 hover:bg-red-600'
          }`}
          aria-label={micEnabled ? 'Mute microphone' : 'Unmute microphone'}
          aria-pressed={!micEnabled}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 1.25C8.96449 1.25 8.0719 2.14259 8.0719 3.17812V8.59375C8.0719 9.62928 8.96449 10.5219 10 10.5219C11.0355 10.5219 11.9281 9.62928 11.9281 8.59375V3.17812C11.9281 2.14259 11.0355 1.25 10 1.25Z" fill={micEnabled ? "#7E7E7E" : "white"}/>
            <path d="M6.25 7.8125C6.25 7.46332 5.97168 7.1875 5.625 7.1875C5.27832 7.1875 5 7.46332 5 7.8125C5 10.2773 6.875 12.3047 9.375 12.4766V15H7.5C7.15332 15 6.875 15.2758 6.875 15.625C6.875 15.9742 7.15332 16.25 7.5 16.25H12.5C12.8467 16.25 13.125 15.9742 13.125 15.625C13.125 15.2758 12.8467 15 12.5 15H10.625V12.4766C13.125 12.3047 15 10.2773 15 7.8125C15 7.46332 14.7217 7.1875 14.375 7.1875C14.0283 7.1875 13.75 7.46332 13.75 7.8125C13.75 9.88281 12.0703 11.5625 10 11.5625C7.92969 11.5625 6.25 9.88281 6.25 7.8125Z" fill={micEnabled ? "#7E7E7E" : "white"}/>
          </svg>
        </button>

        <button
          onClick={handleCameraToggle}
          className={`w-12 h-12 flex items-center justify-center rounded-xl transition-colors ${
            cameraEnabled ? 'bg-neutral-100 hover:bg-neutral-200' : 'bg-red-500 hover:bg-red-600'
          }`}
          aria-label={cameraEnabled ? 'Turn off camera' : 'Turn on camera'}
          aria-pressed={!cameraEnabled}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 5.6249C2.5 4.58937 3.39259 3.69678 4.42812 3.69678H11.5719C12.6074 3.69678 13.5 4.58937 13.5 5.6249V14.3749C13.5 15.4104 12.6074 16.303 11.5719 16.303H4.42812C3.39259 16.303 2.5 15.4104 2.5 14.3749V5.6249Z" fill={cameraEnabled ? "#7E7E7E" : "white"}/>
            <path d="M15.2344 6.2501L17.1875 4.29698C17.5 3.98448 18 4.20322 18 4.64072V15.3595C18 15.797 17.5 16.0157 17.1875 15.7032L15.2344 13.7501C14.9219 13.4376 15.1406 12.9376 15.5781 12.9376H16.25V7.0626H15.5781C15.1406 7.0626 14.9219 6.5626 15.2344 6.2501Z" fill={cameraEnabled ? "#7E7E7E" : "white"}/>
          </svg>
        </button>

        <button
          onClick={onScreenShare}
          className="w-12 h-12 flex items-center justify-center bg-neutral-100 rounded-xl hover:bg-neutral-200 transition-colors"
          aria-label="Share screen"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 3.75C2.5 3.40482 2.77982 3.125 3.125 3.125H16.875C17.2202 3.125 17.5 3.40482 17.5 3.75V12.5C17.5 12.8452 17.2202 13.125 16.875 13.125H3.125C2.77982 13.125 2.5 12.8452 2.5 12.5V3.75Z" fill="#7E7E7E"/>
            <path d="M6.25 15.625H13.75C14.0952 15.625 14.375 15.9048 14.375 16.25C14.375 16.5952 14.0952 16.875 13.75 16.875H6.25C5.90482 16.875 5.625 16.5952 5.625 16.25C5.625 15.9048 5.90482 15.625 6.25 15.625Z" fill="#7E7E7E"/>
          </svg>
        </button>

        <button
          onClick={handleChatToggle}
          className={`w-12 h-12 flex items-center justify-center rounded-xl transition-colors ${
            chatOpen ? 'bg-[#702DFF] hover:bg-[#5a24cc]' : 'bg-neutral-100 hover:bg-neutral-200'
          }`}
          aria-label={chatOpen ? 'Close chat' : 'Open chat'}
          aria-pressed={chatOpen}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5 6.25C17.5 5.55964 16.9404 5 16.25 5H3.75C3.05964 5 2.5 5.55964 2.5 6.25V11.25C2.5 11.9404 3.05964 12.5 3.75 12.5H5V15.625C5 15.9702 5.27982 16.25 5.625 16.25C5.79688 16.25 5.95312 16.1719 6.05469 16.0391L8.51562 12.5H16.25C16.9404 12.5 17.5 11.9404 17.5 11.25V6.25Z" fill={chatOpen ? "white" : "#7E7E7E"}/>
          </svg>
        </button>
      </div>
    </section>
  );
};
