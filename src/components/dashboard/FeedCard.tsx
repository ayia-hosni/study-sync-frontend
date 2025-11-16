import React from 'react';
import { Badge } from '../ui/badge';

interface FeedCardProps {
  type: 'user-post' | 'habit-completion' | 'room-activity';
  userId?: number | string; // new prop
  emoji?: string;
  roomName?: string;
  timeAgo: string;
  userInitial: string;
  userName: string;
  userAction: string;
  content?: string;
  category: string;
  categoryColor?: 'purple' | 'green';
  likes?: number;
  comments?: number;
  hasSupport?: boolean;
  habitDetails?: {
    title: string;
    streak: number;
  };
  images?: string[]; // Array of image URLs for slides
}

interface Comment {
  id: string;
  userInitial: string;
  userName: string;
  text: string;
  replies?: Comment[];
}

export const FeedCard: React.FC<FeedCardProps> = ({
  type,
  userId, // accept new prop
  emoji,
  roomName,
  timeAgo,
  userInitial,
  userName,
  userAction,
  content,
  category,
  categoryColor = 'purple',
  likes,
  comments,
  hasSupport,
  habitDetails,
  images = [],
}) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const [showComments, setShowComments] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(likes || 0);
  const [commentsList, setCommentsList] = React.useState<Comment[]>([
    {
      id: '1',
      userInitial: 'E',
      userName: 'Emma Thompson',
      text: 'Great job! Keep it up!',
      replies: [
        {
          id: '1-1',
          userInitial: 'S',
          userName: 'Sarah Chen',
          text: 'Thanks Emma! 😊',
        }
      ]
    },
    {
      id: '2',
      userInitial: 'J',
      userName: 'Jake Wilson',
      text: 'Inspiring streak!'
    }
  ]);
  const [commentInput, setCommentInput] = React.useState('');
  const [replyInput, setReplyInput] = React.useState<{ [key: string]: string }>({});
  const [replyingTo, setReplyingTo] = React.useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const getUserBgColor = (initial: string) => {
    const colors = {
      'S': '#702DFF',
      'M': '#962DFF',
      'E': '#C893FD',
      'J': '#10B981'
    };
    return colors[initial as keyof typeof colors] || '#702DFF';
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleAddComment = () => {
    if (!commentInput.trim()) return;
    setCommentsList([
      ...commentsList,
      {
        id: Date.now().toString(),
        userInitial: 'A',
        userName: 'You',
        text: commentInput,
      }
    ]);
    setCommentInput('');
  };

  const handleAddReply = (parentId: string) => {
    if (!replyInput[parentId]?.trim()) return;
    setCommentsList(commentsList.map(comment =>
      comment.id === parentId
        ? {
            ...comment,
            replies: [
              ...(comment.replies || []),
              {
                id: `${parentId}-${(comment.replies?.length || 0) + 1}`,
                userInitial: 'A',
                userName: 'You',
                text: replyInput[parentId],
              }
            ]
          }
        : comment
    ));
    setReplyInput({ ...replyInput, [parentId]: '' });
    setReplyingTo(null);
  };

  const hasSlides = images && images.length > 0;

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <article className="w-full border shadow-[0px_14px_42px_0px_rgba(8,15,52,0.06)] bg-white dark:bg-[#232329] mb-6 p-6 rounded-[20px] border-solid border-[#F0F0F0] dark:border-[#232329]">
      {roomName && (
        <header className="flex items-center justify-between border-b-neutral-100 mb-6 pb-4 border-b-[0.889px] border-solid dark:border-[#232329]">
          <div className="flex items-center gap-4">
            {emoji && (
              <span className="text-sm font-normal leading-5">
                {emoji}
              </span>
            )}
            <span className="text-[#7E7E7E] dark:text-neutral-300 text-xs font-normal leading-4">
              {roomName}
            </span>
          </div>
          <time className="text-[#7E7E7E] dark:text-neutral-300 text-[10px] font-normal leading-[15px]">
            {timeAgo}
          </time>
        </header>
      )}
      
      <div className="flex items-center gap-4 mb-4">
        <div 
          className="w-10 h-10 flex items-center justify-center rounded-[50%]"
          style={{ backgroundColor: getUserBgColor(userInitial) }}
        >
          <span className="text-white text-sm font-bold leading-5">
            {userInitial}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-[#202020] dark:text-white text-sm font-bold leading-5">
            {/* Make username clickable when userId is available */}
            {userId ? (
              <button
                type="button"
                onClick={() => { window.location.href = `/profile/${userId}`; }}
                className="inline-block mr-2 text-left hover:underline"
                aria-label={`Open profile of ${userName}`}
              >
                {userName}
              </button>
            ) : (
              <span className="mr-2">{userName}</span>
            )}
            <span className="text-sm font-normal">{userAction}</span>
          </h3>
          <p className="text-[#7E7E7E] dark:text-neutral-300 text-xs font-normal leading-4">
  {type === 'user-post'
    ? 'shared publicly'
    : type === 'habit-completion'
      ? roomName ? 'shared in room' : '' 
      : 'habit in room'}
</p>

        </div>
        <Badge 
          variant={categoryColor === 'green' ? 'green' : 'purple'} 
          size="lg"
        >
          {category}
        </Badge>
      </div>

      {!roomName && (
        <time className="text-[#7E7E7E] dark:text-neutral-300 text-[10px] font-normal leading-[15px] mb-4 block">
          {timeAgo}
        </time>
      )}
      
      {content && (
        <p className="text-[#202020] dark:text-white text-sm font-normal leading-5 mb-4">
          {content}
        </p>
      )}
      
      {habitDetails && (
        <div className="w-full border bg-[#F8F9FA] dark:bg-neutral-800 mb-4 p-4 rounded-xl border-solid border-[#E9ECEF] dark:border-neutral-700">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-6 h-6 bg-emerald-500 rounded-[50%]" />
            <h4 className="text-[#202020] dark:text-white text-base font-bold leading-6">
              {habitDetails.title}
            </h4>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#7E7E7E] dark:text-neutral-300 text-xs font-normal leading-4">
              Streak:
            </span>
            <Badge variant="purple" size="lg">
              {habitDetails.streak} days
            </Badge>
          </div>
        </div>
      )}
      
      {/* Slides Section */}
      {hasSlides && (
        <div className="mb-4">
          <div className="relative w-full h-64 bg-neutral-100 dark:bg-neutral-800 rounded-xl overflow-hidden flex items-center justify-center">
            <img
              src={images[currentSlide]}
              alt={`Slide ${currentSlide + 1}`}
              className="object-contain w-full h-full"
            />
            {images.length > 1 && (
              <>
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white dark:bg-neutral-900 bg-opacity-80 dark:bg-opacity-80 rounded-full p-1 shadow hover:bg-opacity-100 dark:hover:bg-opacity-100"
                  onClick={handlePrevSlide}
                  type="button"
                  aria-label="Previous slide"
                >
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#702DFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white dark:bg-neutral-900 bg-opacity-80 dark:bg-opacity-80 rounded-full p-1 shadow hover:bg-opacity-100 dark:hover:bg-opacity-100"
                  onClick={handleNextSlide}
                  type="button"
                  aria-label="Next slide"
                >
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="#702DFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </>
            )}
            {/* Slide indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                {images.map((_, idx) => (
                  <span
                    key={idx}
                    className={`w-2 h-2 rounded-full ${idx === currentSlide ? 'bg-[#702DFF]' : 'bg-gray-300 dark:bg-neutral-700'}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      
      <footer className="flex gap-3">
        <button 
          onClick={handleLike}
          className={`h-8 flex items-center gap-2 px-3 py-0 rounded-md transition-colors ${
            isLiked ? 'bg-red-50 dark:bg-red-900 hover:bg-red-100 dark:hover:bg-red-800' : 'hover:bg-gray-100 dark:hover:bg-neutral-700'
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M8 14.5s-6-4-6-8.5c0-2.5 2-4.5 4.5-4.5C7.5 1.5 8 2.5 8 2.5s.5-1 1.5-1C11.5 1.5 14 3.5 14 6c0 4.5-6 8.5-6 8.5z" 
              fill={isLiked ? "#ef4444" : "none"} 
              stroke={isLiked ? "#ef4444" : "#7E7E7E"} 
              strokeWidth="1.5"
            />
          </svg>
          <span className={`text-xs font-normal leading-4 ${isLiked ? 'text-red-500' : 'text-[#7E7E7E] dark:text-neutral-300'}`}>
            {likeCount}
          </span>
        </button>
        
        {/* Always show comment button, even if comments is 0 */}
        <button 
          onClick={() => setShowComments(!showComments)}
          className="h-8 flex items-center gap-2 px-3 py-0 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 3.5C2 2.67157 2.67157 2 3.5 2H12.5C13.3284 2 14 2.67157 14 3.5V9.5C14 10.3284 13.3284 11 12.5 11H4.5L2 13.5V3.5Z" stroke="#7E7E7E" strokeWidth="1.5" fill="none"/>
          </svg>
          <span className="text-[#7E7E7E] dark:text-neutral-300 text-xs font-normal leading-4">
            {comments ?? 0}
          </span>
        </button>
        
        {hasSupport && (
          <button className="h-8 flex items-center gap-2 px-3 py-0 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 2L9.09 6.26L13 7L9.09 7.74L8 12L6.91 7.74L3 7L6.91 6.26L8 2Z" fill="#36C"/>
            </svg>
            <span className="text-[#36C] dark:text-blue-300 text-xs font-normal leading-4">
              Support
            </span>
          </button>
        )}
      </footer>
      
      {showComments && (
        <div className="mt-4 p-4 bg-[#F8F9FA] dark:bg-neutral-800 rounded-xl border border-[#E9ECEF] dark:border-neutral-700">
          <div className="space-y-3">
            {/* Render comments if any, else show "No comments yet" */}
            {commentsList.length === 0 && (
              <div className="text-xs text-[#7E7E7E] dark:text-neutral-400 mb-2">No comments yet. Be the first to comment!</div>
            )}
            {commentsList.map(comment => (
              <div key={comment.id} className="flex flex-col gap-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#702DFF] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{comment.userInitial}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-[#202020] dark:text-white text-sm font-bold">{comment.userName}</div>
                    <div className="text-[#202020] dark:text-white text-sm">{comment.text}</div>
                    <button
                      className="text-xs text-[#702DFF] dark:text-violet-400 font-semibold mt-1 hover:underline"
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    >
                      Reply
                    </button>
                    {replyingTo === comment.id && (
                      <div className="mt-2 flex gap-2">
                        <input
                          type="text"
                          value={replyInput[comment.id] || ''}
                          onChange={e => setReplyInput({ ...replyInput, [comment.id]: e.target.value })}
                          placeholder="Write a reply..."
                          className="flex-1 p-2 text-sm border border-[#E9ECEF] dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#702DFF] dark:bg-neutral-900 dark:text-white"
                        />
                        <button
                          className="px-3 py-1 rounded-lg bg-[#702DFF] text-white text-xs font-bold hover:bg-violet-700"
                          onClick={() => handleAddReply(comment.id)}
                          type="button"
                        >
                          Send
                        </button>
                      </div>
                    )}
                    {/* Render replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-2 ml-6 space-y-2">
                        {comment.replies.map(reply => (
                          <div key={reply.id} className="flex items-start gap-2">
                            <div className="w-5 h-5 bg-[#702DFF] rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">{reply.userInitial}</span>
                            </div>
                            <div>
                              <div className="text-[#202020] dark:text-white text-xs font-bold">{reply.userName}</div>
                              <div className="text-[#202020] dark:text-white text-xs">{reply.text}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {/* Always show comment input */}
            <div className="flex items-start gap-3 mt-4">
              <div className="w-6 h-6 bg-[#702DFF] rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">A</span>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentInput}
                  onChange={e => setCommentInput(e.target.value)}
                  className="w-full mt-1 p-2 text-sm border border-[#E9ECEF] dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#702DFF] dark:bg-neutral-900 dark:text-white"
                  onKeyDown={e => { if (e.key === 'Enter') handleAddComment(); }}
                />
              </div>
              <button
                className="px-3 py-1 rounded-lg bg-[#702DFF] text-white text-xs font-bold hover:bg-violet-700"
                onClick={handleAddComment}
                type="button"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};
