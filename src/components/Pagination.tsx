import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalResults: number;
  resultsPerPage: number;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalResults,
  resultsPerPage,
  className = ''
}) => {
  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  // Helper to generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <nav className={`bg-white shadow-[0px_14px_42px_rgba(8,15,52,0.06)] border flex w-full items-stretch gap-5 text-sm whitespace-nowrap flex-wrap justify-between p-[25px] rounded-[20px] border-[rgba(240,240,240,1)] border-solid ${className}`}>
      <div className="flex items-stretch gap-2.5 text-[rgba(126,126,126,1)] font-normal my-auto">
        <span className="grow">Showing</span>
        <span>{startResult}</span>
        <span>to</span>
        <span>{endResult}</span>
        <span>of</span>
        <span>{totalResults}</span>
        <span>results</span>
      </div>
      <div className="flex items-stretch gap-2 text-[rgba(32,32,32,1)] font-semibold text-center">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="aspect-[1] object-contain w-10 shrink-0 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
        >
          <img
            src="https://api.builder.io/api/v1/image/assets/f16bc7bb09694689bc28cb8eb3e754f2/2448db6637543df080b31c730ab89d721f0343be?placeholderIfAbsent=true"
            alt="Previous"
            className="w-full h-full"
          />
        </button>
        {getPageNumbers().map((page, idx) =>
          typeof page === 'number' ? (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`flex flex-col items-center justify-center w-10 h-10 px-4 rounded-lg transition-colors ${
                currentPage === page
                  ? 'bg-[rgba(112,45,255,1)] text-white'
                  : 'bg-[rgba(249,249,249,1)] border border-[rgba(240,240,240,1)] border-solid hover:bg-gray-100'
              }`}
            >
              <span>{page}</span>
            </button>
          ) : (
            <span key={idx} className="flex items-center justify-center w-10 h-10 text-gray-400 select-none">...</span>
          )
        )}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="aspect-[1] object-contain w-10 shrink-0 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
        >
          <img
            src="https://api.builder.io/api/v1/image/assets/f16bc7bb09694689bc28cb8eb3e754f2/c239c48dd52a11bd9e6716308bdb3731ce89435c?placeholderIfAbsent=true"
            alt="Next"
            className="w-full h-full"
          />
        </button>
      </div>
    </nav>
  );
};
