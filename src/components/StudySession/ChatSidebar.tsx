import React, { useState } from 'react';
import { ChatMessage } from './ChatMessage';

interface Message {
  id: string;
  sender?: string;
  message: string;
  timestamp: string;
  isCurrentUser?: boolean;
}

interface ChatSidebarProps {
  participantCount: number;
  messages: Message[];
  onSendMessage: (message: string) => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  participantCount,
  messages,
  onSendMessage
}) => {
  const [messageInput, setMessageInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      onSendMessage(messageInput.trim());
      setMessageInput('');
    }
  };

  const handleEmojiClick = (emoji: string) => {
    onSendMessage(emoji);
  };

  const emojis = ['👍', '❤️', '😂', '🤔', '💡', '🎉'];

  return (
    <aside className="w-[396px] h-[817px] shadow-[0px_14px_42px_0px_rgba(8,15,52,0.06)] flex flex-col bg-white border-l-[0.889px] border-l-[#F0F0F0] border-solid">
      <header className="w-full h-[60px] flex items-center justify-between px-6 py-0 border-b-[0.889px] border-b-[#F0F0F0] border-solid">
        <h2 className="text-[#202020] text-base font-bold leading-6">
          Session Chat
        </h2>
        <span className="text-[#7E7E7E] text-xs font-normal leading-[18px]">
          {participantCount} participants
        </span>
      </header>

      <div className="flex-1 flex flex-col gap-4 overflow-y-auto p-6" role="log" aria-label="Chat messages">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            sender={message.sender}
            message={message.message}
            timestamp={message.timestamp}
            isCurrentUser={message.isCurrentUser}
          />
        ))}
      </div>

      <footer className="w-full h-[136px] flex flex-col gap-4 p-6 border-t-[0.889px] border-t-[#F0F0F0] border-solid">
        <div className="flex gap-4" role="toolbar" aria-label="Quick emoji reactions">
          {emojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleEmojiClick(emoji)}
              className="text-black text-base font-normal leading-6 hover:scale-110 transition-transform"
              aria-label={`Send ${emoji} reaction`}
            >
              {emoji}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="w-[274px] h-[47px] border flex items-center px-4 py-0 rounded-xl border-solid border-[#F0F0F0]">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your message..."
              className="w-full text-black text-sm font-normal bg-transparent border-none outline-none"
              aria-label="Chat message input"
            />
          </div>
          <button
            type="submit"
            disabled={!messageInput.trim()}
            className="w-[61px] h-[47px] flex items-center justify-center bg-[#702DFF] rounded-xl hover:bg-[#5a24cc] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Send message"
          >
            <span className="text-white text-xs font-bold leading-[18px]">
              Send
            </span>
          </button>
        </form>
      </footer>
    </aside>
  );
};
