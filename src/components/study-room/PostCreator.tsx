import React, { useState, useRef } from 'react';

export const PostCreator = () => {
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const availableTags = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
    'Literature', 'History', 'Geography', 'Economics', 'Psychology'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postContent.trim()) {
      console.log('Sharing post:', {
        content: postContent,
        image: selectedImage,
        tags: selectedTags
      });
      setPostContent('');
      setSelectedImage(null);
      setSelectedTags([]);
    }
  };

  const handleImageSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(prev => prev.filter(t => t !== tag));
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    <article className="w-full max-w-[1204px] h-[189px] border shadow-[0px_14px_42px_0px_rgba(8,15,52,0.06)] relative bg-white mb-6 p-6 rounded-[20px] border-solid border-[#F0F0F0]">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 flex items-center justify-center shrink-0 bg-[#702DFF] rounded-[50%]">
            <span className="text-white text-sm font-bold leading-[21px]">
              Y
            </span>
          </div>
          <div className="flex-1">
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="What's on your mind? Share your study progress, questions, or insights..."
              className="w-full h-20 border bg-[#F8F9FA] rounded-xl border-solid border-[#E9ECEF] p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#702DFF] focus:border-transparent"
              aria-label="Post content"
            />
            
            {/* Selected Image Preview */}
            {selectedImage && (
              <div className="mt-3 relative inline-block">
                <div className="bg-gray-100 p-2 rounded-lg flex items-center gap-2">
                  <span className="text-sm text-gray-600">{selectedImage.name}</span>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}

            {/* Selected Tags */}
            {selectedTags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#702DFF] text-white px-2 py-1 rounded-full text-xs flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-white hover:text-gray-200"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between mt-6">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleImageSelect}
              className="w-[117px] h-[34px] flex items-center justify-center gap-2 bg-[#F8F9FA] rounded-xl hover:bg-gray-200 transition-colors"
              aria-label="Add image to post"
            >
              <div>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      "<svg id=\"101:37\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M2 4C2 3.45 2.45 3 3 3H5L6 1H10L11 3H13C13.55 3 14 3.45 14 4V12C14 12.55 13.55 13 13 13H3C2.45 13 2 12.55 2 12V4Z\" fill=\"#7E7E7E\"></path> </svg>",
                  }}
                />
              </div>
              <span className="text-[#7E7E7E] text-center text-xs font-normal leading-[18px]">
                Add Image
              </span>
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowTagDropdown(!showTagDropdown)}
                className="w-[123px] h-[34px] flex items-center justify-center gap-2 bg-[#F8F9FA] rounded-xl hover:bg-gray-200 transition-colors"
                aria-label="Tag subject"
              >
                <div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        "<svg id=\"101:41\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M2 8H14M8 2V14\" stroke=\"#7E7E7E\" stroke-width=\"1.5\" stroke-linecap=\"round\"></path> </svg>",
                    }}
                  />
                </div>
                <span className="text-[#7E7E7E] text-center text-xs font-normal leading-[18px]">
                  Tag Subject
                </span>
              </button>
              
              {/* Tag Dropdown */}
              {showTagDropdown && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  <div className="p-2">
                    <p className="text-sm text-gray-600 mb-2">Select subjects:</p>
                    {availableTags.map((tag) => (
                      <label key={tag} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedTags.includes(tag)}
                          onChange={() => handleTagToggle(tag)}
                          className="w-4 h-4 text-[#702DFF] border-gray-300 rounded focus:ring-[#702DFF]"
                        />
                        <span className="text-sm text-gray-700">{tag}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-[120px] h-[37px] flex items-center justify-center bg-[#702DFF] rounded-xl hover:bg-[#5a24cc] transition-colors disabled:opacity-50"
            disabled={!postContent.trim()}
          >
            <span className="text-white text-center text-sm font-bold leading-[21px]">
              Share Post
            </span>
          </button>
        </div>
      </form>
    </article>
    </>
  );
};
