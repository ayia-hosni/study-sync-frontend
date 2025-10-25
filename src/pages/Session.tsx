import React, { useState } from 'react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Header } from '@/components/StudySession/Header';
import { ParticipantsGrid } from '@/components/StudySession/ParticipantsGrid';
import { SessionControls } from '@/components/StudySession/SessionControls';
import { ChatSidebar } from '@/components/StudySession/ChatSidebar';

const Session = () => {
  const [sessionTime, setSessionTime] = useState('35:42');
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'Sarah Kim',
      message: 'Hey everyone! Ready to tackle this physics problem?',
      timestamp: '2:15 PM',
      isCurrentUser: false
    },
    {
      id: '2',
      message: 'Yes! I brought my notes on momentum',
      timestamp: '2:16 PM',
      isCurrentUser: true
    },
    {
      id: '3',
      sender: 'Mike Chen',
      message: 'Perfect, let me share my screen with the practice problems',
      timestamp: '2:17 PM',
      isCurrentUser: false
    }
  ]);

  const participants = [
    {
      id: '1',
      name: 'You',
      initial: 'A',
      backgroundColor: '#702DFF',
      isOnline: true,
      isCurrentUser: true
    },
    {
      id: '2',
      name: 'Sarah Kim',
      initial: 'S',
      backgroundColor: '#962DFF',
      isOnline: true
    },
    {
      id: '3',
      name: 'Mike Chen',
      initial: 'M',
      backgroundColor: '#C893FD',
      isOnline: false,
      isAway: true,
      cameraOff: true
    },
    {
      id: '4',
      name: 'Emma Wilson',
      initial: 'E',
      backgroundColor: '#E0C6FD',
      isOnline: true
    }
  ];

  const handleLeaveSession = () => {
    console.log('Leaving session...');
    // Implement leave session logic
  };

  const handleMicrophoneToggle = (enabled: boolean) => {
    console.log('Microphone:', enabled ? 'enabled' : 'disabled');
  };

  const handleCameraToggle = (enabled: boolean) => {
    console.log('Camera:', enabled ? 'enabled' : 'disabled');
  };

  const handleScreenShare = () => {
    console.log('Screen sharing...');
  };

  const handleChatToggle = (open: boolean) => {
    console.log('Chat:', open ? 'open' : 'closed');
  };

  const handleSendMessage = (message: string) => {
    const newMessage = {
      id: Date.now().toString(),
      message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div className="w-full h-[875px] relative bg-white">
     <Navbar /> 
      <Header
        sessionTitle="StudySync Meeting"
        sessionSubtitle="Mathematics Study Session"
        currentTopic="Physics Problem Solving"
        sessionTime={sessionTime}
        onLeaveSession={handleLeaveSession}
      />
      
      <main className="w-full h-[817px] flex bg-white">
        <div className="w-[876px] h-full flex flex-col gap-6 p-6">
          <ParticipantsGrid participants={participants} />
          
          <SessionControls
            onMicrophoneToggle={handleMicrophoneToggle}
            onCameraToggle={handleCameraToggle}
            onScreenShare={handleScreenShare}
            onChatToggle={handleChatToggle}
          />
        </div>
        
        <ChatSidebar
          participantCount={participants.length}
          messages={messages}
          onSendMessage={handleSendMessage}
        />
      </main>
    </div>
  );
};

export default Session;
