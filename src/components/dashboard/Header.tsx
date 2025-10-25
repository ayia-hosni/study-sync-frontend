import React from 'react';

interface HeaderProps {
  onToggleSidebar?: () => void;
  showSidebar?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, showSidebar }) => {
  return (
    <header className="w-full h-[58px] shadow-[0px_2px_8px_0px_rgba(8,15,52,0.06)] fixed z-[1000] flex items-center justify-between bg-white px-4 py-0 border-b-[0.889px] border-b-[#D8D8D8] border-solid left-0 top-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 flex items-center justify-center bg-[#702DFF] rounded-[50%]">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 4C8 4 8.2207 6.0599 9.1214 6.9606C10.022 7.8613 12 8 12 8C12 8 10.022 8.1387 9.1214 9.0394C8.2207 9.9401 8 12 8 12C8 12 7.7793 9.9401 6.8786 9.0394C5.978 8.1387 4 8 4 8C4 8 5.978 7.8613 6.8786 6.9606C7.7793 6.0599 8 4 8 4Z" fill="white" />
          </svg>
        </div>
        <h1 className="text-[#202020] text-base font-bold leading-6">
          GrowthSync
        </h1>
      </div>
      <nav className="flex items-center gap-4">
        {/* Sidebar Toggle for Mobile */}
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="lg:hidden w-[34px] h-[34px] border flex items-center justify-center rounded-lg border-solid border-[#9E9E9E] hover:bg-gray-50 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4H14M2 8H14M2 12H14" stroke="#7E7E7E" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        )}
        
        <div className="relative">
          <button className="w-[34px] h-[34px] border flex items-center justify-center rounded-[50%] border-solid border-[#9E9E9E] hover:bg-gray-50 transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.01339 1.93994C5.80673 1.93994 4.01339 3.73328 4.01339 5.93994V7.86661C4.01339 8.27328 3.84006 8.89328 3.63339 9.23994L2.86673 10.5132C2.39339 11.2999 2.72006 12.1732 3.58673 12.4666C6.46006 13.4266 9.56006 13.4266 12.4334 12.4666C13.2401 12.1999 13.5934 11.2466 13.1534 10.5132L12.3867 9.23994C12.1867 8.89328 12.0134 8.27328 12.0134 7.86661V5.93994C12.0134 3.73994 10.2134 1.93994 8.01339 1.93994Z" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" />
            </svg>
          </button>
          <div className="w-5 h-5 absolute flex items-center justify-center bg-[#F13E3E] rounded-[50%] -right-1 -top-1">
            <span className="text-white text-[10px] font-bold leading-[15px]">
              2
            </span>
          </div>
        </div>
        <button className="w-8 h-8 flex items-center justify-center bg-[#702DFF] rounded-[50%] hover:bg-[#5a24cc] transition-colors">
          <span className="text-white text-sm font-bold leading-5">
            A
          </span>
        </button>
      </nav>
    </header>
  );
};
