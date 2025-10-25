import React from 'react';

export const Header = () => {
  return (
    <header className="w-full h-[58px] shadow-[0px_2px_8px_0px_rgba(8,15,52,0.06)] relative flex items-center justify-between bg-white px-4 py-0 border-b-[0.889px] border-b-[#D8D8D8] border-solid">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 flex items-center justify-center bg-[#702DFF] rounded-[50%]">
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  "<svg id=\"101:6\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M8 4C8 4 8.2207 6.0599 9.1214 6.9606C10.022 7.8613 12 8 12 8C12 8 10.022 8.1387 9.1214 9.0394C8.2207 9.9401 8 12 8 12C8 12 7.7793 9.9401 6.8786 9.0394C5.978 8.1387 4 8 4 8C4 8 5.978 7.8613 6.8786 6.9606C7.7793 6.0599 8 4 8 4Z\" fill=\"white\"></path> </svg>",
              }}
            />
          </div>
        </div>
        <h1 className="text-[#202020] text-base font-bold leading-6">
          StudySync
        </h1>
      </div>
      <nav className="flex items-center gap-4">
        <button className="relative" aria-label="Notifications">
          <div className="w-[34px] h-[34px] border flex items-center justify-center rounded-[50%] border-solid border-[#9E9E9E]">
            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    "<svg id=\"101:10\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M14 2H2C1.45 2 1 2.45 1 3V11C1 11.55 1.45 12 2 12H3V14.5C3 14.78 3.28 15 3.5 15C3.64 15 3.77 14.93 3.85 14.82L6.18 12H14C14.55 12 15 11.55 15 11V3C15 2.45 14.55 2 14 2Z\" stroke=\"#292D32\" stroke-width=\"1.5\"></path> </svg>",
                }}
              />
            </div>
          </div>
          <div className="w-5 h-5 absolute flex items-center justify-center bg-[#F13E3E] rounded-[50%] -right-1 -top-1">
            <span className="text-white text-center text-[10px] font-bold leading-[15px]">
              3
            </span>
          </div>
        </button>
        <button className="w-8 h-8 flex items-center justify-center bg-[#702DFF] rounded-[50%]" aria-label="User profile">
          <span className="text-white text-sm font-bold leading-[21px]">
            Y
          </span>
        </button>
      </nav>
    </header>
  );
};
