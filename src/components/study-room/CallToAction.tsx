import React from 'react';

export const CallToAction = () => {
  const handleJoinNow = () => {
    console.log('Joining study room...');
  };

  return (
    <section 
      className="w-full max-w-[1204px] h-[184px] flex flex-col items-center justify-center text-center relative mb-6 p-8 rounded-[20px]"
      style={{
        background: 'linear-gradient(135deg, #702DFF 0%, #9D5CFF 100%)'
      }}
    >
      <div className="mb-4">
        <div
          dangerouslySetInnerHTML={{
            __html:
              "<svg id=\"101:48\" width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <g clip-path=\"url(#clip0_101_48)\"> <path d=\"M30 0C30 0 31.6553 15.4498 38.1027 21.8973C44.5502 28.3447 60 30 60 30C60 30 44.5502 31.6553 38.1027 38.1027C31.6553 44.5502 30 60 30 60C30 60 28.3447 44.5502 21.8973 38.1027C15.4498 31.6553 0 30 0 30C0 30 15.4498 28.3447 21.8973 21.8973C28.3447 15.4498 30 0 30 0Z\" fill=\"white\"></path> </g> <defs> <clipPath id=\"clip0_101_48\"> <rect width=\"60\" height=\"60\" fill=\"white\"></rect> </clipPath> </defs> </svg>",
          }}
        />
      </div>
      <h3 className="text-white text-center text-xl font-bold leading-[30px] mb-2">
        🚀 Join the Study Room
      </h3>
      <p className="text-white text-center text-sm font-normal leading-[21px] opacity-90 mb-4">
        Connect with fellow students, share knowledge, and grow together!
      </p>
      <button 
        onClick={handleJoinNow}
        className="w-[150px] h-[45px] flex items-center justify-center gap-2 bg-white rounded-[40px] hover:bg-gray-50 transition-colors"
        aria-label="Join study room"
      >
        <span className="text-[#702DFF] text-center text-sm font-bold leading-[21px]">
          Join Now
        </span>
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html:
                "<svg id=\"101:91\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M6 12L10 8L6 4\" stroke=\"#702DFF\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path> </svg>",
            }}
          />
        </div>
      </button>
    </section>
  );
};
